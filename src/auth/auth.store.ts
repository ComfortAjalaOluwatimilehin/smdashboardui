import { action, computed, observable } from "mobx"
import { SmdashboardService } from "../service";

class AuthStoreSingleton {
    @observable isValid: boolean = false
    @observable initcomplete: boolean = false
    constructor() {
        SmdashboardService.init()
        this.init()


    }
    async init() {
        try {
            const isvalid = await SmdashboardService.vtoken()
            if (isvalid === false) {
                this.isValid = false
                this.logout()
            } else {
                this.isValid = true
            }
        } catch (err) {
            this.isValid = false
            this.logout()
        }

        this.initcomplete = true
    }
    get role(): string | undefined { return "" }
    @action  async login({ email, password }: { email: string, password: string }) {

        try {

            const token: string = await SmdashboardService.login({ email, password })
            SmdashboardService.settoken(token)
            this.isValid = true
        } catch (err) {
            // console.error(err)
            // message.error(err.message)
            this.isValid = false
        }
    }
    @computed get token(): string | undefined {
        return SmdashboardService.token
    }

    @action logout() {
        SmdashboardService.unsettoken()
        this.isValid = false
    }


}



export const AuthStore = new AuthStoreSingleton()