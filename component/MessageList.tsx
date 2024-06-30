'use client';

import { Message } from "@/types/global"
import { Avatar, Empty, List, Skeleton, Typography } from "antd";
import { useUser } from '@/hooks/global';
import useToken from "antd/es/theme/useToken";

const { Text } = Typography;

type Props = {
  messages: Message[],
}

export function MessageList({
  messages,
}: Props) {
  const { user, status } = useUser();
  const { colorPrimary, colorFillContent } = useToken()[1];
  return (
    <List
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={(message) => {
        const isOwnMessage = message.from.id === user?.id;
        return (
          <Skeleton loading={status === 'loading' || status === 'idle'} avatar active>
            <div style={{
              display: 'flex',
              flexDirection: isOwnMessage ? 'row-reverse' : 'row',
              alignItems: 'flex-start',
              marginBottom: '10px',
            }}>
              <Avatar src={message.from.avatarUrl} />
              <div style={{
                maxWidth: '60%',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: isOwnMessage ? colorPrimary : colorFillContent,
                marginRight: isOwnMessage ? '10px' : '0',
                marginLeft: isOwnMessage ? '0' : '10px',
              }}>
                <Text>
                  {message.content}
                </Text>
              </div>
            </div>
          </Skeleton>
        )
      }}
    />
  )
}

export function MessageListSkeleton() {
  const filler = new Array(10).fill(0, 0, 10);
  return (
    <List
      itemLayout="horizontal"
      dataSource={filler}
      renderItem={() => (<Skeleton avatar active/>)}
    />
  )
}
