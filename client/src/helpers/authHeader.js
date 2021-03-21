export default function authHeader(getState) {
  // return authorization header with jwt token
  let user = getState().auth;
  const config = { Authorization: 'Bearer ' + user.token };
  if (user && user.token) {
    return config;
  } else {
    return {};
  }
}
