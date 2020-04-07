import React, { Component, ContextType } from "react";
import { withTranslation, WithTranslation } from "react-i18next";
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
