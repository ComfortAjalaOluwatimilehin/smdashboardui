import { Button } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";
import { OtherProductStore } from "./store";

export const ManagerActions: React.FC<any> = observer(() => {
  return (
    <div>
      <Button
        loading={OtherProductStore.isMigrating}
        type="primary"
        onClick={() => {
          OtherProductStore.migrateOldSatchetSales();
        }}
      >
        Migrate old satchet sales
      </Button>
    </div>
  );
});
