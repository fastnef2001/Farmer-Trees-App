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
import { HeaderComponent } from '../../components/Header/Header.component';
import { ButtonMenu } from '../../components/Button/ButtonMenu';
import WeatherComponent from '../../components/Weather/Weather.component';
import firestore from '@react-native-firebase/firestore';
import RectangularTree from '../../components/RectangularElement/Tree.component';
import IconAdd from '../../assets/images/IconAdd.svg';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import styles from '../Setupfarm/Addtree.style';
import { styles1 } from './YourFarm.style';
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
import { UseLogic } from './UseLogic';

const YourFarm = ({ navigation }: any) => {
  const {
    isModalAddTree,
    handleModalAddTree,
    handleModalImagePicker,
    handleDeleteImage,
    selectImage,
    inputs,
    handleInputChange,
    handleAddTree,
    isModalSuccess,
    handleModalSuccess,
    isModalDelete,
    handleModalDelete,
    handleDeleteTree,
    trees,
    farmName,
    isModalEditTree,
    handleModalEditTree,
    handleEditTree,
    isModalLoading,
    handleModalLoading,
    setIsModalSuccess,
    setIsModalDelete,
    key,
  } = UseLogic();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <HeaderComponent onPress={() => navigation.navigate('Profile')} />
      <WeatherComponent />
      <View style={styles1.container}>
        {/* Title */}
        <View style={styles1.headSession}>
          <View>
            <Text style={styles1.txtTitle}>Welcome {farmName} </Text>
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

      <ModalInsert isVisible={isModalAddTree} isPick={false}>
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
                onPress={() => setIsModalDelete(false)}
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

      <ModalInsert isVisible={isModalEditTree} isPick={false}>
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
