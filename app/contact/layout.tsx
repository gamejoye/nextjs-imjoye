'use client';

import { GroupOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import SubMenuLayout from "@/component/SubMenuLayout";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('好友', '/contact/friend', <UserOutlined />),
  getItem('群聊', '/contact/group', <GroupOutlined />),
];

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SubMenuLayout items={items} title="通讯录">
      {children}
    </SubMenuLayout>
  );
}