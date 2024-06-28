'use client';

import { User } from "@/types/global"
import { Avatar, Badge, Card, Empty, List, Typography } from "antd"

type Props = {
  friends: User[],
}

export function FriendList({
  friends
}: Props) {
  return (
    <div style={{ overflowY: 'auto', height: '100vh' }}>
      <List
        style={{
          padding: 8,
        }}
        grid={{ gutter: 16, column: 3 }}
        itemLayout="horizontal"
        dataSource={friends}
        locale={{
          emptyText: (
            <Empty description="快去认识好友一起聊天吧～" />
          ),
        }}
        renderItem={(user) => (
          <List.Item>
            <Card hoverable={true}>
              <Card.Meta
                avatar={<Avatar src={user.avatarUrl} />}
                title={user.username}
                description={
                  <Typography.Paragraph
                    ellipsis={{ rows: 2 }}
                    type={'secondary'}
                    style={{
                      height: '3em',
                      lineHeight: '1.5em',
                    }}
                  >
                    {user.description || "这位用户很懒，什么也没留下！"}
                  </Typography.Paragraph>
                }
              />
            </Card>
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