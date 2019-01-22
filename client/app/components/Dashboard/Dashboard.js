import {Component} from 'react';
import ReactTable from 'react-table';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hits: [],
    };
  }

  componentDidMount(){
    fetch('/api/admin/licencias/get')
      .then(response => response.json())
      .then(data => this.setState({ hits: data.hits }));
  }

  render() {
    const {hits} = this.state;
    return (
      <div>
        <ul>
          {hits.map(hit =>
            <li key={hit.objectID}>
              <a href={hit.url}>{hit.title}</a>
            </li>
          )}
        </ul>

      </div>
    );
  }

}
export default Dashboard;
