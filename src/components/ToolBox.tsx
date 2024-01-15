import React from "react";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

interface ToolBoxProps {
  mode: string;
  handleToolChange: (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => void;
}

const ToolBox: React.FC<ToolBoxProps> = ({ mode, handleToolChange }) => {
  const items: string[] = ["Rect", "Circle", "Text", "pen", "eraser"];
  return (
    <Box style={{ display: "flex", padding: "0.5em" }}>
      <Typography
        variant="h6"
        style={{ marginRight: "1em", alignSelf: "center" }}
      >
        ToolBox
      </Typography>
      <FormControl>
        <InputLabel id="select-label">ToolBox</InputLabel>
        <Select labelId="select-label" value={mode} onChange={handleToolChange}>
          {items.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ToolBox;
