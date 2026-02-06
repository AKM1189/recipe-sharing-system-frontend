type ImageProps = {
  publicId: string;
  className?: string;
  alt?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const Image: React.FC<ImageProps> = ({
  publicId,
  className,
  alt,
  ...props
}) => {
  return <img {...props} className={className} alt={alt} src={publicId} />;
};

export default Image;
