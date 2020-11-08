import firebase from 'firebase';
import axiosClient from "./axiosClient";

const userApi = {
    getMe : () => {
        //call API
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const currentUser = firebase.auth().currentUser;

                resolve({
                    id: currentUser.uid,
                    name: currentUser.name,
                    email: currentUser.email,
                    photoUrl: currentUser.photoURL
                });

            }, 500);
        });
    },
    signIn : (data) => {
        const url = 'http://localhost:8087/api/login';
        return axiosClient.post(url, data);
    }
};

export default userApi;