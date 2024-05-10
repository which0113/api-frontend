import {ProColumns, ProFormColumnsType} from '@ant-design/pro-components';

export const ChartAddModalFormColumns: ProFormColumnsType<API.ChartAddRequest, "text">[] = [
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
    title: '图表状态',
    dataIndex: 'chartStatus',
    key: "chartStatus",
    valueType: "radio",
    valueEnum: {
      "wait": {
        text: '等待',
      },
      "running": {
        text: '生成中',
      },
      "succeed": {
        text: '成功生成',
      },
      "failed": {
        text: '生成失败',
      }
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
    formItemProps: {
      initialValue: "succeed",
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
    title: '图表状态',
    dataIndex: 'chartStatus',
    key: "chartStatus",
    valueType: "radio",
    valueEnum: {
      "wait": {
        text: '等待',
      },
      "running": {
        text: '生成中',
      },
      "succeed": {
        text: '成功生成',
      },
      "failed": {
        text: '生成失败',
      }
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
    formItemProps: {
      initialValue: "succeed",
    },
  },
];

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
    title: '图表状态',
    dataIndex: 'chartStatus',
    key: "chartStatus",
    valueType: "radio",
    valueEnum: {
      "wait": {
        text: '等待',
      },
      "running": {
        text: '生成中',
      },
      "succeed": {
        text: '成功生成',
      },
      "failed": {
        text: '生成失败',
      }
    },
  },
];

export default ChartColumns;
