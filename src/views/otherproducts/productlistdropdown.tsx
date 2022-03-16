import { Select } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";
import { OtherProductStore } from "./store";

export const ProductListDropDown = observer(() => {
  return (
    <Select
      value={OtherProductStore.activeProductId}
      allowClear={true}
      placeholder="select product"
      onSelect={(productId: any) => {
        OtherProductStore.setActiveProductById(productId);
        void OtherProductStore.getProductStats();
      }}
      onClear={() => {
        OtherProductStore.setActiveProductById(undefined);
        void OtherProductStore.getProductStats();
      }}
      style={{ minWidth: "200px" }}
      options={OtherProductStore.products.map((product) => {
        return {
          value: product._id,
          label: product.product_name || product.name,
        };
      })}
    ></Select>
  );
});
