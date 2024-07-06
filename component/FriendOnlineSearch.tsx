'use client';

import { useUser } from "@/hooks/global";
import imjcManager from "@/imjc/imjc";
import { User } from "@/types/global";
import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Descriptions, Form, Input, Modal, Skeleton, Space, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  friends: Array<User>;
}

type UserModalProps = {
  user: User | null,
  show: boolean,
  onClose: () => void,
  footer: React.ReactNode,
}

type SearchModalProps = {
  show: boolean,
  isLoading: boolean,
  onClose: () => void,
  onFinish: ({ email }: { email: string }) => {},
}

export function FriendOnlineSearch({
  friends,
}: Props) {
  const { user: self } = useUser();
  const [isModalShow, setIsModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserModalShow, setIsUserModalShow] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const isSelf = self && user && self.id === user.id;
  const isFriend = friends && friends.some((friend) => friend.id === user?.id);
  const startChat = async (friend: User) => {
    if (!self) return;
    let success = true;
    const chatroom = await imjcManager.getChatroomByFriendIdFromRemote(
      self.id,
      friend.id,
      (err) => {
        success = false;
      }
    );
    if (success) {
      router.push(`/message/${chatroom.id}`);
    } else {
      message.error('网络发生了一些小异常～');
    }
  }
  const sendFriendRequest = async (user: User) => {
    if (!self) return;
    let success = true;
    await imjcManager.sendFriendRequst(
      self.id, 
      user.id,
      (err) => {
        success = false;
        message.error('发送好友请求失败' + err.message);
      }
    );
    if (success) {
      message.success('成功发送好友请求');
      closeUserModal();
    }
  }
  const openModal = () => {
    setIsModalShow(true);
  }
  const openUserModal = () => {
    setIsUserModalShow(true);
  }
  const closeUserModal = () => {
    setIsUserModalShow(false);
  }
  const closeModal = () => {
    setIsModalShow(false);
  }
  const onFinish = async ({ email }: { email: string }) => {
    setIsLoading(true);
    let found = true;
    const user = await imjcManager.getUserByEmailFromRemote(
      email,
      (err) => {
        found = false;
      }
    );
    setIsLoading(false);
    if (found) {
      setUser(user);
      setIsUserModalShow(true);
      openUserModal();
    } else {
      message.error('找不到用户: ' + email);
    }
  }

  const userModalFooter = <div style={{ textAlign: 'center' }}>
    {isSelf
      ? null
      : isFriend
        ? (
          <Button type={'primary'} onClick={() => startChat(user as User)}>
            发送消息
          </Button>
        )
        : (
          <Button type={'primary'} onClick={() => sendFriendRequest(user as User)}>
            发送好友请求
          </Button>
        )
    }
  </div>;
  return (
    <>
      <Button
        size={'large'}
        type={'default'}
        shape={'circle'}
        icon={<PlusOutlined />}
        onClick={openModal}
      />
      <SearchModal
        show={isModalShow}
        isLoading={isLoading}
        onClose={closeModal}
        onFinish={onFinish}
      />
      <UserModal
        show={isUserModalShow}
        user={user}
        onClose={closeUserModal}
        footer={userModalFooter}
      />
    </>
  )
}

function SearchModal({
  show,
  isLoading,
  onClose,
  onFinish,
}: SearchModalProps) {
  return (
    <Modal
      title="好友搜索"
      open={show}
      onCancel={onClose}
      footer={null}
    >
      <Form
        name="onlineSearch"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="请输入邮箱"
          rules={[
            {
              type: 'email',
              message: '请输入有效的邮箱地址',
            },
            {
              required: true,
              message: '邮箱地址不能为空',
            },
          ]}
        >
          <Input placeholder="gamejoye@gmail.com" />
        </Form.Item>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              查询
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

function UserModal({
  user,
  show,
  onClose,
  footer
}: UserModalProps) {
  const loading = !user;
  return (
    <Modal
      title="用户信息"
      open={show}
      onCancel={onClose}
      footer={footer}
      width={400}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          {loading ? (
            <Skeleton.Avatar active size={80} shape="circle" />
          ) : (
            <Avatar size={80} src={user.avatarUrl} alt={user.username} />
          )}
          <Typography.Title level={4} style={{ marginTop: 16 }}>
            {loading ? <Skeleton.Input style={{ width: 100 }} active size="small" /> : user.username}
          </Typography.Title>
        </div>
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="用户UID">
            {loading ? <Skeleton.Input style={{ width: 200 }} active size="small" /> : user.id}
          </Descriptions.Item>
          <Descriptions.Item label="邮箱">
            {loading ? <Skeleton.Input style={{ width: 200 }} active size="small" /> : user.email}
          </Descriptions.Item>
          <Descriptions.Item label="简介">
            {loading ? <Skeleton.Input style={{ width: 200 }} active size="small" /> : user.description}
          </Descriptions.Item>
          <Descriptions.Item label="注册时间">
            {loading ? <Skeleton.Input style={{ width: 200 }} active size="small" /> : user.createTime}
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </Modal>
  );
};