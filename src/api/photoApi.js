import axiosClient from "./axiosClient";

const photoApi = {
    getAll : params => {
        const url = 'http://localhost:8087/photos';
        return axiosClient.get(url, {params});
    }
};

export default photoApi;