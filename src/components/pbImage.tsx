import Image from "next/image";

export default function PbFile({
  src,
  collectionName,
  id,
  variant = "200x200",
  addClass,
  height,
  width,
  alt,
}: {
  src: string;
  collectionName: string;
  id: string;
  variant?:
    | "100x100"
    | "200x300"
    | "200x200"
    | "400x400"
    | "400x300"
    | "1200x400";
  addClass?: string;
  height: number;
  width: number;
  alt: string;
}) {
  return src.includes("mp4") ? (
    <video
      className={"  " + addClass}
      height={height}
      width={width}
      controls
      loop
      /* download disabled */
      controlsList="nodownload"
      playsInline
    >
      <source
        src={
          src
            ? process.env.NEXT_PUBLIC_POCKETBASE_API_URL +
              "/api/files/" +
              collectionName +
              "/" +
              id +
              "/" +
              src +
              "?" +
              variant
            : "https://placehold.co/60x60"
        }
        type="video/mp4"
      />
    </video>
  ) : (
    <>
      <Image
        src={
          src
            ? process.env.NEXT_PUBLIC_POCKETBASE_API_URL +
              "/api/files/" +
              collectionName +
              "/" +
              id +
              "/" +
              src
            : /* + "?" +
              variant */
              "https://placehold.co/60x60"
        }
        className={"  " + addClass}
        height={height}
        width={width}
        alt={alt}
        loading="lazy"
      />
    </>
  );
}
