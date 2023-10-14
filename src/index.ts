import axios from 'axios';

const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1'; // URL we're scraping
const AxiosInstance = axios.create(); // Create a new Axios Instance

// Send an async HTTP Get request to the url
AxiosInstance.get(url)
  .then(
    response => {
      const html = response.data; // Get the HTML from the HTTP request
      console.log(html);
    }
  )
  .catch(console.error);