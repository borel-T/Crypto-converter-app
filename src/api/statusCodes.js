// http requests status codes
const httpStatusCodes = {
  // SUCCESS
  SUCCESS_OK: 200, //request fulfilled
  SUCCESS_CREATED: 201, //request fulfilled, new resource created
  ACCEPTED: 202, //request accpeted for processing, but processing not completed
  NO_CONTENT: 204, //  successfully fulfilled the request and there's no content to send in the response
  RESET_CONTENT: 205, //request fufilled, clear client document (form)
  // CLIENT ERROR
  BAD_REQUEST: 400, //request not understood by server, malformed syntax
  UNAUTHORIZED: 401, //request requires authentication
  FORBIDDEN: 403, //server understood the request, but is refusing to fulfill it.
  NOT_FOUND: 404, //no matching resource found on server
  NOT_ACCEPTABLE: 406, //server doesn't find any content that conforms to the criteria given by user agent
  CONFLICT: 409, //resource state conflict
  PRE_CONDITION_FAILED: 412, // http client has indicated preconditions in its headers which the server does not meet.
  BLOCKED_ACCESS: 423, //resource locked
  UNAVALAIBLE_FOR_LEGAL_REASON: 451, //access is denied for legal reasons
  SERVER_ERROR_INTERNAL: 500, //server internal error
};

export default httpStatusCodes;
