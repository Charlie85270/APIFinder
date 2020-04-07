import React, { Component } from "react";
import "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <span className="owner is-size-7">By Charlie Rabiller </span>
        <span className="sources is-size-7">
          - Icons by <a href="http://www.flaticon.com">Flaticon</a> - Data from
          publicapis
        </span>
      </div>
    );
  }
}

export default Footer;
