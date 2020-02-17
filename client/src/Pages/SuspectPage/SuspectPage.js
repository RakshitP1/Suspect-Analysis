import React from "react";

import queryString from "query-string";
import { withRouter } from "react-router-dom";

import "./SuspectPage.css";

/*
  love: > 50
  like: [20, 50]
  cordial: [0, 20]
  annoyed: [0, -20]
  dislike: [-20, -50]
  hate: > -50
*/

class SuspectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.location.state.name,
      twitterHandle: this.props.location.state.twitterHandle,
      twitterUrl:
        "https://twitter.com/" + this.props.location.state.twitterHandle,
      love: [],
      like: [],
      cordial: [],
      annoyed: [],
      dislike: [],
      hate: [],
      table: [],
      error: null,
      isLoaded: false
    };
    // console.log("max", this.getMaxLength());
    this.constructTable();
  }

  constructTable() {
    let table = [];

    for (let i = 0; i < this.getMaxLength(); i++) {
      let temp = [];
      console.log(i);

      if (this.state.love.length > i) {
        temp.push(this.state.love[i]);
      } else {
        temp.push(null);
      }

      if (this.state.like.length > i) {
        temp.push(this.state.like[i]);
      } else {
        temp.push(null);
      }

      if (this.state.cordial.length > i) {
        temp.push(this.state.cordial[i]);
      } else {
        temp.push(null);
      }

      if (this.state.annoyed.length > i) {
        temp.push(this.state.love[i]);
      } else {
        temp.push(null);
      }

      if (this.state.dislike.length > i) {
        temp.push(this.state.dislike[i]);
      } else {
        temp.push(null);
      }

      if (this.state.hate.length > i) {
        temp.push(this.state.hate[i]);
      } else {
        temp.push(null);
      }

      console.log(temp);

      table.push(temp);
    }
    console.log("table", table);
    this.setState({ table: table });
  }

  componentDidMount() {
    this.loadData();
    // this.constructTable();
  }

  loadData() {
    let url =
      "http://127.0.0.1:5000/create?name=" +
      this.state.name +
      "&twitter_handle=" +
      this.state.twitterHandle;

    let love = [];
    let like = [];
    let cordial = [];

    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          console.log("result", result);
          for (let i = 0; i < result[0].length; i++) {
            if (result[0][i][1] > 3) {
              console.log("love", result[0][i][0]);
              this.state.love.push(result[0][i][0]);
            } else if (result[0][i][1] > 1 && result[0][i][1] < 3) {
              console.log("like", result[0][i][0]);
              this.state.like.push(result[0][i][0]);
            } else {
              console.log("corial", result[0][i][0]);
              this.state.cordial.push(result[0][i][0]);
            }
          }

          console.log(this.state.love);
          console.log(this.state.like);
          console.log(this.state.cordial);

          for (let i = 0; i < result[1].length; i++) {
            if (result[1][i][1] < -3) {
              console.log("hate", result[1][i][0]);
              this.state.hate.push(result[1][i][0]);
            } else if (result[1][i][1] < -1 && result[0][i][1] > -3) {
              console.log("dislike", result[1][i][0]);
              this.state.dislike.push(result[1][i][0]);
            } else {
              console.log("annoyed", result[1][i][0]);
              this.state.annoyed.push(result[1][i][0]);
            }
          }

          this.constructTable();

          this.setState({
            isLoaded: true
          });
        },
        error => {
          console.log(error);
          this.setState({
            isLoaded: true,
            error: error
          });
        }
      );
  }

  getMaxLength() {
    let max = Math.max(
      this.state.love.length,
      Math.max(
        this.state.like.length,
        Math.max(
          this.state.cordial.length,
          Math.max(
            this.state.annoyed.length,
            Math.max(this.state.dislike.length, this.state.hate.length)
          )
        )
      )
    );

    return max;
  }

  render() {
    // console.log(this.state.table);
    if (this.state.error) {
      return <h1>error: {this.state.error.message}</h1>;
    } else if (!this.state.isLoaded) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="SuspectPage">
          <h1>{this.state.name}</h1>
          <h2>
            <a href={this.state.twitterUrl}>
              <img src="./twitter-logo.svg" height="25px" width="25px"></img>
              {this.state.twitterHandle}
            </a>
          </h2>
          <table>
            <tr>
              <th>
                <div>Love</div>
              </th>
              <th>Like</th>
              <th>Cordial</th>
              <th>Annoyed</th>
              <th>Dislike</th>
              <th>Hate</th>
            </tr>
            {this.state.table.map(row => {
              let r1 = row[0];
              let r2 = row[1];
              let r3 = row[2];
              let r4 = row[3];
              let r5 = row[4];
              let r6 = row[5];

              let c1 = "love";
              let c2 = "like";
              let c3 = "cordial";
              let c4 = "annoyed";
              let c5 = "dislike";
              let c6 = "hate";

              if (r1 == null) {
                c1 = "empty";
              }

              if (r2 == null) {
                c2 = "empty";
              }

              if (r3 == null) {
                c3 = "empty";
              }

              if (r4 == null) {
                c4 = "empty";
              }

              if (r5 == null) {
                c5 = "empty";
              }

              if (r6 == null) {
                c6 = "empty";
              }

              return (
                <tr>
                  <th>
                    <div className={c1}>{r1}</div>
                  </th>
                  <th>
                    <div className={c2}>{r2}</div>
                  </th>
                  <th>
                    <div className={c3}>{r3}</div>
                  </th>
                  <th>
                    <div className={c4}>{r4}</div>
                  </th>
                  <th>
                    <div className={c5}>{r5}</div>
                  </th>
                  <th>
                    <div className={c6}>{r6}</div>
                  </th>
                </tr>
              );
            })}
          </table>
        </div>
      );
    }
  }
}

export default withRouter(SuspectPage);
