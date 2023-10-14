import * as Scraper from "./scraper";

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.url;
}

Scraper.getHTMLText(await getCurrentTab());