import axios, { AxiosInstance } from "axios"
import Cookie from "js-cookie"
export class RestClientSingleton {

    getclient(): AxiosInstance {
        return axios.create({
            timeout: 1000, headers: {
                Authorization: this.token
            }
        })
    }
    settoken(token: string | undefined) {
        if (token === undefined) {
            return this.unsettoken()
        }
        Cookie.set("token", token, { expires: 1 });

    }
    unsettoken() {
        Cookie.remove("token")
    }
    get token(): string | undefined {
        return Cookie.get("token")
    }
}
