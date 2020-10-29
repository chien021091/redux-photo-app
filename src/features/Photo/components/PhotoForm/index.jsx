import React from 'react';
import PropTypes from 'prop-types';

import { Form, Button, FormGroup, Input, Label } from 'reactstrap';
import Select from 'react-select';

PhotoForm.propTypes = {
    onSubmit: PropTypes.func
};

PhotoForm.defaultProps = {
    onSubmit: null
}

function PhotoForm(props) {
    return (
        <Form>
            <FormGroup>
                <Label for="titleId">Title</Label>
                <Input name="title" id="titleId" placeholder="Eg: Now Nature" />
            </FormGroup>

            <FormGroup>
                <Label for="categoryId">Category</Label>
            </FormGroup>
        </Form>
    );
}

export default PhotoForm;