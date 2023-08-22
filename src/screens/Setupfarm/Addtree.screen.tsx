/* eslint-disable no-const-assign */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
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

// import { Button } from '../../components/Button/Button';
// const Addtree = ({ navigation }: any) => {
//   const [isModalVisible, setIsModalVisible] = React.useState(false);
//   const [selectImage, setSelectImage] = useState('');

//   const [issModalVisible, settIsModalVisible] = React.useState(false);

//   const handleModalSuccess = () => {
//     settIsModalVisible(() => !issModalVisible);
//     setIsModalVisible(() => false);
//   };

//   const handleModal = () => setIsModalVisible(() => !isModalVisible);
//   const handleModalImagePicker = () => {
//     const option = {
//       storageOptions: {
//         path: 'image',
//       },
//     };
//     launchImageLibrary(option, response => {
//       if (response.assets && response.assets.length > 0) {
//         setSelectImage(response.assets[0].uri);
//       }
//     });
//   };

//   const handleDeleteImage = () => setSelectImage(() => !selectImage);

//   return (
//     <>
//       <HeaderComponent />
//       <View style={styles.container}>
//         {/* Title */}
//         <View style={styles.headSession}>
//           <TouchableOpacity onPress={() => navigation.navigate('Farmname')}>
//             <IconBack />
//           </TouchableOpacity>
//           <View style={{ width: 8 }} />
//           <View>
//             <Text style={styles.txtTitle}>Add trees for Farm</Text>
//           </View>
//         </View>
//         <TouchableOpacity onPress={handleModal} style={styles.buttonAdd}>
//           <IconAdd />
//         </TouchableOpacity>
//       </View>

//       <ModalInsert isVisible={isModalVisible}>
//         <ModalInsert.Container>
//           <ModalInsert.Header>
//             <View style={styles.headSessionModal}>
//               <TouchableOpacity onPress={handleModal}>
//                 <IconBack> </IconBack>
//               </TouchableOpacity>
//               <View style={styles.txtContainer}>
//                 <Text style={styles.txtTitleModal}>Add tree</Text>
//               </View>
//               <View
//                 style={{
//                   width: 40,
//                   height: 40,
//                 }}
//               />
//             </View>
//           </ModalInsert.Header>
//           <ScrollView>
//             <ModalInsert.Body>
//               <View style={styles.root}>
//                 {selectImage ? (
//                   <Image
//                     style={{ height: 80, width: 80, borderRadius: 12 }}
//                     source={{
//                       uri: selectImage,
//                     }}
//                   />
//                 ) : (
//                   <Image
//                     style={{ height: 80, width: 80, borderRadius: 12 }}
//                     source={require('../../assets/images/AvatarSquare.png')}
//                   />
//                 )}
//                 <View style={{ width: 8 }} />
//                 <TouchableOpacity
//                   style={styles.hoverButtonFull}
//                   onPress={handleModalImagePicker}>
//                   <View style={styles.frame625074}>
//                     <View style={styles.frame625079}>
//                       <IconUpload />
//                       <View style={{ width: 16 }} />
//                       <Text style={styles.photo}>Photo</Text>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//                 <View style={{ width: 8 }} />
//                 <TouchableOpacity onPress={handleDeleteImage}>
//                   <IconDeleteRed />
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.inputSession}>
//                 <Input
//                   label="Tree name"
//                   span="*"
//                   placeholder="Enter tree name"
//                   // onChangeText={nameInput => setName(nameInput)}
//                   // error={errorName}
//                 />
//                 <View style={{ height: 8 }} />
//                 <Input
//                   label="Quantity"
//                   span="*"
//                   placeholder="Enter quantity"
//                   keyboardType="numeric"
//                   // onChangeText={nameInput => setName(nameInput)}
//                   // error={errorName}
//                 />
//               </View>
//               <TouchableOpacity
//                 style={styles.btnSendSession}
//                 onPress={handleModalSuccess}>
//                 <View style={styles.txtBtnSignup}>
//                   <IconSave />
//                   <View style={{ width: 16 }} />
//                   <Text
//                     style={{
//                       fontSize: 16,
//                       textAlign: 'center',
//                       color: '#FFFFFF',
//                       fontWeight: 'bold',
//                     }}>
//                     SAVE
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </ModalInsert.Body>
//           </ScrollView>
//         </ModalInsert.Container>
//       </ModalInsert>

//       <Modal isVisible={issModalVisible} onBackdropPress={handleModalSuccess}>
//         <Modal.Container>
//           <Modal.Header title="Successfully" />
//           <Modal.Body title="You have successfully edited the tree." />
//         </Modal.Container>
//       </Modal>
//     </>
//   );
// };

const Addtree = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectImage, setSelectImage] = useState('');

  const [issModalVisible, settIsModalVisible] = React.useState(false);

  const handleModalSuccess = () => {
    settIsModalVisible(() => !issModalVisible);
    setIsModalVisible(() => false);
  };

  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const handleModalImagePicker = () => {
    const option = {
      storageOptions: {
        path: 'image',
      },
    };
    launchImageLibrary(option, response => {
      if (response.assets && response.assets.length > 0) {
        setSelectImage(response.assets[0].uri);
      }
    });
  };

  const handleDeleteImage = () => setSelectImage(() => !selectImage);

  const treeData = [
    { name: 'Coffee', number: '200' },
    { name: 'Apple', number: '150' },
    { name: 'Orange', number: '300' },
    { name: 'Durian', number: '400' },
    { name: 'Mango', number: '500' },
    { name: 'Banana', number: '600' },
    { name: 'Peach', number: '700' },
    { name: 'Pineapple', number: '800' },
    { name: 'Grape', number: '900' },
    { name: 'Grape', number: '900' },
    // Thêm các dữ liệu cây khác tại đây
  ];

  // return (
  //   <>
  //     <HeaderComponent />
  //     <View style={styles.container}>
  //       {/* Title */}
  //       <View style={styles.headSession}>
  //         <TouchableOpacity onPress={() => navigation.navigate('Farmname')}>
  //           <IconBack />
  //         </TouchableOpacity>
  //         <View style={{ width: 8 }} />
  //         <View>
  //           <Text style={styles.txtTitle}>Add trees for Farm</Text>
  //         </View>
  //       </View>
  //       <TouchableOpacity onPress={handleModal} style={styles.buttonAdd}>
  //         <IconAdd />
  //       </TouchableOpacity>
  //     </View>

  //     <ModalInsert isVisible={isModalVisible}>
  //       <ModalInsert.Container>
  //         <ModalInsert.Header>
  //           <View style={styles.headSessionModal}>
  //             <TouchableOpacity onPress={handleModal}>
  //               <IconBack> </IconBack>
  //             </TouchableOpacity>
  //             <View style={styles.txtContainer}>
  //               <Text style={styles.txtTitleModal}>Add tree</Text>
  //             </View>
  //             <View
  //               style={{
  //                 width: 40,
  //                 height: 40,
  //               }}
  //             />
  //           </View>
  //         </ModalInsert.Header>
  //         <ScrollView>
  //           <ModalInsert.Body>
  //             <View style={styles.root}>
  //               {selectImage ? (
  //                 <Image
  //                   style={{ height: 80, width: 80, borderRadius: 12 }}
  //                   source={{
  //                     uri: selectImage,
  //                   }}
  //                 />
  //               ) : (
  //                 <Image
  //                   style={{ height: 80, width: 80, borderRadius: 12 }}
  //                   source={require('../../assets/images/AvatarSquare.png')}
  //                 />
  //               )}
  //               <View style={{ width: 8 }} />
  //               <TouchableOpacity
  //                 style={styles.hoverButtonFull}
  //                 onPress={handleModalImagePicker}>
  //                 <View style={styles.frame625074}>
  //                   <View style={styles.frame625079}>
  //                     <IconUpload />
  //                     <View style={{ width: 16 }} />
  //                     <Text style={styles.photo}>Photo</Text>
  //                   </View>
  //                 </View>
  //               </TouchableOpacity>
  //               <View style={{ width: 8 }} />
  //               <TouchableOpacity onPress={handleDeleteImage}>
  //                 <IconDeleteRed />
  //               </TouchableOpacity>
  //             </View>
  //             <View style={styles.inputSession}>
  //               <Input
  //                 label="Tree name"
  //                 span="*"
  //                 placeholder="Enter tree name"
  //                 // onChangeText={nameInput => setName(nameInput)}
  //                 // error={errorName}
  //               />
  //               <View style={{ height: 8 }} />
  //               <Input
  //                 label="Quantity"
  //                 span="*"
  //                 placeholder="Enter quantity"
  //                 keyboardType="numeric"
  //                 // onChangeText={nameInput => setName(nameInput)}
  //                 // error={errorName}
  //               />
  //             </View>
  //             <TouchableOpacity
  //               style={styles.btnSendSession}
  //               onPress={handleModalSuccess}>
  //               <View style={styles.txtBtnSignup}>
  //                 <IconSave />
  //                 <View style={{ width: 16 }} />
  //                 <Text
  //                   style={{
  //                     fontSize: 16,
  //                     textAlign: 'center',
  //                     color: '#FFFFFF',
  //                     fontWeight: 'bold',
  //                   }}>
  //                   SAVE
  //                 </Text>
  //               </View>
  //             </TouchableOpacity>
  //           </ModalInsert.Body>
  //         </ScrollView>
  //       </ModalInsert.Container>
  //     </ModalInsert>

  //     <Modal isVisible={issModalVisible} onBackdropPress={handleModalSuccess}>
  //       <Modal.Container>
  //         <Modal.Header title="Successfully" />
  //         <Modal.Body title="You have successfully edited the tree." />
  //       </Modal.Container>
  //     </Modal>
  //   </>
  // );

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

        {/* Element tree */}
        <ScrollView
          showsVerticalScrollIndicator={false} // Tắt thanh cuộn dọc
          style={{
            width: '90%',
            marginTop: 24,
          }}>
          {treeData.map((tree, index) => (
            <RectangularTree
              key={index}
              nameTree={tree.name}
              numberTree={tree.number}
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
            onPress={() => navigation.navigate('AddTree')}>
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
      </View>

      <ModalInsert isVisible={isModalVisible}>
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
                <Input
                  label="Tree name"
                  span="*"
                  placeholder="Enter tree name"
                  // onChangeText={nameInput => setName(nameInput)}
                  // error={errorName}
                />
                <View style={{ height: 8 }} />
                <Input
                  label="Quantity"
                  span="*"
                  placeholder="Enter quantity"
                  keyboardType="numeric"
                  // onChangeText={nameInput => setName(nameInput)}
                  // error={errorName}
                />
              </View>
              <TouchableOpacity
                style={styles.btnSendSession}
                onPress={handleModalSuccess}>
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

      <Modal isVisible={issModalVisible} onBackdropPress={handleModalSuccess}>
        <Modal.Container>
          <Modal.Header title="Successfully" />
          <Modal.Body title="You have successfully edited the tree." />
        </Modal.Container>
      </Modal>
    </>
  );
};

export default Addtree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  headSession: {
    flexDirection: 'row',
    width: '90%',
    height: 40,
    alignItems: 'center',
  },
  headSessionModal: {
    flexDirection: 'row',
    width: '100%',
    maxHeight: '100%',
    paddingRight: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
  },

  txtTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#163859',
    lineHeight: 28,
    textAlign: 'center',
  },

  txtContainer: {
    height: 40,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtTitleModal: {
    fontFamily: 'Nunito',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#163859',
  },
  inputSession: {
    padding: 16,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
    borderRadius: 15,
    shadowColor: '#000',
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: -2, height: 4 },
    backgroundColor: '#fff',
  },
  btnSendSession: {
    marginTop: 16,
    height: 48,
    backgroundColor: '#163859',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 32,
  },
  txtBtnSignup: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  group8183: {
    width: 80,
    height: 80,
  },
  photo: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Nunito',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  hoverButtonFull: {
    width: 143,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  frame625074: {
    width: 143,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    backgroundColor: '#163859',
    flexDirection: 'row',
    borderRadius: 12,
  },
  frame625079: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnSession: {
    height: 48,
    backgroundColor: '#163859',
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
  },
  txtBtn: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
