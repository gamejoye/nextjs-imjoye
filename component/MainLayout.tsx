'use client';

import { Avatar, Button, Col, Layout, Menu, MenuProps, Row, Tag } from 'antd';
import useToken from 'antd/es/theme/useToken';
import { LogoutOutlined, MessageOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';
import { UserInfoUtil } from '@/utils/userInfo';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/global';
import ConnectionStatus from '@/imjc/constant/ConnectionStatus';
import imjcManager from '@/imjc/imjc';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

type IconWithTextProps = {
  icon: ReactNode;
  text: string;
}

const IconWithText: React.FC<IconWithTextProps> = ({ icon, text }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
      <span style={{ marginTop: '8px' }}>{text}</span>
    </div>
  );
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


const items: MenuItem[] = [
  getItem('消息', '/message', <MessageOutlined />),
  getItem('通讯录', '/contact', <UserOutlined />),
  getItem('设置', '/setting', <SettingOutlined />),
];

const siderWidth = 120;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, setUser, setStatus, connectionStatus } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const handleOnLogout = async () => {
    UserInfoUtil.deleteUserInfo();
    setUser(null);
    setStatus('idle');
    imjcManager.disconnect();
  }
  const { colorBorderSecondary } = useToken()[1];

  const handleOnSelect = ({ key }: { key: string }) => {
    router.push(key);
  }

  const getConnectionStatusTagColor = () => {
    switch (connectionStatus) {
      case ConnectionStatus.Connected:
        return ['green', '在线'];
      case ConnectionStatus.Connecting:
        return ['orange', '连接中'];
      case ConnectionStatus.Idle:
        return ['blue', '空闲'];
      case ConnectionStatus.UnConnected:
        return ['red', '断开连接'];
    }
  };

  const keys = pathname.split('/');
  let selectedKey = '/' + (keys.find((key) => (key === 'message' || key === 'contact' || key === 'setting')) || '');

  return (
    <>
      <Sider
        width={siderWidth}
        style={{
          overflowY: 'auto',
          height: '100vh',
          position: 'fixed',
          paddingTop: 16,
          paddingBottom: 16,
          borderRight: `1px solid ${colorBorderSecondary}`,
        }}
        theme='light'
      >
        <Row style={{ textAlign: 'center', marginBottom: '16px' }}>
          <Col span={24}>
            <Avatar
              size={48}
              src={user?.avatarUrl || ''}
              style={{ marginBottom: '8px' }}
            />
          </Col>
          <Col span={24}>
            <Tag color={getConnectionStatusTagColor()[0]}>{getConnectionStatusTagColor()[1]}</Tag>
          </Col>
        </Row>
        <Menu
          defaultSelectedKeys={[selectedKey]}
          items={items}
          onSelect={handleOnSelect}
        />
        <div style={{ position: 'absolute', bottom: 16, width: '100%', textAlign: 'center' }}>
          <Button
            type="link"
            style={{ padding: 0 }}
            onClick={handleOnLogout}
          >
            <IconWithText
              icon={<LogoutOutlined style={{ fontSize: '24px' }} />}
              text='登出'
            />
          </Button>
        </div>
      </Sider>
      <div style={{ marginLeft: siderWidth, height: '100%', width: '100%' }}>
        {children}
      </div>
    </>
  )
}
