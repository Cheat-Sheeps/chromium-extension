export class Tip {
	constructor(public title: string, public body: string) {}
}

const list_of_tips = [
	new Tip(
		"Keep software up-to-date",
		"Companies typically provide updates for 3 reasons: to add new features, fix known bugs, and upgrade security."
	),
	new Tip(
		"Use strong passwords",
		"A strong password is one that's either not easily guessed or not easily brute forced."
	),
	new Tip(
		"Use a password manager",
		"Password managers are a great way to store all your passwords in one place and generate strong passwords for you."
	),
	new Tip(
		"Don't reuse passwords",
		"If you reuse passwords, and one of your accounts is compromised, all your accounts are compromised."
	),
	new Tip(
		"Use 2FA",
		"2FA is a great way to add an extra layer of security to your accounts."
	),
	new Tip(
		"Use a VPN",
		"A VPN is a great way to protect your privacy online. It encrypts your internet traffic."
	),
	new Tip(
		"Use a firewall",
		"A firewall is a great way to protect your computer from malicious programs."
	),
	new Tip(
		"Use an ad blocker",
		"An ad blocker is a great way to protect your computer from malicious ads."
	),
	new Tip(
		"Use a spam filter",
		"A spam filter is a great way to protect your computer from spam."
	),
	new Tip(
		"Use a phishing filter",
		"A phishing filter is a great way to protect your computer from phishing."
	),
	new Tip(
		"Use a malware scanner",
		"A malware scanner is a great way to protect your computer from malware."
	),
];

export function get_random_tip() {
	return list_of_tips[Math.floor(Math.random() * list_of_tips.length)];
}
