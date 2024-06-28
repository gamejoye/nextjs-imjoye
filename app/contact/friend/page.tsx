import { FriendList } from "@/component/FriendList";
import imjcManager from "@/imjc/imjc";
import { getUserInfo, initServer } from "@/utils/server";
import { message } from "antd";
import { Content } from "antd/es/layout/layout";

export default async function Friend() {
  initServer();
  const { userId } = getUserInfo();
  const friends = await imjcManager.getFriendsFromRemote(userId, (err) => {
    message.error('获取好友信息失败:' + err.message);
  });
  return (
    <Content>
      <FriendList friends={friends} />
    </Content>
  );
}
