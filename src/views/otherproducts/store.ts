import { message } from "antd";
import { action, computed, observable } from "mobx";
import moment, { Moment } from "moment";
import { SmdashboardService } from "../../service";
import { TCurrentDateFilter } from "../stats/store";
export interface IProduct {
  _id: string;
  name: string;
  product_name?: string;
  unitPrice: number;
  unit_price?: number;
  description: string;
  dateCreated: string;
  numberOfItemsPerUnit: number;
}
export interface IProductSale {
  createdDate: Date;
  soldDate: Date;
  amount: number;
  soldUnitPrice: number;
  cash: number;
  productId: string;
}
export interface IProductAggregateSale {
  dateAsString: string;
  count: number;
  cash: number;
  amount: number;
  derivedSales: number;
  productId: string;
  productName: string;
  expenses: number;
}
class StoreInstance {
  @observable products: IProduct[] = [];
  @observable loading: boolean = false;
  @observable isMigrating: boolean = false;
  @observable activeProduct: IProduct | null = null;
  @observable activeProductStats: IProductAggregateSale[] = [];
  @observable currentDateFilter: TCurrentDateFilter = "year";
  @observable currentTimeStamp: Moment = moment();
  @observable startTimeStamp: Moment = moment().startOf("year");
  @observable endTimeStamp: Moment = moment().endOf("year");
  @observable isRangeDatePicker: boolean = true;
  @observable isExporting: boolean = false;
  public exportDataAsCSV(): void {
    this.isExporting = true;
    let data = "\ufeff";
    data += "date,productname,number of purchased items,paid cash,expenses\n";
    for (const stat of this.activeProductStats) {
      const amount = (stat.amount + "").split("N ")[1];
      const expenses = (stat.expenses + "").split("N ")[1];
      data += `${stat.dateAsString},${stat.productName},${stat.amount},${amount},${expenses}\n`;
    }
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const anchorTag = document.createElement("a");
    anchorTag.href = url;
    anchorTag.download = "stats.csv";
    anchorTag.click();
    this.isExporting = false;
    setTimeout(() => {
      anchorTag.remove();
    }, 1000);
  }
  @action public resetProperties(): void {
    this.activeProduct = null;
    this.activeProductStats = [];
  }
  @computed get minMaxCosts(): { min: number; max: number } {
    const minMaxCosts: { min: number; max: number } = { min: 0, max: 0 };
    const sorted = [...this.activeProductStats].sort((a, b) => a.cash - b.cash);
    const lastValue = sorted[sorted.length - 1];
    if (lastValue) {
      minMaxCosts.max = lastValue.cash;
    }
    return minMaxCosts;
  }
  @computed get activeProductId(): string {
    return this.activeProduct ? this.activeProduct._id : "";
  }
  @computed get activeProductName(): string {
    return this.activeProduct
      ? this.activeProduct.product_name || this.activeProduct.name
      : "";
  }
  @computed get activeProductUnitPrice(): number {
    return this.activeProduct
      ? this.activeProduct.unit_price || this.activeProduct.unitPrice
      : 0;
  }
  @action public setActiveProductById(id: string | undefined): void {
    if (id === undefined) {
      this.activeProduct = null;
      return;
    }
    this.activeProduct = null;
    const matchProduct = this.products.find((product) => product._id === id);
    if (matchProduct) {
      this.activeProduct = { ...matchProduct };
    } else {
      this.activeProduct = null;
    }
  }
  public async createProduct(values: any, form: any): Promise<any> {
    try {
      await SmdashboardService.createProduct(values);
      if (form) {
        form.resetFields();
      }
      message.success("New product created");
    } catch (err) {
      console.error(err);
      message.error("something went wrong");
    }
  }
  @action public async getProducts(): Promise<any> {
    try {
      this.loading = true;
      const data = await SmdashboardService.getProducts();
      this.products = data;
    } catch (err) {
      console.error(err);
      message.error("something went wrong");
    } finally {
      this.loading = false;
    }
  }
  public async updateProduct(id: string, body: any): Promise<any> {
    try {
      await SmdashboardService.updateProduct(id, body);
      void this.getProducts();
    } catch (err) {
      console.error(err);
      message.error("something went wrong");
    }
  }
  public async deleteProduct(id: string): Promise<any> {
    try {
      await SmdashboardService.deleteProduct(id);
      void this.getProducts();
      message.success("deleted");
    } catch (err) {
      console.error(err);
      message.error("something went wrong");
    }
  }
  public async deleteProductStatsForSelectedDate(id: string): Promise<any> {
    try {
      await SmdashboardService.deleteProductStatsByDate(
        this.currentTimeStamp.valueOf(),
        id
      );
      message.success("deleted");
      void this.getProductStats();
    } catch (err) {
      console.error(err);
      message.error("something went wrong");
    }
  }
  public async createProductSale(values: any, form: any): Promise<any> {
    try {
      await SmdashboardService.createProductSale(values);
      if (form) {
        form.resetFields();
      }
      void this.getProductStats();
    } catch (err) {
      console.error(err);
      message.error("something went wrong");
    }
  }
  private getProductNameById(id: string): string {
    const match = this.products.find((product) => product._id === id);
    return match ? match.product_name || match.name : "";
  }
  @action public async getProductStats(): Promise<void> {
    if (!this.currentTimeStamp) {
      message.info("Please select a date");
      return;
    }
    this.activeProductStats = [];
    try {
      let stats: IProductAggregateSale[] = [];

      if (this.isRangeDatePicker) {
        stats = await SmdashboardService.getProductStatsPerRange({
          startTimeStamp: this.startTimeStamp.valueOf(),
          endTimeStamp: this.endTimeStamp.valueOf(),
          productId: this.activeProduct?._id,
        });
      } else {
        stats = await SmdashboardService.getProductStats({
          timestamp: this.currentTimeStamp.valueOf(),
          filterType: this.currentDateFilter,
          productId: this.activeProduct?._id,
        });
      }

      this.activeProductStats = stats.map((stat) => ({
        ...stat,
        productName: this.getProductNameById(stat.productId),
      }));
    } catch (err) {
      this.activeProductStats = [];
      console.error(err);
    }
  }

  public async migrateOldSatchetSales(): Promise<void> {
    try {
      this.isMigrating = true;
      await SmdashboardService.migrateOldSatchetSales();
      message.success("Migration complete");
    } catch (err) {
      console.error(err);
      message.error("something went wrong during migration");
    } finally {
      this.isMigrating = false;
    }
  }
}

export const OtherProductStore = new StoreInstance();
