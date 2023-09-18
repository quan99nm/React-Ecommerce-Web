import api from "./api";

const list = () => api.get(api.url.categories);
const get = (id) => api.get(`${api.url.categories}/${id}/products`);

const categoryService = {
  get,
  list,
};
export default categoryService;
