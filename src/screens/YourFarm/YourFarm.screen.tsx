import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
//Component
import RectangularTree from '../../components/RectangularElement/Tree.component';
import WeatherComponent from '../../components/Weather/Weather.component';
import { HeaderComponent } from '../../components/Header/Header.component';
import { ModalInsert } from '../../components/Modal/ModalInsert';
import Input from '../../components/Input/Input.component';
import {
  PopUpSuccess,
  PopUpLoading,
} from '../../components/Modal/GeneralPopUps.component';
import { ModalPick } from '../../components/Modal/ModalPick';

// Icon
import IconBack from '../../assets/images/IconBack.svg';
import IconSave from '../../assets/images/IconSave.svg';
import IconDeleteRed from '../../assets/images/IconDeleteRed.svg';
import IconUpload from '../../assets/images/IconUpload.svg';
import IconAdd36 from '../../assets/images/IconAdd36.svg';
import Iconcalculatesmallwhite from '../../assets/images/Iconcalculatesmallwhite.svg';

//Style
import styles from '../Setupfarm/Addtree.style';
import { stylesTitle, stylesScrollView, stylesResult } from './YourFarm.style';
import { UseLogic } from './UseLogic';
import { HandleAdd } from '../Statistics/HandleAdd';

const YourFarm = ({ navigation }: any) => {
  const {
    isModalAddTree,
    isModalLoading,
    isModalEditTree,
    isModalSuccess,
    isModalCalculate,
    isModalPick,
    handleModalAddTree,
    handleModalImagePicker,
    handleModalDelete,
    handleModalEditTree,
    handleModalSuccess,
    handleModalCalculate,
    handleModalPickUnitExpense,
    handleAddTree,
    handleEditTree,
    handleDeleteTree,
    handleCalculate,
    handleDeleteImage,
    selectImage,
    inputs,
    handleInputChange,
    farmName,
    key,
    titleHeader,
    titleBody,
    isFooter,
    valuePick,
    titlePick,
    resultTotalQuantity,
    resultTotalPrice,
    trees,
  } = UseLogic();

  const {
    setIsModalPick,
    setTitlePick,
    setValuePick,
    unitsIncome,
    costTypes,
    unitsExpense,
  } = HandleAdd();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <HeaderComponent onPress={() => navigation.navigate('Profile')} />
      <WeatherComponent />
      <View style={stylesTitle.container}>
        {/* Title */}
        <View style={stylesTitle.headSession}>
          <View>
            <Text style={stylesTitle.txtTitle}>Welcome {farmName} </Text>
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
              style={stylesScrollView.container}>
              {trees.map((tree, index) => (
                <RectangularTree
                  key={index}
                  nameTree={tree.name}
                  numberTree={tree.quanlity}
                  urlImage={tree.imageUrl}
                  onPressDelete={() => handleModalDelete(tree.key)}
                  caculate={true}
                  onPressEdit={() => handleModalEditTree(tree.key)}
                  onPressCalculate={() => handleModalCalculate(tree.key)}
                />
              ))}
            </ScrollView>
          </>
        ) : (
          <View style={stylesScrollView.emptyItem}>
            <LottieView
              style={{ width: 200, height: 200 }}
              source={require('../../assets/animations/Empty.json')}
              autoPlay
              loop
            />
            <Text style={styles.txtTitleModal}>No trees</Text>
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

      <ModalInsert isVisible={isModalCalculate} isPick={false}>
        <StatusBar backgroundColor={'#07111B'} />
        <ModalInsert.Container>
          <ModalInsert.Header>
            <View style={styles.headSessionModal}>
              <TouchableOpacity onPress={handleModalCalculate}>
                <IconBack />
              </TouchableOpacity>
              <View style={styles.txtContainer}>
                <Text style={styles.txtTitleModal}>Calculate</Text>
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
              <View style={styles.inputSession}>
                {inputs.map((input, index) => (
                  <View key={index}>
                    <Input
                      onPress={
                        input.label === 'Unit'
                          ? () => handleModalPickUnitExpense()
                          : () => {}
                      }
                      label={input.label}
                      textPlaceholder={
                        input.label === 'Quantity to buy for each tree'
                          ? 'Ex: 10'
                          : input.label === 'Unit'
                          ? 'Choose unit'
                          : 'Ex: 10$'
                      }
                      value={input.value}
                      onChangeText={(text: string) =>
                        handleInputChange(index, text)
                      }
                      textError={input.error}
                      keyboardType="numeric"
                      span="*"
                      dropDown={input.label === 'Unit'}
                      editable={input.label === 'Unit' ? false : true}
                      iconDolar={input.label === 'Purchase price per unit'}
                    />
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={styles.btnSendSession}
                onPress={handleCalculate}>
                <View style={styles.txtBtnSignup}>
                  <Iconcalculatesmallwhite />
                  <View style={{ width: 16 }} />
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      color: '#FFFFFF',
                      fontFamily: 'Nunito-Bold',
                    }}>
                    CALCULATE
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={stylesResult.result}>
                <View style={stylesResult.itemFlexBox}>
                  <Text style={[stylesResult.title, stylesResult.unitTypo]}>
                    {'Total quantity : '}
                  </Text>
                  <View style={stylesResult.valueParent}>
                    <Text style={stylesResult.unitTypo}>
                      <Text style={stylesResult.text}>
                        {resultTotalQuantity}
                      </Text>
                    </Text>
                    <Text style={[stylesResult.unit, stylesResult.unitTypo]}>
                      <Text style={stylesResult.kg}>{valuePick}</Text>
                    </Text>
                  </View>
                </View>
                <View style={[stylesResult.item1, stylesResult.itemFlexBox]}>
                  <Text style={[stylesResult.title, stylesResult.unitTypo]}>
                    {'Total price : '}
                  </Text>
                  <View style={stylesResult.valueParent}>
                    <Text style={stylesResult.unitTypo}>
                      <Text style={stylesResult.text}>{resultTotalPrice}</Text>
                    </Text>
                    <Text style={[stylesResult.unit, stylesResult.unitTypo]}>
                      <Text style={stylesResult.kg}> $</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </ModalInsert.Body>
          </ScrollView>
        </ModalInsert.Container>
      </ModalInsert>

      <ModalPick
        isModalPick={isModalPick}
        setIsModalPick={setIsModalPick}
        titlePick={titlePick}
        setTitlePick={setTitlePick}
        valuePick={valuePick}
        setValuePick={setValuePick}
        trees={trees}
        unitsIncome={unitsIncome}
        costTypes={costTypes}
        unitsExpense={unitsExpense}
        handleModalPickHide={handleModalPickUnitExpense}
      />

      <PopUpSuccess
        isModalSuccess={isModalSuccess}
        titleHeader={titleHeader}
        titleBody={titleBody}
        handleDeleteTree={() => handleDeleteTree(key)}
        isFooter={isFooter}
        handleModalSuccess={handleModalSuccess}
      />

      <PopUpLoading isModalSuccess={isModalLoading} />
    </SafeAreaView>
  );
};

export default YourFarm;
