export type ApiFailedResponse = {
  error: string;
}
export type ApiSuccessResponse = {
  data: any;
}

export enum Market {
  ru = "ru",
  us = "us"
}

export type Action = {
  hash: string;
  beautifiedDate: string;
  taskId: number;
  taskLink: string;
  contentType: "answer" | "question" | "comment" | "attachment" | "unknown";
  type: "deleted" | "accepted" | "sentForCorrection";
  content?: string;
  reason?: string;
  reasonShort?: string;
  user: {
    nick: string;
    id: number;
  };
  disapproved: boolean;
  approved: boolean;
  localizedType: string;
  icon: string;
};

export type Mentee = {
  market: Market;
  mentor: string; // mentor hash
  note: string;
  nick: string;
  id: number;
  privileges: number[];
}

export type Candidate = {
  status: string;
  link: string;
}