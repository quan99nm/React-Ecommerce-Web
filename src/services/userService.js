import api from "./api";

const register = (data) => api.post(`${api.url.user}/register/`, data);
const login = (data) => api.post(`${api.url.user}/login/`, data);

const userService = {
  register,
  login,
};
export default userService;
