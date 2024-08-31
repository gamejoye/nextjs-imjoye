'use client';

import { Message } from "@/types/global"
import { Avatar, Empty, List, Skeleton, Typography } from "antd";
import { useUser } from '@/hooks/global';
import useToken from "antd/es/theme/useToken";
import { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const { Text } = Typography;

type DOMId = string;

type Props = {
  messages: Message[];
  next: () => void | Promise<void>;
  hasMore: boolean;
  loader?: ReactNode;
  endMessage?: ReactNode;
  container: DOMId;
}

export function MessageList({
  messages,
  next,
  hasMore,
  loader,
  endMessage,
  container,
}: Props) {
  const { user, status } = useUser();
  const { colorPrimary, colorFillContent } = useToken()[1];
  return (
    <InfiniteScroll
      dataLength={messages.length}
      next={next}
      style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
      inverse={true}
      hasMore={hasMore}
      loader={loader}
      endMessage={endMessage}
      scrollableTarget={container}
    >
      {messages.map(message => {
        const isOwnMessage = message.from.id === user?.id;
        return (
          <div
            key={message.id}
            style={{
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
        )
      })}
    </InfiniteScroll>
  )
}

export function MessageListSkeleton() {
  const filler = new Array(10).fill(0, 0, 10);
  return (
    <List
      itemLayout="horizontal"
      dataSource={filler}
      renderItem={() => (<Skeleton avatar active />)}
    />
  )
}


export const mockMessages = [
  {
    id: 10716,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '这是我发送的。。。\n',
    createTime: '2024-07-24 18:43:47'
  },
  {
    id: 10717,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '你应该接受不了才对\n',
    createTime: '2024-07-24 18:45:26'
  },
  {
    id: 10718,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '我再测试一下\n',
    createTime: '2024-07-24 18:45:39'
  },
  {
    id: 10719,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '啊？\n',
    createTime: '2024-07-24 18:45:49'
  },
  {
    id: 10720,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: 'test',
    createTime: '2024-07-24 18:46:04'
  },
  {
    id: 10721,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '可以吗\n',
    createTime: '2024-07-24 18:46:10'
  },
  {
    id: 10722,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '玛卡巴卡\n',
    createTime: '2024-07-24 19:07:22'
  },
  {
    id: 10723,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '发送了什么\n',
    createTime: '2024-07-24 19:09:28'
  },
  {
    id: 10724,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 525,
      username: 'gamejoye',
      email: 'gamejoye@gmail.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: '',
      createTime: '2024-06-28 00:13:23'
    },
    content: '好像解决了呢\n',
    createTime: '2024-07-24 19:09:35'
  },
  {
    id: 10725,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 525,
      username: 'gamejoye',
      email: 'gamejoye@gmail.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: '',
      createTime: '2024-06-28 00:13:23'
    },
    content: '什么都解决了\n',
    createTime: '2024-07-24 19:10:32'
  },
  {
    id: 10726,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '收到\n',
    createTime: '2024-07-24 19:10:35'
  },
  {
    id: 10777,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '1\n',
    createTime: '2024-07-24 19:57:01'
  },
  {
    id: 10778,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '2\n',
    createTime: '2024-07-24 19:57:01'
  },
  {
    id: 10779,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '3\n',
    createTime: '2024-07-24 19:57:01'
  },
  {
    id: 10780,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '4\n',
    createTime: '2024-07-24 19:57:01'
  },
  {
    id: 10781,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '5\n',
    createTime: '2024-07-24 19:57:02'
  },
  {
    id: 10782,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '6\n',
    createTime: '2024-07-24 19:57:02'
  },
  {
    id: 10783,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '我是LiaoJieLong',
    createTime: '2024-07-24 19:57:22'
  },
  {
    id: 10784,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '1\n2',
    createTime: '2024-07-24 19:57:27'
  },
  {
    id: 10785,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '\n3',
    createTime: '2024-07-24 19:57:28'
  },
  {
    id: 10786,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '4\n',
    createTime: '2024-07-24 19:57:28'
  },
  {
    id: 10900,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '收到10900\n',
    createTime: '2024-07-24 19:10:35'
  },
  {
    id: 10901,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '收到10901\n',
    createTime: '2024-07-24 19:10:35'
  },
  {
    id: 10902,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '收到10902\n',
    createTime: '2024-07-24 19:10:35'
  },
  {
    id: 10903,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '收到10903\n',
    createTime: '2024-07-24 19:10:35'
  },
  {
    id: 10904,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '收到10904\n',
    createTime: '2024-07-24 19:10:35'
  },
  {
    id: 10905,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '收到10905\n',
    createTime: '2024-07-24 19:10:35'
  },
  {
    id: 10906,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '收到10906\n',
    createTime: '2024-07-24 19:10:35'
  },
  {
    id: 10907,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '收到10907\n',
    createTime: '2024-07-24 19:10:35'
  },
  {
    id: 10908,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '收到10908\n',
    createTime: '2024-07-24 19:10:35'
  },
  {
    id: 10909,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '收到10909\n',
    createTime: '2024-07-24 19:10:35'
  },
  {
    id: 10910,
    chatroom: {
      id: 1828,
      type: 'SINGLE',
      name: null,
      avatarUrl: null,
      createTime: '2024-07-22 21:09:25'
    },
    from: {
      id: 516,
      username: 'Liao Jiehong',
      email: 'jiehliao@yahoo.com',
      avatarUrl: 'http://localhost:8081/avatars/440395aae304e3daf589afb78a67469c.jpg',
      description: 'You cannot save people, you can just love them. Sometimes you win, sometimes you learn.',
      createTime: '2024-04-02 02:34:48'
    },
    content: '收到10910\n',
    createTime: '2024-07-24 19:10:35'
  },
]

console.log('mockLength: ', mockMessages.length)