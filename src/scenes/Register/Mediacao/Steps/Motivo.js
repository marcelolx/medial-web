import React from 'react';
import GridContainer from '../../../../components/Grid/GridContainer';
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from '../../../../components/Grid/GridItem';
import { bindActionCreators } from 'redux';
import * as assuntosActions from '../../../../services/admin/mediacao/assuntos/actions';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import SearchSelect from '../../../../components/SearchSelect';

const style = {
  infoText: {
    fontWeight: "300",
  }
}
class Motivo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conflitos: [],
      assuntos: [],
    };
  }

  sendState() {
    return this.state;
  }

  isValidated() {
    return true;
  }

  componentDidMount() {
    if (this.props.assuntos.conflitos.length === 0) {
      this.props.actions.getConflitos();
    }
  }

  handleSelectChange = name => selecionado => {
    this.setState({ [name]: selecionado });

    if (name === 'conflitos') {
      (selecionado.value !== undefined) 
        ? this.buscarListaAssuntos(selecionado.value) 
        : this.limparListasAssutos();
    }
  }

  buscarListaAssuntos(idConflito) {
    this.setState({
      assuntos: [],
    });

    this.props.actions.getAssuntos(idConflito);
  }

  limparListasAssutos() {
    this.setState({
      assuntos: []
    });
    this.props.actions.clearAssuntos();
  }

  render() {
    const { assuntos } = this.props;
    console.log(this.props.assuntos);
    
    //TODO: Refatorar SearchSelect para suportar error e errorText, basear-se no CustomInput.

    return(
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
          <SearchSelect 
            opcoes={assuntos.conflitos}
            name="conflitos"
            onChange={(name, value) => this.handleSelectChange(name, value)}
            value={this.state.conflitos}
            placeholder="Conflitos"            
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <SearchSelect 
            opcoes={assuntos.assuntos}
            name="assuntos"
            onChange={(name, value) => this.handleSelectChange(name, value)}
            value={this.state.assuntos}
            placeholder="Assuntos"
          />
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({
  assuntos: state.mediacaoAssuntos
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...assuntosActions
  }, dispatch)
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(style)
)(Motivo);