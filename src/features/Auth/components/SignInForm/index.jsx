import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Form, Formik } from 'formik';
import { Button, FormGroup, Spinner } from 'reactstrap';
import InputField from 'custom-fields/InputField';
import * as Yup from 'yup';

SignInForm.propTypes = {
    
};

function SignInForm(props) {
    const {initialValues, onSubmit} = props;

    const validationScheme = Yup.object().shape({
        username : Yup.string().required("This field is required"),
        password : Yup.string().required("This field is required")
    })

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
                />

                <FastField
                name="password"
                component={InputField}
                label="Password"
                placeholder="Enter your password"
                />

                <FormGroup>
                <Button color="primary" type="submit">
                    {isSubmitting && <Spinner size="sm" />}
                    Sign In
                </Button>
                </FormGroup>
            </Form>
            );
        }}
        </Formik>
    );
}

export default SignInForm;