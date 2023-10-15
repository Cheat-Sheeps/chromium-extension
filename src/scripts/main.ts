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
}

function showSpinner() {
	section2.style.display = "none";
	spinner.style.display = "flex";
	error.style.display = "none";
}

function hideSpinner() {
	section2.style.display = "flex";
	spinner.style.display = "none";
	error.style.display = "none";
}

function showError() {
	section2.style.display = "none";
	spinner.style.display = "none";
	error.style.display = "flex";
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
	console.log(text);
	const audit = await Api.auditWebsite(text, url);

	if (!audit.success) {
		section2.style.display = "none";
	} else {
		section2.style.display = "flex";

		let assessment = audit.assessment.data.result.map((arr) => arr[0]);

		let median = 0;
		let sorted = assessment.sort((a, b) => a - b);
		let len = sorted.length;
		if (len % 2 === 0) {
			median = (sorted[len / 2 - 1] + sorted[len / 2]) / 2;
		} else {
			median = sorted[(len - 1) / 2];
		}

		console.log("median: " + median);
		console.log(
			"average: " +
				assessment.reduce((a, b) => a + b, 0) / assessment.length
		);
		console.log(assessment);

		let percent = (median * 100).toFixed(1);
		percentage.innerText = percent + "%";
		percentage_bar.style.width = percent + "%";

		if (median > 0.5 && median < 0.75) {
			percentage_bar.style.backgroundColor = "#FFC85E";
			percentage.style.color = "#FFC85E";
			icon.setAttribute("src", "yellow.svg");

			bQuit.style.display = "inline-block";
			bContinueGreen.style.display = "none";
			bContinueRed.style.display = "inline-block";
		} else if (median > 0.75) {
			percentage_bar.style.backgroundColor = "#FF8086";
			percentage.style.color = "#FF8086";
			icon.setAttribute("src", "red.svg");

			bQuit.style.display = "inline-block";
			bContinueGreen.style.display = "none";
			bContinueRed.style.display = "inline-block";
		} else {
			percentage_bar.style.backgroundColor = "#5EAD8F";
			percentage.style.color = "#5EAD8F";
			icon.setAttribute("src", "green.svg");

			bQuit.style.display = "none";
			bContinueGreen.style.display = "inline-block";
			bContinueRed.style.display = "none";
		}
	}

	return audit.success;
}
