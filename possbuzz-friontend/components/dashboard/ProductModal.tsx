import { useQuery } from "@tanstack/react-query";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Divider,
  Button,
} from "antd";
import { apiClient } from "lib/api/apiIntercepters";
import { useProducts } from "lib/hooks/useProducts";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

interface Props {
  editProduct?: string | null;
  setEditingProduct: Dispatch<SetStateAction<string | null>>;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({
  editProduct,
  setEditingProduct,
  isOpen,
  onClose,
}: Props) {
  const [form] = Form.useForm();
  const { addProduct, editProductApi } = useProducts();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", editProduct],
    queryFn: async () => {
      const res = await apiClient.get(`/product/${editProduct}`);
      console.log(res.data);
      return res.data;
    },
    enabled: !!editProduct && isOpen,
  });

  useEffect(() => {
    if (editProduct && product) {
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }
  }, [editProduct, product, isOpen]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (!editProduct) {
        addProduct.mutate(values, {
          onSuccess: () => {
            form.resetFields();
            onClose();
          },
        });
      } else {
        editProductApi.mutate(
          { product: values, productId: editProduct },
          {
            onSuccess: () => {
              form.resetFields();
              setEditingProduct(null);
              onClose();
            },
          },
        );
      }
    });
  };
  return (
    <Modal
      title="Add New Product to Inventory"
      open={isOpen}
      onCancel={onClose}
      onOk={handleSave}
      confirmLoading={addProduct.isPending}
      width="75vw"
      centered
      okText={product ? "Create Product" : "Update Product"}
      cancelText="Discard"
    >
      <Divider />
      <Form form={form} layout="vertical">
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true }]}
              initialValue={product?.name}
            >
              <Input placeholder="Enter product name..." size="large" />
            </Form.Item>
            <Form.Item
              name="sku"
              label="SKU"
              rules={[{ required: true }]}
              initialValue={product?.sku}
            >
              <Input placeholder="Unique Identifier" size="large" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Unit Price"
                  rules={[{ required: true }]}
                  initialValue={product?.price}
                >
                  <InputNumber
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    style={{ width: "100%" }}
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="stockQty"
                  label="Initial Stock"
                  rules={[{ required: true }]}
                  initialValue={product?.stockQty}
                >
                  <InputNumber style={{ width: "100%" }} size="large" min={0} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
