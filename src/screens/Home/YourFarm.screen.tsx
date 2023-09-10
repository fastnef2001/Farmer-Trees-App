/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
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
import { ButtonBack, ButtonDelete } from '../../components/Button/Button';
import LottieView from 'lottie-react-native';
import { ModalLoading } from '../../components/Modal/ModalLoading';

const YourFarm = ({ navigation }: any) => {
  const [isModalAddTree, setIsModalAddTree] = React.useState(false);
  const [selectImage, setSelectImage] = useState('');
  const [isModalSuccess, setIsModalSuccess] = React.useState(false);
  const [isModalDelete, setIsModalDelete] = React.useState(false);
  const [key, setKey] = React.useState('');
  const [isTrees, setIsTrees] = useState(false);
  const [inputs, setInputs] = useState([
    { label: 'Tree name', value: '', error: '' },
    { label: 'Quanlity', value: '', error: '' },
  ]);

  // 1. Modal add tree
  const handleModalAddTree = () => {
    setIsModalAddTree(() => !isModalAddTree);
  };
  // 2. Modal pick image and delete image
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
  // 3. Handle validate input
  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };
  // 4. Handle add tree
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
  // 5. Modal success
  const handleModalSuccess = () => {
    setIsModalSuccess(() => !isModalSuccess);
  };

  // 6. Modal delete
  const handleModalDelete = (key: string) => {
    setKey(key);
    setIsModalDelete(() => !isModalDelete);
  };

  // 7. Handle delete tree
  const handleDeleteTree = (key: string) => {
    firestore()
      .collection('trees')
      .doc(auth().currentUser?.uid)
      .collection('tree')
      .doc(key)
      .delete();
    setIsModalDelete(() => false);
  };

  interface Tree {
    [x: string]: string;
    name: string;
    quanlity: string;
    imageUrl: string;
  }

  // 8. Get all tree
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
          console.log('treeProperties', trees);
        });
        setTrees(trees);
        console.log('trees', trees);
      });
    return () => subscriber();
  }, []);

  // 9. Get farm name
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

  // 10. Modal edit tree
  const [isModalEditTree, setIsModalEditTree] = React.useState(false);
  const handleModalEditTree = (key: any) => {
    setSelectImage('');
    setInputs(
      inputs.map(input => ({
        ...input,
        value: '',
        error: '',
      })),
    );

    const tree = trees.find(tree => tree.key === (key as any));
    if (tree) {
      setSelectImage(tree.imageUrl);
      setInputs([
        { label: 'Tree name', value: tree.name, error: '' },
        { label: 'Quanlity', value: tree.quanlity, error: '' },
      ]);
      setKey(key);
    }
    setIsModalEditTree(() => !isModalEditTree);
  };

  // 11. Handle edit tree
  const handleEditTree = async () => {
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
    handleModalLoading();
    try {
      const name = treeNameInput?.value;
      const quanlity = quanlityInput?.value;
      const image = selectImage;
      let imageUrl = '';
      const userId = auth().currentUser?.uid;
      console.log('userId', image);
      // if image là url với http thì không cần thay đổi ảnh
      if (image && image.includes('http')) {
        imageUrl = image;
      } else if (image) {
        // xóa ảnh cũ trong storage
        const tree = trees.find(tree => tree.key === (key as any));
        if (tree) {
          const filename = auth().currentUser?.uid + tree.name;
          const storageRef = storage().ref(`imageTree/${filename}`);
          storageRef.delete();
        }

        const filename = userId + name;
        const storageRef = storage().ref(`imageTree/${filename}`);
        await storageRef.putFile(image);
        imageUrl = await storageRef.getDownloadURL();
      }

      firestore()
        .collection('trees')
        .doc(userId)
        .collection('tree')
        .doc(key)
        .update({
          name,
          quanlity,
          imageUrl,
        })
        .then(() => {
          setIsModalEditTree(() => false);
          handleModalLoading();
          setIsModalSuccess(() => true);
        });

      setSelectImage('');
      setInputs(
        inputs.map(input => ({
          ...input,
          value: '',
          error: '',
        })),
      );
    } catch (error: any) {
      console.log('error', error);
    }
  };

  // 12. Modal loading
  const [isModalLoading, setIsModalLoading] = React.useState(false);
  const handleModalLoading = () => {
    setIsModalLoading(prev => !prev);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <HeaderComponent onPress={() => navigation.navigate('Profile')} />
      <WeatherComponent />
      <View style={styles1.container}>
        {/* Title */}
        <View style={styles1.headSession}>
          <View>
            <Text style={styles1.txtTitle}>Wellcome {farmName} </Text>
          </View>
          <TouchableOpacity
            onPress={handleModalAddTree}
            style={{ marginRight: 8 }}>
            <IconAdd36 />
          </TouchableOpacity>
        </View>

        {trees.length > 0 ? (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                width: '95%',
                marginTop: 12,
              }}>
              {trees.map((tree, index) => (
                <RectangularTree
                  key={index}
                  nameTree={tree.name}
                  numberTree={tree.quanlity}
                  urlImage={tree.imageUrl}
                  onPressDelete={() => handleModalDelete(tree.key)}
                  caculate={true}
                  onPressEdit={() => handleModalEditTree(tree.key)}
                />
              ))}
            </ScrollView>
          </>
        ) : (
          <View
            style={{
              height: '100%',
              justifyContent: 'center',
              paddingBottom: '40%',
            }}>
            <LottieView
              style={{ width: 200, height: 200 }}
              source={require('../../assets/animations/Empty.json')}
              autoPlay
              loop
            />
            <Text style={styles.txtTitleModal}> Empty Tree</Text>
          </View>
        )}
      </View>

      <ModalInsert isVisible={isModalAddTree}>
        <StatusBar backgroundColor={'#07111B'} />
        <View style={{ flex: 1 }}>
          <ModalInsert.Container>
            <ModalInsert.Header>
              <View style={styles.headSessionModal}>
                <TouchableOpacity onPress={handleModalAddTree}>
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
                        textPlaceholder={`Enter your ${input.label.toLowerCase()}`}
                        value={input.value}
                        onChangeText={(text: string) =>
                          handleInputChange(index, text)
                        }
                        textError={input.error}
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
        </View>
      </ModalInsert>

      <Modal
        isVisible={isModalSuccess}
        onBackdropPress={() => setIsModalSuccess(false)}>
        <StatusBar backgroundColor={'#07111B'} />
        <Modal.Container>
          <Modal.Header title="Successfully" />
          <Modal.Body title="You have successfully edited the tree." />
        </Modal.Container>
      </Modal>

      <Modal isVisible={isModalDelete}>
        <StatusBar backgroundColor={'#07111B'} />
        <Modal.Container>
          <Modal.Header title="Successfully" />
          <Modal.Body title="You have successfully registered, please login." />
          <Modal.Footer>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 8,
              }}>
              <ButtonBack
                isRight={false}
                isDelete={false}
                title="CANCEL"
                onPress={handleModalAddTree}
              />
              <View style={{ width: 16 }} />
              <ButtonDelete
                isRight={true}
                isDelete={true}
                title="LOGIN"
                onPress={() => handleDeleteTree(key)}
              />
            </View>
          </Modal.Footer>
        </Modal.Container>
      </Modal>

      <ModalInsert isVisible={isModalEditTree}>
        <StatusBar backgroundColor={'#07111B'} />
        <ModalInsert.Container>
          <ModalInsert.Header>
            <View style={styles.headSessionModal}>
              <TouchableOpacity onPress={handleModalEditTree}>
                <IconBack />
              </TouchableOpacity>
              <View style={styles.txtContainer}>
                <Text style={styles.txtTitleModal}>Edit tree</Text>
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
                      textPlaceholder={`Enter your ${input.label.toLowerCase()}`}
                      value={input.value}
                      onChangeText={(text: string) =>
                        handleInputChange(index, text)
                      }
                      textError={input.error}
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
                onPress={handleEditTree}>
                <View style={styles.txtBtnSignup}>
                  <IconSave />
                  <View style={{ width: 16 }} />
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      color: '#FFFFFF',
                      fontFamily: 'Nunito-Bold',
                    }}>
                    SAVE
                  </Text>
                </View>
              </TouchableOpacity>
            </ModalInsert.Body>
          </ScrollView>
        </ModalInsert.Container>
      </ModalInsert>

      <ModalLoading isVisible={isModalLoading}>
        <StatusBar backgroundColor={'#010508'} />
        <SafeAreaView>
          <ModalLoading.Container />
        </SafeAreaView>
      </ModalLoading>
    </SafeAreaView>
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
    fontSize: 20,
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#163859',
    marginLeft: 8,
    fontFamily: 'Nunito-SemiBold',
  },
  headSession: {
    flexDirection: 'row',
    width: '90%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
