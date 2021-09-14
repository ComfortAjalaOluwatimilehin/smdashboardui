import { action, observable } from "mobx";
import { SmdashboardService } from "../service";

class AuthStoreSingleton {
  @observable isValid: boolean = false;
  @observable initcomplete: boolean = false;
  @observable isGuest: boolean = true;

  constructor() {
    this.init();
    this.intevalRepeat();
  }
  private async intevalRepeat(): Promise<void> {
    setInterval(async () => {
      console.log("checked: checkIfStillValid");
      await this.checkIfStillValid();
      await this.checkIfGuest();
    }, 600000);
  }
 @action private async checkIfStillValid(): Promise<void> {
    try {
      const isvalid = await SmdashboardService.vtoken();
      this.isValid = isvalid;
    } catch (err) {
      this.logout();
    }
  }
 @action private async checkIfGuest(): Promise<void> {
    try {
      const isGuest = await SmdashboardService.isGuest();
      this.isGuest = isGuest;
    } catch (err) {
      this.logout();
    }
  }
  @action private async init() {
    await this.checkIfStillValid();
    await this.checkIfGuest();
    this.initcomplete = true;
  }
  @action async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      await SmdashboardService.login({ email, password });
      await this.checkIfGuest();
      this.isValid = true;
    } catch (err) {
      this.isValid = false;
    }
  }

  @action logout() {
    SmdashboardService.unsettoken();
    this.isValid = false;
  }
}

export const AuthStore = new AuthStoreSingleton();
