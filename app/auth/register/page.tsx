'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, Avatar, message, Typography } from 'antd';
import { initClient } from '@/utils/client';
import { Content } from 'antd/es/layout/layout';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import appServerApi from '@/api/appServerApi';
import { isCreated } from '@/api/web/issuccess';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';
import useToken from 'antd/es/theme/useToken';
const { Text } = Typography;

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const { colorBgContainer } = useToken()[1];

  useEffect(() => {
    initClient();
  }, []);

  const onFinish = async ({
    email,
    username,
    password,
    confirmPassword
  }: {
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
  }) => {
    if (!file) {
      message.error('头像未上传');
      return;
    }
    if (password !== confirmPassword) {
      message.error('两次密码不一致');
      return;
    }
    setIsLoading(true);
    const res = await appServerApi.uploadAvatar(file);
    if (!isCreated(res.statusCode)) {
      message.error('头像上传失败: ' + res.message);
      setIsLoading(false);
      return;
    }
    const avatarUrl = res.data;
    const {
      statusCode,
      message: registerMessage
    } = await appServerApi.register({
      username,
      email,
      password,
      avatarUrl,
    });
    if (!isCreated(statusCode)) {
      message.error('注册失败: ' + registerMessage);
      setIsLoading(false);
      return;
    }
    router.push('/auth/login');
    message.success('注册成功');
    setIsLoading(false);
  };

  const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {
    const originFileObj = info.file.originFileObj as RcFile;
    const url = URL.createObjectURL(originFileObj);
    setPreviewUrl(url);
    setFile(originFileObj);
  };

  return (
    <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px' }}>
      <div style={{ width: '300px', padding: '24px', backgroundColor: colorBgContainer, borderRadius: '8px' }}>
        <Text strong style={{ display: 'block', textAlign: 'center', fontSize: '20px', marginBottom: '24px', fontFamily: 'Roboto, sans-serif' }}>注册</Text>
        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              onChange={handleChange}
            >
              {previewUrl
                ? <Avatar src={previewUrl} alt="avatar" style={{ width: '100%', height: '100%' }} />
                : <Avatar size={100} icon={<UserOutlined />} />
              }
            </Upload>
          </div>
          <Form.Item
            name="email"
            rules={[{ required: true, message: '请输入邮箱!' }]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: '请确认密码!' }]}
          >
            <Input.Password placeholder="请确认密码" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              注册
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link href={'/auth/login'} aria-disabled={isLoading}>已有账号? 立即登录</Link>
        </div>
      </div>
    </Content>
  );
};