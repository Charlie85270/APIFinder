import React, { Component, ContextType } from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import AppContext from "../../AppContext";
import "./Card.scss";
import { Api } from "../../Models/Api/Api";
import { ReactComponent as AuthIcon } from ".././../Images/auth.svg";
import { ReactComponent as HttpsIcon } from ".././../Images/https.svg";
import { ReactComponent as CorsIcon } from ".././../Images/cors.svg";
import Utils from "../../Utils/Utils";

interface Props {
  data: Api;
}
interface State {
  imgUrl: string;
}

class Card extends Component<Props & WithTranslation, State> {
  static contextType = AppContext;
  context!: ContextType<typeof AppContext>;
  constructor(props: Props & WithTranslation) {
    super(props);
    this.state = {
      imgUrl: `//logo.clearbit.com/${Utils.getDomainNameFromUrl(
        props.data.Link
      )}`
    };
  }
  onError() {
    this.setState({
      imgUrl: "api.png"
    });
  }

  render() {
    const { data } = this.props;
    return (
      <div className="Card" onClick={() => window.open(data.Link, "_blank")}>
        <div className="Card-header">
          <img
            src={Utils.getImageFromCategory(data.Category)}
            className="image-header"
            alt="Category"
          ></img>
        </div>
        <div className="Card-information">
          <div className="Card-header-title">
            <span className="is-size-4">
              {Utils.truncateString(data.API, 20)}
            </span>
          </div>
          <span className="Card-header--icones">
            {data.HTTPS && <HttpsIcon />}
            {data.Cors && <CorsIcon />}
            {data.Auth && <AuthIcon />}
          </span>
          <span className="Card-information-category is-size-6">
            {data.Category}
          </span>

          <span className="Card-information-url-icon">
            <img
              alt="Icone"
              onError={this.onError.bind(this)}
              src={this.state.imgUrl}
            />
          </span>
        </div>
        <div className="Card-description is-size-6">
          {Utils.truncateString(data.Description, 60)}
        </div>
        <div className="Card-footer">
          <span className="Card-footer-link"></span>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Card);
