import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

TinyMCE.propTypes = {
    
};

function TinyMCE(props) {
    const onChange = (content) => {
        console.log('onChange', content);
    }

    return (
        <Editor
         apiKey="9uczvmtuftc1nn8nryz2o40lledrmmek30kgiktlezm4jt4m"
         initialValue="<p>This is the initial content of the editor</p>"
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
         onEditorChange={onChange}
       />
    );
}

export default TinyMCE;