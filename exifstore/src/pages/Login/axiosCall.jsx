import axios from "axios";

function axiosCall(method, url, payload, headers) {
  const response = axios({
    method: method,
    url: url,
    data: payload,
    headers: { ...headers },
  }).catch(function (error) {
    const message = error.response.data.msg;
    const statusCode = error.response.status;
    return { error: message, statusCode: statusCode };
  });
  return response;
}

export default axiosCall;
