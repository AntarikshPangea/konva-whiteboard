import { Layer, Line as KonvaLine } from "react-konva";
import { ILine } from "../types";

const Line = ({ lines }: { lines: ILine[] }) => {
  return (
    <Layer>
      {lines.map((line, i) => (
        <KonvaLine
          key={i}
          points={line.points}
          stroke="#8d99ae"
          strokeWidth={4}
          tension={0.5}
          //lineCap="round"
          globalCompositeOperation={
            line.tool === "eraser" ? "destination-out" : "source-over"
          }
        />
      ))}
    </Layer>
  );
};

export default Line;
