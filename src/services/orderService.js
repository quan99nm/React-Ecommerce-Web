import api from "./api";

const create_order = (data) =>
  api.post(`${api.url.orders}/create_order/`, data);

const orderService = {
  create_order,
};
export default orderService;
