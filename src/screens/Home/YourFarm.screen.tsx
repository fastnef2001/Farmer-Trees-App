/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderComponent from '../../components/Header/Header.component';
import { ButtonMenu } from '../../components/Button/ButtonMenu';
import WeatherComponent from '../../components/Weather/Weather.component';
import firestore from '@react-native-firebase/firestore';
import RectangularTree from '../../components/RectangularElement/Tree.component';
import IconAdd from '../../assets/images/IconAdd.svg';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import styles from '../Setupfarm/Addtree.style';
import { ModalInsert } from '../../components/Modal/ModalInsert';
import IconBack from '../../assets/images/IconBack.svg';
import IconSave from '../../assets/images/IconSave.svg';
import IconDeleteRed from '../../assets/images/IconDeleteRed.svg';
import IconUpload from '../../assets/images/IconUpload.svg';
import Input from '../../components/Input/Input.component';
import { Modal } from '../../components/Modal/Modal';
import IconAdd36 from '../../assets/images/IconAdd36.svg';
import { COLORS } from '../../theme/color';

const YourFarm = ({ navigation }: any) => {
  const [isModalAddTree, setIsModalAddTree] = React.useState(false);
  const [selectImage, setSelectImage] = useState('');
  const [isModalSuccess, setIsModalSuccess] = React.useState(false);
  const [isTrees, setIsTrees] = useState(false);
  const [inputs, setInputs] = useState([
    { label: 'Tree name', value: '', error: '' },
    { label: 'Quanlity', value: '', error: '' },
  ]);

  //đưa các giá trị về ban đầu
  const handleModalSuccess = () => {
    setIsModalSuccess(() => !isModalSuccess);
  };

  //trong hàm handle modal thì set lại các giá trị về ban đầu
  const handleModal = () => {
    setIsModalAddTree(() => !isModalAddTree);
  };

  const handleModalImagePicker = () => {
    const option = {
      mediaType: 'photo' as MediaType,
      storageOptions: {
        path: 'image',
      },
    };
    launchImageLibrary(option, response => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        if (selectedImage) {
          setSelectImage(selectedImage);
        }
      }
    });
  };

  const handleDeleteImage = () => setSelectImage('');
  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };

  const handleAddTree = async () => {
    const treeNameInput = inputs.find(input => input.label === 'Tree name');
    const quanlityInput = inputs.find(input => input.label === 'Quanlity');
    if (!treeNameInput?.value || !quanlityInput?.value) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error: !input.value ? `Please enter ${input.label}` : '',
        })),
      );
      return;
    }
    try {
      const name = treeNameInput?.value;
      const quanlity = quanlityInput?.value;
      const image = selectImage;
      const timeAdd = new Date().getTime();

      // nếu image không có gì thì set imageUrl  rỗng, nếu có thì lưu vào storage và lấy url
      // 1. check image có tồn tại hay không
      // 2. nếu có thì lưu vào storage và lấy url
      // 3. nếu không thì set imageUrl rỗng
      let imageUrl = '';
      const userId = auth().currentUser?.uid;
      if (image) {
        const filename = userId + name;
        const storageRef = storage().ref(`imageTree/${filename}`);
        await storageRef.putFile(image);
        imageUrl = await storageRef.getDownloadURL();
      }
      firestore()
        .collection('trees')
        .doc(userId)
        .collection('tree')
        .add({
          name,
          quanlity,
          imageUrl,
          timeAdd,
        })
        .then(() => {
          setIsModalAddTree(() => false);
          setIsModalSuccess(() => true);
        });
    } catch (error: any) {
      console.log('error', error);
    }
    setSelectImage('');
    setInputs(
      inputs.map(input => ({
        ...input,
        value: '',
        error: '',
      })),
    );
  };
  interface Tree {
    name: string;
    quanlity: number;
    imageUrl: string;
  }

  const [trees, setTrees] = useState<Tree[]>([]);
  React.useEffect(() => {
    const subscriber = firestore()
      .collection('trees')
      .doc(auth().currentUser?.uid)
      .collection('tree')
      .orderBy('timeAdd', 'desc')
      .onSnapshot(querySnapshot => {
        const trees: any = [];
        querySnapshot.forEach(documentSnapshot => {
          trees.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setTrees(trees);
      });
    return () => subscriber();
  }, []);

  // lấy tên farm của user collection users, field farmName
  const [farmName, setFarmName] = useState('');
  React.useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .onSnapshot(documentSnapshot => {
        const farmName = documentSnapshot.data()?.farmName;
        setFarmName(farmName);
      });
    return () => subscriber();
  }, []);

  return (
    <>
      <HeaderComponent onPress={() => navigation.navigate('Profile')} />
      <WeatherComponent />
      <View style={styles1.container}>
        {/* Title */}
        <View style={styles1.headSession}>
          <View>
            <Text style={styles1.txtTitle}>{farmName} farm</Text>
          </View>
          <TouchableOpacity onPress={handleModal} style={{ marginRight: 8 }}>
            <IconAdd36 />
          </TouchableOpacity>
        </View>

        {trees.length > 0 ? (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                width: '90%',
                marginTop: 12,
              }}>
              {trees.map((tree, index) => (
                <RectangularTree
                  key={index}
                  nameTree={tree.name}
                  numberTree={tree.quanlity}
                  urlImage={tree.imageUrl}
                />
              ))}
            </ScrollView>
          </>
        ) : (
          <Text> không có cây</Text>
        )}
      </View>
      {/* <View style={styles1.root}>
        <View style={styles1.menu}>
          <ButtonMenu isPick={true} text="Your Farm" />
          <ButtonMenu isPick={false} text="Statistic" />
          <ButtonMenu isPick={false} text="Chat AI" />
        </View>
      </View> */}
      <ModalInsert isVisible={isModalAddTree}>
        <ModalInsert.Container>
          <ModalInsert.Header>
            <View style={styles.headSessionModal}>
              <TouchableOpacity onPress={handleModal}>
                <IconBack> </IconBack>
              </TouchableOpacity>
              <View style={styles.txtContainer}>
                <Text style={styles.txtTitleModal}>Add tree</Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </View>
          </ModalInsert.Header>
          <ScrollView>
            <ModalInsert.Body>
              <View style={styles.root}>
                {selectImage ? (
                  <Image
                    style={{ height: 80, width: 80, borderRadius: 12 }}
                    source={{
                      uri: selectImage,
                    }}
                  />
                ) : (
                  <Image
                    style={{ height: 80, width: 80, borderRadius: 12 }}
                    source={require('../../assets/images/AvatarSquare.png')}
                  />
                )}
                <View style={{ width: 8 }} />
                <TouchableOpacity
                  style={styles.hoverButtonFull}
                  onPress={handleModalImagePicker}>
                  <View style={styles.frame625074}>
                    <View style={styles.frame625079}>
                      <IconUpload />
                      <View style={{ width: 16 }} />
                      <Text style={styles.photo}>Photo</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={{ width: 8 }} />
                <TouchableOpacity onPress={handleDeleteImage}>
                  <IconDeleteRed />
                </TouchableOpacity>
              </View>
              <View style={styles.inputSession}>
                {inputs.map((input, index) => (
                  <View key={index}>
                    <Input
                      label={input.label}
                      placeholder={`Enter your ${input.label.toLowerCase()}`}
                      value={input.value}
                      onChangeText={(text: string) =>
                        handleInputChange(index, text)
                      }
                      error={input.error}
                      keyboardType={
                        input.label === 'Quanlity' ? 'numeric' : 'default'
                      }
                      span="*"
                    />
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={styles.btnSendSession}
                onPress={handleAddTree}>
                <View style={styles.txtBtnSignup}>
                  <IconSave />
                  <View style={{ width: 16 }} />
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                    }}>
                    SAVE
                  </Text>
                </View>
              </TouchableOpacity>
            </ModalInsert.Body>
          </ScrollView>
        </ModalInsert.Container>
      </ModalInsert>

      <Modal isVisible={isModalSuccess} onBackdropPress={handleModalSuccess}>
        <Modal.Container>
          <Modal.Header title="Successfully" />
          <Modal.Body title="You have successfully edited the tree." />
        </Modal.Container>
      </Modal>
    </>
  );
};

export default YourFarm;

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  root: {
    width: '100%',
    height: 72,
    flexShrink: 0,
    elevation: 8, // Áp dụng shadow cho Android
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8, // Độ cong của shadow
    backgroundColor: '#ffffff',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#ffffff',
  },

  frame48095: {
    width: '134rem',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '4rem',
  },
  textTime: {
    fontFamily: 'Nunito',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '500',
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#636366',
  },
  textLocation: {
    fontFamily: 'Nunito',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#163859',
  },
  textWeather: {
    fontFamily: 'Nunito',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#636366',
  },
  txtTitle: {
    fontFamily: 'Nunito',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#163859',
    marginLeft: 8,
  },
  headSession: {
    flexDirection: 'row',
    width: '90%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
