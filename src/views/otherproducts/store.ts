import { message } from "antd";
import { action, computed, observable, toJS } from "mobx";
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
  amountSold: number;
  cash: number;
  derivedSales: number;
  productId: string;
  productName: string;
}
class StoreInstance {
  @observable products: IProduct[] = [];
  @observable loading: boolean = false;
  @observable activeProduct: IProduct | null = null;
  @observable activeProductStats: IProductAggregateSale[] = [];
  @observable allProductsStats:IProductAggregateSale[]  = []
  @observable currentDateFilter: TCurrentDateFilter = "year";
  @observable currentTimeStamp: Moment = moment();
  @action public resetProperties(): void {
    this.activeProduct = null;
    this.activeProductStats = [];
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
  @action public setActiveProductById(id: string): void {
    const matchProduct = this.products.find((product) => product._id === id);
    if (matchProduct) {
      this.activeProduct = matchProduct;
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
      message.success("New product created")
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
      const stats = await SmdashboardService.getProductStats({
        timestamp: this.currentTimeStamp.valueOf(),
        filterType: this.currentDateFilter,
        productId: this.activeProduct?._id,
      });
      this.activeProductStats = stats.map((stat) => ({
        ...stat,
        productName: this.getProductNameById(stat.productId),
      }));
    } catch (err) {
      this.activeProductStats = [];
      console.error(err);
    }
  }
}

export const OtherProductStore = new StoreInstance();
