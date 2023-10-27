import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/color';

export const stylesChatAI = StyleSheet.create({
  root: {
    paddingTop: 8,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export const stylesInputMessage = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    color: COLORS.text1,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Nunito-Bold',
    color: COLORS.blue,
  },
  userMessage: {
    backgroundColor: COLORS.blue,
    padding: 8,
    alignSelf: 'flex-end',
    marginVertical: 4,
    borderRadius: 8,
  },
  assistantMessage: {
    backgroundColor: '#EAE8E8',
    padding: 8,
    alignSelf: 'flex-start',
    marginVertical: 4,
    borderRadius: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
  },
  textUserMessage: {
    color: COLORS.white,
    fontFamily: 'Nunito-Regular',
  },
  textAssistantMessage: {
    color: COLORS.text1,
    fontFamily: 'Nunito-Regular',
  },
});
