import {ProColumns, ProFormColumnsType} from '@ant-design/pro-components';
import moment from "moment";

export const ChartAddModalFormColumns: ProFormColumnsType<API.ChartAddRequest, "text">[] = [
  {
    title: '名称',
    dataIndex: 'name',
    key: "name",
    formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (!value || value.length < 0) {
              return Promise.reject(new Error("图表名称为必填项"));
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
  },
  {
    title: '分析目标',
    dataIndex: 'goal',
    key: "goal",
    valueType: 'textarea',
  },
  {
    title: '图表信息',
    dataIndex: 'chartData',
    key: "chartData",
    valueType: 'textarea',
  },
  {
    title: '图表类型',
    dataIndex: 'chartType',
    key: "chartType",
    valueType: "select",
    valueEnum: {
      '折线图': '折线图',
      '柱状图': '柱状图',
      '堆叠图': '堆叠图',
      '饼图': '饼图',
      '雷达图': '雷达图',
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
    formItemProps: {
      initialValue: "折线图",
    },
  },
];

export const ChartUpdateModalFormColumns: ProFormColumnsType<API.ChartUpdateRequest, "text">[] = [
  {
    title: 'id',
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: "id"
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: "name",
    formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (!value || value.length < 0) {
              return Promise.reject(new Error("图表名称为必填项"));
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
  },
  {
    title: '分析目标',
    dataIndex: 'goal',
    key: "goal",
    valueType: 'textarea',
  },
  {
    title: '图表信息',
    dataIndex: 'chartData',
    key: "chartData",
    valueType: 'textarea',
  },
  {
    title: '图表类型',
    dataIndex: 'chartType',
    key: "chartType",
    valueType: "select",
    valueEnum: {
      '折线图': '折线图',
      '柱状图': '柱状图',
      '堆叠图': '堆叠图',
      '饼图': '饼图',
      '雷达图': '雷达图',
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
    formItemProps: {
      initialValue: "折线图",
    },
  },
];

// @ts-ignore
export const ChartColumns: ProColumns<API.Chart>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: "id"
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: "name",
    formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (!value || value.length < 0) {
              return Promise.reject(new Error("图表名称为必填项"));
            }
            return Promise.resolve();
          },
          required: true
        })],
    },
  },
  {
    title: '图表类型',
    dataIndex: 'chartType',
    key: "chartType",
    valueType: "select",
    valueEnum: {
      '折线图': '折线图',
      '柱状图': '柱状图',
      '堆叠图': '堆叠图',
      '饼图': '饼图',
      '雷达图': '雷达图',
    }
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: "updateTime",
    hideInSearch: true,
    valueType: "text",
    // @ts-ignore
    render: (text: string) => moment.utc(text).format('YYYY-MM-DD'),
  },
  {
    title: '图表状态',
    dataIndex: 'chartStatus',
    key: "chartStatus",
    valueType: "select",
    valueEnum: {
      "wait": {
        text: '等待',
      },
      "running": {
        text: '生成中',
      },
      "succeed": {
        text: '成功生成',
        status: 'success'
      },
      "failed": {
        text: '生成失败',
        status: 'error'
      }
    },
  },
  {
    title: '创建用户',
    dataIndex: 'createUser',
    key: "createUser",
    valueType: "text",
  },
];

export default ChartColumns;
