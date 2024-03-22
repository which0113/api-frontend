import {ProColumns, ProFormColumnsType} from '@ant-design/pro-components';

export const UserAddModalFormColumns: ProFormColumnsType<API.UserVO, "text">[] = [
  {
    title: 'id',
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: "id"
  },
  {
    title: '名称',
    dataIndex: 'userName',
    key: "userName",
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    title: '用户账号',
    dataIndex: 'userAccount',
    key: "userAccount",
    formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (!value || value.length < 0) {
              return Promise.reject(new Error("用户账号为必填项"));
            }
            return Promise.resolve();
          },
          required: true
        })],
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
  }, {
    title: '密码',
    key: "userPassword",
    dataIndex: 'userPassword',
    width: 'lg',
    colProps: {
      span: 24,
    }, formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (!value || value.length < 0) {
              return Promise.reject(new Error("用户密码为必填项"));
            }
            return Promise.resolve();
          },
          required: true
        })],
    },
  }, {
    title: '性别',
    dataIndex: 'gender',
    key: "gender",
    valueType: "radio",
    valueEnum: {
      "2": {
        text: '保密',
      },
      "0": {
        text: '男',
      },
      "1": {
        text: '女',
      }
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
    formItemProps: {
      initialValue: "2", // 设置初始值为"2"，即保密
    },
  }, {
    title: '角色/权限',
    dataIndex: 'userRole',
    valueType: "radio",
    key: 'userRole',
    valueEnum: {
      "user": {
        text: '普通用户',
      },
      "admin": {
        text: '管理员',
        status: 'default'
      }
    },
    formItemProps: {
      initialValue: "user", // 设置初始值为"user"，即普通用户
    },
  },
  {
    title: '积分',
    key: "balance",
    dataIndex: 'balance',
    width: 'lg',
    colProps: {
      span: 24,
    },
    formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (value && value < 0) {
              return Promise.reject(new Error("积分不能为负数"));
            }
            return Promise.resolve();
          },
        })],
    },
  },
];
export const UserUpdateModalFormColumns: ProFormColumnsType<API.UserVO, "text">[] = [
  {
    title: 'id',
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: "id"
  },
  {
    title: '名称',
    dataIndex: 'userName',
    key: "userName",
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: "gender",
    valueType: "radio",
    valueEnum: {
      "2": {
        text: '保密',
      },
      "0": {
        text: '男',
      },
      "1": {
        text: '女',
      }
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
  }, {
    title: '角色/权限',
    dataIndex: 'userRole',
    valueType: "radio",
    key: 'userRole',
    valueEnum: {
      "user": {
        text: '普通用户',
      },
      "admin": {
        text: '管理员',
        status: 'default'
      }
    }
  },
  {
    title: '积分',
    key: "balance",
    dataIndex: 'balance',
    width: 'lg',
    colProps: {
      span: 24,
    },
    formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (value && value < 0) {
              return Promise.reject(new Error("积分不能为负数"));
            }
            return Promise.resolve();
          },
        })],
    },
  },
  {
    title: '密码',
    key: "userPassword",
    dataIndex: 'userPassword',
    width: 'lg',
    colProps: {
      span: 24,
    }, formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (value && value.length < 0) {
              return Promise.reject(new Error("用户密码为必填项"));
            }
            return Promise.resolve();
          },
        })],
    },
  },
];


export const UserColumns: ProColumns<API.UserVO>[] = [
  {
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: 'id',
  },
  {
    title: '昵称',
    dataIndex: 'userName',
    copyable: true,
    ellipsis: true,
    key: 'userName',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    valueType: 'text',
    copyable: true,
    key: 'userAccount',
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
    valueType: 'image',
    key: 'userAvatar',
    search: false
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    valueType: 'text',
    copyable: true,
    key: 'email',
  },
  {
    title: '积分',
    dataIndex: 'balance',
    valueType: 'text',
    copyable: true,
    key: 'balance',
    // @ts-ignore
    sorter: (a, b) => a.balance - b.balance,
  },
  {
    title: '角色/权限',
    dataIndex: 'userRole',
    key: 'userRole',
    filters: true,
    onFilter: true,
    valueEnum: {
      "user": {
        text: '普通用户',
        status: 'default'
      },
      "admin": {
        text: '管理员',
        status: 'success'
      },
      "demo": {
        text: '仅查询',
        status: 'error'
      }
    }
  },
  {
    title: '性别',
    dataIndex: 'gender',
    filters: true,
    onFilter: true,
    key: 'gender',
    valueEnum: {
      "2": {
        text: '保密',
      },
      "0": {
        text: '男',
      },
      "1": {
        text: '女',
      }
    }
  },
];

export default UserColumns;
