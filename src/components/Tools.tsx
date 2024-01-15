import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/PanoramaFishEye";
import SquareIcon from "@mui/icons-material/Stop";
import { ClearOutlined, Edit, UploadFile } from "@mui/icons-material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
interface ToolProps {
  handleClick: (shape: string) => void;
  mode: string;
  handleUpload: (e: any) => void;
}
function Tools({ handleClick, mode, handleUpload }: ToolProps) {
  const icons = [
    { label: "Rectangle", value: "rect", iconComponent: <SquareIcon /> },
    { label: "Pen", value: "pen", iconComponent: <Edit /> },
    { label: "Eraser", value: "eraser", iconComponent: <SmartphoneIcon /> },
    { label: "Circle", value: "circle", iconComponent: <CircleIcon /> },
  ];
  return (
    <Box
      sx={{
        boxShadow: 3,
        padding: "0.5em 0.75em",
        borderRadius: "0.75em",
        margin: "0.1em 2em",
        display: "flex",
      }}
    >
      <Typography variant="h6" sx={{ alignSelf: "center" }}>
        Tools
      </Typography>
      {icons.map((icon) => (
        <Tooltip title={icon.label}>
          <IconButton
            onClick={() => handleClick(icon.value)}
            sx={{
              boxShadow: 3,
              border: "1px solid black",
              margin: "0 0.4em",
              backgroundColor: mode === icon.value ? "lightblue" : "white",
            }}
          >
            {icon.iconComponent}
          </IconButton>
        </Tooltip>
      ))}

      <input
        color="primary"
        accept="image/*"
        type="file"
        multiple
        onChange={handleUpload}
        hidden
        id="icon-button-file"
        style={{ display: "none" }}
      />
      <Tooltip title="Upload Image">
        <IconButton
          onClick={() => handleClick("clear")}
          sx={{ boxShadow: 3, border: "1px solid black", margin: "0 0.4em" }}
        >
          <label htmlFor="icon-button-file" style={{ height: "1em" }}>
            <UploadFile />
          </label>
        </IconButton>
      </Tooltip>
      <Tooltip title="Clear">
        <IconButton
          onClick={() => handleClick("clear")}
          sx={{ boxShadow: 3, border: "1px solid black", margin: "0 0.4em" }}
        >
          <ClearOutlined />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default Tools;
