import * as Scraper from "./scraper";
import * as Api from "./api";
import id = chrome.runtime.id;

console.log("sfhashfsdjkfhsjkh")


const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
const test = await chrome.scripting.executeScript({
  target: {
    tabId: tab.id,
    allFrames: true
  },
  func: () => {
    return document.querySelector("body")
  }
});

console.log(test)

//
// Scraper.getHTMLText(await getCurrentTab());
// Api.request(Scraper.getHTMLText(await getCurrentTab()));