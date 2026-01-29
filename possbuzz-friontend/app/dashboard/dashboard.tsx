import React, { useState } from "react";
import { Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProductTable from "components/dashboard/ProductTable";
import ProductModal from "components/dashboard/ProductModal";

const { Title } = Typography;

export default function dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  return (
    <div style={{ padding: "24px" }}>
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Inventory Overview
        </Title>

        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
        >
          Add New Product
        </Button>
      </div>

      {/* The Product Table (This shows the list) */}
      <ProductTable
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setEditingProduct={setEditingProduct}
      />

      {/* The Attached Modal (Hidden until isModalOpen is true) */}
      <ProductModal
        editProduct={editingProduct}
        isOpen={isModalOpen}
        setEditingProduct={setEditingProduct}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
