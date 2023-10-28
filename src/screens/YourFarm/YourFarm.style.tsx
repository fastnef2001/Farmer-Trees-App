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
