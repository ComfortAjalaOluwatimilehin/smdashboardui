import { action, observable } from "mobx"
import { SmdashboardService } from "../service";

class AuthStoreSingleton {
    @observable isValid: boolean = false
    @observable initcomplete: boolean = false
    constructor() {
        this.init()
        this.intevalRepeat()

    }
    private async intevalRepeat():Promise<void>{
        setInterval(async() => {
            console.log("checked: checkIfStillValid")
            await this.checkIfStillValid()
        }, 600000)
    }
    private async checkIfStillValid():Promise<void>{
        try {
            const isvalid = await SmdashboardService.vtoken()
           this.isValid = isvalid
        } catch (err) {
            this.logout()
        }
    }
    private async init() {
        await this.checkIfStillValid()
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