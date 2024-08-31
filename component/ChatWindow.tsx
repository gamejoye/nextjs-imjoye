'use client';

import { MessageList, MessageListSkeleton } from "@/component/MessageList";
import imjcManager from "@/imjc/imjc";
import { Avatar, Button, Divider, Layout, message, Space, Spin } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import useToken from "antd/es/theme/useToken";
import Title from "antd/es/typography/Title";
import { useChatroomSummaries, useMessages } from "@/hooks/global";
import { ChatroomSummary, Message } from "@/types/global";
import { MessageOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { KeyboardEvent, useEffect, useState } from "react";
import { useUser } from '@/hooks/global';
import { getCurrentDatetime } from "@/utils/datetime";
import eventEmitter from "@/imjc/emitter";
import { EventType } from "@/imjc/constant/EventType";

type Prop = {
  summary: ChatroomSummary,
}

export function ChatWindow({
  summary
}: Prop) {
  const {
    messages,
    setNewMessage,
    send,
    more: hasMore,
    fetchMore: fetchMoreMessages,
    isQueryLoading,
  } = useMessages(summary);
  const {
    summaries,
    setSummaries,
    setCurrentChatroom,
    isQueryLoading: isSummariesQueryLoading,
  } = useChatroomSummaries();
  const { user } = useUser();
  const [content, setContent] = useState('');
  const { colorBgContainer, colorBorderSecondary } = useToken()[1];

  useEffect(() => {
    // messages 依赖项防止过期闭包
    const newMessageHandle = (message: Message) => {
      if (message.chatroom.id !== summary.chatroom.id) return;
      setNewMessage(message);
    };
    // 处理新消息
    eventEmitter.on(EventType.NEW_MESSAGE, newMessageHandle);
    return () => {
      eventEmitter.off(EventType.NEW_MESSAGE, newMessageHandle);
    };
  }, [messages, setNewMessage, summary]);

  useEffect(() => {
    setCurrentChatroom(summary.chatroom);
    return () => {
      setCurrentChatroom(null);
    }
  }, [summary, setCurrentChatroom]);

  useEffect(() => {
    // 离开聊天室更新 访问时间
    return () => {
      if (user) {
        imjcManager.quitChatroom(
          user.id,
          summary.chatroom.id,
          (err) => {
            message.error('更新聊天室信息失败：' + err.message);
          }
        );
      }
    }
  }, [summary.chatroom.id, user]);
  useEffect(() => {
    // summaries loading 逻辑
    if (!isSummariesQueryLoading) {
      const updatedSummaries = summaries
        .map(oldSummary => {
          if (oldSummary.chatroom.id !== summary.chatroom.id) return oldSummary;
          return {
            ...summary,
            unreadMessageCount: 0,
            latestVisitTime: getCurrentDatetime(),
          };
        });
      setSummaries(updatedSummaries);
    }
  }, [isSummariesQueryLoading]);
  const handleOnSubmit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (e.shiftKey) return;
    if (e.key === 'Enter') {
      send(content);
      setContent('');
    }
  }
  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: colorBgContainer,
        borderBottom: `1px solid ${colorBorderSecondary}`,
      }}>
        <Avatar size="large" src={summary.chatroom.avatarUrl} />
        <Title level={4} style={{ margin: '0 16px' }}>
          {summary.chatroom.name}
        </Title>
      </Header>
      <Content
        id="messagesContainer"
        style={{
          padding: '16px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        {isQueryLoading
          ? <MessageListSkeleton />
          : <MessageList
            next={fetchMoreMessages}
            messages={messages}
            hasMore={hasMore}
            loader={
              <div style={{
                display: 'flex',
                justifyContent: 'center',
              }}>
                <Spin delay={500} />
              </div>
            }
            endMessage={
              <p style={{ textAlign: "center", color: "#888" }}>
                <b>没有更多消息了</b>
              </p>
            }
            container="messagesContainer"
          />
        }
      </Content>
      <Footer style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Divider style={{ margin: 0 }} />
        <div>
          <Button type="text" icon={<MessageOutlined />} />
          <Button type="text" icon={<UploadOutlined />} />
          <Button type="text" icon={<UserOutlined />} />
        </div>
        <Space.Compact style={{ width: '100%' }}>
          <TextArea
            rows={6}
            placeholder="按Enter发送 / Shift+Enter 换行"
            style={{ width: '100%' }}
            value={content}
            onKeyUp={handleOnSubmit}
            onChange={(e) => setContent(e.currentTarget.value)}
          />
        </Space.Compact>
      </Footer>
    </Layout>
  )
}