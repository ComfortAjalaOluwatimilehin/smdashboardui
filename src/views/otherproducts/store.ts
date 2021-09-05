import { message } from "antd";
import { SmdashboardService } from "../../service";

class StoreInstance {
  public createProduct(values: any): void {
    SmdashboardService.createProduct(values)
      .then(() => {
        message.success("created");
      })
      .catch((err) => {
        message.error("something went wrong");
      });
  }
}

export const OtherProductStore = new StoreInstance();
