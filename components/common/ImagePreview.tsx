import Image from "next/image";

const ImagePreview = ({
  src,
  alt,
}: {
  src: string | undefined;
  alt: string;
}) => {
  if (src) return <Image width={200} height={200} src={src} alt={alt} />;
};

export default ImagePreview;
