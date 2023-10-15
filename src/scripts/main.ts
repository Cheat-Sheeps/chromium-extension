import * as Api from "./api";
import { get_random_tip } from "./tips";

const [tab] = await chrome.tabs.query({
	active: true,
	lastFocusedWindow: true,
});
const contentQueries = await chrome.scripting.executeScript({
	target: {
		tabId: tab.id,
		allFrames: false,
	},
	func: () => {
		return document.body.innerText;
	},
});

const percentage = document.querySelector(".percent") as HTMLElement;
const percentage_bar = document.querySelector(".percent-bar") as HTMLElement;
const section2 = document.querySelector(".section-2") as HTMLElement;
const icon = document.querySelector(".iconcheck") as HTMLElement;
const bQuit = document.querySelector(".b-quit") as HTMLElement;
const bRetry = document.querySelector(".b-retry") as HTMLElement;
const bContinueGreen = document.querySelector(
	".b-continue-green"
) as HTMLElement;
const bContinueRed = document.querySelector(".b-continue-red") as HTMLElement;
const spinner = document.querySelector(".section-2-load") as HTMLElement;
const error = document.querySelector(".section-2-error") as HTMLElement;
const infoButton = document.querySelector(".info-button") as HTMLElement;
const section2list = document.querySelector(".section-2-list") as HTMLElement;

let list_of_words: { word: string; percent: number }[] = [];

await main();

// ---------------------------------------------------------------------------------------------

async function main() {
	let url: string = "";

	if (tab.url) {
		url = tab.url;
	}

	showTip();

	addListeners(url);
	await check_website(url);
}

async function check_website(url: string) {
	showSpinner();
	if (await query_api(getText(), url)) {
		hideSpinner();
	} else {
		showError();
	}
}

function addListeners(url: string) {
	bRetry.addEventListener("click", async () => {
		await check_website(url);
	});

	bQuit.addEventListener("click", () => {
		window.close();
	});

	bContinueGreen.addEventListener("click", () => {
		window.close();
	});

	bContinueRed.addEventListener("click", () => {
		window.close();
	});

	infoButton.addEventListener("click", () => {
		showList(list_of_words);
	});
}

function showSpinner() {
	section2.style.display = "none";
	spinner.style.display = "flex";
	error.style.display = "none";
	section2list.style.display = "none";
}

function hideSpinner() {
	section2.style.display = "flex";
	spinner.style.display = "none";
	error.style.display = "none";
	section2list.style.display = "none";
}

function showError() {
	section2.style.display = "none";
	spinner.style.display = "none";
	error.style.display = "flex";
	section2list.style.display = "none";
}

function showList(list: { word: string; percent: number }[]) {
	section2.style.display = "none";
	spinner.style.display = "none";
	error.style.display = "none";
	section2list.style.display = "block";

	let ul = document.createElement("ul");

	for (let item of list) {
		let li = document.createElement("li");
		
		let title = document.createElement("h3");
		title.innerText = item.word;

		let percent = document.createElement("p");
		percent.innerText = (item.percent * 100).toFixed(1) + "%";

		li.appendChild(title);
		li.appendChild(percent);
		ul.appendChild(li);
	}
	
	while (section2list.firstChild) {
		section2list.removeChild(section2list.firstChild);
	}

	section2list.appendChild(ul);
}

function showTip() {
	let tip = get_random_tip();
	let tipTitle = document.querySelector(".tipsName") as HTMLElement;
	let tipBody = document.querySelector(".tipsDescription") as HTMLElement;

	tipTitle.innerText = tip.title;
	tipBody.innerText = tip.body;
}

function getText() {
	let text: string[] = [];

	let result = contentQueries[0].result.replace(
		/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gm,
		""
	);

	// remove punctuation
	result = result.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

	for (let line of result.split("\n")) {
		line = line.trim();
    line = line.replace(/[^\w\s]/gi, "");

		if (line.split(" ").length > 5) {
			text.push(line);
		}
	}

	return text;
}

async function query_api(text: string[], url: string) {
	let text_to_send = text.slice(0, 100);	
	console.log(text_to_send);

	const audit = await Api.auditWebsite(text_to_send, url);

	if (!audit.success) {
		section2.style.display = "none";
	} else {
		section2.style.display = "flex";

		let assessment = audit.assessment.data.result.map((arr) => arr[0]);
		let sorted = assessment.sort((a, b) => a - b);
		let median = audit.assessment.data.median;

		console.log("median: " + median);
		console.log(
			"average: " +
				assessment.reduce((a, b) => a + b, 0) / assessment.length
		);
		console.log(sorted);

		let percent = (median * 100).toFixed(1);
		percentage.innerText = percent + "%";
		percentage_bar.style.width = percent + "%";

		if (median > 0.5 && median < 0.75) {
			setYellow();
		} else if (median > 0.75) {
			setRed();
		} else {
			setGreen();
		}

		if (audit.assessment.data.is_blacklisted) {
			percentage.innerText = "Blacklisted (" + percent + "%)";
			setRed();
		} else if (audit.assessment.data.is_whitelisted) {
			percentage.innerText = "Whitelisted (" + percent + "%)";
			setGreen();
		}
	}

	list_of_words = audit.assessment.data.percent_per_string;

	return audit.success;
}

function setGreen() {
	percentage_bar.style.backgroundColor = "#5EAD8F";
	percentage.style.color = "#5EAD8F";
	icon.setAttribute("src", "green.svg");

	bQuit.style.display = "none";
	bContinueGreen.style.display = "inline-block";
	bContinueRed.style.display = "none";
}

function setYellow() {
	percentage_bar.style.backgroundColor = "#FFC85E";
	percentage.style.color = "#FFC85E";
	icon.setAttribute("src", "yellow.svg");

	bQuit.style.display = "inline-block";
	bContinueGreen.style.display = "none";
	bContinueRed.style.display = "inline-block";
}

function setRed() {
	percentage_bar.style.backgroundColor = "#FF8086";
	percentage.style.color = "#FF8086";
	icon.setAttribute("src", "red.svg");

	bQuit.style.display = "inline-block";
	bContinueGreen.style.display = "none";
	bContinueRed.style.display = "inline-block";
}

