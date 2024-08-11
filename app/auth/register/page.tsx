'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, Avatar, message, Typography, Row, Col } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import appServerApi from '@/api/appServerApi';
import { isCreated } from '@/api/web/issuccess';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';
import useToken from 'antd/es/theme/useToken';
import { genRegisterInfos } from '@/configs/auth/initRegister';
import { RequiredProp } from '@/configs/auth/base.type';
import { useForm } from 'antd/es/form/Form';
const { Text } = Typography;

export default function Register() {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const { colorBgContainer } = useToken()[1];
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
  }, [countdown]);

  const handleGenerateCode = async () => {
    form.validateFields(['email']).then(values => {
      const { email } = values;
      appServerApi.genEmailCode({ email });
      message.success('验证码已经发送');
      setCountdown(60);
    }).catch(errorInfo => {
      message.error('请先输入有效的邮箱地址');
    });
  }
  const onFinish = async ({
    email,
    username,
    password,
    confirmPassword,
    code,
  }: {
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    code: string
  }) => {
    try {
      if (password !== confirmPassword) {
        throw new Error('两次密码不一致');
      }
      setIsLoading(true);
      const res = await appServerApi.uploadAvatar(file as File);
      if (!isCreated(res.statusCode)) {
        throw new Error('头像上传失败: ' + res.message);
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
        code,
      });
      if (!isCreated(statusCode)) {
        throw new Error('注册失败: ' + registerMessage);
      }
      router.push('/auth/login');
      message.success('注册成功');
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = async (info: UploadChangeParam<UploadFile<any>>) => {
    const originFileObj = info.file.originFileObj as RcFile;
    const url = URL.createObjectURL(originFileObj);
    setPreviewUrl(url);
    setFile(originFileObj);
  };

  const registerInfos = genRegisterInfos({
    onGenerateCode: handleGenerateCode,
    onAvatarChange: handleAvatarChange,
    onSubmit: onFinish,
  });

  const genItems = (item: RequiredProp, key = '') => {
    let Val;
    if (item.type === 'input') {
      Val = (
        <Input
          placeholder={item.placeholder}
        />
      );
    } else if (item.type === 'input.password') {
      Val = (<Input.Password />)
    } else if (item.type === 'submit') {
      Val = (
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '150px' }}
          disabled={isLoading}
        >
          登录
        </Button>
      )
    } else if (item.type === 'upload') {
      Val = (
        <Upload
          listType="picture-circle"
          showUploadList={false}
          onChange={item.onChange}
        >
          {previewUrl
            ? <Avatar src={previewUrl} alt="avatar" style={{ width: '100%', height: '100%' }} />
            : <Avatar size={100} icon={<UserOutlined />} />
          }
        </Upload>
      );
    } else if (item.type === 'button') {
      Val = (
        <Button disabled={!!countdown} style={{ width: '100px' }} onClick={item.onClick}>
          {countdown || item.name}
        </Button>
      )
    } else if (item.type === 'row') {
      const children = item.children || [];
      Val = (
        <Row gutter={8}>
          {children.map((child, index) => {
            return (
              <Col key={key + '-' + index} span={child.span}>
                {genItems(child)}
              </Col>
            )
          })}
        </Row>
      )
    } else {
      Val = null;
    }
    return Val;
  }

  return (
    <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px' }}>
      <div style={{ width: '400px', padding: '24px', backgroundColor: colorBgContainer, borderRadius: '50px' }}>
        <Text strong style={{ display: 'block', textAlign: 'center', fontSize: '20px', marginBottom: '24px', fontFamily: 'Roboto, sans-serif' }}>
          ✨ 创建新账户
        </Text>
        <Form
          labelCol={{ span: 6, }}
          wrapperCol={{ span: 16 }}
          name="register"
          form={form}
          onFinish={onFinish}
        >
          {
            registerInfos.map((item, index) => {
              return (
                <Form.Item
                  name={item.name}
                  label={item.label}
                  key={index + ''}
                  rules={item.rules}
                  wrapperCol={item.type === 'submit' ? { offset: 6, span: 18 } : undefined}
                >
                  {genItems(item, index + '')}
                </Form.Item>
              )
            })
          }
        </Form>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link href={'/auth/login'} aria-disabled={isLoading}>已有账号? 🌟 立即登录</Link>
        </div>
      </div>
    </Content >
  );
};