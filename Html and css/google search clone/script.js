function searchGoogle() {
    const query = document.getElementById("searchBox").value.trim();
    if (query === "") {
        alert("Please enter something to search. ");
        return;
    }
    const searchUrl = "https://www.google.com/search?q=" +
        encodeURIComponent(query);
    window.location.href = searchUrl;
}
document.getElementById("searchBox").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchGoogle();
    }
});
