import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
//ICON
import IconBack from '../../assets/images/IconBack.svg';
import IconAdd from '../../assets/images/IconAdd.svg';
import Input from '../../components/Input/Input.component';
import IconSave from '../../assets/images/IconSave.svg';
import IconDeleteRed from '../../assets/images/IconDeleteRed.svg';
import IconUpload from '../../assets/images/IconUpload.svg';
import IconComplete from '../../assets/images/IconComplete.svg';
//COMPONENT
import { ModalInsert } from '../../components/Modal/ModalInsert';
import { HeaderComponent } from '../../components/Header/Header.component';
import RectangularTree from '../../components/RectangularElement/Tree.component';
//STYLE
import { styleAddtree } from './Style';
import {
  PopUpSuccess,
  PopUpLoading,
} from '../../components/Modal/GeneralPopUps.component';
//USELOGIC
import { UseLogicAddtree } from './UseLogic';

const Addtree = ({ navigation }: any) => {
  const {
    handleModalAddTree,
    handleModalEditTree,
    handleModalImagePicker,
    setSelectImage,
    handleInputChange,
    handleAddTree,
    handleEditTree,
    handleModalDelete,
    trees,
    isModalAddTree,
    isModalEditTree,
    isModalSuccess,
    isModalLoading,
    selectImage,
    inputs,
    titlePopupNoti,
    contentPopupNoti,
    setIsModalSuccess,
    handleFunction,
    titleModalSuccess,
  } = UseLogicAddtree();

  return (
    <>
      <HeaderComponent />
      <View style={styleAddtree.container}>
        {/* Title */}
        <View style={styleAddtree.headSession}>
          <TouchableOpacity onPress={() => navigation.navigate('Farmname')}>
            <IconBack />
          </TouchableOpacity>
          <View style={{ width: 8 }} />
          <View>
            <Text style={styleAddtree.txtTitle}>Add trees for Farm</Text>
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
                  onPressCalculate={() => {}}
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
                style={styleAddtree.btnSession}
                onPress={() => navigation.navigate('Tabs')}>
                <View style={styleAddtree.txtBtn}>
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
          <TouchableOpacity
            onPress={handleModalAddTree}
            style={styleAddtree.txtBtn}>
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
        <StatusBar backgroundColor={'#07111B'} />
        <ModalInsert.Container>
          <ModalInsert.Header>
            <View style={styleAddtree.headSessionModal}>
              <TouchableOpacity onPress={handleModalAddTree}>
                <IconBack />
              </TouchableOpacity>
              <View style={styleAddtree.txtContainer}>
                <Text style={styleAddtree.txtTitleModal}>Add tree</Text>
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
              <View style={styleAddtree.root}>
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
                  style={styleAddtree.hoverButtonFull}
                  onPress={handleModalImagePicker}>
                  <View style={styleAddtree.frame625074}>
                    <View style={styleAddtree.frame625079}>
                      <IconUpload />
                      <View style={{ width: 16 }} />
                      <Text style={styleAddtree.photo}>Photo</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={{ width: 8 }} />
                <TouchableOpacity
                  onPress={() => {
                    setSelectImage('');
                  }}>
                  <IconDeleteRed />
                </TouchableOpacity>
              </View>
              <View style={styleAddtree.inputSession}>
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
                style={styleAddtree.btnSendSession}
                onPress={handleAddTree}>
                <View style={styleAddtree.txtBtnSignup}>
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
        <StatusBar backgroundColor={'#07111B'} />
        <ModalInsert.Container>
          <ModalInsert.Header>
            <View style={styleAddtree.headSessionModal}>
              <TouchableOpacity onPress={handleModalEditTree}>
                <IconBack />
              </TouchableOpacity>
              <View style={styleAddtree.txtContainer}>
                <Text style={styleAddtree.txtTitleModal}>Edit tree</Text>
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
              <View style={styleAddtree.root}>
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
                  style={styleAddtree.hoverButtonFull}
                  onPress={handleModalImagePicker}>
                  <View style={styleAddtree.frame625074}>
                    <View style={styleAddtree.frame625079}>
                      <IconUpload />
                      <View style={{ width: 16 }} />
                      <Text style={styleAddtree.photo}>Photo</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={{ width: 8 }} />
                <TouchableOpacity
                  onPress={() => {
                    setSelectImage('');
                  }}>
                  <IconDeleteRed />
                </TouchableOpacity>
              </View>
              <View style={styleAddtree.inputSession}>
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
                style={styleAddtree.btnSendSession}
                onPress={handleEditTree}>
                <View style={styleAddtree.txtBtnSignup}>
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

      <PopUpSuccess
        isModalSuccess={isModalSuccess}
        titleHeader={titlePopupNoti}
        titleBody={contentPopupNoti}
        handleModalSuccess={() => setIsModalSuccess(!isModalSuccess)}
        handleFunction={handleFunction}
        title={titleModalSuccess}
      />
      <PopUpLoading isModalVisible={isModalLoading} />
    </>
  );
};

export default Addtree;
