/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-const-assign */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  AppRegistry,
} from 'react-native';
import { launchImageLibrary, MediaType } from 'react-native-image-picker';
import HeaderComponent from '../../components/Header/Header.component';
import IconBack from '../../assets/images/IconBack.svg';
import IconAdd from '../../assets/images/IconAdd.svg';
import Input from '../../components/Input/Input.component';
import IconSave from '../../assets/images/IconSave.svg';
import IconDeleteRed from '../../assets/images/IconDeleteRed.svg';
import { ModalInsert } from '../../components/Modal/ModalInsert';
import { Modal } from '../../components/Modal/Modal';
import { ScrollView } from 'react-native-gesture-handler';
import IconUpload from '../../assets/images/IconUpload.svg';
import RectangularTree from '../../components/RectangularElement/Tree.component';
import IconComplete from '../../assets/images/IconComplete.svg';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import styles from './Addtree.style';
import RNRestart from 'react-native-restart';
import { useNavigation } from '@react-navigation/native';
import { MyTabs } from '../../navigation/navigation';

const Addtree = ({ navigation }: any) => {
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

  return (
    <>
      <HeaderComponent />
      <View style={styles.container}>
        {/* Title */}
        <View style={styles.headSession}>
          <TouchableOpacity onPress={() => navigation.navigate('Farmname')}>
            <IconBack />
          </TouchableOpacity>
          <View style={{ width: 8 }} />
          <View>
            <Text style={styles.txtTitle}>Add trees for Farm</Text>
          </View>
        </View>

        {trees.length > 0 ? (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                width: '90%',
                marginTop: 24,
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
            <View
              style={{
                backgroundColor: '#ffffff',
                height: 88,
                width: '100%',
                alignItems: 'center',
                paddingHorizontal: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={styles.btnSession}
                onPress={() => navigation.navigate('Tabs')}>
                <View style={styles.txtBtn}>
                  <IconComplete />
                  <View style={{ width: 16 }} />
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                    }}>
                    COMPLETE
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{ width: 16 }} />
              <TouchableOpacity onPress={handleModal}>
                <IconAdd />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity onPress={handleModal} style={styles.txtBtn}>
            <IconAdd />
          </TouchableOpacity>
        )}
      </View>

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

export default Addtree;
