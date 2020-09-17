import axios from "axios";
import config from "./config.js";
import storage from "./storage.js";
import qs from "qs";

const CONF = {
  timeout: 20000,
  withCredentials: false,
};

const Http = {};

//urlExtraParam 表示出token以外，需要额外拼在Url后面的参数
//默认是一个对象，通过qs进行序列化后，拼接在Url后面
Http.formatUrl = function(service, api, urlExtraParam = {}) {
  let busId = storage.getCorpId("corpid"),
    token = storage.getToken("token");

  let extraParamStr = qs.stringify(urlExtraParam);
  if (extraParamStr) extraParamStr = "&" + extraParamStr;

  return (
    "/" +
    config.getConfig("service")[service] +
    api.replace("{businessId}", busId) +
    "?token=" +
    token +
    extraParamStr
  );
};

Http.addCache = function(key, fn) {
  return new Promise((resolve) => {
    let val = sessionStorage.getItem(key);
    if (val) {
      resolve && resolve(JSON.parse(val));
    } else if (fn) {
      fn().then((resp) => {
        sessionStorage.setItem(key, JSON.stringify(resp));
        resolve && resolve(resp);
      });
    }
  });
};

Http.post = function(url, param = {}, config, onlyData) {
  config = Object.assign({}, CONF, config);
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

Http.get = function(url, param = {}, config) {
  config = Object.assign({}, CONF, config);
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

Http.delete = function(url, param = {}, config) {
  config = Object.assign({}, CONF, config);
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

Http.put = function(url, param = {}, config) {
  config = Object.assign({}, CONF, config);
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

Http.patch = function(url, param = {}, config) {
  config = Object.assign({}, CONF, config);
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

Http.form = function(url, formData, config) {
  config = Object.assign({}, CONF, {
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
Http.ajax = function(url, method = "get", params = {}, config = {}) {
  config = Object.assign({}, CONF, config);

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
