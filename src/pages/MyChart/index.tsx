import {deleteChartUsingPost, listMyChartByPageUsingGet} from '@/services/api-backend/chartController';

import {useModel} from '@@/exports';
import {Avatar, Button, Card, List, message, Popconfirm, Result, Tooltip} from 'antd';
import ReactECharts from 'echarts-for-react';
import React, {useEffect, useState} from 'react';
import Search from "antd/es/input/Search";
import ProCard from "@ant-design/pro-card";
import html2canvas from "html2canvas";

/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {
    const initSearchParams = {
      current: 1,
      pageSize: 4,
      sortField: 'createTime',
      sortOrder: 'desc',
    };

    // @ts-ignore
    const [searchParams, setSearchParams] = useState<API.listMyChartByPageUsingGetParams>({...initSearchParams});
    const {initialState} = useModel('@@initialState');
    const {loginUser} = initialState ?? {};
    const [chartList, setChartList] = useState<API.Chart[]>();
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const handleChartData = (res: any) => {
      if (res.data) {
        setChartList(res.data.records ?? []);
        let dataTotal = res.data.total;
        setTotal(dataTotal ?? 0);
        // 隐藏图表的 title
        if (res.data.records) {
          res.data.records.forEach((data: any) => {
            if (data.chartStatus === 'succeed') {
              JSON.parse(data.genChart ?? '{}');
              const chartOption = JSON.parse(data.genChart ?? '{}');
              chartOption.title = undefined;
              data.genChart = JSON.stringify(chartOption);
            }
          })
        }
      } else {
        message.error('获取图表失败');
      }
    };

    const fetchData = async () => {
      try {
        const res = await listMyChartByPageUsingGet(searchParams);
        handleChartData(res);
      } catch (e: any) {
        message.error('获取图表失败，' + e.message);
      }
    };

    const loadData = async () => {
      setLoading(true);
      try {
        fetchData();
      } catch (e: any) {
        message.error('获取图表失败，' + e.message);
      }
      setLoading(false);
    };

    let [socket, setSocket] = useState<WebSocket | undefined>();
    useEffect(() => {
      // 加载数据
      loadData();

      if (!socket) {
        // 建立 WebSocket 连接
        const socketUrl = "ws://101.43.54.167:9001/api/ws/" + loginUser?.id;
        try {
          socket = new WebSocket(socketUrl);
        } catch (e: any) {
          console.log('WebSocket 连接失败：' + e.message);
          return;
        }
      }
      socket.onmessage = function (e: any) {
        if (e) {
          // console.log(e.data);
        }
        // message.success('消息来喽~');
        // 收到消息时重新加载数据
        loadData();
      };
      setSocket(socket);
      // 组件卸载时关闭 WebSocket 连接
      return () => {
        if (socket) {
          socket.close();
        }
      };
    }, [searchParams]);

    /**
     *  Delete node
     * @zh-CN 删除节点
     *
     * @param chart
     */
    const handleRemove = async (chart: API.Chart) => {
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
        if (res.data) {
          message.success('删除成功');
          // 刷新数据
          loadData();
        }
        return true;
      } catch (error: any) {
        hide();
        message.error('删除失败', error.message);
        return false;
      }
    };

    const confirm = async (chart: API.Chart) => {
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
    const downloadCardAsImage = (chart: API.Chart) => {
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
              placeholder={"请输入图表名称"}
              onSearch={(value) => {
                // 设置搜索条件
                // @ts-ignore
                setSearchParams({
                  ...initSearchParams,
                  name: value,
                })
              }}
              style={{maxWidth: 600, height: 40}}/>
          </ProCard>
        </Card>
        <br/>
        <br/>
        <div className="margin-16"/>
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
          loading={loading}
          dataSource={chartList}
          renderItem={(item: API.Chart) => (
            <List.Item
              key={item.id}
            >
              <Card id={item.id?.toString()} hoverable style={{width: '100%'}}>
                <List.Item.Meta
                  avatar={<Avatar src={loginUser && loginUser.userAvatar}/>}
                  title={item.name}
                  description={item.chartType ? '图表类型：' + item.chartType : undefined}
                />
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
                      <p>{'分析目标：' + item.goal}</p>
                      <p>{'分析目标结论：' + item.genResult}</p>
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
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
;

export default MyChartPage;

