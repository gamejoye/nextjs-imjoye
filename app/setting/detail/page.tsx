'use client';

import { useUser } from '@/hooks/global';
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, Row, Upload } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";

export default function Detail() {
  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState<string | undefined>(user?.avatarUrl);

  const handleFinish = () => {
    
  };

  const handleImageUpload = () => {
  };
  return (
    <Content style={{
      padding: '50px',
      width: '100%',
    }}>
      <Form
        layout="vertical"
        initialValues={{
          username: user?.username,
          email: user?.email,
          description: user?.description,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Form.Item>
              <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleImageUpload}
              >
                {imageUrl === undefined
                  ? <Avatar
                    size={192}
                    icon={<UserOutlined />}
                    alt="avatar"
                    style={{ marginTop: '10px' }}
                  />
                  : <Avatar
                    size={192}
                    src={imageUrl}
                    alt="avatar"
                    style={{ marginTop: '10px' }}
                  />
                }
              </Upload>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="电子邮箱" name="email">
              <Input disabled addonAfter={<a>修改</a>} />
            </Form.Item>

            <Form.Item label="我的昵称" name="username">
              <Input maxLength={20} />
            </Form.Item>

            <Form.Item label="个性签名" name="description">
              <Input.TextArea maxLength={500} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存修改
              </Button>
            </Form.Item></Col>
        </Row>
      </Form>
    </Content>
  );
}
