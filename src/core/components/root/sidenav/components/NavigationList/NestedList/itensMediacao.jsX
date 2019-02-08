import React from 'react';
import ViewModule from '@material-ui/icons/ViewModule';

const itensMediacao = {
  name: 'Mediação',
  collapseItems: [
    {name: 'Mediações', path: '/mediacao/all', icon: <ViewModule />},
    {name: 'Nova Mediação', path: '/mediacao/new', icon: <ViewModule />},
  ],
}

export default itensMediacao;