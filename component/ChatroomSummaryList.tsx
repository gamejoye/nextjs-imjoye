'use client';

import { useChatroomSummaries, useUser } from "@/hooks/global";
import { EventType } from "@/imjc/constant/EventType";
import eventEmitter from "@/imjc/emitter";
import imjcManager from "@/imjc/imjc";
import { Chatroom, ChatroomSummary, Message } from "@/types/global"
import { Avatar, Badge, Empty, List, Skeleton, Typography, message } from "antd"
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function ChatroomSummaryList() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const selectId = parseInt(pathname.substring(pathname.lastIndexOf('/') + 1));
  const {
    summaries,
    setSummaries,
    currentChatroom,
    isQueryLoading,
  } = useChatroomSummaries();

  useEffect(() => {
    const newChatroomHandle = async (chatroom: Chatroom) => {
      if (!user) return;
      const newSummary = await imjcManager
        .getChatroomSummaryFromRemote(
          user.id,
          chatroom.id,
          (err) => { },
        );
      const newSummaries = summaries.filter((summary) => summary.chatroom.id !== newSummary.chatroom.id);
      newSummaries.unshift(newSummary);
      setSummaries(newSummaries);
    };
    eventEmitter.on(EventType.NEW_CHATROOM, newChatroomHandle);
    return () => {
      eventEmitter.off(EventType.NEW_CHATROOM, newChatroomHandle);
    };
  }, [summaries, setSummaries, user]);

  useEffect(() => {
    const newMessageHandle = (message: Message) => {
      const newSummaries = summaries.map((oldSummary) => {
        if (oldSummary.chatroom.id !== message.chatroom.id) return oldSummary;
        let unreadMessageCount = oldSummary.unreadMessageCount;
        if (currentChatroom?.id !== message.chatroom.id)  unreadMessageCount++;
        return {
          ...oldSummary,
          unreadMessageCount,
          latestMessage: message,
        };
      });
      setSummaries(newSummaries);
    };
    eventEmitter.on(EventType.NEW_MESSAGE, newMessageHandle);
    return () => {
      eventEmitter.off(EventType.NEW_MESSAGE, newMessageHandle);
    };
  }, [summaries, setSummaries]);

  const handleOnClick = (summary: ChatroomSummary) => {
    router.push(`/message/${summary.chatroom.id}`);
  }

  if (isQueryLoading) {
    const filler = new Array(10).fill(0, 0, 10);
    return (
      <List
        itemLayout="horizontal"
        dataSource={filler}
        renderItem={() => (
          <List.Item>
            <Skeleton avatar active paragraph={{ rows: 1 }} />
          </List.Item>
        )}
      />
    )
  }

  return (
    <div style={{ overflowY: 'auto', height: '100vh' }}>
      <List
        style={{
          padding: 8,
        }}
        itemLayout="horizontal"
        dataSource={summaries}
        locale={{
          emptyText: (
            <Empty description="暂时还没有聊天哟～" />
          ),
        }}
        renderItem={(summary) => {
          const isSelected = selectId === summary.chatroom.id
          return (
            <List.Item
              onClick={() => handleOnClick(summary)}
              style={{
                backgroundColor: isSelected ? 'rgba(24, 144, 255, 0.1)' : 'transparent',
                borderLeft: isSelected ? '4px solid #1890ff' : '4px solid transparent',
                padding: isSelected ? '8px 8px 8px 4px' : '8px',
                transition: 'background-color 0.3s, border-left 0.3s',
              }}
            >
              <List.Item.Meta
                avatar={
                  <Badge count={summary.unreadMessageCount}>
                    <Avatar src={summary.chatroom.avatarUrl} />
                  </Badge>}
                title={summary.chatroom.name}
                description={
                  <Typography.Text ellipsis>
                    {summary.latestMessage?.content || '快来一起聊天吧～'}
                  </Typography.Text>}
              />
            </List.Item>
          )
        }}
      />
      <style jsx>{`
      div::-webkit-scrollbar {
        width: 2px;
      }
      div::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
      }
      div::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 0.3);
      }
      div::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.1);
      }
    `}</style>
    </div>
  )
}