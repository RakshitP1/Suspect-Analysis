import React from "react";

class Sentiment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      magnitude: 0,
      isLoaded: false,
      error: null
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:5000/analyze-text?text=%22I%20am%20the%20worst%22")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            magnitude: result.magnitude,
            score: result.score,
            isLoaded: true
          });
        },
        error => {
          this.setState({
            isLoaded: false,
            error: error
          });
        }
      );
  }

  render() {
    if (this.state.error) {
      console.log(this.state.error);
      return <div className="Sentiment">error</div>;
    } else if (!this.state.isLoaded) {
      return <div className="Sentiment">Loading...</div>;
    } else {
      return (
        <div className="Sentiment">
          score: {this.state.score}
          magnitude: {this.state.magnitude}
        </div>
      );
    }
  }
}

export default Sentiment;
