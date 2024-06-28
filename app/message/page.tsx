import { ChatroomSummaryList } from "@/component/ChatroomSummaryList";
import imjcManager from "@/imjc/imjc";
import { initServer } from "@/utils/server";
import { Layout, message } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const siderWidth = 300;

export default async function Message() {
  initServer();
  const summaries = await imjcManager.getChatroomSummariesFromRemote(1, (err) => {
    message.error('获取聊天信息失败' + err.message);
  });
  return (
    <Layout style={{ minHeight: '100vh', fontFamily: 'Hiragino Sans GB' }}>
      <Sider
        width={siderWidth}
        style={{
          overflowY: 'auto',
          height: '100vh',
          position: 'fixed',
        }}
        theme="light"
      >
        <ChatroomSummaryList summaries={summaries} />
      </Sider>
      <Content style={{ marginLeft: siderWidth }}>
        聊天框
      </Content>
    </Layout>
  )
}