import { FriendRequestList } from "@/component/FriendRequestList";
import imjcManager from "@/imjc/imjc";
import { getUserInfo, initServer } from "@/utils/server";
import { message } from "antd";
import { Content } from "antd/es/layout/layout";

export default async function FriendRequestPage() {
  initServer();
  const { userId } = getUserInfo();
  const friendRequests = await imjcManager.getFriendRequestsFromRemote(userId, (err) => {
    message.error('获取好友请求信息失败:' + err.message);
  });
  return (
    <Content>
      <FriendRequestList friendRequests={friendRequests} />
    </Content>
  );
}
