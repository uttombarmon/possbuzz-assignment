import {
  DeleteOutlined,
  EditOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Button,
  InputNumber,
  message,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { useProducts } from "lib/hooks/useProducts";
import { useSales } from "lib/hooks/useSales";
import React, { useState, type Dispatch, type SetStateAction } from "react";
const { Text } = Typography;
interface ProductModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setEditingProduct: Dispatch<SetStateAction<string | null>>;
}
const ProductTable = ({
  setIsModalOpen,
  setEditingProduct,
}: ProductModalProps) => {
  const { createSale, isSelling } = useSales();
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const { fetchProducts } = useProducts();
  const columns = [
    {
      title: "Product Details",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <Space orientation="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            SKU: {record.sku}
          </Text>
        </Space>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <Text disabled={false}>${Number(price)}</Text>,
    },
    {
      title: "Stock Status",
      dataIndex: "stockQty",
      key: "stockQty",
      render: (stock: number) => (
        <Tag color={stock > 10 ? "green" : stock > 0 ? "orange" : "red"}>
          {stock > 0 ? `${stock} in stock` : "Out of Stock"}
        </Tag>
      ),
    },
    {
      title: "Quick Buy",
      key: "buy",
      render: (record: any) => (
        <Space.Compact>
          <InputNumber
            min={1}
            max={record.stockQty}
            defaultValue={1}
            onChange={(val) => setSelectedQty(val || 1)}
            disabled={record.stockQty <= 0}
          />
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => handleBuy(record.id, record.name)}
            disabled={record.stockQty <= 0}
            loading={isSelling}
          >
            Buy
          </Button>
        </Space.Compact>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record.id)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => console.log("Delete", record.id)}
          />
        </Space>
      ),
    },
  ];
  const handleBuy = (productId: string, name: string) => {
    createSale(
      {
        items: [{ productId, quantity: selectedQty }],
      },
      {
        onSuccess: () => {
          message.success(`Bought ${selectedQty} x ${name}`);
          setSelectedQty(1);
        },
        onError: (err: any) => {
          message.error(err.response?.data?.message || "Sale failed");
        },
      },
    );
  };

  const handleEditClick = (record: string) => {
    setEditingProduct(record);
    setIsModalOpen(true);
  };

  return (
    <Table
      columns={columns}
      dataSource={fetchProducts.data}
      loading={fetchProducts.isLoading}
      rowKey="id"
      pagination={{ pageSize: 8 }}
    />
  );
};

export default ProductTable;
