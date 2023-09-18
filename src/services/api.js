import axios from "axios";
import store from "../store/index";
import { hideLoading, showLoading } from "react-redux-loading-bar";
const url = {
  baseUrl: "http://127.0.0.1:8000",
  products: "/api/products",
  categories: "/api/categories",
  orders: "/api/orders",
  user: "/user",
};
const instance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
instance.interceptors.request.use((request) => {
  const state = store.getState();
  if (state.auth.token) {
    request.headers.Authorization = `Bearer ${state.auth.token}`;
  }
  store.dispatch(showLoading());
  console.log(request.headers.Authorization);
  return request;
});
instance.interceptors.response.use(
  (response) => {
    setTimeout(() => store.dispatch(hideLoading()), 100);
    return response;
  },
  (error) => {
    setTimeout(() => store.dispatch(hideLoading()), 100);

    if (error.response && error.response.status === 409) {
      // Handle the 409 conflict error here
      // You can access error.response.data for the server response
    }

    return Promise.reject(error); // Reject the promise to propagate the error
  }
);
const api = {
  url: url,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};

export default api;
