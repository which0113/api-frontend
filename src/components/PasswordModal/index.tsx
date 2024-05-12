import React, {useEffect, useRef} from "react";
import {Button, Modal} from "antd";
import {ProFormText} from "@ant-design/pro-form";
import {LockOutlined,} from "@ant-design/icons";
import {LoginForm} from "@ant-design/pro-components";
import {ProFormInstance} from "@ant-design/pro-form/lib";

export type Props = {
  open: boolean;
  onCancel: () => void;
  data?: boolean
  updateSubmit: (values: API.UserUpdatePasswordRequest) => Promise<void>;
};

const PasswordModal: React.FC<Props> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const {open, onCancel, updateSubmit} = props;
  useEffect(() => {
    // 关闭表单时刷新form
    if (!open) {
      formRef.current?.resetFields()
    }
  }, [open]);
  return (
    <Modal
      footer={null}
      centered
      open={open}
      width={500}
      onCancel={onCancel}
    >
      <LoginForm
        formRef={formRef}
        contentStyle={{
          minWidth: 280,
          maxWidth: '75vw',
        }}
        submitter={
          {
            render: () => {
              return [
                <>
                  <Button
                    type={"primary"}
                    block
                    onClick={() => {
                      formRef.current?.submit()
                    }}
                  >
                    {'更新密码'}
                  </Button>
                </>
              ];
            },
          }
        }
        onFinish={async (values) => {
          updateSubmit?.(values)
        }}
      >
        <ProFormText.Password
          name="userOldPassword"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined/>,
          }}
          placeholder={'请输入旧密码'}
          rules={[
            {
              required: true,
              message: '旧密码是必填项！',
            },
          ]}
        />
        <ProFormText.Password
          name="userNewPassword"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined/>,
          }}
          placeholder={'请输入新密码'}
          rules={[
            {
              required: true,
              message: '新密码是必填项！',
            },
          ]}
        />
      </LoginForm>
    </Modal>
  );
};

export default PasswordModal;
