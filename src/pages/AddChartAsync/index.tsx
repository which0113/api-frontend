import {genChartByAiUsingPost} from '@/services/api-backend/chartController';
import {UploadOutlined} from '@ant-design/icons';
import {Button, Card, Form, Input, message, Select, Space, Upload} from 'antd';
import {useForm} from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import React, {useState} from 'react';

/**
 * 添加图表（异步）页面
 * @constructor
 */
const AddChartAsync: React.FC = () => {
  const [form] = useForm();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const allowedExtensions = ['.csv', '.xls', '.xlsx'];

  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    const fileObj = values?.file?.file?.originFileObj;
    if (!fileObj) {
      message.info('请上传文件');
      return;
    }
    const fileExtension = fileObj.name.substring(fileObj.name.lastIndexOf('.'));
    if (!allowedExtensions.includes(fileExtension)) {
      message.info('文件格式限定为csv、xls和xlsx');
      return;
    }
    // 避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    // 对接后端，上传数据
    const params = {
      ...values,
      file: undefined,
    };
    const res = await genChartByAiUsingPost(params, {}, fileObj);
    if (!res?.data) {
      // message.error('分析失败');
    } else {
      message.success('提交成功，请稍后在我的图表页面查看结果');
      form.resetFields();
    }
    setSubmitting(false);
  };

  /**
   * 自动填充文件名
   * @param info
   */
  const handleFileUpload = (info: any) => {
    // 如果图表名称为空，则自动填充文件名
    const newName = info?.fileList[0]?.name?.split('.')[0]?.trim();
    const currentName = form?.getFieldValue('name')?.trim();
    if (!currentName && newName) {
      form.setFieldsValue({name: newName});
    }
  };

  return (
    <div className="add-chart-async">
      <Card title="智能分析">
        <Form
          form={form}
          name="addChart"
          labelAlign="left"
          labelCol={{span: 4}}
          wrapperCol={{span: 16}}
          onFinish={onFinish}
          initialValues={{}}
        >
          <Form.Item
            name="goal"
            label="分析目标"
            rules={[{required: true, message: '请输入分析目标'}]}
          >
            <TextArea placeholder="请输入你的分析需求（消费积分：6个），比如：分析网站用户的增长情况"/>
          </Form.Item>
          <Form.Item
            name="name"
            label="图表名称"
            rules={[{required: true, message: '请输入图表名称'}]}
            colon={false}
          >
            <Input placeholder="请输入图表名称"/>
          </Form.Item>
          <Form.Item
            name="chartType"
            label="图表类型"
            initialValue="折线图"
          >
            <Select
              options={[
                {value: '折线图', label: '折线图'},
                {value: '柱状图', label: '柱状图'},
                {value: '堆叠图', label: '堆叠图'},
                {value: '饼图', label: '饼图'},
                {value: '雷达图', label: '雷达图'},
              ]}
            />
          </Form.Item>
          <Form.Item name="file" label="原始数据">
            <Upload name="file" maxCount={1} onChange={handleFileUpload}>
              <Button icon={<UploadOutlined/>}>上传 CSV 文件</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{span: 16, offset: 4}}>
            <Space>
              <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                提交
              </Button>
              <Button htmlType="reset">重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default AddChartAsync;
