'use client';

import { FriendList } from "@/component/FriendList";
import { FriendOnlineSearch } from "@/component/FriendOnlineSearch";
import imjcManager from "@/imjc/imjc";
import { User } from "@/types/global";
import { UserInfoUtil } from "@/utils/userInfo";
import { Tabs, message } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";

export default function Friend() {
  const [friends, setFriends] = useState<User[]>([]);
  useEffect(() => {
    const { userId } = UserInfoUtil.getUserInfo();
    imjcManager
      .getFriendsFromRemote(userId, (err) => {
        message.error('获取好友信息失败:' + err.message);
      })
      .then((friends) => {
        setFriends(friends);
      });
  }, []);
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
