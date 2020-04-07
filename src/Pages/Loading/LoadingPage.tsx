import React, { Component } from "react";
import "./LoadingPage.scss";
import Spinner from "../../Components/Spinner/Spinner";

class LoadingPage extends Component {
  render() {
    return (
      <div className="Loader">
        <Spinner></Spinner>
      </div>
    );
  }
}

export default LoadingPage;
