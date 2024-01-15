import { useState, useRef } from "react";
import { Stage, Layer, Rect, Circle } from "react-konva";
import grid from "./assets/grid.svg";
import { IShape, ILine } from "./types";
import Line from "./components/Line";
import Tools from "./components/Tools";
import useImage from "use-image";
import Images from "./components/Images";
function App() {
  // Image
  const [image] = useImage(grid);
  //
  const [imageSrcs, setImageSrcs] = useState<CanvasImageSource[]>([]);

  const [mode, setMode] = useState<string>("");
  const [lines, setLines] = useState<ILine[]>([]);
  const [shapes, setShapes] = useState<IShape[]>([]);

  const isDrawing = useRef(false);
  const handleToolChange = (value: any) => {
    //setMode(e.target.value);
    setMode(value);
  };
  const addShape = (e: any) => {
    const newShape = {
      type: mode.toLocaleLowerCase(), // Or any other shape you want to add
      x: e.clientX,
      y: e.clientY - 50,
      width: 100,
      height: 50,
      fill: "#8d99ae",
    };
    setShapes([...shapes, newShape]);
  };
  const handleMouseDown = (e: any) => {
    if (mode === "pen" || mode === "eraser") {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, { tool: mode, points: [pos.x, pos.y] }]);
    }
  };

  const handleUpload = (event: any) => {
    Array.from(event.target.files).forEach((file: unknown) => {
      const blobFile = file as Blob;
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new window.Image();
        img.src = reader.result as string;
        setImageSrcs((prevSrcs: CanvasImageSource[]) => [...prevSrcs, img]);
        console.log(typeof img);
      };

      if (file) {
        reader.readAsDataURL(blobFile);
      }
    });
  };
  // grid image scale
  const stageRef = useRef<any>(null);

  const drawLine = (e: any) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };
  const handleMouseMove = (e: any) => {
    if (mode === "pen" || mode === "eraser") {
      drawLine(e);
    }
  };
  const handleMouseUp = (e: any) => {
    // For other shapes set Cordinates to place object
    //setCord({x:e.evt.clientX,y:e.evt.clientY});
    if (mode === "pen" || mode === "eraser") {
      isDrawing.current = false;
      return;
    }
    addShape(e.evt);
  };
  return (
    <>
      <Tools
        mode={mode}
        handleClick={handleToolChange}
        handleUpload={handleUpload}
      />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        //draggable
        ref={stageRef}
        //onDragStart={(e) => setLoadGrid(false)}
      >
        {/* Dynamic shape Layer */}
        <Layer>
          <Rect
            fillPatternImage={image}
            width={window.innerWidth}
            height={window.innerHeight}
          />
          {shapes.map((shape) => {
            switch (shape.type) {
              case "rect":
                return <Rect {...shape} />;
              case "circle":
                return <Circle {...shape} />;
              default:
                return null;
            }
          })}
        </Layer>
        <Line lines={lines} />
        <Images imageSrcs={imageSrcs} />
      </Stage>
    </>
  );
}

export default App;
