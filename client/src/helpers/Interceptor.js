import axios from 'axios';
import baseUrl from '../constants/BaseURL';

// axios.interceptors.request.use(
//   (config) => {
//     if (!localStorage.getItem('tokens')) return config;
//     const accessToken = JSON.parse(localStorage.getItem('tokens')).accessToken;
//     console.log(config);
//     if (accessToken) {
//       config.headers['Authorization'] = 'Bearer ' + accessToken;
//     }
//     console.log(config);
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );
//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    //const dispatch = useDispatch();
    const originalRequest = error.config;
    let refreshToken = JSON.parse(localStorage.getItem('tokens')).refreshToken;
    if (!refreshToken) {
      return;
    }
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post(`${baseUrl}/auth/refresh-token`, { refreshToken: refreshToken })
        .then((res) => {
          if (res.status === 200) {
            const tokens = JSON.stringify({
              accessToken: res.data.tokens.accessToken,
              refreshToken,
            });
            localStorage.setItem('tokens', tokens);
            console.log(tokens);
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default axios;
