export type BasicSuccessResponse = {
  success: true;
}

export enum Market {
  ru = "ru",
  us = "us"
}

export type Action = {
  hash: string;
  taskId: number;
  taskLink: string;
  content: string;
  user: {
    link: string;
    id: number;
    nick: string;
    avatar?: string;
  };
  date: string;
  reviewStatus?: "approved" | "disapproved";
  autoReview?: unknown;
  contentType: "answer" | "question" | "comment" | "attachment" | "unknown";
  type: "DELETED" | "ACCEPTED" | "REPORTED_FOR_CORRECTION";
  shortReason: string;
  localizedType: string;
  frontIcon: string;
  reason: {
    full: string;
    short: string;
    id?: number;
  }
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