'use client';

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout, message, Spin } from "antd";
import { UserProvider, useUser } from "./user-provider";
import { useEffect } from "react";
import { UserInfoUtil } from "@/utils/userInfo";
import { usePathname, useRouter } from "next/navigation";
import imjcManager from "@/imjc/imjc";
import { initServer } from "@/utils/init";
import AuthLayout from "@/component/AuthLayout";
import MainLayout from "@/component/MainLayout";

function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status, setUser, setStatus } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith('/auth');
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
      {isAuthRoute
        ? <AuthLayout>{children}</AuthLayout>
        : <MainLayout>{children}</MainLayout>
      }
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
