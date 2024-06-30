import { UserInfo } from '@/types/global';
import Cookies from 'js-cookie';

class UserInfoUtil {
  userInfo: string;

  constructor() {
    this.userInfo = 'userInfo';
  }

  getUserInfo(): UserInfo {
    // const userId = parseInt(localStorage.getItem('userId') || '-1');
    // const authenticatedToken = localStorage.getItem('authenticatedToken') || '';
    const userId = parseInt(Cookies.get('userId') || '-1');
    const authenticatedToken = Cookies.get('authenticatedToken') || '';
    const userInfo: UserInfo = {
      authenticatedToken,
      userId,
    }
    return userInfo;
  }

  storeUserInfo(userInfo: UserInfo) {
    // const authenticatedToken = userInfo.authenticatedToken;
    // const userId = userInfo.userId;
    const { userId, authenticatedToken } = userInfo;
    Cookies.set('userId', userId + '');
    Cookies.set('authenticatedToken', authenticatedToken + '');
  }

  deleteUserInfo() {
    // localStorage.removeItem('userId');
    // localStorage.removeItem('authenticatedToken');
    Cookies.remove('userId');
    Cookies.remove('authenticatedToken');
  }
}

const util = new UserInfoUtil();

export {
  util as UserInfoUtil
}
