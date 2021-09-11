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

  return <div>{OtherProductStore.products.length > 0 && <ProductStats activeProduct={null} />}</div>;
});
