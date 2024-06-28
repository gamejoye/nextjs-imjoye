'use client';

import { initClient } from "@/utils/client";
import { GroupOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../user-provider";
import useToken from "antd/es/theme/useToken";

const { Text } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

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
  getItem('好友', '/friend', <UserOutlined />),
  getItem('群聊', '/group', <GroupOutlined />),
];

const siderWidth = 160;

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { colorBgContainer, colorBorderSecondary } = useToken()[1];
  useEffect(() => {
    initClient();
  }, []);
  const handleOnSelect = ({ key }: { key: string }) => {
    router.push('/contact' + key);
  }
  return (
    <Layout style={{ width: '100%' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          margin: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 32,
          paddingRight: 32,
          height: 64,
          backgroundColor: colorBgContainer,
          borderBottom: `1px solid ${colorBorderSecondary}`,
        }}
      >
        <Text style={{ fontSize: '24px', margin: 0 }}>通讯录</Text>
      </Header>
      <Layout>
        <Sider
          width={siderWidth}
          style={{
            overflowY: 'auto',
            height: '100vh',
            position: 'fixed',
            paddingTop: 16,
            paddingBottom: 16,
          }}
          theme="light"
        >
          <Menu
            defaultSelectedKeys={[pathname.substring(pathname.lastIndexOf('/'))]}
            items={items}
            onSelect={handleOnSelect}
          />
        </Sider>
        <div style={{ width: '100%', marginLeft: siderWidth }}>
          {children}
        </div>
      </Layout>
    </Layout>
  );
}