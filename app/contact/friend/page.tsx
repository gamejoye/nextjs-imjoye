import { FriendList } from "@/component/FriendList";
import { FriendOnlineSearch } from "@/component/FriendOnlineSearch";
import imjcManager from "@/imjc/imjc";
import { getUserInfo, initServer } from "@/utils/server";
import { Tabs, message } from "antd";
import { Content } from "antd/es/layout/layout";

export default async function Friend() {
  initServer();
  const { userId } = getUserInfo();
  const friends = await imjcManager.getFriendsFromRemote(userId, (err) => {
    message.error('获取好友信息失败:' + err.message);
  });
  const items = [{
    label: `全部`,
    key: '0',
    children: <FriendList friends={friends} />,
  }]
  return (
    <Content style={{ padding: 8 }}>
      <Tabs
        type={'card'}
        items={items}
        tabBarExtraContent={<FriendOnlineSearch friends={friends} />}
      />
    </Content >
  );
}
