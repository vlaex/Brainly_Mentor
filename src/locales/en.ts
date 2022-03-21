export default {
  "market": "us",
  "marketURL": "https://brainly.com",
  "marketHost": "brainly.com",
  "marketName": "brainly",
  "common": {
    "pts": "pts",
    "question": "Question",
    "areYouSureToDeleteMentee": "Are you sure to delete this mentee?\nAll data, including statistics, approved and disapproved actions, will be permanently deleted.",
    "deleteMentee": "Delete mentee",
    "youHaveBeenAuthorized": "You have been successfully authorized in the extension!",
    "deletionReason": "Deletion reason",
    "dateBetween": "Date between",
    "close": "Close",
    "reload": "Reload",
    "today": "today",
    "yesterday": "yesterday",
    "nDaysAgo": "%{days} days ago",
    "all": "All",
    "nick": "Nick",
    "filters": "Filters",
    "clickHereToLogin": "Click here to login",
    "viewActions": "View actions",
    "loading": "Loading...",
    "actions": "Actions",
    "tryAgain": "Try again",
    "approveAction": "Approve!",
    "disapproveAction": "Disapprove!",
    "revertAction": "Revert this action",
    "answerDeleted": "Answer deleted",
    "questionDeleted": "Question deleted",
    "commentDeleted": "Comment deleted",
    "attachmentDeleted": "Attachment deleted",
    "contentAccepted": "Content accepted",
    "toCorrect": "Asked for correction",
    "previousPage": "Previous page",
    "nextPage": "Next page",
    "deleted": "Deleted",
    "yourMentees": "Your mentees",
    "note": "Note",
    "contentType": "Content type",
    "actionType": "Action type",
    "noActionsMatchingFilters": "There are no actions matching your filters",
    "noReason": "No reason",
    "hideComments": "Hide comments",
    "actionFilters": {
      "contentTypes": [
        {"value": "answer", "text": "Answers"},
        {"value": "question", "text": "Questions"},
        {"value": "comment", "text": "Comments"},
        {"value": "attachment", "text": "Attachments"},
      ],
      "actionTypes": [
        {"value": "DELETED", "text": "Deleted"},
        {"value": "ACCEPTED", "text": "Accepted"},
        {"value": "REPORTED_FOR_CORRECTION", "text": "Reported for correction"},
      ],
      "deletionReasons": [
        {"value":"21","text":"Not English"},
        {"value":"22","text":"Please Be Nice to Other Users"},
        {"value":"57","text":"Default"},
        {"value":"73","text":"Self Harm"},
        {"value":"84","text":"Inappropriate Content"},
        {"value":"85","text":"Personal Information"},
        {"value":"32","text":"Question about Question"},
        {"value":"35","text":"IDK Answer"},
        {"value":"48","text":"Mistakes in Answer"},
        {"value":"55","text":"Spam Answer"},
        {"value":"13","text":"Not Clear"},
        {"value":"20","text":"Incomplete Answer"},
        {"value":"33","text":"No Calculations (STEM Only)"},
        {"value":"7","text":"Copied From Another Source"},
        {"value":"8","text":"Link in Answer"},
        {"value":"83","text":"Copied from Another User"},
        {"value":"11","text":"Too Many Questions"},
        {"value":"15","text":"Link in Question"},
        {"value":"17","text":"Essay or Project"},
        {"value":"30","text":"Too Trivial"},
        {"value":"67","text":"Brainly-Related Question"},
        {"value":"75","text":"Wrong Subject"},
        {"value":"78","text":"Not a School Problem"},
        {"value":"6","text":"Default"},
        {"value":"9","text":"Not English"},
        {"value":"24","text":"Multiple Posting"},
        {"value":"38","text":"Inappropriate Content"},
        {"value":"56","text":"Personal Information"},
        {"value":"72","text":"Self Harm"},
        {"value":"18","text":"Unclear Question"},
        {"value":"80","text":"Unclear Attachment"},
        {"value":"81","text":"Too General"},
        {"value":"82","text":"Incomplete Question"},
        {"value":"77","text":"Content from Another Source"},
        {"value":"79","text":"Content Prohibited"},
        {"value":"23","text":"Please Be Nice to Other Users"},
        {"value":"87","text":"Inappropriate Content"},
        {"value":"16","text":"Answer in Comment"},
        {"value":"29","text":"Link in Comment"},
        {"value":"40","text":"Question as Comment"},
        {"value":"58","text":"Personal Information"},
        {"value":"71","text":"Off-Topic"},
        {"value":"3","text":"Default"},
        {"value":"25","text":"Not English"},
        {"value":"68","text":"Wrong Information"},
        {"value":"74","text":"Self Harm"},
        {"value":"100","text":"Time to correct has expired"}
      ],
    },
    "user": "User",
    "nickEqualsTo": "nick equals to",
    "idEqualsTo": "ID equals to",
    "rankEqualsTo": "rank equals to",
    "addMentee": "Add mentee",
    "linkToUserProfile": "Link to user profile"
  },
  "errors": {
    "couldNotLoadActions": "We could not load moderator actions :(",
    "notAuthorizedToUseExtension": "You are not authorized to use this extension",
    "couldNotAuthorizeYou": "Could not authorize you",
    "couldNotFindAuthTokenInDM": "Couldn't find auth token in DM",

    // Server errors
    "notAuthed": "You are not authorized",
    "brainlyError": "Brainly error",
    "invalidUserOrPage": "Invalid user or page ID",
    "pageNotFound": "Page not found",
    "databaseUnavailable": "The extension database is temporarily unavailable 😞",
    "internalError": "An unexpected error has occured",
    "userNotFound": "User not found",
    "invalidUser": "Invalid user",
    "invalidPayload": "Invalid payload",
    "notModerator": "The user is not a moderator",
    "marketNotSupported": "This market is not supported",
    "noActions": "This user has no actions. Yet...",
    "tokenInvalid": "Your auth token is invalid",
    "mentorNotFound": "Mentor not found",
    "cannotReviewYourActions": "You can't review your actions",
    "alreadyReviewed": "This action has already been reviewed",
    "notReviewed": "This action has not been reviewed",
    "actionNotFound": "Action not found",
    "couldNotFetchSavedActions": "We could not fetch saved actions",
    "noPrivileges": "You have no privileges to perform this operation",
    "wannaAddYourself": "Wanna add yourself? 👁️",
    "userAlreadyExists": "User already exists",
    "accountDeactivated": "Account has been deactivated",
    "menteeNotFound": "Mentee not found"
  },
  "taskPath": "/question",
  "dateTimeFormat": "MM/DD/YYYY hh:mm:ss",
  "dateFormat": "MM/DD/YYYY",
  "timezone": "America/New_York",
  "botUserId": 54605682,
  "regexps": {
    "accepted": /accepted/i,
    "deleted": /deleted/i,
    "question": /question/i,
    "incorrect": /incorrect/i
  },
  "localizedActionTypes": {
    "ATTACHMENT_DELETED": "Attachment deleted",
    "ACCEPTED": "Accepted",
    "DELETED": "Deleted",
    "REPORTED_FOR_CORRECTION": "Reported for correction",
    "COMMENT_DELETED": "Comment deleted"
  },
  "deletionReasons": [{
    "name": "Not English",
    "id": 21,
    "regex": "posted an answer in a language other than English"
  }, {
    "name": "Please Be Nice to Other Users",
    "id": 22,
    "regex": "Brainly has a zero-tolerance policy for cyberbullying"
  }, {
    "name": "Default",
    "id": 57,
    "regex": "so we had to take it down. Please review the guidelines here"
  }, {
    "name": "Self Harm",
    "id": 73,
    "regex": "because it was not school-related. More importantly, we're concerned about the content you are posting"
  }, {
    "name": "Inappropriate Content",
    "id": 84,
    "regex": "Community Guidelines. This should be a safe and respectful learning environment for"
  }, {
    "name": "Personal Information",
    "id": 85,
    "regex": "not safe to share or ask for personal information online. Keep information like your"
  }, {
    "name": "Question about Question",
    "id": 32,
    "regex": "feature to ask about a question. It's meant for"
  }, {
    "name": "IDK Answer",
    "id": 35,
    "regex": "not sure how to answer their question"
  }, {
    "name": "Mistakes in Answer",
    "id": 48,
    "regex": "are some mistakes in your answer. Please double-check your work and repost your answer"
  }, {
    "name": "Spam Answer",
    "id": 55,
    "regex": "keep Brainly's answer quality high! If you contribute quality answers to Brainly"
  }, {
    "name": "Not Clear",
    "id": 13,
    "regex": "answer is unclear or does not answer the question being asked. We know you were"
  }, {
    "name": "Incomplete Answer",
    "id": 20,
    "regex": "it was incomplete. We know you were excited to help, so please repost and make"
  }, {
    "name": "No Calculations (STEM Only)",
    "id": 33,
    "regex": "it was missing some important steps. Brainly is all about giving students the tools they"
  }, {
    "name": "Copied From Another Source",
    "id": 7,
    "regex": "plagiarism is serious business. Posting content from another website, person, or source without permission"
  }, {
    "name": "Link in Answer",
    "id": 8,
    "regex": "it contained a link to a website other than Brainly. Please keep in mind that"
  }, {
    "name": "Copied from Another User",
    "id": 83,
    "regex": "plagiarism is serious business. Copying answers from other users violates Brainly's Community Guidelines"
  }, {
    "name": "Too Many Questions",
    "id": 11,
    "regex": "be too much of a good thing. Your questions are great, but there are just"
  }, {
    "name": "Link in Question",
    "id": 15,
    "regex": "it contained a link to a website other than Brainly. Please keep in mind that"
  }, {
    "name": "Essay or Project",
    "id": 17,
    "regex": "it was too complex.+need to complete this project on your own rather than"
  }, {
    "name": "Too Trivial",
    "id": 30,
    "regex": "it seems a bit too simple for other Brainly users to help with"
  }, {
    "name": "Brainly-Related Question",
    "id": 67,
    "regex": "question about how to use Brainly! Since Brainly is only intended for help with school-related"
  }, {
    "name": "Wrong Subject",
    "id": 75,
    "regex": "your question under the wrong subject. If your question is in the wrong category"
  }, {
    "name": "Not a School Problem",
    "id": 78,
    "regex": "was not part of an academic assignment. Since Brainly is only intended for homework questions"
  }, {
    "name": "Default",
    "id": 6,
    "regex": "so we had to take it down. Please review the guidelines here"
  }, {
    "name": "Not English",
    "id": 9,
    "regex": "like you've posted a question in a language other than English. Please be sure to"
  }, {
    "name": "Multiple Posting",
    "id": 24,
    "regex": "has already been asked on Brainly. To ensure all questions get answered in a timely"
  }, {
    "name": "Inappropriate Content",
    "id": 38,
    "regex": "it violates Brainly's Community Guidelines. This should be a safe and respectful learning environment for"
  }, {
    "name": "Personal Information",
    "id": 56,
    "regex": "not safe to share or ask for personal information online. Keep information like your"
  }, {
    "name": "Self Harm",
    "id": 72,
    "regex": "because it was not school-related. More importantly, we're concerned about the content you are posting"
  }, {
    "name": "Unclear Question",
    "id": 18,
    "regex": "question is unclear or a bit confusing. Please double-check your assignment and make sure you"
  }, {
    "name": "Unclear Attachment",
    "id": 80,
    "regex": "your attachment is unreadable! Please retake the photo and repost your question. Make sure the"
  }, {
    "name": "Too General",
    "id": 81,
    "regex": "question is a bit too vague for other students to answer. Brainly is designed to"
  }, {
    "name": "Incomplete Question",
    "id": 82,
    "regex": "question is missing some crucial information. Please repost it with any helpful information such as"
  }, {
    "name": "Content from Another Source",
    "id": 77,
    "regex": "plagiarism is serious business. Posting content from another website, person, or source without permission is"
  }, {
    "name": "Content Prohibited",
    "id": 79,
    "regex": "to a violation of our Honor Code. Brainly has a zero-tolerance policy for academic dishonesty"
  }, {
    "name": "Please Be Nice to Other Users",
    "id": 23,
    "regex": "to see it, don't post it! Brainly has a zero-tolerance policy for cyberbullying. If you"
  }, {
    "name": "Inappropriate Content",
    "id": 87,
    "regex": "it violates Brainly's Community Guidelines. This should be a safe and respectful learning environment for"
  }, {
    "name": "Answer in Comment",
    "id": 16,
    "regex": "your answer as a comment. Comments are for asking about the question. Please use the"
  }, {
    "name": "Link in Comment",
    "id": 29,
    "regex": "it contained a link to a website other than Brainly. Please keep in mind that"
  }, {
    "name": "Question as Comment",
    "id": 40,
    "regex": "posted your question as a comment. Comments are only for asking for clarification or more"
  }, {
    "name": "Personal Information",
    "id": 58,
    "regex": "not safe to share or ask for personal information online. Keep information like your real"
  }, {
    "name": "Off-Topic",
    "id": 71,
    "regex": "was not relevant to the question asked. Please keep in mind that all comments must"
  }, {
    "name": "Default",
    "id": 3,
    "regex": "so we had to take it down. Please review the guidelines here"
  }, {
    "name": "Not English",
    "id": 25,
    "regex": "like you've posted a comment in a language that is different from the question or"
  }, {
    "name": "Wrong Information",
    "id": 68,
    "regex": "contained confusing or incorrect information.  Feel free to check your work and try again. "
  }, {
    "name": "Self Harm",
    "id": 74,
    "regex": "because it was not school-related. More importantly, we're concerned about the content you are posting"
  }, {
    "name": "Time to correct has expired",
    "id": 100,
    "regex": "to correct this answer has expired"
  }]
};