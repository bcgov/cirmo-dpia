import { ImageMagnifierProps } from './interfaces';

const ImageMagnifier = ({ src, alt }: ImageMagnifierProps) => {
  return (
    <img
      className="rounded mx-auto d-block infographic-diagram"
      src={src}
      alt={alt}
    />
  );
};

export default ImageMagnifier;
