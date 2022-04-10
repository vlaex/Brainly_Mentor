export interface BackgroundMessage {
  type: string;
  data?: unknown;
}

export interface ServerConfig {
  deletionReasons: {id: number; name: string; regex: string}[];
  subjects: {id: number; name: string}[];
}