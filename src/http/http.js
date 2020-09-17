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

// request interceptor
Http.interceptors.request.use(config => {
    const token = Vue.ls.get(ACCESS_TOKEN)
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
