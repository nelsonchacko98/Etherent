import React, { Component } from "react";
import QRCode from "qrcode.react";
export class QR extends Component {
  render() {
    return (
      <div>
        <QRCode value="Rihab" size={128} level={"H"} />
      </div>
    );
  }
}

export default QR;
