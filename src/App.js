import React, { Component } from 'react';
import './App.css';
import { Data } from "./visualization/Data";
import BarChart from "./visualization/BarChart";
import LineChart from "./visualization/LineChart";
import RadialChart from "./visualization/RadialChart";
import RadialChartCanvas from "./visualization/RadialChartCanvas";

class App extends Component {
  state = {
    data: [],
    range: []
  }

  componentDidMount() {
    // mock API call
    setTimeout(() => {
      this.setState(() => ({
        data: Data
      }));
    }, 1000);
  }

  updateRange = (range) => {
    this.setState(() => ({ range }))
  };

  render() {
    return (
      <div className="App">
        <BarChart data={this.state.data} range={this.state.range} updateRange={this.updateRange}/>
        <br />
        <LineChart data={this.state.data} />
        <br />
        <RadialChart data={this.state.data} />
        <br />
        <RadialChartCanvas data={this.state.data} />
      </div>
    )
  } 
}

export default App;