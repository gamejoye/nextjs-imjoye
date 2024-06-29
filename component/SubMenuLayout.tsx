'use client';

import { initClient } from "@/utils/client";
import { Layout, Menu, MenuProps, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useToken from "antd/es/theme/useToken";

const { Text } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

type Props = {
  children: React.ReactNode,
  items: MenuItem[],
  title: string;
}

const siderWidth = 160;

export default function SubMenuLayout({
  children,
  items,
  title
}: Readonly<Props>) {
  const router = useRouter();
  const pathname = usePathname();
  const { colorBgContainer, colorBorderSecondary } = useToken()[1];
  useEffect(() => {
    initClient();
  }, []);
  const handleOnSelect = ({ key }: { key: string }) => {
    router.push(key);
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
        <Text style={{ fontSize: '24px', margin: 0 }}>{title}</Text>
      </Header>
      <Content>
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
              defaultSelectedKeys={[pathname]}
              items={items}
              onSelect={handleOnSelect}
            />
          </Sider>
          <div style={{ width: '100%', marginLeft: siderWidth }}>
            {children}
          </div>
        </Layout>
      </Content>
    </Layout>
  );
}