'use client';

import { GroupOutlined, UserOutlined } from "@ant-design/icons";
import {  MenuProps } from "antd";
import React from "react";
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
  getItem('用户设置', '/setting/detail', <UserOutlined />),
  getItem('个性设置', '/setting/personality', <GroupOutlined />),
];

export default function SettingLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <SubMenuLayout items={items} title="设置">
      {children}
    </SubMenuLayout>
  );
}