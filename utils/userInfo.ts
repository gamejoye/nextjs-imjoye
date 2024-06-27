import Cookies from 'js-cookie';

export class UserInfo {
  'authenticatedToken': string;
  'userId': number;
}

class UserInfoUtil {
  userInfo: string;

  constructor() {
    this.userInfo = 'userInfo';
  }

  async getUserInfo(): Promise<UserInfo> {
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

  async storeUserInfo(userInfo: UserInfo) {
    // const authenticatedToken = userInfo.authenticatedToken;
    // const userId = userInfo.userId;
    const { userId, authenticatedToken } = userInfo;
    Cookies.set('userId', userId + '');
    Cookies.set('authenticatedToken', authenticatedToken + '');
  }

  async deleteUserInfo() {
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
