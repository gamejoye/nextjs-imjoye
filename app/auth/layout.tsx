'use client';

import { Layout, Typography } from 'antd';
import Image from 'next/image';
import useToken from 'antd/es/theme/useToken';
const { Header, Footer } = Layout;
const { Text } = Typography;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { colorBgContainer } = useToken()[1];
  return (
    <>
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
          paddingLeft: 8,
          paddingRight: 8,
          height: 64,
          backgroundColor: colorBgContainer,
        }}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={48}
          height={48}
          style={{ marginRight: '16px', borderRadius: 50 }}
        />
        <Text style={{ fontSize: '24px', margin: 0 }}>IMJoye</Text>
      </Header>
      {children}
      <Footer style={{ textAlign: 'center' }}>
        <a href="https://github.com/gamejoye/nextjs-imjoye">Github 源码</a>
      </Footer>
    </>
  )
}
