'use client';

import { ChatWindow } from "@/component/ChatWindow";
import { useQueryChatroomSummary } from "@/hooks/global";
import { Result, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import { useParams } from "next/navigation";

type Params = {
  id: string;
}

export default function ChatWindowPage() {
  const params = useParams<Params>();
  const id = params.id;
  const { status, summary } = useQueryChatroomSummary(id);
  const isLoading = status === 'loading' || status === 'idle';
  if (!summary && !isLoading) return <ChatWindowNotFound />;
  return (
    <Spin
      style={{ width: '100vh', height: '100vh' }}
      spinning={isLoading}
      size={'large'}
      delay={500}
    >
      <Content>
        {summary === null ? null : <ChatWindow summary={summary} />}
      </Content>
    </Spin>
  )
}

function ChatWindowNotFound() {
  return (
    <Content
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="当前聊天室不存在或者您无权访问噢～"
      />
    </Content>
  )
}