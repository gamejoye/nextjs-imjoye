'use client';

import { ConfigProvider, Layout, message, Spin, theme as antdTheme } from "antd";
import { useEffect } from "react";
import { UserInfoUtil } from "@/utils/userInfo";
import { usePathname, useRouter } from "next/navigation";
import imjcManager from "@/imjc/imjc";
import { initClient } from "@/utils/client";
import AuthLayout from "@/component/AuthLayout";
import MainLayout from "@/component/MainLayout";
import ThemeProvider, { useTheme } from "@/component/ThemeProvider";
import { UserProvider, useUser } from "@/component/UserProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import locale from 'antd/locale/zh_CN';

export function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <UserProvider>
        <AntdRegistry>
          <Logic>
            {children}
          </Logic>
        </AntdRegistry>
      </UserProvider>
    </ThemeProvider>
  )
}

function Logic({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status, setUser, setStatus } = useUser();
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith('/auth');
  useEffect(() => {
    initClient();
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
    <Layout
      hasSider={isAuthRoute ? false : true}
      style={{
        minHeight: '100vh',
        fontFamily: 'Hiragino Sans GB'
      }}
    >
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
    <ConfigProvider
      locale={locale}
      theme={{
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm
      }}
    >
      {layout}
    </ConfigProvider>
  )
}