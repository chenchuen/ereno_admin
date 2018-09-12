import React, { Component } from 'react';

class TransactionReport extends Component {
  constructor(props){
   super(props);
   this.goBack = this.goBack.bind(this);
  }
  goBack(){
    this.props.history.goBack();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">TransactionReport</h1>
          <button onClick={this.goBack}>Go Back</button>
        </header>
      </div>
    );
  }
}

export default TransactionReport;
