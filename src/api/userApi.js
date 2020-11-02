import firebase from 'firebase';

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
    }
};

export default userApi;