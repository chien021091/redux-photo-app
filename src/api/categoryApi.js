import axiosClient from "./axiosClient";

const categoryApi = {
    getAll : params => {
        const url = 'http://localhost:8087/categorys';
        return axiosClient.get(url, {params});
    }
};

export default categoryApi;