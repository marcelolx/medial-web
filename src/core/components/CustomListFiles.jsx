import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, IconButton, withStyles } from '@material-ui/core';
import AttachFile from '@material-ui/icons/AttachFile';
import Close from '@material-ui/icons/Close'

import { dangerColor } from './../../assets/jss/styles';


const style = {
  dangerColor: {
    color: dangerColor
  },
  listItem: {
    padding: 0,
  }

}

class CustomListFiles extends React.Component {


  _handleDeleteFile(el, files) {
    let filesNovo = [];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      if (!(el.name === file.name && el.lastModified === file.lastModified)) {
        filesNovo.push(file);
      }
    }

    this.props.onChange(filesNovo);


  }

  render() {
    const { files, canDelete, canEmpty, errorList, classes } = this.props;
    const listItems = [];
    if (files && files.length > 0) {

      for (let index = 0; index < files.length; index++) {
        const element = files[index];

        listItems.push(<ListItem className={[classes.listItem, errorList ? classes.dangerColor : null].join(' ')} key={element.name.toString()} value={element.name.toString()} >
          <ListItemIcon>
            <AttachFile color={errorList ? "error" : "inherit"} />
          </ListItemIcon>
          {element.name.toString()}

          {canDelete ?
            <ListItemIcon>
              <IconButton aria-label='Filtrar nome'
                onClick={() => this._handleDeleteFile(element, files)}>
                <Close />
              </IconButton>
            </ListItemIcon>
            : null}

        </ListItem>)

      }
    } else {
      if (!canEmpty) {
        listItems.push(<ListItem key="1" value="Nunhum arquivo selecionado" >Nenhum arquivo selecionado</ListItem>)
      }
    }

    return (
      <>
        {listItems}
      </>
    );
  }
}

CustomListFiles.propTypes = {
  onChange: PropTypes.func,
  files: PropTypes.array.isRequired,
  errorList: PropTypes.bool
}

export default withStyles(style)(CustomListFiles);