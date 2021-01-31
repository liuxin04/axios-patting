import axios from "axios";
import contactApi from "./contactApi";
import { Toast } from "vant";

//创建axios实例
let instance = axios.create({
  baseURL: "http://localhost:9000/api"
});
let Http = {}; //包裹请求方式的容器
for (let key in contactApi) {
  let api = contactApi[key];
  Http[key] = async function(params, isFormData = false, config = {}) {
    let url = api.url;
    let newParams = null;
    if (params && isFormData) {
      let formdata = new FormData();
      for (let p in params) {
        formdata.append(p, params[p]);
      }
      newParams = formdata;
    } else {
      newParams = params;
    }
    //区分不同的请求方式  post put patch 为一组；delete 和 get 为一组
    let response;
    if (api.method == "post" || api.method == "put" || api.method == "patch") {
      //会有三个参数 url data config
      try {
        response = await instance[api.method](url, newParams, config);
      } catch (err) {
        response = err;
      }
    } else if (api.method == "delete" || api.method == "get") {
      try {
        response = await instance[api.method](url, {
          params: newParams
        });
      } catch (err) {
        response = err;
      }
    }
    return response;
  };
}

//添加拦截器
instance.interceptors.request.use(
  config => {
    Toast.clear();
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0
    });
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  res => {
    Toast.clear();
    return res.data;
  },
  err => {
    Toast.clear();
    Toast({
      message: "请求失败请稍后重试",
      forbidClick: true,
      duration: 1000
    });
    return Promise.reject(err);
  }
);

export default Http;
