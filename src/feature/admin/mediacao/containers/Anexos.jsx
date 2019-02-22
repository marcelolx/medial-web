import React from 'react';
import Card from '../../../../core/components/card/Card';
import CardHeader from '../../../../core/components/card/CardHeader';
import CardBody from '../../../../core/components/card/CardBody';
import withStyles from '@material-ui/core/styles/withStyles';
import queryString from 'query-string';
import * as anexoActions from '../services/anexo/anexoActions';
import { connect } from 'react-redux';
import bindActionCreators from 'redux/src/bindActionCreators';
import { compose } from 'recompose';
import withRouter from 'react-router-dom/withRouter';
import { ListItem, ListItemIcon } from '@material-ui/core';
import AttachFile from '@material-ui/icons/AttachFile';

const style = ({
  semMargen: {
    margin: 0,
  },
  cardAnexos: {
    height: '230px'
  },
  cardBody: {
    overflowY: 'scroll',
  },
  listItem: {
    padding: 0,
  },
  link: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
});

class Anexos extends React.Component {

  componentDidMount() {
    this.props.actions.adquirirAnexos(queryString.parse(this.props.location.search, { ignoreQueryPrefix: true }).id);
  }

  render() {
    const { classes } = this.props;

    const listFiles = (<>
      {this.props.anexos.anexos.length > 0 ? (
        this.props.anexos.anexos.map((dado) =>
          <ListItem style={style.listItem} key={dado.id}>
            <ListItemIcon>
              <AttachFile />
            </ListItemIcon>
            <a style={style.link} href={dado.link} rel="noopener noreferrer" target="_blank">

              {dado.nome}
            </a></ListItem>
        )

      ) : "Zero"}

    </>);

    return (
      <React.Fragment>
        <Card className={classes.cardAnexos}>
          <CardHeader color='success'>
            <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Anexos</p>
          </CardHeader>
          <CardBody style={style.cardBody}>
            {listFiles}
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  anexos: state.anexos
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...anexoActions
  }, dispatch)
});

export default withRouter(compose(
  withStyles(style),
  connect(mapStateToProps, mapDispatchToProps)
)(Anexos));