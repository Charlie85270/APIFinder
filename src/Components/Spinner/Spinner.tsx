import React, { Component } from 'react';

import './Spinner.scss';

export enum SpinnerType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

export interface Props {
  type?: SpinnerType;
}

class Spinner extends Component<Props> {
  render() {
    const { type } = this.props;

    return (
      <div className={`lds-spinner ${type}`}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}
export default Spinner;
