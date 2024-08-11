import { Rule } from "antd/es/form";

export interface RequiredProp {
  type: 'input' | 'input.password' | 'upload' | 'button' | 'submit' | 'row', // item 类型
  label?: string; // item 左侧label内容
  name?: string; // item 的name
  placeholder?: string; // item 的placeholder
  span?: number; // row类型用于设置children的span
  rules?: Rule[];
  children?: RequiredProp[];
  onChange?: (arg: any) => void | Promise<void>;
  onClick?: (arg: any) => void | Promise<void>;
}
