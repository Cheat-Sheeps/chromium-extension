import axios from 'axios';
function getHTMLText(url: string) {

    const AxiosInstance = axios.create();
    const { convert } = require('html-to-text');   
    AxiosInstance.get(url)
    .then(
        response => {
            const html = response.data;
            return convert(html);
        }
    )
    .catch(console.error);
}

export { getHTMLText }