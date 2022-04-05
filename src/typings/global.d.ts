import { ServerConfig } from "./extension";

declare global {
  interface Window { 
    deletionReasons?: ServerConfig["deletionReasons"];
    subjects?: ServerConfig["subjects"];
  }
}

export {};