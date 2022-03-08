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
    nick: string;
    id: number;
    avatar?: string;
  };
  date: string;
  reviewStatus: "APPROVED" | "DISAPPROVED" | "NONE";
  contentType: "answer" | "question" | "comment" | "attachment" | "unknown";
  type: "DELETED" | "ACCEPTED" | "REPORTED_FOR_CORRECTION" | "UNKNOWN";
  localizedType: string;
  frontIcon: string;
  reason: {
    fullText: string;
    shortReason: string;
    id: number;
  };

  /** client only fields */
  isModerator?: boolean;
}

export type Mentee = {
  id: number;
  market: Market;
  mentorId: number;
  nick: string;
  note: string;
  avatar?: string;
  specialRanks?: {
    name: string;
    id: string;
  }[]
}