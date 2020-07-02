import { action, observable } from "mobx"
import { SmdashboardService } from "../service";

class AuthStoreSingleton {
    @observable isValid: boolean = false
    @observable initcomplete: boolean = false
    constructor() {
        this.init()


    }
    async init() {
        try {
            const isvalid = await SmdashboardService.vtoken()
            if (isvalid === false) {
                this.isValid = false
            } else {
                this.isValid = true
            }
        } catch (err) {
            this.isValid = false
        }

        this.initcomplete = true
    }
    get role(): string | undefined { return "" }
    @action  async login({ email, password }: { email: string, password: string }) {

        try {
            await SmdashboardService.login({ email, password })
            this.isValid = true
        } catch (err) {
            this.isValid = false
        }
    }
    

    @action logout() {
        SmdashboardService.unsettoken()
        this.isValid = false
    }


}



export const AuthStore = new AuthStoreSingleton()