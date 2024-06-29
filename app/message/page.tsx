import { MessageOutlined } from "@ant-design/icons";
import { Result } from "antd";
import { Content } from "antd/es/layout/layout";
export default function Message() {
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
        icon={<MessageOutlined />}
        title="找个小伙伴一起聊天吧～"
      />
    </Content>
  )
}