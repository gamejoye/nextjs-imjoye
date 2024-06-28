export default class ConnectionStatus {
  static TokenInCorrect = -3;
  static Logout = -2;
  static UnConnected = -1;
  static Idle = 0;
  static Connecting = 1;
  static Connected = 2;
  static DataFetching = 3;
}