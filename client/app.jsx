const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const chart = require('chart.js');
const chartContext = document.getElementById('myChart').getContext('2d');
require('../public/style.css');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: [],
      data: []
    }

    this.Chart = () => {
      return new chart(chartContext, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: this.state.labels,
          datasets: [{
              label: 'BTC values in USD',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: this.state.data
          }]
      },

      // Configuration options go here
      options: {}
    });
  }

  }

  reloadChart(e) {
    let $start = $('input#start').val();
    let $end = $('input#end').val();
    let url = `https://api.coindesk.com/v1/bpi/historical/USD/close.json?start=${$start}&end=${$end}`;
    $.ajax({
      method: 'GET',
      url,
      dataType: 'json',
      success: (results) => {
        console.log('reloadChart success: ', results);
        let labels = [];
        let data = [];
        for (let key in results.bpi) {
          let label = key.split('-');
          label.shift();
          label = label.join('-');
          data.push(results.bpi[key]);
          labels.push(label);
        }
        console.log('labels, ', labels);
        console.log('data, ', data);
        this.setState({
          labels,
          data
        });
        this.Chart();
      },
      error: (error) => {
        console.log('error', error)
      }
    });
  };

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: `https://api.coindesk.com/v1/bpi/historical/USD/close.json`,
      dataType: 'json',
      success: (results) => {
        console.log('success: ', results);
        let labels = [];
        let data = [];
        for (let key in results.bpi) {
          let label = key.split('-');
          label.shift();
          label = label.join('-');
          data.push(results.bpi[key]);
          labels.push(label);
        }
        this.setState({
          labels,
          data
        });
        this.Chart();
      },
      error: (error) => {
        console.log('error', error);
      }
    });
  };


  render() {
    return (
      <div>
        <h2>Cryptocurrency Charting Tool</h2>
        <label id="start">starting date:</label><input id="start" placeholder="(e.g. 2019-09-01)"></input><br/>
        <label id="end">ending date:</label><input id="end" placeholder="(e.g. 2019-09-30)"></input><br/>
        <button id="button" onClick={this.reloadChart.bind(this)}>Get New Data</button>
      </div>
    )
  }

};

ReactDOM.render( <App />, document.getElementById('app'));