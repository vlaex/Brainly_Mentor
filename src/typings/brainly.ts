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

export type GetTaskDataResponseWithExtraData = {
  task: unknown;

   /* 
      "content": "What is the probabili",
      "created": "2018-07-09T13:30:01-04:00",
      "responses": 1,
      "tickets": 1,
      "first_resp": "2018-07-09T13:42:20-04:00",
      "the_best_resp_id": null,
      "source": "10",
      "client_type": "5",
      "user_category": 100,
      "settings": {
        "is_closed": true,
        "can_edit": false,
        "can_mark_abuse": true,
        "can_moderate": true,
        "is_marked_abuse": false,
        "is_answer_button": true,
        "is_confirmed": false,
        "can_comment": false,
        "can_follow": false,
        "can_unfollow": false,
        "is_following": false,
        "is_deleted": false
      },
      "attachments": [],
      "comments": {
        "items": [],
        "last_id": 0,
        "count": 0
      }*/
}

