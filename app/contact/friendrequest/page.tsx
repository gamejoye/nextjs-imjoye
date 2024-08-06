'use client';

import { FriendRequestList } from "@/component/FriendRequestList";
import imjcManager from "@/imjc/imjc";
import { FriendRequest } from "@/types/global";
import { UserInfoUtil } from "@/utils/userInfo";
import { message } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";

export default function FriendRequestPage() {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  useEffect(() => {
    const fetchFQs = async () => {
      let success = true;
      const { userId } = UserInfoUtil.getUserInfo();
      const fqs = await imjcManager
        .getFriendRequestsFromRemote(userId, (err) => {
          success = false;
          message.error('获取好友请求信息失败:' + err.message);
        });
      if (success) {
        setFriendRequests(fqs);
      }
    };
    fetchFQs();
  }, []);
  return (
    <Content>
      <FriendRequestList friendRequests={friendRequests} setFriendRequests={setFriendRequests} />
    </Content>
  );
}
