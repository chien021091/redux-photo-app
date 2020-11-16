import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Form, Formik } from 'formik';
import { FormGroup, Spinner } from 'reactstrap';
import InputField from 'custom-fields/InputField';
import * as Yup from 'yup';
import { Button } from '@material-ui/core';

SignInForm.propTypes = {
    
};

function SignInForm(props) {
    const {initialValues, onSubmit, onClickRegister} = props;

    const validationScheme = Yup.object().shape({
        username : Yup.string().required("This field is required"),
        password : Yup.string().required("This field is required")
    })

    const handleClickRegister = () => {
        onClickRegister();
    }

    return (
        <Formik
        initialValues={initialValues}
        validationSchema={validationScheme}
        onSubmit={onSubmit}
        >
        {(formikProps) => {
            const { values, errors, touched, isSubmitting } = formikProps;
            console.log({ values, errors, touched });

            return (
            //form of form mik automatique gerer reset
            //fastfield doc lap, ko bi render lai khi cac field khac re-render
            <Form>
                <FastField
                name="username"
                component={InputField}
                label="Username"
                placeholder="Enter your username"
                required="true"
                />
                
                <FastField
                name="password"
                component={InputField}
                label="Password"
                placeholder="Enter your password"
                required="true"
                type="password"
                />

                <Button variant="contained" color="primary" type="submit">
                    {isSubmitting && <Spinner size="sm" />}
                    Sign In
                </Button>
                <Button type="button" onClick={handleClickRegister}>Register</Button>

                {/* <FormGroup>
                <Button color="primary" type="submit">
                    {isSubmitting && <Spinner size="sm" />}
                    Sign In
                </Button>
                <Button color="success" type="button" onClick={handleClickRegister}>
                    Register
                </Button>
                </FormGroup> */}
            </Form>
            );
        }}
        </Formik>
    );
}

export default SignInForm;