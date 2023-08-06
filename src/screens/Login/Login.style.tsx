import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 2,
    paddingTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  textTitleContainer: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#163859',
    textAlign: 'center',
  },
  textRightLogo: { fontSize: 14, color: '#FFFFFF', fontWeight: 'bold' },
  formSection: {
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  formSectionLogin: {
    backgroundColor: '#FFFFFF',
    width: 347,
    height: 200,
    marginTop: 34,
    borderRadius: 15,
    shadowColor: '#000',
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: -2, height: 4 },
  },
  txtBottomFormSignin: {
    paddingVertical: 24,
    paddingHorizontal: 36,
    flexDirection: 'row',
  },
  signinBtn: {
    width: 350,
    height: 48,
    backgroundColor: '#163859',
    borderRadius: 10,
  },
  signupGoogleBtn: {
    marginTop: 12,
    width: 350,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#163859',
  },
  txtBtnSignup: {
    marginTop: 12,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
