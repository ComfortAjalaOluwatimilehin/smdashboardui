import { Select } from "antd";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { ProductStats } from "./stats";
import { OtherProductStore } from "./store";

export const AllProductsStats: React.FC<any> = observer(() => {
  OtherProductStore.resetProperties();
  useEffect(() => {
    if (OtherProductStore.products.length === 0) {
      void OtherProductStore.getProducts();
    }
  });

  return (
    <div>
      <Select
        placeholder="select product"
        allowClear={true}
        onSelect={(productId:any) => {
          OtherProductStore.setActiveProductById(productId);
        }}
        style={{ minWidth: "200px" }}
        defaultActiveFirstOption={true}
        options={OtherProductStore.products.map((product) => {
          return {
            value: product._id,
            label: product.product_name || product.name,
          };
        })}
      ></Select>
      {OtherProductStore.products.length > 0 && (
        <ProductStats activeProduct={OtherProductStore.activeProduct} />
      )}
    </div>
  );
});
