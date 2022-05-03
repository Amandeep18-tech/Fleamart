// HTTP client request configuration. It sends requests from client to Amazon API Gateway.
import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default axios;
