import React from "react";

import queryString from "query-string";
import { withRouter } from "react-router-dom";

class SuspectPage extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    // console.log(this.props);
    this.state = {
      name: this.props.location.state.name,
      twitterHandle: this.props.location.state.twitterHandle
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="SuspectPage">
        <h1>Suspect Page</h1>
        <p>name: {this.state.name}</p>
        <p>twitter handle: {this.state.twitterHandle}</p>
      </div>
    );
  }
}

export default withRouter(SuspectPage);
