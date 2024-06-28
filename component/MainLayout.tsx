'use client';

import { Avatar, Button, Layout, Menu, MenuProps } from 'antd';
import useToken from 'antd/es/theme/useToken';
import { LogoutOutlined, MessageOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';
import { useUser } from '@/app/user-provider';
import { UserInfoUtil } from '@/utils/userInfo';

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
  getItem('消息', '1', <MessageOutlined />),
  getItem('联系人', '2', <UserOutlined />),
  getItem('设置', '3', <SettingOutlined />),
];

const siderWidth = 120;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { colorBgContainer } = useToken()[1];
  const { user, setUser, setStatus } = useUser();
  const handleOnLogout = async () => {
    await UserInfoUtil.deleteUserInfo();
    setUser(null);
    setStatus('idle');
  }

  return (
    <>
      <Sider
        width={siderWidth}
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          paddingTop: 16,
          paddingBottom: 16,
          backgroundColor: colorBgContainer,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <Avatar
            size={48}
            src={user?.avatarUrl || ''}
            style={{ marginBottom: '8px' }}
          />
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          items={items}
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
      <div style={{ marginLeft: siderWidth }}>
        {children}
      </div>
    </>
  )
}
