import React from 'react';
import PropTypes from 'prop-types';
import TinyMCE from 'components/TinyMCE';
import Banner from 'components/Banner';

AddEditPage.propTypes = {
    
};

function AddEditPage(props) {
    return (
        <div>
            <Banner title="Pick your amazing photo" />
            <TinyMCE />
        </div>
    );
}

export default AddEditPage;