import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import SignInForm from 'features/Auth/components/SignInForm';
import userApi from 'api/userApi';

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

    const handleSubmit = async values => {
        console.log("Form Submit", values);

        const resp = await userApi.signIn(values);

        console.log("Token", resp);
    
        
          /* const newPhoto = await photoApi.updatePhoto(values);
          const action = updatePhoto(newPhoto);
          dispatch(action);
        
    
        history.push('/photos');  */
      }

    return (
        <div className="sign-in">
            <div className="text-center">
                <h2>Login Form</h2>
                <div className="sign-in__form">
                    <SignInForm onSubmit={handleSubmit} initialValues={initialValues} />
                </div>

                <p>or Login with social account</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
        </div>
    );
}

export default SignIn;