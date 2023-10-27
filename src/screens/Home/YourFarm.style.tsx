import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/color';

export const styles1 = StyleSheet.create({
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
