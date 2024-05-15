import Footer from '@/components/Footer';
import {
  getEmailCaptchaUsingGet,
  userEmailRegisterUsingPost,
  userRegisterUsingPost
} from '@/services/api-backend/userController';
import {Link, useParams} from '@@/exports';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MailOutlined,
  RedditOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {LoginForm, ProFormText} from '@ant-design/pro-components';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {Helmet, history} from '@umijs/max';
import {Form, message, Tabs} from 'antd';
import React, {useEffect, useState} from 'react';
import Settings from '../../../../config/defaultSettings';
import {ProFormCaptcha} from "@ant-design/pro-form";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ActionIcons = () => {
  const langClassName = useEmotionCss(({token}) => {
    return {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    };
  });
  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={langClassName}/>
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={langClassName}/>
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={langClassName}/>
    </>
  );
};

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const [invitationCode, setInvitationCode] = useState<string>('');
  const [form] = Form.useForm();
  const params = useParams()
  const loginPath = '/user/login';

  useEffect(() => {
    if (params.id) {
      setInvitationCode(params.id);
      form.setFieldsValue(invitationCode)
    }
  }, [params.id]);

  useEffect(() => {
    form.setFieldsValue({invitationCode});
  }, [invitationCode]);
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const doRegister = (res: any) => {
    if (res?.data && res?.code === 0) {
      message.success('注册成功');
      setTimeout(() => {
        history.push(loginPath);
      }, 100);
    }
  }

  const handleSubmit = async (values: API.UserRegisterRequest) => {
    // 修改密码
    const userPassword = values?.userPassword;
    const checkPassword = values?.checkPassword;
    // @ts-ignore
    if (userPassword.length < 8 || checkPassword?.length < 8) {
      message.info('密码过短，不能低于8位字符');
      return;
    }
    if (userPassword !== checkPassword) {
      message.info('两次输入的密码不一致');
      return;
    }
    try {
      // 登录
      const res = await userRegisterUsingPost({
        ...values,
      });
      doRegister(res)
    } catch (error) {
      message.error('注册失败');
    }
  };

  const handleEmailSubmit = async (values: API.UserEmailRegisterRequest) => {
    try {
      // 登录
      const res = await userEmailRegisterUsingPost({
        ...values,
      });
      doRegister(res)
    } catch (error) {
      message.error('注册失败');
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'注册账号'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          form={form}
          submitter={
            {
              searchConfig: {
                submitText: "注册"
              }
            }}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="https://img.freefish.love/logo.png"/>}
          title="咸鱼-API平台"
          subTitle={'稳定、安全、高效'}
          initialValues={{
            invitationCode: invitationCode
          }}
          onFinish={async (values) => {
            if (type === "account") {
              await handleSubmit(values as API.UserRegisterRequest);
            } else {
              await handleEmailSubmit(values as API.UserEmailRegisterRequest);
            }
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '平台账号注册',
              },
              {
                key: 'email',
                label: '邮箱账号注册',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userName"
                fieldProps={{
                  size: 'large',
                  prefix: <RedditOutlined/>,
                }}
                placeholder={'请输入昵称'}
              />
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'请确认密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                ]}
              />
            </>
          )}
          {type === 'email' && (
            <>
              <ProFormText
                name="userName"
                fieldProps={{
                  size: 'large',
                  prefix: <RedditOutlined/>,
                }}
                placeholder={'请输入昵称'}
              />
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined/>,
                }}
                name="emailAccount"
                placeholder={'请输入邮箱账号'}
                rules={[
                  {
                    required: true,
                    message: '邮箱账号是必填项！',
                  },
                  {
                    pattern: /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/,
                    message: '不合法的邮箱账号！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'秒后重新获取'}`;
                  }
                  return '获取验证码';
                }}
                phoneName={"emailAccount"}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项！',
                  },
                ]}
                onGetCaptcha={async (emailAccount) => {
                  const res = await getEmailCaptchaUsingGet({emailAccount})
                  if (res?.data && res?.code === 0) {
                    message.success("验证码发送成功")
                    return
                  }
                }}
              />
            </>
          )}
          <div
            style={{
              marginTop: 20,
            }}
          >
            <Link
              to={'/'}
              style={{
                float: 'left',
                marginBottom: 20
              }}
            >
              首页
            </Link>
            <Link
              to={'/user/login'}
              style={{
                float: 'right',
                marginBottom: 20
              }}
            >
              已有账号?点击前往登录
            </Link>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Register;
