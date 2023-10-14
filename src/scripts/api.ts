import axios from 'axios';
async function request(htmlText: string){

    axios.post("http://172.20.25.150:8000", {
        texte: htmlText
    })
    .then((response) => {
        console.log(response);
    });
}

export { request }