import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/color';

export const stylesTitle = StyleSheet.create({
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
    justifyContent: 'space-between',
  },
  txtTitle: {
    fontSize: 20,
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'left',
    color: COLORS.blue,
    marginLeft: 8,
    fontFamily: 'Nunito-SemiBold',
  },
});

export const stylesScrollView = StyleSheet.create({
  container: {
    width: '95%',
    marginTop: 12,
  },
  emptyItem: {
    height: '100%',
    justifyContent: 'center',
    paddingBottom: '40%',
  },
});

export const stylesResult = StyleSheet.create({
  unitTypo: {
    textAlign: 'left',
    fontFamily: 'Nunito-SemiBold',
  },
  itemFlexBox: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  title: {
    width: 200,
    color: COLORS.blue,
    fontSize: 16,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: COLORS.blue,
  },
  kg: {
    color: COLORS.text2,
  },
  unit: {
    marginLeft: 24,
    fontSize: 16,
  },
  valueParent: {
    flexDirection: 'row',
  },
  item1: {
    marginTop: 24,
  },
  result: {
    flex: 1,
    width: '95%',
    alignItems: 'center',
    paddingBottom: 24,
    alignSelf: 'center',
  },
});
