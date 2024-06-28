'use client';

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout, message, Spin } from "antd";
import { UserProvider, useUser } from "./user-provider";
import { useEffect } from "react";
import { UserInfoUtil } from "@/utils/userInfo";
import { useRouter } from "next/navigation";
import imjcManager from "@/imjc/imjc";
import { initServer } from "@/utils/init";

function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status, setUser, setStatus } = useUser();
  const router = useRouter();
  useEffect(() => {
    initServer();
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      const { userId, authenticatedToken } = await UserInfoUtil.getUserInfo();
      if (!authenticatedToken) {
        router.push('/auth/login');
        return;
      }
      if (status === 'idle') {
        let success = true;
        setStatus('loading');
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const user = await imjcManager.getUserFromRemote(userId, async (err) => {
          await UserInfoUtil.deleteUserInfo();
          message.error('获取用户信息失败，请重新登录！');
          router.push('/auth/login');
          setStatus('fail');
          setUser(null);
          success = false;
        });

        if (success) {
          setUser(user);
          setStatus('success');
        }
      }
    }
    fetchUser();
  }, [status, setUser, setStatus, router]);

  let layout = (
    <Layout style={{ minHeight: '100vh', fontFamily: 'Hiragino Sans GB' }}>
      {children}
    </Layout>
  );
  if (status === 'loading') {
    layout = (
      <Spin
        spinning={true}
        delay={1000}
        fullscreen
        size={'large'}
      />
    );
  }
  return (
    <AntdRegistry>
      {layout}
    </AntdRegistry>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ padding: 0, margin: 0 }}>
        <UserProvider>
          <App>{children}</App>
        </UserProvider>
      </body>
    </html>
  );
}
