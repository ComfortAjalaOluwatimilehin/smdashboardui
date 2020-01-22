import { observable, action } from "mobx"
import axios, { AxiosInstance } from "axios"
import Cookie from "js-cookie"
import { message } from "antd"

class AuthStoreSingleton {
    @observable token: string | undefined
    @observable client: AxiosInstance;
    constructor() {
        this.token = this.extracttoken()
        this.client = axios.create({ timeout: 1000, })

    }
    get role(): string | undefined { return "" }
    @action  async login({ email, password }: { email: string, password: string }) {
        console.log(this.client === undefined)
        if (!this.client) return
        try {

            const { data } = await this.client.post(`http://localhost:8080/login`, { email, password })
            if (typeof data !== "string") throw new Error("Format of login request response is invalid")
            this.settoken(data)
        } catch (err) {
            console.error(err)
            message.error(err.message)
        }
    }
    private settoken(token: string) {
        Cookie.set("token", token, { expires: 1 });
        this.token = token
    }
    private extracttoken(): string | undefined {
        const token: string | undefined = Cookie.get("token")
        return token
    }
    @action logout() {
        Cookie.remove("token")
        this.token = undefined
    }


}



export const AuthStore = new AuthStoreSingleton()