import {deleteChartUsingPost, listChartByMyPageUsingGet} from '@/services/api-backend/chartController';

import {useModel} from '@@/exports';
import {Avatar, Button, Card, List, message, Popconfirm, Result, Spin, Tooltip} from 'antd';
import ReactECharts from 'echarts-for-react';
import React, {useEffect, useState} from 'react';
import Search from "antd/es/input/Search";
import ProCard from "@ant-design/pro-card";
import html2canvas from "html2canvas";
import {UserOutlined} from "@ant-design/icons";

/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {
    const initSearchParams = {
      current: 1,
      pageSize: 4,
      sortOrder: 'desc',
    };

    // @ts-ignore
    const [searchParams, setSearchParams] = useState<API.listChartByMyPageUsingGETParams>({...initSearchParams});
    const {initialState} = useModel('@@initialState');
    const {loginUser} = initialState ?? {};
    const [chartList, setChartList] = useState<API.ChartVO[]>();
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [socket, setSocket] = useState<WebSocket | undefined>();

    // 构建 WebSocket 连接 url
    const socketPreUrl = process.env.NODE_ENV === 'production' ?
      "wss://back.freefish.love/api/ws/" :
      "ws://localhost:9001/api/ws/";
    const socketUrl = socketPreUrl + loginUser?.id;

    // 头像
    const avatarUrl = (loginUser?.userAvatar ? loginUser?.userAvatar :
      'https://img.freefish.love/defaultAvatar.png') + '?' + new Date().getTime()

    const handleChartData = (res: any) => {
      setChartList(res?.data?.records ?? []);
      let dataTotal = res?.data?.total;
      setTotal(dataTotal ?? 0);
      // 隐藏图表的 title
      if (res?.data?.records) {
        res?.data?.records.forEach((data: any) => {
          if (data.chartStatus === 'succeed') {
            JSON.parse(data.genChart ?? '{}');
            const chartOption = JSON.parse(data.genChart ?? '{}');
            chartOption.title = undefined;
            data.genChart = JSON.stringify(chartOption);
          }
        })
      }
    };

    const loadData = async () => {
      setLoading(true);
      const res = await listChartByMyPageUsingGet(searchParams);
      handleChartData(res);
      setLoading(false);
    };

    useEffect(() => {
        // 加载数据
        loadData();

        if (!socket) {
          try {
            const newSocket = new WebSocket(socketUrl);
            newSocket.onopen = () => {
              // message.success('ws连接成功');
              // newSocket.send('我上线了');
            };
            newSocket.onclose = () => {
              // message.info('ws连接断开');
            };
            // 收到消息时重新加载数据
            newSocket.onmessage = () => {
              // message.success('消息来喽~');
              loadData();
              // newSocket.send('我收到消息了');
            };
            setSocket(newSocket);
          } catch (e: any) {
            // console.log('ws连接失败：' + e.message);
            // message.error('ws连接失败');
          }
        }

        // 组件卸载时关闭 WebSocket 连接
        return () => {
          // 可以不用关闭，浏览器关闭 WebSocket 连接会自动关闭
          if (socket) {
            // socket.close();
            // message.info('ws连接断开');
          }
        };
      }, [searchParams]
    );

    /**
     *  Delete node
     * @zh-CN 删除节点
     *
     * @param chart
     */
    const handleRemove = async (chart: API.ChartVO) => {
      if (chart.chartStatus === 'wait' || chart.chartStatus === 'running') {
        message.info('请稍等');
        return;
      }
      const hide = message.loading('正在删除');
      if (!chart) return true;
      try {
        const res = await deleteChartUsingPost({
          id: chart.id,
        });
        hide();
        if (res?.data) {
          message.success('删除成功');
          // 刷新数据
          loadData();
        }
        return true;
      } catch (error: any) {
        hide();
        message.error('删除失败');
        return false;
      }
    };

    const confirm = async (chart: API.ChartVO) => {
      const result = await handleRemove(chart);
      if (result) {
        // console.log('删除成功！');
      } else {
        // console.log('删除失败！');
      }
    };

    const cancel = () => {
      message.success('已取消');
    };

// 定义一个函数来将卡片转换为图片并触发下载
    const downloadCardAsImage = (chart: API.ChartVO) => {
      // if (chart.chartStatus === 'wait' || chart.chartStatus === 'running') {
      //   message.info('请稍等');
      //   return;
      // }
      try {
        const id = chart.id ? chart.id.toString() : '0';
        const cardElement = document.getElementById(id);
        if (cardElement instanceof HTMLElement) {
          // 生成图片
          html2canvas(cardElement, {
            scale: 10,
            allowTaint: true,
            useCORS: true,
            ignoreElements: (element) => {
              return element.matches(`#b-${chart.id}`);
            }
          }).then(canvas => {
            // 创建一个 <a> 标签
            const downloadLink = document.createElement('a');
            // 将画布转换为图片 URL
            // 设置 <a> 标签的 href 属性为图片 URL
            downloadLink.href = canvas.toDataURL();
            // 设置下载属性为文件名
            downloadLink.download = `${chart.name}-${chart.chartType}.png`;
            // 将 <a> 标签添加到页面
            document.body.appendChild(downloadLink);
            // 触发点击事件
            downloadLink.click();
            // 清理掉之前添加的 <a> 标签
            document.body.removeChild(downloadLink);

            message.success('下载成功');
          });
        } else {
          // 显示按钮容器
          message.error('下载失败');
          console.error(`未找到 ID 为 ${id} 的卡片元素`);
        }
      } catch (e) {
        message.error('下载失败');
        console.error('下载错误：' + e);
      }
    };

    return (
      <div className="my-chart-page">
        <Card hoverable>
          <ProCard layout="center">
            <Search
              showCount
              allowClear
              size={"large"}
              maxLength={50}
              enterButton="搜索"
              placeholder={"请输入搜索词"}
              onSearch={(value) => {
                // 设置搜索条件
                // @ts-ignore
                setSearchParams({
                  ...initSearchParams,
                  name: value,
                  chartType: value,
                  goal: value,
                  genResult: value,
                })
              }}
              style={{maxWidth: 600, height: 40}}/>
          </ProCard>
        </Card>
        <br/>
        <br/>
        <div className="margin-16"/>
        <Spin spinning={loading}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 1,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
            pagination={{
              onChange: (page, pageSize) => {
                setSearchParams({
                  ...searchParams,
                  // @ts-ignore
                  current: page,
                  // @ts-ignore
                  pageSize,
                })
              },
              // @ts-ignore
              current: searchParams.current,
              // @ts-ignore
              pageSize: searchParams.pageSize,
              total: total,
            }}
            dataSource={chartList}
            renderItem={(item: API.ChartVO) => (
              <List.Item>
                <ProCard key={item.id} id={item.id?.toString()} hoverable style={{width: '100%'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          crossOrigin={'anonymous'}
                          src={avatarUrl}
                          icon={<UserOutlined/>}
                        />
                      }
                      title={item.name}
                      description={item.chartType ? '图表类型：' + item.chartType : undefined}
                    />
                    <p>{item.updateTime ? item.updateTime.split('T')[0] : ''}</p>
                  </div>
                  <>
                    {
                      item.chartStatus === 'wait' && <>
                        <Result
                          status="warning"
                          title="待生成"
                          subTitle={item.execMessage ?? '当前图表生成队列繁忙，请耐心等候'}
                        />
                      </>
                    }
                    {
                      item.chartStatus === 'running' && <>
                        <Result
                          status="info"
                          title="图表生成中"
                          subTitle={item.execMessage}
                        />
                      </>
                    }
                    {
                      item.chartStatus === 'succeed' && <>
                        <div style={{marginBottom: 16}}/>
                        <p><strong>目标：</strong> {item.goal}</p>
                        <p><strong>分析结论：</strong> {item.genResult}</p>
                        <div style={{marginBottom: 16}}/>
                        <ReactECharts option={item.genChart && JSON.parse(item.genChart)}/>
                      </>
                    }
                    {
                      item.chartStatus === 'failed' && <>
                        <Result
                          status="error"
                          title="图表生成失败"
                          // subTitle={item.execMessage}
                        />
                      </>
                    }
                  </>
                  <div id={"b-" + item.id?.toString()} style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Tooltip color="green" title="放缩页面试试~">
                      <Button
                        type="primary"
                        onClick={() => downloadCardAsImage(item)}>下载
                      </Button>
                    </Tooltip>
                    <Popconfirm
                      title="请确认是否删除！"
                      onConfirm={() => confirm(item)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger>删除</Button>
                    </Popconfirm>
                  </div>
                </ProCard>
              </List.Item>
            )}
          />
        </Spin>
      </div>
    );
  }
;

export default MyChartPage;

