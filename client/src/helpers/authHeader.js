export default function authHeader(getState) {
  // return authorization header with jwt token
  let user = getState().auth;
  const header = { Authorization: 'Bearer ' + user.tokens.accessToken };
  if (user && user.tokens) {
    return header;
  } else {
    return {};
  }
}
