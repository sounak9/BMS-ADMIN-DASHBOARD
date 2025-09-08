import axiosClient from "./axiosClient";

const companyApi = {
  getAll: () => axiosClient.get("/companies"),
};

export default companyApi;
