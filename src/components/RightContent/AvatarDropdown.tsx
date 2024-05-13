import {LoginOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {history, useModel} from '@umijs/max';
import type {MenuInfo} from 'rc-menu/lib/interface';
import React, {useCallback} from 'react';
import {flushSync} from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import {valueLength} from "@/pages/User/UserInfo";
import {userLogoutUsingPost} from "@/services/api-backend/userController";
import {message} from "antd";

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const {initialState} = useModel('@@initialState');
  const {loginUser} = initialState || {};
  return <p className="anticon">{valueLength(loginUser?.userName) ? loginUser?.userName : '无名氏'}</p>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({children}) => {
  const {initialState, setInitialState} = useModel('@@initialState');
  const {loginUser} = initialState || {};
  const loginPath = '/user/login';

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    const res = await userLogoutUsingPost();
    if (!res?.data) {
      return;
    }
    localStorage.removeItem("token");
    message.success("已退出");
    history.push(loginPath);
  };

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const {key} = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s: any) => ({...s, loginUser: undefined}));
        });
        loginOut();
        return;
      }
      if (key === 'center') {
        history.push(`/account/${key}`);
        return;
      }
      if (key === 'login') {
        history.push(`/user/login`);
        return;
      }
    },
    [setInitialState],
  );

  const menuItems = [
    {
      key: 'center',
      icon: <UserOutlined/>,
      label: '个人中心',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined/>,
      danger: true,
      label: '退出登录',
    }
  ];

  return (
    loginUser ? <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown> : <HeaderDropdown menu={{
      selectedKeys: [],
      onClick: onMenuClick,
      items: [{
        key: 'login',
        icon: <LoginOutlined/>,
        label: '登录账号',
      }],
    }}>
      {children}
    </HeaderDropdown>
  )
};
