import { Layer, Image as KonvaImage } from "react-konva";

const Images = ({ imageSrcs }: any) => {
  return (
    <Layer>
      {imageSrcs.map((src: CanvasImageSource, index: number) => {
        return (
          src && (
            <KonvaImage
              key={index}
              image={src}
              x={50 + index * 220} // adjust position for each image
              y={100}
              width={200}
              height={200}
              draggable
              stroke="black"
            />
          )
        );
      })}
    </Layer>
  );
};

export default Images;
