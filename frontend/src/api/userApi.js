import axiosClient from "./axiosClient";

const userApi = {
  getAll: async () => {
    const res = await axiosClient.get("/users");
    return res.data; // now res = { total: X, users: [...] }
  },
};

export default userApi;
