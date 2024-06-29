'use client';

import { MessageList, MessageListSkeleton } from "@/component/MessageList";
import imjcManager from "@/imjc/imjc";
import { Avatar, Button, Divider, Input, Layout, message, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import useToken from "antd/es/theme/useToken";
import Title from "antd/es/typography/Title";
import { useMessages } from "@/hooks/global";
import { ChatroomSummary } from "@/types/global";
import { MessageOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

type Prop = {
  summary: ChatroomSummary,
}

export function ChatWindow({
  summary
}: Prop) {
  const {
    messages,
    send,
    isQueryLoading,
  } = useMessages(summary);
  const [content, setContent] = useState('');
  const { colorBgContainer, colorBorderSecondary } = useToken()[1];
  const messageEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  const handleOnSubmit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (content === '') return;
    if (e.shiftKey) return;
    e.preventDefault();
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
      <Content style={{ padding: '16px', overflowY: 'auto', flex: 1 }}>
        {isQueryLoading
          ? <MessageListSkeleton />
          : <MessageList messages={messages} />
        }
        <div ref={messageEndRef} />
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