import AsyncStorage from '@react-native-async-storage/async-storage';
const TOKEN_KEY = 'token';
export class AppStorage {
  static getToken = (): Promise<string> => {
    return AsyncStorage.getItem(TOKEN_KEY).then(token => {
      return String(token);
    });
  };

  static setToken = (token: string): Promise<void> => {
    return AsyncStorage.setItem(TOKEN_KEY, token);
  };
}
