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
import { Root } from "../extras/types";

const API_BASE_URL = `http://192.168.1.88:3003/extras/v1/api/youtube/download-audio?videoUrl=`;
var static_video_url = "";

const sampleResponse: Root = {
  message: "success",
  downloadableFormats: [
    {
      mimeType: 'audio/webm; codecs="opus"',
      qualityLabel: null,
      bitrate: 158394,
      audioBitrate: 160,
      itag: 251,
      initRange: {
        start: "0",
        end: "265",
      },
      indexRange: {
        start: "266",
        end: "840",
      },
      lastModified: "1700167103673598",
      contentLength: "5596757",
      quality: "tiny",
      projectionType: "RECTANGULAR",
      averageBitrate: 135227,
      audioQuality: "AUDIO_QUALITY_MEDIUM",
      approxDurationMs: "331101",
      audioSampleRate: "48000",
      audioChannels: 2,
      loudnessDb: 7.6100001,
      url: "https://rr4---sn-cvh76nle.googlevideo.com/videoplayback?expire=1704509149&ei=fWqYZarSGPSZz7sPnKWGqA4&ip=103.176.70.125&id=o-APBytXw7g9rSKlT8jxOVq8k9It9wHbd3HmzWaoMzJ2Ul&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=Fw&mm=31%2C26&mn=sn-cvh76nle%2Csn-h557sn66&ms=au%2Conr&mv=m&mvi=4&pl=24&initcwndbps=1636250&spc=UWF9f5MU2OyFrpAQ2ATEGrp5k-5J_EcNDpVgS5012A&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=R9NKV3R8Cb4U0eJVWCY2KrYQ&gir=yes&clen=5596757&dur=331.101&lmt=1700167103673598&mt=1704487272&fvip=4&keepalive=yes&fexp=24007246&c=WEB&txp=5532434&n=y496J3szTWeF4w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AAO5W4owRQIhANIVsPBiezMohacw81cHl7LkODfh5vjCGL3NpCcpS_KcAiASgTasCTA45LwaU6vV7Tr2JP77LV2dbv59mzowkUgHsA%3D%3D&sig=AJfQdSswRgIhANG_rzqPBDwrX1jf-V1J7sJdcq0GhU5gyDJjiceKJ2H-AiEAn7fg_E1HgHKq5MlFwixzbIqJ7Xodc0PSS1YCv8TgsJY%3D",
      hasVideo: false,
      hasAudio: true,
      container: "webm",
      codecs: "opus",
      videoCodec: null,
      audioCodec: "opus",
      isLive: false,
      isHLS: false,
      isDashMPD: false,
    },
    {
      mimeType: 'audio/mp4; codecs="mp4a.40.2"',
      qualityLabel: null,
      bitrate: 130609,
      audioBitrate: 128,
      itag: 140,
      initRange: {
        start: "0",
        end: "631",
      },
      indexRange: {
        start: "632",
        end: "1071",
      },
      lastModified: "1700163608019208",
      contentLength: "5359888",
      quality: "tiny",
      projectionType: "RECTANGULAR",
      averageBitrate: 129489,
      highReplication: true,
      audioQuality: "AUDIO_QUALITY_MEDIUM",
      approxDurationMs: "331139",
      audioSampleRate: "44100",
      audioChannels: 2,
      loudnessDb: 7.6199999,
      url: "https://rr4---sn-cvh76nle.googlevideo.com/videoplayback?expire=1704509149&ei=fWqYZarSGPSZz7sPnKWGqA4&ip=103.176.70.125&id=o-APBytXw7g9rSKlT8jxOVq8k9It9wHbd3HmzWaoMzJ2Ul&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=Fw&mm=31%2C26&mn=sn-cvh76nle%2Csn-h557sn66&ms=au%2Conr&mv=m&mvi=4&pl=24&initcwndbps=1636250&spc=UWF9f5MU2OyFrpAQ2ATEGrp5k-5J_EcNDpVgS5012A&vprv=1&svpuc=1&mime=audio%2Fmp4&ns=R9NKV3R8Cb4U0eJVWCY2KrYQ&gir=yes&clen=5359888&dur=331.139&lmt=1700163608019208&mt=1704487272&fvip=4&keepalive=yes&fexp=24007246&c=WEB&txp=5532434&n=y496J3szTWeF4w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AAO5W4owRgIhAMC2AiTriYrTBevPM97npOETu_9f2aJ1_UcuA4p6hZbHAiEAk6dUpTUEAC1RIGcD2_6UGGDl0P8z5Mj7xECmTON-_uU%3D&sig=AJfQdSswRgIhAJkmtH8bG-RDbxhksPAA4DHfEqx-QrLg_9USPWGUF6FQAiEA0JVrK1jIIOHuIle9UQKtv7T0HLmG5zZnglT-V2DlF28%3D",
      hasVideo: false,
      hasAudio: true,
      container: "mp4",
      codecs: "mp4a.40.2",
      videoCodec: null,
      audioCodec: "mp4a.40.2",
      isLive: false,
      isHLS: false,
      isDashMPD: false,
    },
    {
      mimeType: 'audio/webm; codecs="opus"',
      qualityLabel: null,
      bitrate: 81893,
      audioBitrate: 64,
      itag: 250,
      initRange: {
        start: "0",
        end: "265",
      },
      indexRange: {
        start: "266",
        end: "840",
      },
      lastModified: "1700162393807931",
      contentLength: "2877498",
      quality: "tiny",
      projectionType: "RECTANGULAR",
      averageBitrate: 69525,
      audioQuality: "AUDIO_QUALITY_LOW",
      approxDurationMs: "331101",
      audioSampleRate: "48000",
      audioChannels: 2,
      loudnessDb: 7.6100001,
      url: "https://rr4---sn-cvh76nle.googlevideo.com/videoplayback?expire=1704509149&ei=fWqYZarSGPSZz7sPnKWGqA4&ip=103.176.70.125&id=o-APBytXw7g9rSKlT8jxOVq8k9It9wHbd3HmzWaoMzJ2Ul&itag=250&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=Fw&mm=31%2C26&mn=sn-cvh76nle%2Csn-h557sn66&ms=au%2Conr&mv=m&mvi=4&pl=24&initcwndbps=1636250&spc=UWF9f5MU2OyFrpAQ2ATEGrp5k-5J_EcNDpVgS5012A&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=R9NKV3R8Cb4U0eJVWCY2KrYQ&gir=yes&clen=2877498&dur=331.101&lmt=1700162393807931&mt=1704487272&fvip=4&keepalive=yes&fexp=24007246&c=WEB&txp=5532434&n=y496J3szTWeF4w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AAO5W4owRQIgM72Ir_9qB5EDL4iy_XrzFlnAovq_2I3NDLgwWsr9WkkCIQDFs9YhaTgia35c-akTASgfk452kf8Ygtcq3MwNcScxqA%3D%3D&sig=AJfQdSswRgIhAJpL6gbvK53nYTqlaa3Q7CwNv-8Vq-4NB5PQKOFdLwptAiEA0svvsjpePwPyWIHhz3UZm-yCud0uqOuDocRjoe1Ue7o%3D",
      hasVideo: false,
      hasAudio: true,
      container: "webm",
      codecs: "opus",
      videoCodec: null,
      audioCodec: "opus",
      isLive: false,
      isHLS: false,
      isDashMPD: false,
    },
    {
      mimeType: 'audio/webm; codecs="opus"',
      qualityLabel: null,
      bitrate: 62192,
      audioBitrate: 48,
      itag: 249,
      initRange: {
        start: "0",
        end: "265",
      },
      indexRange: {
        start: "266",
        end: "839",
      },
      lastModified: "1700160286645946",
      contentLength: "2190179",
      quality: "tiny",
      projectionType: "RECTANGULAR",
      averageBitrate: 52918,
      audioQuality: "AUDIO_QUALITY_LOW",
      approxDurationMs: "331101",
      audioSampleRate: "48000",
      audioChannels: 2,
      loudnessDb: 7.6100001,
      url: "https://rr4---sn-cvh76nle.googlevideo.com/videoplayback?expire=1704509149&ei=fWqYZarSGPSZz7sPnKWGqA4&ip=103.176.70.125&id=o-APBytXw7g9rSKlT8jxOVq8k9It9wHbd3HmzWaoMzJ2Ul&itag=249&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=Fw&mm=31%2C26&mn=sn-cvh76nle%2Csn-h557sn66&ms=au%2Conr&mv=m&mvi=4&pl=24&initcwndbps=1636250&spc=UWF9f5MU2OyFrpAQ2ATEGrp5k-5J_EcNDpVgS5012A&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=R9NKV3R8Cb4U0eJVWCY2KrYQ&gir=yes&clen=2190179&dur=331.101&lmt=1700160286645946&mt=1704487272&fvip=4&keepalive=yes&fexp=24007246&c=WEB&txp=5532434&n=y496J3szTWeF4w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AAO5W4owRgIhALd81DLOVK7Q6xV5TUSRd7zlwgRxs2-UqhWBvl9Be3TBAiEApNRWRvPmxRx7fw5ETXPnEuovnJgOiXy0C0SC4HbH-is%3D&sig=AJfQdSswRAIgMSyHCj961nUZOo98hyTz7Fvsah6oYe3ipHB8l-ZU-WECIFQsWFQvmsqD282DkIliYmRp7-Q1JQ5d3BLm1rPrjcG6",
      hasVideo: false,
      hasAudio: true,
      container: "webm",
      codecs: "opus",
      videoCodec: null,
      audioCodec: "opus",
      isLive: false,
      isHLS: false,
      isDashMPD: false,
    },
  ],
};

function HomePage(props: any) {
  const [videoUrl, setVideoUrl] = useState("");
  const [audioResponse, setAudioResponse] = useState<Root>(sampleResponse);
  const [playVideo, setPlayVideo] = useState(false);
  const [isTermsAggred, setIsTermsAggred] = useState(true);
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
    } else {
      setPlayVideo(false);
    }
  }

  function mimicDownload() {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }

    if (videoUrl === "" || !videoUrl.startsWith("https://youtu")) {
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

    if (videoUrl === "" || !videoUrl.startsWith("https://youtu")) {
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
          Download Audio
        </Button>
        <Button
          onClick={handleVideoPlay}
          sx={{ width: "200px", marginTop: "10px", marginBottom: "15px" }}
          variant="outlined"
        >
          Play Audio
        </Button>
        <h3 className="text-xs text-center w-80 m-2">
          A direct prompt to download video will get triggered if video has only
          one format else a list of downloadable video will get presented.
        </h3>
        <div className="flex items-center justify-center">
          <Checkbox
            onChange={(e) => handleCheckboxChange(e.target.checked)}
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
            <h3 className="font-bold text-xl">Audio Fetching Successful</h3>
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

          {audioResponse.downloadableFormats.map((format, index) => {
            return (
              <Button
                sx={{ margin: "10px", color: "blue", fontWeight: "bold" }}
                key={index}
                variant="outlined"
                onClick={() => openLink(format.url)}
              >
                Download [{format.bitrate}-{format.audioBitrate}-Bitrate] [
                {format.audioQuality}] [{format.audioSampleRate} Sample]
                Webm/Mp3
              </Button>
            );
          })}
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
    </div>
  );
}

export default HomePage;
