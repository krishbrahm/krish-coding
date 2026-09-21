async function searchWikepedia() {
    const query = document.getElementById("searchbox").value.trim();
    const resultdiv = document.getElementById("results");
    if (query === "") {
        resultdiv.innerHTML = "Please enter a search term!";
        return;
    }
    resultdiv.innerHTML = "Loading... ";
    try {
        const response = await fetch(
            "https://en.wikipedia.org/api/rest_v1/page/summary/" +
            encodeURIComponent(query)
        );
        if (!response.ok) {
            throw new Error("Topic not found! Try another search result.");
        }
        const data = await response.json();
        let html = `<h2>${data.title} </h2> 
        <p>${data.extract} </p>`;
        if (data.thumbnail) {
            html += `<img src="${data.thumbnail.source}" 
            alt="${data.title}">`;
        }
        if (data.content_urls && data.content_urls.desktop) {
            html += `<p><a href="${data.content_urls.desktop.page}">Read more on wikipedia </a> </p>`;
        }
        resultdiv.innerHTML = html;
        console.log("Api Response", data);
    }
    catch (Error) {
        resultdiv.innerHTML = "Error! Could not find the topic.";
        console.error(Error);
    }
}
document.getElementById("searchbox").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchWikepedia();
    }
});