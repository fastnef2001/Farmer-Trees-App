import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/color';

export const styleElement2 = StyleSheet.create<any>({
  root: {
    width: '90%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 1,
    padding: 16,
    alignSelf: 'center',
    borderRadius: 12,
  },
  farmName: {
    alignSelf: 'stretch',
    color: COLORS.blue,
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
  title: {
    alignSelf: 'stretch',
    color: COLORS.text2,
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 3, // Use pixels instead of '3rem'
    flex: 1,
  },
});

export const styleElement1 = StyleSheet.create<any>({
  root: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
    flexDirection: 'row',
    padding: 16,
    alignSelf: 'center',
    borderRadius: 12,
  },
  $name: {
    alignSelf: 'stretch',
    color: COLORS.white,
    fontFeatureSettings: 'clig off, liga off',
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
  gmail: {
    alignSelf: 'stretch',
    color: COLORS.grey,
    fontFeatureSettings: 'clig off, liga off',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
  },
  frame625291: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    gap: 4, // Numeric value without 'rem'
  },
});
