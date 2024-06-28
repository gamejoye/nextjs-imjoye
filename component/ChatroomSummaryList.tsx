'use client';

import { ChatroomSummary } from "@/types/global"
import { Avatar, Badge, Empty, List, Typography } from "antd"

type Props = {
  summaries: ChatroomSummary[],
}

export function ChatroomSummaryList({
  summaries
}: Props) {
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
        renderItem={(summary) => (
          <List.Item>
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
        )}
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