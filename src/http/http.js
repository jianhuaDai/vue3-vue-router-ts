import axios from "axios";
const CONF = {
    timeout: 20000,
    withCredentials: false,
};

// const Http = axios.create({
//     baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
//     timeout: 20000 // 请求超时时间
// })
const Http = axios.create(CONF)
const err = (error) => {
    if (error.response) {
        const data = error.response.data
        const token = Vue.ls.get(ACCESS_TOKEN)
        if (error.response.status === 403) {
            notification.error({
                message: 'Forbidden',
                description: data.msg
            })
        }
        if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
            notification.error({
                message: '提示',
                description: '认证过期请重新登录'
            })
            if (token) {
                store.dispatch('Logout').then(() => {
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)
                })
            }
        }
    }
    return Promise.reject(error)
}
// 同一时间防止重复请求
let pending = []; //声明一个数组用于存储每个请求的取消函数和axios标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
    console.log('pending', pending);
    for (let p in pending) {
        if (pending[p].u === config.url.split('?')[0] + '&' + config.method) {
            //当当前请求在数组中存在时执行函数体
            pending[p].f(); //执行取消操作
            pending.splice(p, 1); //数组移除当前请求
        }
    }
}
// request interceptor
Http.interceptors.request.use(config => {
    /**
     * 
     */
    removePending(config); //在一个axios发送前执行一下取消操作 阻止重复请求
    config.cancelToken = new cancelToken((c) => {
        // pending存放每一次请求的标识，一般是url + 参数名 + 请求方法，当然你可以自己定义
        pending.push({ u: config.url.split('?')[0] + '&' + config.method, f: c });
    });
    /**
     * 
     */
    const token = '1234567' //根据实际存储获取 vue.ls或者localstorage
    if (token) {
        config.headers['Authorization'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    return config
}, err)

// response interceptor
Http.interceptors.response.use((response) => {
    if (response.status === 200 && response.data && response.data.code === 0) {
        return Promise.resolve(response.data)
    } else {
        notification.error({
            message: response.data.msg
        })
        return Promise.reject(response)
    }
}, err)


Http.post = function (url, param = {}, config, onlyData) {
    config = Object.assign({}, config);
    return new Promise((resolve, reject) => {
        axios
            .post(url, param, config)
            .then((resp) => {
                resolve && resolve(onlyData === false ? resp : resp.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

Http.get = function (url, param = {}, config) {
    config = Object.assign({}, config);
    return new Promise((resolve, reject) => {
        axios
            .get(
                url,
                {
                    params: param,
                },
                config
            )
            .then((resp) => {
                resolve && resolve(resp.data);
            })
            .catch((err) => {
                reject && reject(err);
            });
    });
};

Http.delete = function (url, param = {}, config) {
    config = Object.assign({}, config);
    return new Promise((resolve, reject) => {
        axios
            .delete(
                url,
                {
                    params: param,
                },
                config
            )
            .then((resp) => {
                resolve && resolve(resp.data);
            })
            .catch((err) => {
                reject && reject(err);
            });
    });
};

Http.put = function (url, param = {}, config) {
    config = Object.assign({}, config);
    return new Promise((resolve, reject) => {
        axios
            .put(url, param, config)
            .then((resp) => {
                resolve && resolve(resp.data);
            })
            .catch((err) => {
                reject && reject(err);
            });
    });
};

Http.patch = function (url, param = {}, config) {
    config = Object.assign({}, config);
    return new Promise((resolve, reject) => {
        axios
            .patch(url, param, config)
            .then((resp) => {
                resolve && resolve(resp.data);
            })
            .catch((err) => {
                reject && reject(err);
            });
    });
};

Http.form = function (url, formData, config) {
    config = Object.assign({}, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return new Promise((resolve, reject) => {
        axios
            .post(url, formData, config)
            .then((resp) => {
                resolve && resolve(resp.data);
            })
            .catch((err) => {
                reject && reject(err);
            });
    });
};

//通用版
Http.ajax = function (url, method = "get", params = {}, config = {}) {
    config = Object.assign({}, config);

    return axios({
        url,
        method,
        params,
        ...config,
    })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw new Error(err);
        });
};

export default Http;
