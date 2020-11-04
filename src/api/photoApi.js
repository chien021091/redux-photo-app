import axiosClient from "./axiosClient";

const photoApi = {
    getAll : params => {
        const url = 'http://localhost:8087/photos';
        return axiosClient.get(url, {params});
    },
    addNew : data => {
        const url = 'http://localhost:8087/photo';
        return axiosClient.post(url, data);
    },
    deletePhoto : ids => {
        const url = 'http://localhost:8087/photo';
        return axiosClient.delete(url, {data: ids});
    },
    updatePhoto : data => {
        const url = `http://localhost:8087/photo/${data.id}`;
        return axiosClient.put(url, data);
    }
};

export default photoApi;