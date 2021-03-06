import axios from 'axios';
import queryString from 'query-string';
import firebase from 'firebase';
import { KEYS_TOKEN_CREDENTIEL } from 'constants/keys';

const getFireBaseToken = async () => {
    const currentUser = firebase.auth().currentUser;
    if(currentUser) return currentUser.getIdToken();

    return new Promise((resolve, reject) => {
        const waitTimer = setTimeout(() => {
            reject(null);
        }, 10000)

        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            if(!user){
              reject(null);
            }
    
            const token = await user.getIdToken();
            resolve(token);
            unregisterAuthObserver();
            clearTimeout(waitTimer);
          }
        );
    });
}

const axiosClient = axios.create({
    baseURL: process.env.SPRING_APP_API,
    headers: {
        'content-type' : 'application/json'
    },
    paramsSerializer : params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async config => {
    /* const currentUser = firebase.auth().currentUser;
    if(currentUser){
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    } */
    /* const token = await getFireBaseToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    } */
    const token = localStorage.getItem(KEYS_TOKEN_CREDENTIEL);
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

axiosClient.interceptors.response.use(response => {
    if(response && response.data){
        return response.data;
    }
    return response;
}, error => {
    throw error;
})

export default axiosClient;