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
      love: ["w1", "w2", "w3"],
      like: ["w4"],
      cordial: ["w5", "w6"],
      annoyed: [],
      dislike: ["w7"],
      hate: ["w8", "w9", "w10", "w11", "w12"],
      table: []
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
    this.constructTable();
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

export default withRouter(SuspectPage);
