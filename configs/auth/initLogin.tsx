import { RequiredProp } from "./base.type";

export interface LoginPropsI {
  onSubmit: (values: { password: string, email: string, }) => void | Promise<void>;
}

export function genLoginInfos({
  onSubmit
}: LoginPropsI): RequiredProp[] {
  return [
    {
      type: 'input',
      label: '📧 邮箱',
      name: 'email',
      placeholder: '请输入邮箱',
      rules: [{ required: true, message: '请输入邮箱!' }]
    },
    {
      type: 'input.password',
      label: '🔒 密码',
      name: 'password',
      placeholder: '请输入密码',
      rules: [{ required: true, message: '请输入密码!' }],
    },
    {
      type: 'submit',
      name: '登录',
      onClick: onSubmit
    }
  ];
}