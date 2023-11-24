import classNames from "classnames";
import { useEffect, useRef } from "react";

function VideoComponent(props: any) {
  const video = useRef<HTMLVideoElement>(null);
  const srcObject = props.srcObject;
  const src = props.src;
  const style = props.style;

  const className = classNames(
    "video-component",
    props.className
  );
  function handleCanPlay() {
    if (!video.current) return <video></video>;
    video.current.play();
  }

  useEffect(() => {
    if (srcObject && video.current) {
      video.current.srcObject = srcObject;
    }
  });

  return (
    <>
      <video
        style={style}
        ref={video}
        onCanPlay={handleCanPlay}
        playsInline
        className={className}
        autoPlay={true}
        src={src}
        id="video-component"
      />
    </>
  );
}


export default VideoComponent