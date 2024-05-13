import {useModel} from '@umijs/max';
import {
  Button,
  Descriptions,
  message,
  Modal,
  Radio,
  Spin,
  Tooltip,
  Tour,
  TourProps,
  Upload,
  UploadFile,
  UploadProps
} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {RcFile} from "antd/es/upload";
import {EditOutlined, PlusOutlined, VerticalAlignBottomOutlined} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import {
  getLoginUserUsingGet,
  updateUserPasswordUsingPost,
  updateUserUsingPost,
  updateVoucherUsingPost,
  userBindEmailUsingPost,
  userCheckInUsingPost,
  userUnBindEmailUsingPost
} from "@/services/api-backend/userController";
import Settings from '../../../../config/defaultSettings';
import Paragraph from "antd/lib/typography/Paragraph";
import ProCard from "@ant-design/pro-card";
import {requestConfig} from "@/requestConfig";
import SendGiftModal from "@/components/Gift/SendGift";
import EmailModal from "@/components/EmailModal";
import PasswordModal from "@/components/PasswordModal";

export const valueLength = (val: any) => {
  return val && val.trim().length > 0
}
const UserInfo: React.FC = () => {
    const unloadFileTypeList = ["image/jpeg", "image/jpg", "image/svg", "image/png", "image/webp", "image/jfif"]
    const {initialState, setInitialState} = useModel('@@initialState');
    const {loginUser} = initialState || {}
    const [previewOpen, setPreviewOpen] = useState(false);
    const [voucherLoading, setVoucherLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const handleCancel = () => setPreviewOpen(false);
    const [userName, setUserName] = useState<string | undefined>('');
    const [gender, setGender] = useState<string | undefined>('');
    const [open, setOpen] = useState(false);
    const [openEmailModal, setOpenEmailModal] = useState(false);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const [openTour, setOpenTour] = useState<boolean>(false);

    const steps: TourProps['steps'] = [
      {
        title: '个人信息设置',
        description: <span>这里是你的账号信息，您可以便捷的查看您的基本信息。<br/>您还可以修改和更新昵称和头像。</span>,
        target: () => ref1.current,
      },
      {
        title: '接口调用凭证',
        description: '这里是您调用接口的凭证，没有凭证将无法调用接口',
        target: () => ref2.current,
      },
      {
        title: '开发者SDK',
        description: '您可以使用开发者SDK，快速高效的接入接口到您的项目中',
        target: () => ref3.current,
      }
    ];

    const loadData = async () => {
      setLoading(true)
      const res = await getLoginUserUsingGet();
      if (res?.data && res?.code === 0) {
        if (initialState?.settings.navTheme === "light") {
          setInitialState({loginUser: res?.data, settings: {...Settings, navTheme: "light"}})
        } else {
          setInitialState({loginUser: res?.data, settings: {...Settings, navTheme: "realDark"}})
        }
        const updatedFileList = [...fileList];
        if (loginUser && loginUser.userAvatar) {
          updatedFileList[0] = {
            // @ts-ignore
            uid: loginUser?.userAccount,
            name: loginUser?.userAvatar?.substring(loginUser?.userAvatar!.lastIndexOf('-') + 1),
            status: "done",
            percent: 100,
            url: loginUser?.userAvatar
          }
          setFileList(updatedFileList);
        }
        setUserName(loginUser?.userName)
        setLoading(false)
      }
      // PC端显示指引
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        setOpenTour(false)
      } else {
        const tour = localStorage.getItem('tour');
        if (!tour) {
          setOpenTour(true)
        }
      }
    }

    useEffect(() => {
      loadData();
    }, [])

    const getBase64 = (file: RcFile): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

    const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
      }
      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
    };

    const uploadButton = () => {
      return (
        <div>
          <PlusOutlined/>
          <div style={{marginTop: 8}}>Upload</div>
        </div>
      );
    }

    const beforeUpload = async (file: RcFile) => {
      const fileType = unloadFileTypeList.includes(file.type)
      if (!fileType) {
        message.error('请上传正确的图片格式');
      }
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        message.error('图片大小不能超过1M');
      }
      if (!isLt2M && !fileType) {
        const updatedFileList = [...fileList];
        updatedFileList[0] = {
          // @ts-ignore
          uid: loginUser?.userAccount,
          // @ts-ignore
          name: "error",
          status: "error",
          percent: 100
        }
        setFileList(updatedFileList);
        return false
      }
      return fileType && isLt2M;
    };

    const updateVoucher = async () => {
      setVoucherLoading(true)
      const res = await updateVoucherUsingPost();
      if (res?.data && res?.code === 0) {
        setInitialState({loginUser: res?.data, settings: Settings})
        setTimeout(() => {
          message.success(`凭证更新成功`);
          setVoucherLoading(false)
        }, 800);
      }
    }

    const updateUserInfo = async () => {
      let avatarUrl = ''
      if (fileList && fileList[0] && valueLength(fileList[0].url)) {
        // @ts-ignore
        avatarUrl = fileList[0].url
      }
      const res = await updateUserUsingPost({
        // @ts-ignore
        userAvatar: avatarUrl,
        id: loginUser?.id,
        userName: userName,
        gender: gender,
      })
      if (res?.data && res?.code === 0) {
        setInitialState({loginUser: res?.data, settings: Settings})
        message.success(`信息更新成功`);
      }
    }

    const token = localStorage.getItem("token")
    const headers = {
      token: JSON.parse(token === null ? "" : token)
    }

    const props: UploadProps = {
      name: 'file',
      withCredentials: true,
      action: `${requestConfig.baseURL}api/file/upload?biz=user_avatar`,
      onChange: async function ({file, fileList: newFileList}) {
        const {response} = file;
        if (file.response && response.data) {
          const {data: {status, url}} = response
          const updatedFileList = [...fileList];
          if (response.code !== 0 || status === 'error') {
            file.status = "error"
            updatedFileList[0] = {
              // @ts-ignore
              uid: loginUser?.userAccount,
              // @ts-ignore
              name: loginUser?.userAvatar ? loginUser?.userAvatar?.substring(loginUser?.userAvatar!.lastIndexOf('-') + 1) : "error",
              status: "error",
              percent: 100
            }
            setFileList(updatedFileList);
            return
          }
          file.status = status
          updatedFileList[0] = {
            // @ts-ignore
            uid: loginUser?.userAccount,
            // @ts-ignore
            name: loginUser?.userAvatar?.substring(loginUser?.userAvatar!.lastIndexOf('-') + 1),
            status: status,
            url: url,
            percent: 100
          }
          setFileList(updatedFileList);
        } else {
          setFileList(newFileList);
        }
      },
      headers: headers,
      listType: "picture-circle",
      onPreview: handlePreview,
      fileList: fileList,
      beforeUpload: beforeUpload,
      maxCount: 1,
      progress: {
        strokeColor: {
          '0%': '#108ee9',
          '100%': '#87d068',
        },
        strokeWidth: 3,
        format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
      },
    };

    const handleBindEmailSubmit = async (values: API.UserBindEmailRequest) => {
      // 绑定邮箱
      const res = await userBindEmailUsingPost({
        ...values,
      });
      if (res?.data && res?.code === 0) {
        if (initialState?.settings.navTheme === "light") {
          setInitialState({loginUser: res?.data, settings: {...Settings, navTheme: "light"}})
        } else {
          setInitialState({loginUser: res?.data, settings: {...Settings, navTheme: "realDark"}})
        }
        setOpenEmailModal(false)
        message.success('绑定成功');
      }
    };

    const handleUnBindEmailSubmit = async (values: API.UserUnBindEmailRequest) => {
      // 解绑邮箱
      const res = await userUnBindEmailUsingPost({...values});
      if (res?.data && res?.code === 0) {
        if (initialState?.settings.navTheme === "light") {
          setInitialState({loginUser: res?.data, settings: {...Settings, navTheme: "light"}})
        } else {
          setInitialState({loginUser: res?.data, settings: {...Settings, navTheme: "realDark"}})
        }
        setOpenEmailModal(false)
        message.success('解绑成功');
      }
    };

    const handleUpdatePasswordSubmit = async (values: API.UserUpdatePasswordRequest) => {
      // 修改密码
      const userOldPassword = values.userOldPassword;
      const userNewPassword = values.userNewPassword;
      // @ts-ignore
      if (userOldPassword.length < 8 || userNewPassword?.length < 8) {
        message.error('密码过短，不能低于8位字符');
        return;
      }
      if (userOldPassword === userNewPassword) {
        message.info('新密码不能于旧密码相同');
        return;
      }

      const res = await updateUserPasswordUsingPost({
        ...values,
        id: loginUser?.id
      });
      if (res?.data && res?.code === 0) {
        if (res?.data === true) {
          setOpenPasswordModal(false)
          message.success('修改密码成功');
        } else {
          message.info('新密码不能和旧密码相同');
        }
      }
    };

    /**
     * 签到
     */
    const handleCheckIn = async () => {
      try {
        const res = await userCheckInUsingPost();
        if (res?.code === 0) {
          if (res?.data) {
            message.success('签到成功 积分+5');
            loadData();
          } else {
            message.info('今日已签到');
          }
        }
      } catch (e: any) {
        message.error('签到失败');
      }
    };

    return (
      <Spin spinning={loading}>
        <ProCard
          type="inner"
          bordered
          direction="column"
        >
          <ProCard
            ref={ref1}
            extra={
              <>
                <Tooltip title={"用于接收信息"}>
                  <Button onClick={() => setOpenEmailModal(true)}>
                    {loginUser?.email ? '更新邮箱' : "绑定邮箱"}
                  </Button>
                </Tooltip>
                <Tooltip title={"提交修改的信息"}>
                  <Button style={{marginLeft: 10}} onClick={updateUserInfo}>提交修改</Button>
                </Tooltip>
              </>
            }
            title={<strong>个人信息设置</strong>}
            type="inner"
            bordered
          >
            <Descriptions.Item>
              <ImgCrop
                rotationSlider
                quality={1}
                aspectSlider
                maxZoom={4}
                cropShape={"round"}
                zoomSlider
                showReset
              >
                <Upload {...props}>
                  {fileList.length >= 1 ? undefined : uploadButton()}
                </Upload>
              </ImgCrop>
              <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
                <img alt={''}
                     style={{width: '100%'}}
                     src={previewImage ? previewImage : 'https://img.freefish.love/defaultAvatar.png'}/>
              </Modal>
            </Descriptions.Item>
            <Descriptions column={1}>
              <div>
                <h4>昵称：</h4>
                <Paragraph
                  editable={
                    {
                      icon: <EditOutlined/>,
                      tooltip: '编辑',
                      onChange: (value) => {
                        setUserName(value)
                      }
                    }
                  }
                >
                  {valueLength(userName) ? userName : '无名氏'}
                </Paragraph>
                <Button
                  style={{marginLeft: "10px"}}
                  size={"small"}
                  onClick={() => setOpenPasswordModal(true)}>修改密码</Button>
              </div>
              <div>
                <h4>性别：</h4>
                <Paragraph>
                  <Radio.Group
                    onChange={(e) => setGender(e?.target?.value)}
                    value={gender}
                    defaultValue={
                      valueLength(loginUser?.gender) ? loginUser?.gender : '2'
                    }>
                    <Radio value="0">男</Radio>
                    <Radio value="1">女</Radio>
                    <Radio value="2">保密</Radio>
                  </Radio.Group>
                </Paragraph>
              </div>
              <div>
                <h4>我的邮箱：</h4>
                <Paragraph
                  copyable={valueLength(loginUser?.email)}
                >
                  {valueLength(loginUser?.email) ? loginUser?.email : '未绑定邮箱'}
                </Paragraph>
              </div>
              <div>
                <h4>我的积分：</h4>
                <Paragraph
                  copyable={valueLength(loginUser?.balance)}
                >
                  {valueLength(loginUser?.balance) ? loginUser?.balance : 0}
                </Paragraph>
                <Button
                  style={{marginLeft: "10px"}}
                  size={"small"}
                  onClick={handleCheckIn}>每日签到</Button>
              </div>
            </Descriptions>
          </ProCard>
          <br/>
          <ProCard
            ref={ref2}
            bordered
            type="inner"
            title={"开发者凭证（调用接口的凭证）"}
            extra={
              <Button
                loading={voucherLoading}
                onClick={updateVoucher}>{(loginUser?.accessKey && loginUser?.secretKey) ? "更新" : "生成"}凭证</Button>
            }
          >
            {
              (loginUser?.accessKey && loginUser?.secretKey) ? (
                <Descriptions column={1}>
                  <Descriptions.Item label="AccessKey">
                    <Paragraph copyable={valueLength(loginUser?.accessKey)}>
                      {loginUser?.accessKey}
                    </Paragraph>
                  </Descriptions.Item>
                  <Descriptions.Item label="SecretKey">
                    <Paragraph copyable={valueLength(loginUser?.secretKey)}>
                      {loginUser?.secretKey}
                    </Paragraph>
                  </Descriptions.Item>
                </Descriptions>) : "暂无凭证,请先生成凭证"
            }
          </ProCard>
          <br/>
          <ProCard
            ref={ref3}
            type="inner"
            title={<strong>开发者 SDK（快速接入API接口）</strong>}
            bordered
          >
            <Button size={"large"}>
              <a target={"_blank"} href={"https://github.com/which0113/api-sdk"}
                 rel="noreferrer"><VerticalAlignBottomOutlined/> Java SDK</a>
            </Button>
          </ProCard>
        </ProCard>
        <SendGiftModal invitationCode={loginUser?.invitationCode} onCancel={() => {
          setOpen(false)
        }} open={open}/>
        <EmailModal unbindSubmit={handleUnBindEmailSubmit}
                    bindSubmit={handleBindEmailSubmit} data={loginUser}
                    onCancel={() => setOpenEmailModal(false)}
                    open={openEmailModal}/>
        <PasswordModal updateSubmit={handleUpdatePasswordSubmit}
                       onCancel={() => setOpenPasswordModal(false)}
                       open={openPasswordModal}/>
        <Tour open={openTour} onClose={() => {
          setOpenTour(false)
          localStorage.setItem('tour', "true");
        }} steps={steps}/>
      </Spin>
    );
  }
;

export default UserInfo;
