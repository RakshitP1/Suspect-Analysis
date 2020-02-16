import React from "react";
import { Redirect, withRouter } from "react-router-dom";

import "./MainPage.css";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      twitterHandle: "",
      redirect: false,
      search: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeTwitterHandle = this.handleChangeTwitterHandle.bind(this);
  }

  handleSubmit(event) {
    if (this.state.name == "" || this.state.twitterHandle == "") {
      alert("Be sure to fill out all the fields");
    } else {
      this.setState({ redirect: true });
      this.setState({
        search:
          "?name=" +
          this.state.name +
          "&twitter_handle=" +
          this.state.twitterHandle
      });
    }
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeTwitterHandle(event) {
    this.setState({ twitterHandle: event.target.value });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/suspect",
            // search: this.state.search,
            state: {
              name: this.state.name,
              twitterHandle: this.state.twitterHandle
            }
          }}
        />
      );
    } else {
      return (
        <div className="MainPage">
          <h1>Suspect Analysis</h1>

          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Possible suspect's name"
                onChange={this.handleChangeName}
              ></input>
            </div>

            <br />
            <label>Twitter Handle</label>
            <input
              type="text"
              placeholder="Possible suspect's twitter handle"
              onChange={this.handleChangeTwitterHandle}
            ></input>
            <button>Search</button>
          </form>
        </div>
      );
    }
  }
}

export default withRouter(MainPage);
