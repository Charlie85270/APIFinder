import React, { Component, ContextType } from "react";
import { withTranslation, WithTranslation } from "react-i18next";

import "./Footer.scss";

class Footer extends Component<WithTranslation> {
  render() {
    const { t } = this.props;
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

export default withTranslation()(Footer);
