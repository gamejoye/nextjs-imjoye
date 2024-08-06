'use client';

import { ChatWindow } from "@/component/ChatWindow";
import { useUser } from "@/hooks/global";
import imjcManager from "@/imjc/imjc";
import { ChatroomSummary } from "@/types/global";
import { Result } from "antd";
import { Content } from "antd/es/layout/layout";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Params = {
  id: string;
}

export default function ChatWindowPage() {
  const { user } = useUser();
  const params = useParams<Params>();
  const id = params.id;
  const isValidId = id.split('').every((ch) => ('0' <= ch && ch <= '9')) && parseInt(id) > 0;
  const [summary, setSummary] = useState<ChatroomSummary | null>(null);
  useEffect(() => {
    if (!isValidId) return;
    if (!user) return;
    const fetchChatSummary = async () => {
      const chatroomId = parseInt(id);
      let found = true;
      const summary = await imjcManager
        .getChatroomSummaryFromRemote(
          user.id,
          chatroomId,
          (err) => {
            found = false;
          },
        );
      setSummary(summary);
    }
    fetchChatSummary();
  }, []);

  if (!isValidId) return <ChatWindowNotFound />;
  if (!summary) return <ChatWindowNotFound />;

  return (
    <Content>
      <ChatWindow summary={summary} />
    </Content>
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