import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HeaderComponent } from '../../components/Header/Header.component';
import IconBack from '../../assets/images/IconBack.svg';
import Input from '../../components/Input/Input.component';
import IconContinue from '../../assets/images/IconContinue.svg';
import { stylesFarmname } from './Style';
import { UselogicFarmname } from './UseLogic';

const Farmname = ({ navigation }: any) => {
  const { handleInputChangeFarmName, saveFarmName, handleLogOut } =
    UselogicFarmname({ navigation });
  return (
    <>
      <HeaderComponent />
      <View style={stylesFarmname.container}>
        {/* Title */}
        <View style={stylesFarmname.headSession}>
          <TouchableOpacity onPress={handleLogOut}>
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
            onChangeText={(text: string) => handleInputChangeFarmName(text)}
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
