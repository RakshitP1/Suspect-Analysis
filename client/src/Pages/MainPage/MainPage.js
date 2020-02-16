import React from "react";

import "./MainPage.css";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  submitHandler(event) {}

  render() {
    return (
      <div className="MainPage">
        <h1>Suspect Analysis</h1>

        <form onClick={this.submitHandler}>
          <input type="text" placeholder="Possible suspect's name"></input>
          <button>Search</button>
        </form>
      </div>
    );
  }
}

export default MainPage;
