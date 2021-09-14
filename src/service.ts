import {
  TCurrentDateFilter,
  IMonthlySales,
  IExpense,
  IPos,
} from "./views/stats/store";
import { tz } from "moment-timezone";
import axios, { AxiosResponse } from "axios";
import { IProductAggregateSale } from "./views/otherproducts/store";
axios.defaults.withCredentials = true;
export interface IExpenseType {
  type: string;
}
class SmdashboardServiceSingleton {
  uri: "https://arcane-bastion-12919.herokuapp.com" | "http://localhost:8080" =
    "https://arcane-bastion-12919.herokuapp.com";
  tz: string;
  constructor() {
    const url: string = global.window.location.href;
    if (url.search("localhost") >= 0) {
      this.uri = "http://localhost:8080";
    } else {
      this.uri = "https://arcane-bastion-12919.herokuapp.com";
    }
    this.tz = tz.guess();
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    await axios.post(`${this.uri}/login`, { email, password });
  }
  async unsettoken() {
    await axios.get(`${this.uri}/logout`);
  }
  async vtoken(): Promise<boolean> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.uri}/api/fvfjcnys`
      );
      if (response.status === 200) {
        return true;
      } else return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  async isGuest(): Promise<boolean> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.uri}/api/isGuest`
      );
      return response.data
    } catch (err) {
      console.error(err);
      return true;
    }
  }
  async fetchStats({
    timestamp,
    filterType,
  }: {
    timestamp: number;
    filterType: TCurrentDateFilter;
  }): Promise<IMonthlySales[]> {
    let route =
      filterType === "year"
        ? "getStatsByYear"
        : filterType === "day"
        ? "getStatsByDate"
        : "getStatsByMonth";

    const timezone = this.tz;
    timestamp = tz(timestamp, timezone).valueOf();
    try {
      const { data } = await axios.get(
        `${this.uri}/api/v1/stats/${route}?timestamp=${timestamp}&timezone=${timezone}`
      );
      return data;
    } catch (err) {
      throw err;
    }
  }

  async fetchExpenses({
    timestamp,
    filterType,
  }: {
    timestamp: number;
    filterType: TCurrentDateFilter;
  }): Promise<IExpense[]> {
    let route =
      filterType === "year"
        ? "getExpensesByYear"
        : filterType === "day"
        ? "getExpensesByDate"
        : "getExpensesByMonth";

    const timezone = this.tz;
    timestamp = tz(timestamp, timezone).valueOf();
    try {
      const { data } = await axios.get(
        `${this.uri}/api/v1/expenses/${route}?timestamp=${timestamp}&timezone=${timezone}`
      );
      return data;
    } catch (err) {
      throw err;
    }
  }
  async fetchPaidOutstandings({
    timestamp,
    filterType,
  }: {
    timestamp: number;
    filterType: TCurrentDateFilter;
  }): Promise<IPos[]> {
    let route =
      filterType === "year"
        ? "getPaidOutstandingByYear"
        : filterType === "day"
        ? "getPaidOutstandingByDate"
        : "getPaidOutstandingByMonth";

    const timezone = this.tz;
    timestamp = tz(timestamp, timezone).valueOf();
    try {
      const { data } = await axios.get(
        `${this.uri}/api/v1/paidoutstandings/${route}?timestamp=${timestamp}&timezone=${timezone}`
      );
      return data;
    } catch (err) {
      throw err;
    }
  }
  async createSale(props: any): Promise<string | undefined> {
    try {
      await axios.post(`${this.uri}/api/v1/sales`, { ...props });
      return;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
  async createExpense(props: any): Promise<string | undefined> {
    try {
      await axios.post(`${this.uri}/api/v1/expenses`, [{ ...props }]);
      return;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
  async createMaterialEntry(props: any): Promise<string | undefined> {
    try {
      await axios.post(`${this.uri}/api/v1/materials/createMaterialEntry`, {
        ...props,
      });
      return;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
  async fetchExpenseTypes(): Promise<IExpenseType[]> {
    try {
      const { data } = await axios.get(
        `${this.uri}/api/v1/expenses/getExpenseTypes`
      );
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  async fetchMaterialTypes(): Promise<{ type: string; value: string }[]> {
    try {
      const { data } = await axios.get(`${this.uri}/api/v1/materials/getTypes`);
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  async fetchMaterials(): Promise<any[]> {
    try {
      const { data } = await axios.get(`${this.uri}/api/v1/materials`);
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  async fetchEmployees(): Promise<any[]> {
    try {
      const { data } = await axios.get(`${this.uri}/api/v1/employees`);
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  async fetchCustomers(): Promise<any[]> {
    try {
      const { data } = await axios.get(`${this.uri}/api/v1/customers`);
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  async fetchContacts(): Promise<any[]> {
    try {
      const { data } = await axios.get(`${this.uri}/api/v1/contacts`);
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  async createPaidOutstanding(props: any): Promise<string | undefined> {
    try {
      await axios.post(`${this.uri}/api/v1/paidoutstandings`, [{ ...props }]);
      return;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
  async createEmployee(props: any): Promise<string | undefined> {
    try {
      await axios.post(`${this.uri}/api/v1/employees`, { ...props });
      return;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
  async createCustomer(props: any): Promise<string | undefined> {
    try {
      await axios.post(`${this.uri}/api/v1/customers`, { ...props });
      return;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
  async createContact(props: any): Promise<string | undefined> {
    try {
      await axios.post(`${this.uri}/api/v1/contacts`, { ...props });
      return;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
  async deleteStatsByDate(timestamp: number): Promise<string | undefined> {
    const timezone = this.tz;
    timestamp = tz(timestamp, timezone).valueOf();
    try {
      await axios.delete(
        `${this.uri}/api/v1/stats?timestamp=${timestamp}&timezone=${timezone}`
      );
      return;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
  async deleteExpenseByDate(timestamp: number): Promise<string | undefined> {
    const timezone = this.tz;
    timestamp = tz(timestamp, timezone).valueOf();
    try {
      await axios.delete(
        `${this.uri}/api/v1/expenses?timestamp=${timestamp}&timezone=${timezone}`
      );
      return;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
  async deletePosByDate(timestamp: number): Promise<string | undefined> {
    const timezone = this.tz;
    timestamp = tz(timestamp, timezone).valueOf();
    try {
      await axios.delete(
        `${this.uri}/api/v1/paidoutstandings?timestamp=${timestamp}&timezone=${timezone}`
      );
      return;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
  async createProduct(props: any): Promise<undefined> {
    try {
      await axios.post(`${this.uri}/api/v1/products`, { ...props });
      return;
    } catch (err) {
      throw err;
    }
  }
  async getProducts(): Promise<any[]> {
    try {
      const { data } = await axios.get(`${this.uri}/api/v1/products`);
      return data;
    } catch (err) {
      throw err;
    }
  }
  async getProduct(id: string): Promise<any> {
    try {
      const { data } = await axios.get(`${this.uri}/api/v1/products/${id}`);
      return data;
    } catch (err) {
      throw err;
    }
  }
  async updateProduct(id: string, body: any): Promise<any> {
    try {
      await axios.patch(`${this.uri}/api/v1/products/${id}`, body);
    } catch (err) {
      throw err;
    }
  }
  async deleteProduct(id: string): Promise<undefined> {
    try {
      await axios.delete(`${this.uri}/api/v1/products/${id}`);
      return;
    } catch (err) {
      throw err;
    }
  }
  async createProductSale(props: any): Promise<undefined> {
    try {
      await axios.post(`${this.uri}/api/v1/productsales`, { ...props });
      return;
    } catch (err) {
      throw err;
    }
  }
  async getProductStats({
    timestamp,
    filterType,
    productId,
  }: {
    timestamp: number;
    filterType: TCurrentDateFilter;
    productId?: string;
  }): Promise<IProductAggregateSale[]> {
    let route =
      filterType === "year"
        ? "getStatsByYear"
        : filterType === "day"
        ? "getStatsByDate"
        : "getStatsByMonth";

    const timezone = this.tz;
    timestamp = tz(timestamp, timezone).valueOf();
    try {
      const { data } = await axios.post(
        `${this.uri}/api/v1/productsales/stats/${route}?timestamp=${timestamp}&timezone=${timezone}`,
        { productId }
      );
      return data;
    } catch (err) {
      throw err;
    }
  }

  async deleteProductStatsByDate(
    timestamp: number,
    productId: string
  ): Promise<string | undefined> {
    const timezone = this.tz;
    timestamp = tz(timestamp, timezone).valueOf();
    try {
      await axios.delete(
        `${this.uri}/api/v1/productsales/stats/${productId}?timestamp=${timestamp}&timezone=${timezone}`
      );
      return;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
  public async migrateOldSatchetSales(): Promise<any> {
    return await axios.get(
      `${this.uri}/api/v1/productsales/migration/satchets`
    );
  }
  public async seedGuest(): Promise<any> {
    return await axios.get(
      `${this.uri}/api/users/seeds/guest`
    );
  }
}

export const SmdashboardService = new SmdashboardServiceSingleton();
