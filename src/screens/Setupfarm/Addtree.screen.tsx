/* eslint-disable react-hooks/rules-of-hooks */
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
import { ButtonBack, ButtonDelete } from '../../components/Button/Button';
import LottieView from 'lottie-react-native';

const Addtree = ({ navigation }: any) => {
  const [isModalAddTree, setIsModalAddTree] = React.useState(false);
  const [isModalSuccess, setIsModalSuccess] = React.useState(false);
  const [isModalDelete, setIsModalDelete] = React.useState(false);
  const [selectImage, setSelectImage] = useState('');
  const [key, setKey] = React.useState('');
  const [inputs, setInputs] = useState([
    { label: 'Tree name', value: '', error: '' },
    { label: 'Quanlity', value: '', error: '' },
  ]);
  const [trees, setTrees] = useState<Tree[]>([]);

  // Add tree
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
  // 3. Add tree
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
      console.log('image', image);
      const timeAdd = new Date().getTime();
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

  const handleModalSuccess = () => {
    setIsModalSuccess(() => !isModalSuccess);
  };

  //Get all tree
  interface Tree {
    key(key: any): void;
    name: string;
    quanlity: string;
    imageUrl: string;
  }

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

  // Delete tree
  const handleModalDelete = (key: any) => {
    setKey(key);
    setIsModalDelete(() => !isModalDelete);
  };

  const handleDeleteTree = (key: string) => {
    // xoas ảnh trong storage
    const tree = trees.find(tree => tree.key === (key as any));
    if (tree) {
      const filename = auth().currentUser?.uid + tree.name;
      const storageRef = storage().ref(`imageTree/${filename}`);
      storageRef.delete();
    }
    firestore()
      .collection('trees')
      .doc(auth().currentUser?.uid)
      .collection('tree')
      .doc(key)
      .delete();
    setIsModalDelete(() => false);
  };

  // Edit tree
  // 1. Modal edit tree
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

    try {
      const name = treeNameInput?.value;
      const quanlity = quanlityInput?.value;
      const image = selectImage;
      const timeAdd = new Date().getTime();
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
                width: '95%',
                marginTop: 24,
              }}>
              {trees.map((tree, index) => (
                <RectangularTree
                  key={index}
                  nameTree={tree.name}
                  numberTree={tree.quanlity}
                  urlImage={tree.imageUrl}
                  onPressDelete={() => handleModalDelete(tree.key)}
                  onPressEdit={() => handleModalEditTree(tree.key)}
                  caculate={false}
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
                      fontFamily: 'Nunito-Bold',
                    }}>
                    COMPLETE
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{ width: 16 }} />
              <TouchableOpacity onPress={handleModalAddTree}>
                <IconAdd />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity onPress={handleModalAddTree} style={styles.txtBtn}>
            <LottieView
              style={{ width: 68, height: 68 }}
              source={require('../../assets/animations/ButtonAddGif.json')}
              autoPlay
              loop
            />
          </TouchableOpacity>
        )}
      </View>

      <ModalInsert isVisible={isModalAddTree}>
        <ModalInsert.Container>
          <ModalInsert.Header>
            <View style={styles.headSessionModal}>
              <TouchableOpacity onPress={handleModalAddTree}>
                <IconBack />
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

      <ModalInsert isVisible={isModalEditTree}>
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

      <Modal
        isVisible={isModalSuccess}
        onBackdropPress={() => setIsModalSuccess(false)}>
        <Modal.Container>
          <Modal.Header title="Successfully" />
          <Modal.Body title="You have successfully edited the tree." />
        </Modal.Container>
      </Modal>

      <Modal isVisible={isModalDelete}>
        <Modal.Container>
          <Modal.Header title="Delete" />
          <Modal.Body title="Do you want to delete this tree?" />
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
                onPress={() => setIsModalDelete(false)}
              />
              <View style={{ width: 16 }} />
              <ButtonDelete
                isRight={true}
                isDelete={true}
                title="DELETE"
                onPress={() => handleDeleteTree(key)}
              />
            </View>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    </>
  );
};

export default Addtree;
