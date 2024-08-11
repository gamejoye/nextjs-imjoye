import { UploadFile } from "antd";
import { RequiredProp } from "./base.type";
import { UploadChangeParam } from "antd/es/upload";

export interface RegisterPropsI {
  onAvatarChange: (arg: UploadChangeParam<UploadFile>) => void | Promise<void>;
  onGenerateCode: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>;
  onSubmit: (values: {
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    code: string
  }) => void | Promise<void>;
}

export function genRegisterInfos({
  onAvatarChange,
  onGenerateCode,
  onSubmit
}: RegisterPropsI): RequiredProp[] {
  return [
    {
      type: 'upload',
      label: '😊 头像',
      name: 'avatar',
      rules: [{ required: true, message: '请上传头像!' }],
      onChange: onAvatarChange,
    },
    {
      type: 'input',
      label: '📧 邮箱',
      name: 'email',
      placeholder: '请输入邮箱',
      rules: [{ required: true, message: '请输入邮箱!' }]
    },
    {
      type: 'input',
      label: '👤 用户名',
      name: 'username',
      placeholder: '请输入用户名',
      rules: [{ required: true, message: '请输入用户名!' }]
    },
    {
      type: 'input.password',
      label: '🔒 密码',
      name: 'password',
      placeholder: '请输入密码',
      rules: [{ required: true, message: '请输入密码!' }],
    },
    {
      type: 'input.password',
      label: '🔒 确认密码',
      name: 'confirmPassword',
      placeholder: '请再次确认你的密码',
      rules: [{ required: true, message: '请确认密码!' }],
    },
    {
      type: 'row',
      name: 'code',
      label: '📬 验证码',
      rules: [{ required: true, message: '请输入验证码!' }],
      children: [
        {
          type: 'input',
          placeholder: '邮箱验证码',
          span: 12,
        },
        {
          type: 'button',
          name: '获取验证码',
          span: 12,
          onClick: onGenerateCode
        }
      ]
    },
    {
      type: 'submit',
      name: '注册',
      onClick: onSubmit
    }
  ];
}