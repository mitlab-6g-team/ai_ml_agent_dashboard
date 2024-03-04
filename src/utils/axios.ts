import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig
} from "axios";

// 接口地址
const baseURL = "https://api.llama.fi"

const service: AxiosInstance = axios.create({
    baseURL,
    timeout: 5000,
})

// 添加請求攔截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token: string | null = sessionStorage.getItem("token") || null
    if (token) {
        config.headers['Authorization'] = token
    }
    return config
}, (error: AxiosError) => {
    console.log(error, 'request-error')
    return Promise.reject(error)
})


// 添加請求攔截器
service.interceptors.response.use((response: AxiosResponse) => {
    return response;
}, (error: AxiosError) => {
    console.log(error, 'response-error')

    const {response} = error;
    // 處理 HTTP 網絡錯誤
    let message = '';

    // HTTP 狀態碼
    const status = response?.status;

    switch (status) {
        case 401:
            message = 'token 失效，请重新登录';
            break;
        case 403:
            message = '拒絕訪問';
            break;
        case 404:
            message = '請求地址錯誤';
            break;
        case 500:
            message = '服務器故障';
            break;
        default:
            message = '網絡連接故障';
    }

    console.log(message, "response-error-msg")
    return Promise.reject(error);

})

export const http = {
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return service.get(url, config)
    },
    post<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
        return service.post(url, data, config)
    },
    //...
}

export default service;