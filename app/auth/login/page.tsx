'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Layout, Typography } from 'antd';
import appServerApi from "@/api/appServerApi";
import { initServer } from '@/utils/init';
import { isOk } from '@/api/web/issuccess';
import { UserInfoUtil } from '@/utils/userInfo';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const { Content } = Layout;
const { Text } = Typography;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    initServer();
  }, []);
  const onFinish = async (values: { password: string, email: string, }) => {
    setIsLoading(true);
    const res = await appServerApi.login({
      password: values.password,
      email: values.email,
    });
    setIsLoading(false);
    const { statusCode, data, message: resMessage } = res;
    if (isOk(statusCode)) {
      message.success('登录成功');
      await UserInfoUtil.storeUserInfo({
        userId: data.id,
        authenticatedToken: data.token,
      });
      router.push('/');
    } else {
      message.error(`登录失败: ${resMessage}`);
    }
  };

  return (
    <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px' }}>
      <div style={{ width: '300px', padding: '24px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
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