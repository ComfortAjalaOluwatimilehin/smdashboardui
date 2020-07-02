import axios, { AxiosInstance } from "axios"
export class RestClientSingleton {

    getclient(): AxiosInstance {
        return axios.create({
            withCredentials:true
        })
    }
}
