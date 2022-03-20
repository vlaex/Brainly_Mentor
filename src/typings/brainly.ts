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