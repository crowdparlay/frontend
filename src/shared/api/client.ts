// Crowd Parlay API 1.0
// ---
// This file is automatically generated by openapi with preset openapi-preset-effector
// Do not edit this file directly. Instead open openapi config file and follow the link in "file"
import { createEffect } from 'effector';
import * as typed from 'typed-contracts';
import { requestFx } from './request';

//#region prebuilt code
export type GenericErrors =
  | {
      status: 'unexpected';
      error: Error;
    }
  | {
      status: 'unknown_status';
      error: { status: number; body: unknown };
    }
  | {
      status: 'validation_error';
      error: typed.ValidationError;
    };

type ErrorCodes = 400 | 401 | 402 | 403 | 404 | 405 | 406 | 500 | 501 | 502 | 505;
/**
 * @throws
 */
function parseByStatus<
  Variants extends string,
  Contracts extends Record<number, [Variants, typed.Contract<any>]>,
  Result extends {
    [Code in keyof Contracts]: Contracts[Code] extends [infer Status, typed.Contract<infer T>]
      ? { status: Status; answer: T }
      : never;
  }
>(
  name: string,
  response: { status: number; body?: unknown },
  contracts: Contracts,
): Result[Exclude<keyof Result, ErrorCodes>] {
  const contractObject = contracts[response.status];
  if (!contractObject) {
    throw {
      status: 'unknown_status',
      error: {
        status: response.status,
        body: response.body,
      },
    };
  }
  const [status, contract] = contractObject;
  const answer = contract(name, response.body);
  if (answer instanceof typed.ValidationError) {
    throw { status: 'validation_error', error: answer };
  }
  if (response.status >= 400) {
    throw { status, error: answer };
  }
  return { status, answer } as Result[Exclude<keyof Result, ErrorCodes>];
}

//#endregion prebuilt code/* --- */
//#region apiV1UsersRegisterPost
export type ApiV1UsersRegisterPost = {
  body?: {
    username?: string;
    display_name?: string;
    email?: string;
    password?: string;
    avatar_url?: string | null;
  };
};
/* Success */
export const apiV1UsersRegisterPostOk = typed.object({
  id: typed.string.optional,
  username: typed.string.optional,
  email: typed.string.optional,
  display_name: typed.string.optional,
  avatar_url: typed.string.maybe
});
export type ApiV1UsersRegisterPostDone = {
  status: "ok";
  answer: typed.Get<typeof apiV1UsersRegisterPostOk>;
};
/* Bad Request */
export const apiV1UsersRegisterPostBadRequest = typed.object({
  error_description: typed.string.optional,
  validation_errors: typed.object({}).optional
});
/* Forbidden */
export const apiV1UsersRegisterPostForbidden = typed.object({
  error_description: typed.string.optional
});
/* Server Error */
export const apiV1UsersRegisterPostInternalServerError = typed.object({
  error_description: typed.string.optional
});
export type ApiV1UsersRegisterPostFail = {
  status: "bad_request";
  error: typed.Get<typeof apiV1UsersRegisterPostBadRequest>;
} | {
  status: "forbidden";
  error: typed.Get<typeof apiV1UsersRegisterPostForbidden>;
} | {
  status: "internal_server_error";
  error: typed.Get<typeof apiV1UsersRegisterPostInternalServerError>;
} | GenericErrors;
export const apiV1UsersRegisterPost = createEffect<ApiV1UsersRegisterPost, ApiV1UsersRegisterPostDone, ApiV1UsersRegisterPostFail>({
  async handler({
    body
  }) {
    const name = "apiV1UsersRegisterPost.body";
    const response = await requestFx({
      path: "/api/v1/users/register",
      method: "POST",
      body
    });
    return parseByStatus(name, response, {
      200: ["ok", apiV1UsersRegisterPostOk],
      400: ["bad_request", apiV1UsersRegisterPostBadRequest],
      403: ["forbidden", apiV1UsersRegisterPostForbidden],
      500: ["internal_server_error", apiV1UsersRegisterPostInternalServerError]
    });
  }
});
//#endregion apiV1UsersRegisterPost

/* --- */
//#region apiV1UsersUserIdGet
export type ApiV1UsersUserIdGet = {
  path: {
    userId: string;
  };
};
/* Success */
export const apiV1UsersUserIdGetOk = typed.object({
  id: typed.string.optional,
  username: typed.string.optional,
  display_name: typed.string.optional,
  avatar_url: typed.string.maybe
});
export type ApiV1UsersUserIdGetDone = {
  status: "ok";
  answer: typed.Get<typeof apiV1UsersUserIdGetOk>;
};
/* Not Found */
export const apiV1UsersUserIdGetNotFound = typed.object({
  error_description: typed.string.optional
});
/* Server Error */
export const apiV1UsersUserIdGetInternalServerError = typed.object({
  error_description: typed.string.optional
});
export type ApiV1UsersUserIdGetFail = {
  status: "not_found";
  error: typed.Get<typeof apiV1UsersUserIdGetNotFound>;
} | {
  status: "internal_server_error";
  error: typed.Get<typeof apiV1UsersUserIdGetInternalServerError>;
} | GenericErrors;
export const apiV1UsersUserIdGet = createEffect<ApiV1UsersUserIdGet, ApiV1UsersUserIdGetDone, ApiV1UsersUserIdGetFail>({
  async handler({
    path
  }) {
    const name = "apiV1UsersUserIdGet.body";
    const response = await requestFx({
      path: `/api/v1/users/${path.userId}`,
      method: "GET"
    });
    return parseByStatus(name, response, {
      200: ["ok", apiV1UsersUserIdGetOk],
      404: ["not_found", apiV1UsersUserIdGetNotFound],
      500: ["internal_server_error", apiV1UsersUserIdGetInternalServerError]
    });
  }
});
//#endregion apiV1UsersUserIdGet

/* --- */
//#region apiV1UsersUserIdPut
export type ApiV1UsersUserIdPut = {
  body?: {
    username?: string | null;
    display_name?: string | null;
    email?: string | null;
    avatar_url?: string | null;
    old_password?: string | null;
    new_password?: string | null;
  };
  path: {
    userId: string;
  };
};
/* Success */
export const apiV1UsersUserIdPutOk = typed.object({
  id: typed.string.optional,
  username: typed.string.optional,
  display_name: typed.string.optional,
  email: typed.string.optional,
  avatar_url: typed.string.maybe
});
export type ApiV1UsersUserIdPutDone = {
  status: "ok";
  answer: typed.Get<typeof apiV1UsersUserIdPutOk>;
};
/* Bad Request */
export const apiV1UsersUserIdPutBadRequest = typed.object({
  error_description: typed.string.optional,
  validation_errors: typed.object({}).optional
});
/* Forbidden */
export const apiV1UsersUserIdPutForbidden = typed.object({
  error_description: typed.string.optional
});
/* Not Found */
export const apiV1UsersUserIdPutNotFound = typed.object({
  error_description: typed.string.optional
});
/* Server Error */
export const apiV1UsersUserIdPutInternalServerError = typed.object({
  error_description: typed.string.optional
});
export type ApiV1UsersUserIdPutFail = {
  status: "bad_request";
  error: typed.Get<typeof apiV1UsersUserIdPutBadRequest>;
} | {
  status: "forbidden";
  error: typed.Get<typeof apiV1UsersUserIdPutForbidden>;
} | {
  status: "not_found";
  error: typed.Get<typeof apiV1UsersUserIdPutNotFound>;
} | {
  status: "internal_server_error";
  error: typed.Get<typeof apiV1UsersUserIdPutInternalServerError>;
} | GenericErrors;
export const apiV1UsersUserIdPut = createEffect<ApiV1UsersUserIdPut, ApiV1UsersUserIdPutDone, ApiV1UsersUserIdPutFail>({
  async handler({
    body,
    path
  }) {
    const name = "apiV1UsersUserIdPut.body";
    const response = await requestFx({
      path: `/api/v1/users/${path.userId}`,
      method: "PUT",
      body
    });
    return parseByStatus(name, response, {
      200: ["ok", apiV1UsersUserIdPutOk],
      400: ["bad_request", apiV1UsersUserIdPutBadRequest],
      403: ["forbidden", apiV1UsersUserIdPutForbidden],
      404: ["not_found", apiV1UsersUserIdPutNotFound],
      500: ["internal_server_error", apiV1UsersUserIdPutInternalServerError]
    });
  }
});
//#endregion apiV1UsersUserIdPut

/* --- */
//#region apiV1UsersUserIdDelete
export type ApiV1UsersUserIdDelete = {
  path: {
    userId: string;
  };
};
/* Success */
export const apiV1UsersUserIdDeleteOk = typed.object({
  id: typed.string.optional,
  username: typed.string.optional,
  display_name: typed.string.optional,
  email: typed.string.optional,
  avatar_url: typed.string.maybe
});
export type ApiV1UsersUserIdDeleteDone = {
  status: "ok";
  answer: typed.Get<typeof apiV1UsersUserIdDeleteOk>;
};
/* Forbidden */
export const apiV1UsersUserIdDeleteForbidden = typed.object({
  error_description: typed.string.optional
});
/* Not Found */
export const apiV1UsersUserIdDeleteNotFound = typed.object({
  error_description: typed.string.optional
});
/* Server Error */
export const apiV1UsersUserIdDeleteInternalServerError = typed.object({
  error_description: typed.string.optional
});
export type ApiV1UsersUserIdDeleteFail = {
  status: "forbidden";
  error: typed.Get<typeof apiV1UsersUserIdDeleteForbidden>;
} | {
  status: "not_found";
  error: typed.Get<typeof apiV1UsersUserIdDeleteNotFound>;
} | {
  status: "internal_server_error";
  error: typed.Get<typeof apiV1UsersUserIdDeleteInternalServerError>;
} | GenericErrors;
export const apiV1UsersUserIdDelete = createEffect<ApiV1UsersUserIdDelete, ApiV1UsersUserIdDeleteDone, ApiV1UsersUserIdDeleteFail>({
  async handler({
    path
  }) {
    const name = "apiV1UsersUserIdDelete.body";
    const response = await requestFx({
      path: `/api/v1/users/${path.userId}`,
      method: "DELETE"
    });
    return parseByStatus(name, response, {
      200: ["ok", apiV1UsersUserIdDeleteOk],
      403: ["forbidden", apiV1UsersUserIdDeleteForbidden],
      404: ["not_found", apiV1UsersUserIdDeleteNotFound],
      500: ["internal_server_error", apiV1UsersUserIdDeleteInternalServerError]
    });
  }
});
//#endregion apiV1UsersUserIdDelete

/* --- */
//#region apiV1UsersResolveGet
export type ApiV1UsersResolveGet = {
  query?: {
    username?: string;
  };
};
/* Success */
export const apiV1UsersResolveGetOk = typed.object({
  id: typed.string.optional,
  username: typed.string.optional,
  display_name: typed.string.optional,
  avatar_url: typed.string.maybe
});
export type ApiV1UsersResolveGetDone = {
  status: "ok";
  answer: typed.Get<typeof apiV1UsersResolveGetOk>;
};
/* Bad Request */
export const apiV1UsersResolveGetBadRequest = typed.object({
  error_description: typed.string.optional,
  validation_errors: typed.object({}).optional
});
/* Not Found */
export const apiV1UsersResolveGetNotFound = typed.object({
  error_description: typed.string.optional
});
/* Server Error */
export const apiV1UsersResolveGetInternalServerError = typed.object({
  error_description: typed.string.optional
});
export type ApiV1UsersResolveGetFail = {
  status: "bad_request";
  error: typed.Get<typeof apiV1UsersResolveGetBadRequest>;
} | {
  status: "not_found";
  error: typed.Get<typeof apiV1UsersResolveGetNotFound>;
} | {
  status: "internal_server_error";
  error: typed.Get<typeof apiV1UsersResolveGetInternalServerError>;
} | GenericErrors;
export const apiV1UsersResolveGet = createEffect<ApiV1UsersResolveGet, ApiV1UsersResolveGetDone, ApiV1UsersResolveGetFail>({
  async handler({
    query
  }) {
    const name = "apiV1UsersResolveGet.body";
    const response = await requestFx({
      path: "/api/v1/users/resolve",
      method: "GET",
      query
    });
    return parseByStatus(name, response, {
      200: ["ok", apiV1UsersResolveGetOk],
      400: ["bad_request", apiV1UsersResolveGetBadRequest],
      404: ["not_found", apiV1UsersResolveGetNotFound],
      500: ["internal_server_error", apiV1UsersResolveGetInternalServerError]
    });
  }
});
//#endregion apiV1UsersResolveGet

/* --- */
//#region apiV1AuthorsAuthorIdGet
export type ApiV1AuthorsAuthorIdGet = {
  path: {
    authorId: string;
  };
};
/* Success */
export const apiV1AuthorsAuthorIdGetOk = typed.object({
  id: typed.string.optional,
  username: typed.string.optional,
  display_name: typed.string.optional,
  avatar_url: typed.string.maybe
});
export type ApiV1AuthorsAuthorIdGetDone = {
  status: "ok";
  answer: typed.Get<typeof apiV1AuthorsAuthorIdGetOk>;
};
export type ApiV1AuthorsAuthorIdGetFail = GenericErrors;
export const apiV1AuthorsAuthorIdGet = createEffect<ApiV1AuthorsAuthorIdGet, ApiV1AuthorsAuthorIdGetDone, ApiV1AuthorsAuthorIdGetFail>({
  async handler({
    path
  }) {
    const name = "apiV1AuthorsAuthorIdGet.body";
    const response = await requestFx({
      path: `/api/v1/authors/${path.authorId}`,
      method: "GET"
    });
    return parseByStatus(name, response, {
      200: ["ok", apiV1AuthorsAuthorIdGetOk]
    });
  }
});
//#endregion apiV1AuthorsAuthorIdGet

/* --- */
//#region apiV1CommentsCommentIdGet
export type ApiV1CommentsCommentIdGet = {
  path: {
    commentId: string;
  };
};
/* Success */
export const apiV1CommentsCommentIdGetOk = typed.object({
  id: typed.string.optional,
  content: typed.string.optional,
  author: typed.object({
    id: typed.string.optional,
    username: typed.string.optional,
    display_name: typed.string.optional,
    avatar_url: typed.string.maybe
  }).optional,
  created_at: typed.string.optional,
  reply_count: typed.number.optional,
  first_replies_authors: typed.array(typed.object({
    id: typed.string.optional,
    username: typed.string.optional,
    display_name: typed.string.optional,
    avatar_url: typed.string.maybe
  })).optional
});
export type ApiV1CommentsCommentIdGetDone = {
  status: "ok";
  answer: typed.Get<typeof apiV1CommentsCommentIdGetOk>;
};
export type ApiV1CommentsCommentIdGetFail = GenericErrors;
export const apiV1CommentsCommentIdGet = createEffect<ApiV1CommentsCommentIdGet, ApiV1CommentsCommentIdGetDone, ApiV1CommentsCommentIdGetFail>({
  async handler({
    path
  }) {
    const name = "apiV1CommentsCommentIdGet.body";
    const response = await requestFx({
      path: `/api/v1/comments/${path.commentId}`,
      method: "GET"
    });
    return parseByStatus(name, response, {
      200: ["ok", apiV1CommentsCommentIdGetOk]
    });
  }
});
//#endregion apiV1CommentsCommentIdGet

/* --- */
//#region apiV1CommentsGet
export type ApiV1CommentsGet = {
  query: {
    discussionId?: string;
    authorId?: string;
    page: number;
    size: number;
  };
};
/* Success */
export const apiV1CommentsGetOk = typed.array(typed.object({
  id: typed.string.optional,
  content: typed.string.optional,
  author: typed.object({
    id: typed.string.optional,
    username: typed.string.optional,
    display_name: typed.string.optional,
    avatar_url: typed.string.maybe
  }).optional,
  created_at: typed.string.optional,
  reply_count: typed.number.optional,
  first_replies_authors: typed.array(typed.object({
    id: typed.string.optional,
    username: typed.string.optional,
    display_name: typed.string.optional,
    avatar_url: typed.string.maybe
  })).optional
}));
export type ApiV1CommentsGetDone = {
  status: "ok";
  answer: typed.Get<typeof apiV1CommentsGetOk>;
};
export type ApiV1CommentsGetFail = GenericErrors;
export const apiV1CommentsGet = createEffect<ApiV1CommentsGet, ApiV1CommentsGetDone, ApiV1CommentsGetFail>({
  async handler({
    query
  }) {
    const name = "apiV1CommentsGet.body";
    const response = await requestFx({
      path: "/api/v1/comments",
      method: "GET",
      query
    });
    return parseByStatus(name, response, {
      200: ["ok", apiV1CommentsGetOk]
    });
  }
});
//#endregion apiV1CommentsGet

/* --- */
//#region apiV1CommentsPost
export type ApiV1CommentsPost = {
  body?: {
    discussion_id?: string;
    content?: string;
  };
};
/* Success */
export const apiV1CommentsPostOk = typed.object({
  id: typed.string.optional,
  content: typed.string.optional,
  author: typed.object({
    id: typed.string.optional,
    username: typed.string.optional,
    display_name: typed.string.optional,
    avatar_url: typed.string.maybe
  }).optional,
  created_at: typed.string.optional,
  reply_count: typed.number.optional,
  first_replies_authors: typed.array(typed.object({
    id: typed.string.optional,
    username: typed.string.optional,
    display_name: typed.string.optional,
    avatar_url: typed.string.maybe
  })).optional
});
export type ApiV1CommentsPostDone = {
  status: "ok";
  answer: typed.Get<typeof apiV1CommentsPostOk>;
};
export type ApiV1CommentsPostFail = GenericErrors;
export const apiV1CommentsPost = createEffect<ApiV1CommentsPost, ApiV1CommentsPostDone, ApiV1CommentsPostFail>({
  async handler({
    body
  }) {
    const name = "apiV1CommentsPost.body";
    const response = await requestFx({
      path: "/api/v1/comments",
      method: "POST",
      body
    });
    return parseByStatus(name, response, {
      200: ["ok", apiV1CommentsPostOk]
    });
  }
});
//#endregion apiV1CommentsPost

/* --- */
//#region apiV1CommentsParentCommentIdRepliesGet
export type ApiV1CommentsParentCommentIdRepliesGet = {
  path: {
    parentCommentId: string;
  };
  query: {
    page: number;
    size: number;
  };
};
/* Success */
export const apiV1CommentsParentCommentIdRepliesGetOk = typed.array(typed.object({
  id: typed.string.optional,
  content: typed.string.optional,
  author: typed.object({
    id: typed.string.optional,
    username: typed.string.optional,
    display_name: typed.string.optional,
    avatar_url: typed.string.maybe
  }).optional,
  created_at: typed.string.optional,
  reply_count: typed.number.optional,
  first_replies_authors: typed.array(typed.object({
    id: typed.string.optional,
    username: typed.string.optional,
    display_name: typed.string.optional,
    avatar_url: typed.string.maybe
  })).optional
}));
export type ApiV1CommentsParentCommentIdRepliesGetDone = {
  status: "ok";
  answer: typed.Get<typeof apiV1CommentsParentCommentIdRepliesGetOk>;
};
export type ApiV1CommentsParentCommentIdRepliesGetFail = GenericErrors;
export const apiV1CommentsParentCommentIdRepliesGet = createEffect<ApiV1CommentsParentCommentIdRepliesGet, ApiV1CommentsParentCommentIdRepliesGetDone, ApiV1CommentsParentCommentIdRepliesGetFail>({
  async handler({
    path,
    query
  }) {
    const name = "apiV1CommentsParentCommentIdRepliesGet.body";
    const response = await requestFx({
      path: `/api/v1/comments/${path.parentCommentId}/replies`,
      method: "GET",
      query
    });
    return parseByStatus(name, response, {
      200: ["ok", apiV1CommentsParentCommentIdRepliesGetOk]
    });
  }
});
//#endregion apiV1CommentsParentCommentIdRepliesGet

/* --- */
//#region apiV1CommentsParentCommentIdRepliesPost
export type ApiV1CommentsParentCommentIdRepliesPost = {
  body?: {
    content?: string;
  };
  path: {
    parentCommentId: string;
  };
};
/* Success */
export const apiV1CommentsParentCommentIdRepliesPostOk = typed.object({
  id: typed.string.optional,
  content: typed.string.optional,
  author: typed.object({
    id: typed.string.optional,
    username: typed.string.optional,
    display_name: typed.string.optional,
    avatar_url: typed.string.maybe
  }).optional,
  created_at: typed.string.optional,
  reply_count: typed.number.optional,
  first_replies_authors: typed.array(typed.object({
    id: typed.string.optional,
    username: typed.string.optional,
    display_name: typed.string.optional,
    avatar_url: typed.string.maybe
  })).optional
});
export type ApiV1CommentsParentCommentIdRepliesPostDone = {
  status: "ok";
  answer: typed.Get<typeof apiV1CommentsParentCommentIdRepliesPostOk>;
};
export type ApiV1CommentsParentCommentIdRepliesPostFail = GenericErrors;
export const apiV1CommentsParentCommentIdRepliesPost = createEffect<ApiV1CommentsParentCommentIdRepliesPost, ApiV1CommentsParentCommentIdRepliesPostDone, ApiV1CommentsParentCommentIdRepliesPostFail>({
  async handler({
    body,
    path
  }) {
    const name = "apiV1CommentsParentCommentIdRepliesPost.body";
    const response = await requestFx({
      path: `/api/v1/comments/${path.parentCommentId}/replies`,
      method: "POST",
      body
    });
    return parseByStatus(name, response, {
      200: ["ok", apiV1CommentsParentCommentIdRepliesPostOk]
    });
  }
});
//#endregion apiV1CommentsParentCommentIdRepliesPost

/* --- */
//#region apiV1DiscussionsDiscussionIdGet
export type ApiV1DiscussionsDiscussionIdGet = {
  path: {
    discussionId: string;
  };
};
/* Success */
export const apiV1DiscussionsDiscussionIdGetOk = typed.object({
  id: typed.string.optional,
  title: typed.string.optional,
  description: typed.string.optional,
  author: typed.object({
    id: typed.string.optional,
    username: typed.string.optional,
    display_name: typed.string.optional,
    avatar_url: typed.string.maybe
  }).optional
});
export type ApiV1DiscussionsDiscussionIdGetDone = {
  status: "ok";
  answer: typed.Get<typeof apiV1DiscussionsDiscussionIdGetOk>;
};
export type ApiV1DiscussionsDiscussionIdGetFail = GenericErrors;
export const apiV1DiscussionsDiscussionIdGet = createEffect<ApiV1DiscussionsDiscussionIdGet, ApiV1DiscussionsDiscussionIdGetDone, ApiV1DiscussionsDiscussionIdGetFail>({
  async handler({
    path
  }) {
    const name = "apiV1DiscussionsDiscussionIdGet.body";
    const response = await requestFx({
      path: `/api/v1/discussions/${path.discussionId}`,
      method: "GET"
    });
    return parseByStatus(name, response, {
      200: ["ok", apiV1DiscussionsDiscussionIdGetOk]
    });
  }
});
//#endregion apiV1DiscussionsDiscussionIdGet

/* --- */
//#region apiV1DiscussionsGet
export type ApiV1DiscussionsGet = {
  query?: {
    authorId?: string;
  };
};
/* Success */
export const apiV1DiscussionsGetOk = typed.array(typed.object({
  id: typed.string.optional,
  title: typed.string.optional,
  description: typed.string.optional,
  author: typed.object({
    id: typed.string.optional,
    username: typed.string.optional,
    display_name: typed.string.optional,
    avatar_url: typed.string.maybe
  }).optional
}));
export type ApiV1DiscussionsGetDone = {
  status: "ok";
  answer: typed.Get<typeof apiV1DiscussionsGetOk>;
};
export type ApiV1DiscussionsGetFail = GenericErrors;
export const apiV1DiscussionsGet = createEffect<ApiV1DiscussionsGet, ApiV1DiscussionsGetDone, ApiV1DiscussionsGetFail>({
  async handler({
    query
  }) {
    const name = "apiV1DiscussionsGet.body";
    const response = await requestFx({
      path: "/api/v1/discussions",
      method: "GET",
      query
    });
    return parseByStatus(name, response, {
      200: ["ok", apiV1DiscussionsGetOk]
    });
  }
});
//#endregion apiV1DiscussionsGet

/* --- */
//#region apiV1DiscussionsPost
export type ApiV1DiscussionsPost = {
  body?: {
    title?: string;
    description?: string;
  };
};
/* Success */
export const apiV1DiscussionsPostOk = typed.object({
  id: typed.string.optional,
  title: typed.string.optional,
  description: typed.string.optional,
  author: typed.object({
    id: typed.string.optional,
    username: typed.string.optional,
    display_name: typed.string.optional,
    avatar_url: typed.string.maybe
  }).optional
});
export type ApiV1DiscussionsPostDone = {
  status: "ok";
  answer: typed.Get<typeof apiV1DiscussionsPostOk>;
};
export type ApiV1DiscussionsPostFail = GenericErrors;
export const apiV1DiscussionsPost = createEffect<ApiV1DiscussionsPost, ApiV1DiscussionsPostDone, ApiV1DiscussionsPostFail>({
  async handler({
    body
  }) {
    const name = "apiV1DiscussionsPost.body";
    const response = await requestFx({
      path: "/api/v1/discussions",
      method: "POST",
      body
    });
    return parseByStatus(name, response, {
      200: ["ok", apiV1DiscussionsPostOk]
    });
  }
});
//#endregion apiV1DiscussionsPost

