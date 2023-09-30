import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cover: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  logoRightStyle: {
    width: 40,
    alignItems: 'center',
    marginTop: 10,
  },
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ellipse59: {
    borderRadius: 100,
    width: 35,
    height: 35,
  },
  username: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    fontFamily: 'Nunito-Regular',
  },
});

export const stylesHeaderTitle = StyleSheet.create({
  root: {
    width: 375,
    alignItems: 'center',
    marginHorizontal: 8,
    flexDirection: 'row',
  },
  incomeHistory: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
  },
});
