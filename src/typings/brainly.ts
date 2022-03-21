/* eslint-disable camelcase */

export type GetConversationResponse = {
  conversation_id: number;
}

export type GetMessagesResponse = {
  last_id: number;
  conversation: {
    id: number;
    user_id: number;
    created: string;
    recipient_id: number;
    allow_link_from: unknown[];
  };
  messages: {
    id: number;
    conversation_id: number;
    user_id: number;
    created: string;
    content: string;
    is_harmful: boolean;
    new: boolean;
  }[];
}

export type UsersData = {
  id: number;
  nick: string;
  gender: 1 | 2;
  is_deleted: boolean;
  stats: {
    questions: number;
    answers: number;
    comments: number;
  };
  avatars: {
    [x in keyof {64, 100}]?: string;
  };
  ranks: {
    color: string;
    names: string[];
    count: number;
  };
  ranks_ids: number[];
}[];

export type QuestionData = {
  task: {
    attachments: unknown[];
    client_type: string;
    content: string;
    created: string;
    first_resp?: string;
    grade_id: number;
    id: number;
    points: {
      ptsForTask: number;
      ptsForResp: number;
      ptsForBest: number;
    };
    responses: number;
    source: string;
    tickets: number;
    user_category: number;
    user_id: number;
    the_best_resp_id?: number;
    subject_id: number;
    settings: {
      [x in keyof {
        "can_comment",
        "can_edit",
        "can_follow",
        "can_mark_abuse",
        "can_moderate",
        "can_unfollow",
        "is_answer_button",
        "is_closed",
        "is_confirmed",
        "is_deleted",
        "is_following",
        "is_marked_abuse"
      }]: boolean;
    }
  };
}