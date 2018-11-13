//Hide pagination links until user will send query
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn_prev").style.visibility = "hidden";
    document.getElementById("btn_current").style.visibility = "hidden";
    document.getElementById("btn_next").style.visibility = "hidden";
});

//Create fetcher instance
let fetcher = new Fetcher();

//Search function, fetches data and images if query are not spaces
function search() {
    if (document.getElementById("search").value.trim() === "") return;
    fetcher.fetch_data();
    fetcher.fetch_images();
}

//When user clicks on next page, this function handles his request
function nextPage() {
    fetcher.next_page();
    fetcher.fetch_data();
    fetcher.fetch_images();
}

//When user clicks on prev page, this function handles his request
function prevPage() {
    fetcher.prev_page();
    fetcher.fetch_data();
    fetcher.fetch_images();
}

