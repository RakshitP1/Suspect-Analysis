import React from "react";

import queryString from "query-string";
import { withRouter } from "react-router-dom";

import "./SuspectPage.css";

class SuspectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.location.state.name,
      twitterHandle: this.props.location.state.twitterHandle,
      twitterUrl:
        "https://twitter.com/" + this.props.location.state.twitterHandle
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="SuspectPage">
        <h1>{this.state.name}</h1>
        <h2>
          <a href={this.state.twitterUrl}>
            <img src="./twitter-logo.svg" height="25px" width="25px"></img>
            {this.state.twitterHandle}
          </a>
        </h2>
      </div>
    );
  }
}

export default withRouter(SuspectPage);
