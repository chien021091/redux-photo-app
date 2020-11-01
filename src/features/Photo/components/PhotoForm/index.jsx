import React from "react";
import PropTypes from "prop-types";

import { Button, FormGroup, Input, Label, Spinner } from "reactstrap";
import Select from "react-select";
import { PHOTO_CATEGORY_OPTIONS } from "constants/global";
import images from "constants/images";
import { Formik, Form, FastField } from "formik";
import InputField from "custom-fields/InputField";
import SelectField from "custom-fields/SelectField";
import RandomPhotoField from "custom-fields/RandomPhotoField";
import * as Yup from 'yup';
import { useParams } from "react-router-dom";

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
  onSubmit: null,
};

function PhotoForm(props) {
  
  const {initialValues} = props;

  const validationScheme = Yup.object().shape({
    title : Yup.string().required("This field is required"),
    categoryId: Yup.number().required("This field is required").nullable(),
    photo : Yup.string().when('categoryId', {
      is : 1,
      then: Yup.string().required("This field is required"),
      otherwise: Yup.string().notRequired()
    })
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationScheme}
      onSubmit={props.onSubmit}
    >
      {(formikProps) => {
        const { values, errors, touched, isSubmitting } = formikProps;
        console.log({ values, errors, touched });

        return (
          //form of form mik automatique gerer reset
          //fastfield doc lap, ko bi render lai khi cac field khac re-render
          <Form>
            <FastField
              name="title"
              component={InputField}
              label="Title"
              placeholder="Eg: wow nature"
            />

            <FastField
              name="categoryId"
              component={SelectField}
              label="Category"
              placeholder="What's your photo category"
              options={PHOTO_CATEGORY_OPTIONS}
            />

            <FastField
              name="photo"
              component={RandomPhotoField}
              label="Photo"
            />

            <FormGroup>
              <Button color="primary" type="submit">
                {isSubmitting && <Spinner size="sm" />}
                Add to album
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PhotoForm;
