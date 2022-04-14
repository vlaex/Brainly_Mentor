export interface BackgroundMessage {
  type: string;
  data?: unknown;
}

export interface ServerConfig {
  deletionReasons: {id: number; name: string; regex: string}[];
  subjects: {id: number; name: string}[];
}

export type FileInjectionOptions = {
  /**
   * If `true`, we set `body` content to "" and remove Brainly stylesheets and old scripts
   */
  cleanBody: boolean;
  /**
   * If `true`, we import Brainly icons and stylesheets, inject the flashes container
   */
  oldPage: boolean;
  /**
   * If `true`, we load the extension config
   */
  loadConfig?: boolean;
};