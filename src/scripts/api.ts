async function auditWebsite(pageContent: string){
    let response

    try {
        response = await fetch(
            "http://172.20.25.150:8000",
            {
                method: "post",
                body: pageContent,
            }
        )
    } catch(e) {
        return {
            success: false,
            assessment: null
        }
    }

    if (response.status != 200) {
        return {
            success: false,
            assessment: null
        }
    }

    return {
        success: true,
        assessment: response.body
    }
}

export { auditWebsite }