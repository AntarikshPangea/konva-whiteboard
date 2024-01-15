import { Text as KonvaText } from "react-konva";

const Text = () => {
  return (
    <KonvaText
      text="Some text on canvas"
      x={20}
      y={20}
      fontSize={15}
      draggable
    />
  );
};

export default Text;
