import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HeaderComponent } from '../../components/Header/Header.component';
import IconBack from '../../assets/images/IconBack.svg';
import Input from '../../components/Input/Input.component';
import IconContinue from '../../assets/images/IconContinue.svg';
import { Database } from '../../database/database';
import { stylesFarmname } from './Style';

const Farmname = ({ navigation }: any) => {
  const { createFarmName, signOut } = Database();
  const [farmName, setFarmName] = useState('');
  const [errorName, setErrorName] = useState('');

  const saveFarmName = async () => {
    if (!farmName) {
      setErrorName('Please enter your farm name');
      return;
    }
    if ((await createFarmName(farmName)) === true) {
      navigation.navigate('AddTree');
    }
  };

  const handleInputChange = (text: any) => {
    setErrorName('');
    console.log(text);
    setFarmName(text);
  };

  return (
    <>
      <HeaderComponent />
      <View style={stylesFarmname.container}>
        {/* Title */}
        <View style={stylesFarmname.headSession}>
          <TouchableOpacity onPress={signOut}>
            <IconBack />
          </TouchableOpacity>
          <View style={{ width: 8 }} />
          <View>
            <Text style={stylesFarmname.txtTitle}>Enter your farm name</Text>
          </View>
        </View>

        <View style={{ height: 32 }} />
        {/* Form */}
        <View style={stylesFarmname.inputSession}>
          <Input
            label="Farm name"
            placeholder="Enter your farm name"
            span="*"
            onChangeText={(text: string) => handleInputChange(text)}
            error={errorName}
          />
        </View>

        <View style={{ height: 32 }} />
        {/* Button continue */}
        <TouchableOpacity
          style={stylesFarmname.btnSession}
          onPress={saveFarmName}>
          <View style={stylesFarmname.txtBtn}>
            <IconContinue />
            <View style={{ width: 16 }} />
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                color: '#FFFFFF',
                fontFamily: 'Nunito-Bold',
              }}>
              CONTINUE
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default Farmname;
