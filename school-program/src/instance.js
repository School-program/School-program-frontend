import axios from 'axios';
const PORT = process.env.PORT || 3005;

const instance = axios.create({
  baseURL: `http://localhost:${PORT}`,
  timeout: 5000,
});

export default instance;
