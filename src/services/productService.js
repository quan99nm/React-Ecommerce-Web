import api from "./api";

const list = () => api.get(api.url.products);
const get = (id) => api.get(`${api.url.products}/${id}`);
const getImage = (id) =>
  api.get(`${api.url.products}/${id}/image`, { responseType: "blob" });
const getNewest = () => api.get(`${api.url.products}/newest`);

const productService = {
  get,
  list,
  getImage,
  getNewest,
};
export default productService;
