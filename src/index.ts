import axios from 'axios';

const {convert} = require('html-to-text');

const url = 'https://www.npmjs.com/package/axios#features';

const AxiosInstance = axios.create();

var listHTMLText:string[] = [];

// document.querySelectorAll("*");

AxiosInstance.get(url)
  .then(
    response => {
      const html = response.data;
      getHTMLText(html);
    //   document.querySelectorAll("*");// Get the HTML from the HTTP request
    //   console.log(html); // Print the HTML
    }
  )
  .catch(console.error);

function getHTMLText(elements: Element[]) {
    console.log(elements);
    
    for(let element of elements) {
        console.log(element.innerHTML);
        if(element.innerHTML != undefined) {
            listHTMLText.push(convert(element.innerHTML));
        }
        
    }
    
    console.log(listHTMLText);
    return listHTMLText
}


// Send an async HTTP Get request to the url

