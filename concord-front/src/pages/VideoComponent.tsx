import classNames from "classnames";
import React from "react";
import { Component, useEffect, useRef } from "react";


interface props {
  video: any;
  user: any;
  peer: any;
}

class VideoComponent extends Component<props> {

  constructor(props: props) {
    super(props);
  }

  componentDidMount = () => {
    const { video, user, peer } = this.props;

    if (peer && user) {

      peer.on("stream", (stream: any) => {
        video.srcObject = stream;
        video.play();
      });

    }

  }

  render(): React.ReactNode {
    const { video, user, peer } = this.props;

    return (
      <div>
        <video
          className={"video-friend"}
          ref={video}
          autoPlay
          playsInline
          style={{ width: "35%", height: "35%" }}
        />
        <p className="name-meeting">{user}</p>
      </div>
    );
  }

}

export default VideoComponent;