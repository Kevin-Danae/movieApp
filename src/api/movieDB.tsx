import axios from 'axios';
const { APIKEY } = process.env

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'add69e882f4a3d77aa77a562e2d1f8e7',
    language: 'es-ES',
  },
});

export default movieDB;
