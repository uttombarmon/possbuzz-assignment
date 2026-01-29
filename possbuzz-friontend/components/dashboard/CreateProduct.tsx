import React, { useState } from "react";
import {
  Popover,
  Button,
  Form,
  Input,
  InputNumber,
  Space,
  Typography,
  message,
} from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { useProducts } from "lib/hooks/useProducts";

const { Title } = Typography;

export default function AddProductPopover() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { addProduct } = useProducts();

  const onFinish = (values: any) => {
    addProduct.mutate(values, {
      onSuccess: () => {
        setOpen(false);
        form.resetFields();
      },
    });
  };

  const content = (
    <div style={{ width: 300 }}>
      <Title level={5} style={{ marginBottom: 16 }}>
        New Product
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ stockQty: 0, price: 0 }}
      >
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="e.g. Arabica Coffee" />
        </Form.Item>

        <Form.Item
          name="sku"
          label="SKU / Barcode"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input placeholder="XYZ-123" />
        </Form.Item>

        <Space>
          <Form.Item
            name="price"
            label="Price ($)"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="stockQty" label="Stock" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Space>

        <Form.Item
          style={{ marginBottom: 0, marginTop: 16, textAlign: "right" }}
        >
          <Space>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={addProduct.isPending}
            >
              Save
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <Popover
      content={content}
      title={null}
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      placement="bottomRight"
    >
      <Button type="primary" icon={<PlusOutlined />} size="large">
        Add Product
      </Button>
    </Popover>
  );
}
