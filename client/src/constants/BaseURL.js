let url = 'http://localhost:8080/api';
if (process.env.NODE_ENV === 'production')
  url = 'https://storage-drive-backend.herokuapp.com/api';

export default url;
