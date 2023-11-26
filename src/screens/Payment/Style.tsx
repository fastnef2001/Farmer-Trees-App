import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/color';

export default StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    alignSelf: 'center',
    paddingTop: 16,
  },
  textBody: {
    color: COLORS.text1,
    textAlign: 'justify',
    fontFamily: 'Nunito-Medium',
    fontSize: 14,
  },
});
