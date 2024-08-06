'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Layout, Typography } from 'antd';
import appServerApi from "@/api/appServerApi";
import { isOk } from '@/api/web/issuccess';
import { UserInfoUtil } from '@/utils/userInfo';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import imjcManager from '@/imjc/imjc';
import { useUser } from '@/hooks/global';
import useToken from 'antd/es/theme/useToken';
const { Content } = Layout;
const { Text } = Typography;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setStatus } = useUser();
  const router = useRouter();
  const { colorBgContainer } = useToken()[1];
  const onFinish = async (values: { password: string, email: string, }) => {
    setIsLoading(true);
    const res = await appServerApi.login({
      password: values.password,
      email: values.email,
    });
    setIsLoading(false);
    const { statusCode, data, message: resMessage } = res;
    if (!isOk(statusCode)) {
      message.error(`登录失败: ${resMessage}`);
      return;
    }
    await UserInfoUtil.storeUserInfo({
      userId: data.id,
      authenticatedToken: data.token,
    });
    let success = true;
    const user = await imjcManager.getUserFromRemote(data.id, (err) => {
      success = false;
      message.error(`获取用户信息失败`);
      setUser(null);
      setStatus('fail');
    })
    if (!success) return;
    router.push('/message');
    message.success('登录成功');
    setUser(user);
    setStatus('success');
  };

  return (
    <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px' }}>
      <div style={{ width: '300px', padding: '24px', backgroundColor: colorBgContainer, borderRadius: '8px' }}>
        <Text strong style={{ display: 'block', textAlign: 'center', fontSize: '20px', marginBottom: '24px', fontFamily: 'Roboto, sans-serif' }}>快速登录</Text>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: '请输入邮箱!' }]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              立即登录
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link href="/auth/register" aria-disabled={isLoading}>还没有账号? 立即注册</Link>
        </div>
      </div>
    </Content>
  )
};