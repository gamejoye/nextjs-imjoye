'use client';

import ChatroomSummariesProvider from "@/component/ChatroomSummariesProvider";
import { ChatroomSummaryList } from "@/component/ChatroomSummaryList";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";

const siderWidth = 300;

export default function MessageLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ChatroomSummariesProvider>
      <Layout hasSider style={{ height: '100vh' }}>
        <Sider
          width={siderWidth}
          style={{
            overflowY: 'auto',
            height: '100vh',
            position: 'fixed',
          }}
          theme="light"
        >
          <ChatroomSummaryList />
        </Sider>
        <div style={{ marginLeft: siderWidth, width: '100%' }}>
          {children}
        </div>
      </Layout>
    </ChatroomSummariesProvider>
  )
}