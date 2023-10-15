import * as Api from "./api";

const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
const contentQueries = await chrome.scripting.executeScript({
  target: {
    tabId: tab.id,
    allFrames: false
  },
  func: () => {
    return document.body.innerText
  }
});

let text = ""

for (let query of contentQueries) {
  text += query.result
}

text = text.replace(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gm, "")

const display = document.querySelector("#assessment")
const overlay = document.querySelector("#overlay") as HTMLElement
const overlayText = document.querySelector("#overlay p") as HTMLElement
const overlaySpinner = document.querySelector("#overlay") as HTMLElement

let url: string | null = ""

if (tab.url) {
  url = tab.url
}

const audit = await Api.auditWebsite(text, url)

// console.log(text, display, audit)
if (!audit.success) {
  overlayText.innerHTML = "Failed to load."
} else {
  display.innerHTML = `${audit.assessment}`
  overlay.style.opacity = "0"
}