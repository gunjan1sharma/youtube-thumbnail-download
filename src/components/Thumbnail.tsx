import { Button } from "@mui/material";
import React from "react";
import { Root, Thumbnails } from "../extras/types";

const sampleURL =
  "https://i.ytimg.com/vi/QCtEe-zsCtQ/maxresdefault.jpg?v=631164ec";

function Thumbnail(props: Thumbnails) {
  function downloadThumbnail() {
    if (props.url === "" || props.url.length < 20) {
      alert("Something went wrong while generating thumbnail URL..");
      return;
    }
    window.open(props.url, "_blank");
  }

  return (
    <div>
      <div className="border border-gray-400 shadow-lg p-4 mt-4 mb-2">
        <img className="w-full h-52 " alt="" src={props.url} />
        <Button
          onClick={downloadThumbnail}
          className="w-full"
          sx={{ marginTop: "5px", color: "blue", fontWeight: "bold" }}
          variant="outlined"
        >
          Download [{props.height}px * {props.width}px]
        </Button>
        <Button
          onClick={downloadThumbnail}
          className="w-full"
          sx={{ marginTop: "5px", color: "white", fontWeight: "bold" }}
          variant="contained"
        >
          View Thumbnail
        </Button>
      </div>
    </div>
  );
}

export default Thumbnail;
