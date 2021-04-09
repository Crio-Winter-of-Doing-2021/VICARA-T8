let url = process.env.REACT_APP_BASE_URL_DEV;
if (process.env.NODE_ENV === 'production') url = process.env.REACT_APP_BASE_URL;

export default url;
