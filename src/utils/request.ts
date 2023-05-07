import axios, { isCancel, AxiosError } from "axios";
// import { getToken } from '';
import { tansParams } from "./ruoyi";
import errorCode from "./httpCode";
function getToken() {
  return "Bearer ...";
}

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    const { notToken, isRepeat } = config.headers;
    if (getToken() && !notToken) {
      config.headers["Authorization"] = getToken();
    }
    if (config.method?.toLowerCase() === "get" && config.params) {
      let url = config.url + "?" + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    if (
      !isRepeat &&
      config.method &&
      ["post", "put"].includes(config.method.toLowerCase())
    ) {
      const requestObj = {
        url: config.url,
        data:
          typeof config.data === "object"
            ? JSON.stringify(config.data)
            : config.data,
        time: new Date().getTime(),
      };

      const preRequestStr = sessionStorage.getItem("requestObj");
      const preRequestObj = preRequestStr && JSON.parse(preRequestStr);
      if (!preRequestStr) {
        sessionStorage.setItem("requestObj", JSON.stringify(requestObj));
      } else {
        if (
          requestObj.url === preRequestObj.url &&
          requestObj.data === preRequestObj.data &&
          requestObj.time - preRequestObj.time < 1000
        ) {
          return Promise.reject(new Error("请勿重复提交"));
        } else {
          sessionStorage.setItem("requestObj", JSON.stringify(requestObj));
        }
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  (res) => {
    const { data, config } = res;
    // const { code, msg } = data;
    // 未设置状态码则默认成功状态
    const code =
      res.data.code ||
      200 ||
      (res.data.code === "0" && res.data.msg === "success");
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode["default"];
    // 二进制数据则直接返回
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      return res;
    }
    if (code === 401) {
      window.prompt("登录状态已过期,请重新登录");
      // logOut()
      window.location.href = "/";
      return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
    } else if (code !== 200) {
      //&& (res.config.customSuccessCode !== code))
      return Promise.reject("接口数据code不等于200！");
    } else {
      return res;
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default service;
