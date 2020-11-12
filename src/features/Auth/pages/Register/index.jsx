import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from 'features/Auth/components/RegisterForm';
import './styles.scss';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import userApi from 'api/userApi';

Register.propTypes = {
    
};

function Register(props) {
    const history = useHistory();
    const initialValues = {
        username: "",
        password: "",
        fullname : "",
    }
    const handleSubmit = async values => {
        const res = await userApi.register(values);
        history.push('/sign-in'); 
    }

    return (
        <div className="register">
            <div className="text-center">
                <h2>Login Form</h2>
                <div className="register__form">
                    <RegisterForm onSubmit={handleSubmit} initialValues={initialValues} />
                </div>
            </div>
        </div>
    );
}

export default Register;