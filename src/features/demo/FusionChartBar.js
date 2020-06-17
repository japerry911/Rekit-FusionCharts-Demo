import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
const chartConfigs = {
  type: 'column2d',
  width: '700',
  height: '400',
  dataFormat: 'json',
  dataSource: {
    chart: {
      caption: 'Europe Populations',
      subCaption: '2019',
      xAxisName: 'Country',
      yAxisName: 'Population',
      theme: 'fusion'
    },
    data: []
  }
};

export class FusionChartBar extends Component {
  static propTypes = {
    demo: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchBarChartData();
  }

  render() {
    chartConfigs.dataSource.data = this.props.demo.barChartData;

    return (
      <div className="demo-fusion-chart-bar">
        <h1>Fusion Charts</h1>
        <ReactFC {...chartConfigs} />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    demo: state.demo,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FusionChartBar);
