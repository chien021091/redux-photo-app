import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import SignInForm from 'features/Auth/components/SignInForm';
import userApi from 'api/userApi';
import { useDispatch } from 'react-redux';
import { saveUser } from 'app/userSlice';
import { useHistory } from 'react-router-dom';
import { KEYS_TOKEN_CREDENTIEL, KEYS_USER_CREDENTIEL } from 'constants/keys';
import './styles.scss';

SignIn.propTypes = {
    
};

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl : "/photos"
  };

function SignIn(props) {
    const initialValues = {
        username: "",
        password: ""
    };

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async values => {
        console.log("Form Submit", values);

        const resp = await userApi.signIn(values);
        const dataUser = {
            current : resp.user,
            isLogin : true,
        }
        const action = saveUser(dataUser);
        dispatch(action);

        localStorage.setItem(KEYS_TOKEN_CREDENTIEL  , resp.accessToken);
        localStorage.setItem(KEYS_USER_CREDENTIEL   , JSON.stringify(resp.user));

        console.log("Token", resp);
        history.push('/photos'); 
    }
    
    const handToRegister = () => {
        history.push("/register");
    }

    return (
        <div className="sign-in">
            <div className="text-center">
                <h2>Login Form</h2>
                <div className="sign-in__form">
                    <SignInForm onSubmit={handleSubmit} initialValues={initialValues} onClickRegister={handToRegister} />
                </div>

                <p>or Login with social account</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
        </div>
    );
}

export default SignIn;