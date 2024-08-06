'use client';

import { useUser } from "@/hooks/global";
import { EventType } from "@/imjc/constant/EventType";
import { WebSocketEventType } from "@/imjc/constant/WebSocketEventType";
import eventEmitter from "@/imjc/emitter";
import imjcManager from "@/imjc/imjc";
import { FriendRequest } from "@/types/global";
import { showRelativeTime } from "@/utils/datetime";
import { Avatar, Button, Card, Empty, List, Skeleton, Space, Typography, message } from "antd"
import useToken from "antd/es/theme/useToken";
import { useEffect } from "react";
const { Text } = Typography;

type Props = {
  friendRequests: FriendRequest[],
  setFriendRequests: (fqs: FriendRequest[]) => void
}

const fqSorter = (fq1: FriendRequest, fq2: FriendRequest) => {
  const t1 = new Date(fq1.createTime).getTime();
  const t2 = new Date(fq2.createTime).getTime();
  if (t1 == t2) return fq2.id - fq1.id;
  return t2 - t1;
};

export function FriendRequestList({
  friendRequests,
  setFriendRequests,
}: Props) {
  const { user, status } = useUser();
  const { colorSuccess, colorError } = useToken()[1];
  const isLoading = status === 'loading' || status === 'idle';

  useEffect(() => {
    const newFriendRequestHandle = (newFq: FriendRequest) => {
      const newFqs = friendRequests.filter((fq) => fq.id !== newFq.id);
      newFqs.push(newFq);
      newFqs.sort(fqSorter);
      setFriendRequests(newFqs);
    };
    eventEmitter.on(EventType.NEW_FRIEND_REQUEST, newFriendRequestHandle);
    return () => {
      eventEmitter.off(EventType.NEW_FRIEND_REQUEST, newFriendRequestHandle);
    }
  }, [friendRequests, setFriendRequests]);

  const handleOnAccept = async (request: FriendRequest) => {
    if (!user) return;
    let success = true;
    const friendRequest = await imjcManager.acceptFriendRequest(
      user.id,
      request.id,
      (err) => {
        success = false;
      }
    );
    if (success) {
      const newFqs = friendRequests.filter((fq) => fq.id !== friendRequest.id);
      newFqs.push(friendRequest);
      newFqs.sort(fqSorter);
      setFriendRequests(newFqs);
    } else {
      message.error('处理好友请求失败');
    }
  }
  const handleOnReject = async (request: FriendRequest) => {
    if (!user) return;
    let success = true;
    const friendRequest = await imjcManager.rejectFriendRequest(
      user.id,
      request.id,
      (err) => {
        success = false;
      }
    );
    if (success) {
      const newFqs = friendRequests.filter((fq) => fq.id !== friendRequest.id);
      newFqs.push(friendRequest);
      newFqs.sort(fqSorter);
      setFriendRequests(newFqs);
    } else {
      message.error('处理好友请求失败');
    }
  }
  return (
    <List
      style={{
        padding: 8,
      }}
      itemLayout="horizontal"
      dataSource={friendRequests}
      locale={{
        emptyText: (
          <Empty description="暂时还没有好友请求哦～" />
        ),
      }}
      renderItem={(friendRequest) => {
        const oppsite = friendRequest.from.id === user?.id
          ? friendRequest.to
          : friendRequest.from;
        const actions = friendRequest.status === 'ACCEPT'
          ? [<Text key={'0'} style={{ color: colorSuccess }}>已同意</Text>]
          : friendRequest.status === 'REJECT'
            ? [<Text key={'1'} style={{ color: colorError }}>已拒绝</Text>]
            : friendRequest.from.id === user?.id
              ? [<Text key={'2'} type={'secondary'}>等待验证</Text>]
              : [(
                <Space key={'3'}>
                  <Button
                    type="primary"
                    onClick={() => handleOnAccept(friendRequest)}
                  >
                    同意
                  </Button>
                  <Button
                    danger
                    onClick={() => handleOnReject(friendRequest)}
                  >
                    拒绝
                  </Button>
                </Space>
              )]
        return (
          <Card
            hoverable
            key={friendRequest.id}
            style={{
              marginBottom: 16,
              borderRadius: 8,
            }}
          >
            <Skeleton loading={isLoading} avatar active paragraph={{ rows: 1, style: { width: '10vh' } }}>
              <List.Item actions={actions}>
                <List.Item.Meta
                  avatar={<Avatar src={oppsite.avatarUrl} />}
                  title={<Text strong>{oppsite.username}</Text>}
                  description={(
                    <Text type={'secondary'}>
                      {showRelativeTime(friendRequest.updateTime || friendRequest.createTime)}
                    </Text>
                  )}
                />
              </List.Item>
            </Skeleton>
          </Card>
        );
      }}
    />
  )
}