'use client';

import { Avatar, Button, Layout, Menu, MenuProps } from 'antd';
import useToken from 'antd/es/theme/useToken';
import { LogoutOutlined, MessageOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';
import { useUser } from '@/app/user-provider';
import { UserInfoUtil } from '@/utils/userInfo';
import { usePathname, useRouter } from 'next/navigation';

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
  const { user, setUser, setStatus } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const handleOnLogout = async () => {
    await UserInfoUtil.deleteUserInfo();
    setUser(null);
    setStatus('idle');
  }
  const { colorBorderSecondary } = useToken()[1];
  const handleOnSelect = ({ key }: { key: string }) => {
    router.push(key);
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
          borderRight: `1px solid ${colorBorderSecondary}`,
        }}
        theme='light'
      >
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <Avatar
            size={48}
            src={user?.avatarUrl || ''}
            style={{ marginBottom: '8px' }}
          />
        </div>
        <Menu
          defaultSelectedKeys={[pathname]}
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
