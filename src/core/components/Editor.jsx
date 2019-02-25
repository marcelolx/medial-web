import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

export default class Editor extends React.Component {

  render() {
    return (
      <div>
        <ReactQuill
          {...this.props}
          style={{height: 210}}
          modules={this.props.noHeader ? { toolbar: [] } : Editor.modules}
          formats={Editor.formats}

        />
      </div>
    )
  }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

Editor.defaultProps = {
  noHeader: false
};
/* 
 * PropType validation
 */
Editor.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  theme: PropTypes.string,
  noHeader: PropTypes.bool
}