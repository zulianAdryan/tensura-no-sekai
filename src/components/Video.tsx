import {
  ForwardedRef,
  forwardRef,
  SourceHTMLAttributes,
  VideoHTMLAttributes,
} from "react";

interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: SourceHTMLAttributes<HTMLSourceElement>["src"];
  type: SourceHTMLAttributes<HTMLSourceElement>["type"];
}

const Video = forwardRef(
  (props: VideoProps, refs: ForwardedRef<HTMLVideoElement>) => {
    const { src, type, width, height, controls, preload, ...rest } = props;
    return (
      <video
        ref={refs}
        width={width}
        height={height}
        controls={controls || false}
        preload={preload || "none"}
        {...rest}
      >
        <source src={src} type={type || "video/mp4"} />
        Your browser does not support the video tag.
      </video>
    );
  }
);

Video.displayName = "Video";

export default Video;
