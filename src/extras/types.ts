export interface PickerCardProps {
  heading: string;
  description: string;
  openClick: (picker: string) => void;
  knowClick: () => void;
  borderColor: string;
}

export interface SingleColorProps {
  color: string;
  colorValue: any;
  id: string;
  deleteColor: (id: string) => void;
}

export interface IPGeolocationResponse {
  ip: string;
  isp: string;
  org: string;
  hostname: string;
  latitude: number;
  longitude: number;
  postal_code: string;
  city: string;
  country_code: string;
  country_name: string;
  continent_code: string;
  continent_name: string;
  region: string;
  district: string;
  timezone_name: string;
  connection_type: string;
  asn_number: number;
  asn_org: string;
  asn: string;
  currency_code: string;
  currency_name: string;
  success: boolean;
  premium: boolean;
}

export type ResponseKeyValueArray = [string, any][];

export interface Root {
  message: string;
  downloadableFormats: DownloadableFormat[];
}

export interface DownloadableFormat {
  mimeType: string;
  qualityLabel: any;
  bitrate: number;
  audioBitrate: number;
  itag: number;
  initRange: InitRange;
  indexRange: IndexRange;
  lastModified: string;
  contentLength: string;
  quality: string;
  projectionType: string;
  averageBitrate: number;
  audioQuality: string;
  approxDurationMs: string;
  audioSampleRate: string;
  audioChannels: number;
  loudnessDb: number;
  url: string;
  hasVideo: boolean;
  hasAudio: boolean;
  container: string;
  codecs: string;
  videoCodec: any;
  audioCodec: string;
  isLive: boolean;
  isHLS: boolean;
  isDashMPD: boolean;
  highReplication?: boolean;
}

export interface InitRange {
  start: string;
  end: string;
}

export interface IndexRange {
  start: string;
  end: string;
}

