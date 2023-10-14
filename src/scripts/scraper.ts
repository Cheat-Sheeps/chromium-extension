function getHTMLText(elements: NodeListOf<Element>) {

    var listHTMLText:string[] = [];
    const {convert} = require('html-to-text');

    for(let i = 0; i < elements.length; i++) {
        console.log(elements[i].innerHTML);
        if(elements[i].innerHTML != undefined) {
            listHTMLText.push(convert(elements[i].innerHTML));
        }
    }
    return listHTMLText
}

export { getHTMLText }