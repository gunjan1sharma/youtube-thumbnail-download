import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  TextField,
} from "@mui/material";
import DownloadImage from "../assets/images/download.png";
import React, {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { Root } from "../extras/types";
import Thumbnail from "../components/Thumbnail";
import { ColorContext } from "../extras/ColorContext";
import FeatureIntro from "../components/FeatureIntro";

const API_BASE_URL = `https://appnor-backend.onrender.com/extras/v1/api/youtube/download-thumbnail?videoUrl=`;
var static_video_url = "";

const sampleResponse: Root = {
  message: "success",
  thumbnails: [
    {
      url: "https://i.ytimg.com/vi/QCtEe-zsCtQ/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBqVxOD6BbrSW8Og3zGfI84n1YGVA",
      width: 168,
      height: 94,
    },
    {
      url: "https://i.ytimg.com/vi/QCtEe-zsCtQ/hqdefault.jpg?sqp=-oaymwEbCMQBEG5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDHAXLUZHeEijZZ0E4rKHBGxrTgow",
      width: 196,
      height: 110,
    },
    {
      url: "https://i.ytimg.com/vi/QCtEe-zsCtQ/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAPo_lAHARJvu5MUu5CkbAmGxLJxw",
      width: 246,
      height: 138,
    },
    {
      url: "https://i.ytimg.com/vi/QCtEe-zsCtQ/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLARFbrJuPCtXlQnuTTnQHBfCTrW8A",
      width: 336,
      height: 188,
    },
    {
      url: "https://i.ytimg.com/vi/QCtEe-zsCtQ/maxresdefault.jpg?v=631164ec",
      width: 1920,
      height: 1080,
    },
  ],
};

function HomePage(props: any) {
  const colorContex = useContext(ColorContext);
  const scrollRef = useRef<any>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [audioResponse, setAudioResponse] = useState<Root>(sampleResponse);
  const [playVideo, setPlayVideo] = useState(false);
  const [isTermsAggred, setIsTermsAggred] = useState(false);
  const [isDownloadSuccess, setIsDownloadSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    scrollToDiv();
    return () => {};
  }, [colorContex.point]);

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
    } else {
      setPlayVideo(false);
    }
  }

  function mimicDownload() {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }

    if (videoUrl === "" || !videoUrl.includes("youtu")) {
      alert("A Valid Youtube Video URL is Required!!");
      return;
    }

    handleOpen();
    setAudioResponse(sampleResponse);
    setIsDownloadSuccess(true);
    setPlayVideo(true);
    static_video_url = videoUrl;
    setTimeout(() => {
      handleClose();
      setVideoUrl("");
    }, 5000);
  }

  function handleCheckboxChange(checked: boolean) {
    setIsTermsAggred(checked);
    //setPlayVideo(checked);
  }

  function fetchDownloadableLink(): void {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }

    if (videoUrl === "" || !videoUrl.includes("youtu")) {
      alert("A Valid Youtube Video URL is Required!!");
      return;
    }
    handleOpen();

    axios.post(API_BASE_URL + videoUrl).then(
      (result) => {
        console.log("Hitting Youtube Dpwnload API is successful");
        setAudioResponse(result.data);
        setIsDownloadSuccess(true);
        setPlayVideo(true);
        static_video_url = videoUrl;
        setTimeout(() => {
          handleClose();
          setVideoUrl("");
        }, 5000);
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
    static_video_url = videoUrl;
    setPlayVideo(true);
  }

  function openLink(audioUrl: string): any {
    if (audioUrl === "" || audioUrl.length < 20) {
      alert("Something went wrong while generating download link, try again..");
      return;
    }
    window.open(audioUrl, "_blank");
  }

  function scrollToDiv() {
    if (colorContex.point !== 0) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
      colorContex.setPoint(0);
    }
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
    <div
      ref={scrollRef}
      className="md:m-10 sm:m-5 flex flex-col items-center justify-center"
    >
      {backdrop}
      <FeatureIntro
        heading="Supercharged Youtube Thumbnail Downloader⚡️"
        desc="Imagine a world where your favorite online media is yours to keep, not just to stream. With our tool, that world is real! Download high-quality videos, audio, reels, and even thumbnails – all from a single link, completely FREE!"
        subheading="But it's not just about convenience – it's about freedom. Break free from limited playlists, buffering woes, and the ever-changing algorithms. Save your must-watch content for offline enjoyment.➡️"
      />
      <div className="flex flex-col items-center border border-gray-500 shadow-lg p-4">
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
          sx={{ marginTop: "20px", marginBottom: "10px", width: "220px" }}
          variant="contained"
        >
          Download Thumbnails
        </Button>
        <Button
          onClick={handleVideoPlay}
          sx={{ width: "220px", marginTop: "10px", marginBottom: "15px" }}
          variant="outlined"
        >
          Play Video
        </Button>
        <h3 className="text-xs text-center w-80 m-2 p-2">
          A direct prompt to download thumbnails will get triggered if video has
          only one format else a list of downloadable video will get presented.
        </h3>
        <div className="flex items-center justify-center p-2">
          <Checkbox
            onChange={(e) => handleCheckboxChange(e.target.checked)}
            defaultChecked={false}
          />
          <h3 className="text-xs text-center m-2">
            By downloading thumbnails you agree to our terms & conditions for
            fair usages policy
          </h3>
        </div>
        <Divider color="black" />
      </div>
      <br />
      <br />
      {isDownloadSuccess && (
        <div className="border-2 text-center border-blue-500 shadow-sm p-4">
          <div className="flex flex-col items-center md:flex-row font-mono mb-5 justify-center">
            <h3 className="font-bold text-xl">Thumbnail Fetching Successful</h3>
            <img
              className="m-2"
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
        </div>
      )}
      {playVideo && (
        <div className="w-full sm:w-50px lg:w-1/2 mt-10 mb-10">
          <ReactPlayer
            width="100%"
            controls={true}
            pip={true}
            volume={1}
            url={static_video_url}
          />
        </div>
      )}
      {isDownloadSuccess &&
        audioResponse.thumbnails.map((thumbnail) => {
          return (
            <Thumbnail
              height={thumbnail.height}
              width={thumbnail.width}
              url={thumbnail.url}
              key={thumbnail.url}
            />
          );
        })}

      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default HomePage;
