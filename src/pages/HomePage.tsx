import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  TextField,
} from "@mui/material";
import DownloadImage from "../assets/images/download.png";
import React, { ChangeEventHandler, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";

const defUrl = "https://youtu.be/P-z3aLhp9w4?si=7Z8powxCY5o0TswE";
const API_BASE_URL = `http://localhost:3003/extras/v1/api/youtube/download-video?videoUrl=`;
const BASE_API = "http://localhost:3003/";

function HomePage(props: any) {
  const [videoUrl, setVideoUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [playVideo, setPlayVideo] = useState(false);
  const [isTermsAggred, setIsTermsAggred] = useState(true);
  const [downloadTitle, setDownloadTitle] = useState("");
  const [isDownloadSuccess, setIsDownloadSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): any {
    setVideoUrl(event.target.value);
    console.log(event.target.value);
    console.info(videoUrl);
    if (videoUrl !== "" || videoUrl.includes("youtu")) {
      setPlayVideo(true);
    }
  }

  function pingBackendServer(): void {
    axios.get(BASE_API).then(
      (result) => {
        console.log("Hitting Youtube Dpwnload API is successful");
        console.log(result.data);
      },
      (error) => {
        console.log("Something went wrong while hitting data.." + error);
      }
    );
  }

  function fetchDownloadableLink(): void {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }

    if (videoUrl === "" || !videoUrl.startsWith("https://youtu")) {
      alert("A Valid Youtube Video URL is Required!!");
      return;
    }
    handleOpen();

    axios.post(API_BASE_URL + videoUrl).then(
      (result) => {
        console.log("Hitting Youtube Dpwnload API is successful");
        console.log(result.data);
        console.log(`df : ${result.data.downloadableFormats[0].url}`);
        setDownloadUrl(result.data.downloadableFormats[0].url);
        setDownloadTitle(
          `VIDEO + AUDIO ${result.data.downloadableFormats[0].qualityLabel} [${result.data.downloadableFormats[0].codecs}]`
        );
        setIsDownloadSuccess(true);
        setVideoUrl("");
        setPlayVideo(true);
        handleClose();
      },
      (error) => {
        console.log("Something went wrong while hitting data.." + error);
        handleClose();
        alert("Something went wrong while hitting data.." + error);
      }
    );
  }

  function handleVideoPlay(): any {
    if (videoUrl === "" || !videoUrl.includes("youtu")) {
      alert("A Valid Youtube Video URL is Required!!");
      return;
    }
    setPlayVideo(true);
  }

  function openLink() {
    if (downloadUrl === "" || downloadUrl.length < 20) {
      alert("Something went wrong while generating download link, try again..");
      return;
    }
    window.open(downloadUrl, "_blank");
  }

  const backdrop = (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div className="flex flex-col items-center">
          <CircularProgress color="inherit" />
          <h1 className="font-extrabold m-2 text-white text-xl">
            Communicating with server...
          </h1>
        </div>
      </Backdrop>
    </React.Fragment>
  );

  return (
    <div className="m-10 flex flex-col items-center justify-center">
      {backdrop}
      <div className="flex flex-col items-center border shadow-lg p-4">
        <TextField
          fullWidth
          value={videoUrl}
          onChange={handleChange}
          id="url-input"
          label="Enter or Paste Youtube Video Link Here"
          variant="outlined"
        />
        <Button
          onClick={fetchDownloadableLink}
          sx={{ marginTop: "20px", marginBottom: "10px", width: "200px" }}
          variant="contained"
        >
          Download Video
        </Button>
        <Button
          onClick={handleVideoPlay}
          sx={{ width: "200px", marginTop: "10px", marginBottom: "15px" }}
          variant="outlined"
        >
          Play Video
        </Button>
        <h3 className="text-xs text-center w-80 m-2">
          A direct prompt to download video will get triggered if video has only
          one format else a list of downloadable video will get presented.
        </h3>
        <div className="flex items-center justify-center">
          <Checkbox
            onChange={(e) => setIsTermsAggred(e.target.checked)}
            defaultChecked
          />
          <h3 className="text-xs text-center m-2">
            By downloading video you agree to our terms & conditions for fair
            usages policy
          </h3>
        </div>
        <Divider color="black" />
      </div>

      <br />
      <br />
      {isDownloadSuccess && (
        <div className="border-2 text-center border-blue-500 shadow-sm p-4">
          <div className="flex flex-col items-center md:flex-row font-mono mb-5 justify-center">
            <h3 className="font-bold text-xl">Video Fetching Successful</h3>
            <img
              className="m-2 animate-ping"
              width="30px"
              height="30px"
              alt="download"
              src={DownloadImage}
            />
            <img
              className="animate-ping"
              width="30px"
              height="30px"
              alt="download"
              src={DownloadImage}
            />
          </div>
          {isDownloadSuccess && (
            <Button variant="outlined" onClick={openLink}>
              {downloadTitle}
            </Button>
          )}
        </div>
      )}
      <div className="w-full sm:w-50px lg:w-1/2 mt-10 mb-10">
        {playVideo && (
          <ReactPlayer
            width="100%"
            controls={true}
            pip={true}
            volume={1}
            url={videoUrl}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
