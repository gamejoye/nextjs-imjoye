import { ChatWindow } from "@/component/ChatWindow";
import imjcManager from "@/imjc/imjc";
import { getUserInfo, initServer } from "@/utils/server";
import { Result } from "antd";
import { Content } from "antd/es/layout/layout";

export default async function ChatWindowPage({ params }: { params: { id: string } }) {
  initServer();
  const id = params.id;
  const isValidId = id.split('').every((ch) => ('0' <= ch && ch <= '9')) && parseInt(id) > 0;
  if (!isValidId) return <ChatWindowNotFound />;
  const chatroomId = parseInt(id);
  const userId = getUserInfo().userId;
  let found = true;
  const summary = await imjcManager
    .getChatroomSummaryFromRemote(
      userId,
      chatroomId,
      (err) => {
        found = false;
      },
    );
  if (!found) return <ChatWindowNotFound />;
  return (
    <Content>
      <ChatWindow summary={summary} />
    </Content>
  )
}

function ChatWindowNotFound() {
  return (
    <Content
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="当前聊天室不存在或者您无权访问噢～"
      />
    </Content>
  )
}