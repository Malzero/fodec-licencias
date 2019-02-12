import React, {Component} from 'react';


class Converter extends Component{

  constructor() {
    super();

    this.state = {

      excelJason: [],

    };
    //this.convert_to_json = this.convert_to_json().bind(this);

  }

  componentDidMount(){
    this.convert_to_json();
  }

  convert_to_json() {

    fetch('/api/admin/licencias/convert')
      .then(results => this.setState({excelJason: results}))//this.setState({licencias: results}))
      .catch(error => console.log("parsing fail", error));
  }
  render() {
    //this.convert_to_json();

    return (
      <div>

      </div>
    );
  }
}
export default Converter;
