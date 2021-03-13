import React, { Component } from "react";

import ParticlesBg from "particles-bg";

class BgAnim extends Component {
  render() {
    return (
      <div>
        <ParticlesBg type="lines" bg={true} num={2000} color="black" />
      </div>
    );
  }
}
export default BgAnim;
