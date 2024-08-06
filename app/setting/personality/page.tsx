'use client';

import { useTheme } from "@/hooks/global";
import { Divider, Flex, Switch, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import Link from "next/link";
import { useEffect } from "react";

const { Text, Title } = Typography;

export default function Personality() {
  const {theme, setTheme} = useTheme();
  const handleSwitchChange = (checked: boolean) => {
    if (checked) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <Content style={{
      padding: '50px',
      width: '100%',
      height: '100%'
    }}>
      <Flex
        style={{ width: '100%' }}
        vertical
      >
        <Flex align="center" justify="space-between">
          <Flex vertical>
            <Title level={5} style={{ margin: 0 }}>主题颜色</Title>
            <Text type="secondary">
              当前主题颜色：{theme === 'light' ? '浅色' : '深色'}
            </Text>
          </Flex>
          <Switch
            checkedChildren="浅色"
            unCheckedChildren="深色"
            size={'default'}
            checked={theme === 'light'}
            onChange={handleSwitchChange}
          />
        </Flex>
        <Divider />
        <Flex align="center" justify="space-between">
          <Flex vertical>
            <Title level={5} style={{ margin: 0 }}>聊天背景</Title>
            <Text type="secondary">
              当前未设置聊天背景图
            </Text>
          </Flex>
          <Link href="#">修改</Link>
        </Flex>
      </Flex>
    </Content >
  );
}
