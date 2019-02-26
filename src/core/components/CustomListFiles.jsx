import React from 'react';
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


function _handleDeleteFile(el, files,props) {
  let filesNovo = [];

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    if (!(el.name === file.name && el.lastModified === file.lastModified)) {
      filesNovo.push(file);
    }
  }

  props.onChange(filesNovo);


}

function CustomListFiles(props) {

  const { files, canDelete, canEmpty, errorList, classes } = props;
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
              onClick={() => _handleDeleteFile(element, files,props)}>
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

export default withStyles(style)(CustomListFiles);