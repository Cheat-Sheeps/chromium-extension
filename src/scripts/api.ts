async function auditWebsite(pageContent: string[], url: string) {
	let response;

	try {
		let body = JSON.stringify({
			words: pageContent,
			url: url,
		});

		response = await fetch("http://127.0.0.1:8000/predict", {
			method: "post",
			body,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (e) {
		console.log(e);

		return {
			success: false,
			assessment: null,
			url: null,
		};
	}

	if (response.status != 200) {
		console.log(response.status);
		return {
			success: false,
			assessment: null,
			url: null,
		};
	}

	let json = await response.json();

    console.log(json);

	return {
		success: true,
		assessment: json as {
            data: {
                result: number[][];
                is_phishing: boolean;
                is_blacklisted: boolean;
				is_whitelisted: boolean;
				median: number;
				percent_per_string: {
					word: string;
					percent: number;
				}[];
            }
        },
		url: url,
	};
}

export { auditWebsite };
