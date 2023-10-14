// import axios from 'axios';

// // const {convert} = require('html-to-text');

// const url = 'https://www.npmjs.com/package/axios#features';

// const AxiosInstance = axios.create();

// // var listHTMLText:string[] = [];

// // document.querySelectorAll("*");

// AxiosInstance.get(url)
//   .then(
//     response => {
//       const html = response.data;
//       getHTMLText(html);
//     //   document.querySelectorAll("*");// Get the HTML from the HTTP request
//     //   console.log(html); // Print the HTML
//     }
//   )
//   .catch(console.error);

// function getHTMLText(elements: NodeListOf<Element>) {

//     var listHTMLText:string[] = [];
//     const {convert} = require('html-to-text');

//     for(let i = 0; i < elements.length; i++) {
//         console.log(elements[i].innerHTML);
//         if(elements[i].innerHTML != undefined) {
//             listHTMLText.push(convert(elements[i].innerHTML));
//         }
//     }
//     return listHTMLText
// }

// export { getHTMLText }
