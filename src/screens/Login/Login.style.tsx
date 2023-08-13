import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 16,
  },
  textTitleContainer: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#163859',
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
    marginTop: 34,
    borderRadius: 15,
    shadowColor: '#000',
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: -2, height: 4 },
    padding: 16,
    width: '90%',
  },
  txtBottomFormSignin: {
    width: '90%',
    paddingTop: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signinBtn: {
    width: '90%',
    height: 48,
    backgroundColor: '#163859',
    borderRadius: 10,
  },
  signupGoogleBtn: {
    marginTop: 12,
    width: '90%',
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#163859',
    marginBottom: 24,
  },
  txtBtnSignup: {
    marginTop: 12,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
