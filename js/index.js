class Fetcher {
    constructor(){
        this.api_key = "AIzaSyBQ8ws0H0wGV4ebfxryzozGQvmI2RZtvlk";
        this.id = "010322573715000370992:czmt2iylhz8";
        this.endpoint = `https://www.googleapis.com/customsearch/v1?key=${this.api_key}&cx=${this.id}`;
    }
    fetch_data(){
        let query = document.getElementById("search").value;
        const web_results = document.getElementsByClassName("web-results")[0];
        const endpoint = this.endpoint + `&q=${query}`;

        let items = fetch(endpoint)
            .then(blob => blob.json())
            .then(data => {
                console.log(data);
                let items = data.items;
                web_results.innerHTML = "";
                items.forEach(item => {
                    let title = item.title;
                    let link = item.link;
                    let snippet = item.snippet;
                    let html = `<div class="web-item">
                                <h5 class="web-title">${item.htmlTitle}</h5>
                                <a class="web-link" href="${item.link}">${item.link}</a>
                                <p class="web-snippet">${item.snippet}</p>
                            </div>`;

                    web_results.innerHTML += html;
                });
            });
    }

    fetch_images(){
        let query = document.getElementById("search").value;

        const img_results = document.getElementsByClassName("img-results")[0];

        const endpoint = this.endpoint + `&q=${query}&searchType=image`;
        let items = fetch(endpoint)
            .then(blob => blob.json())
            .then(data => {
                console.log(data);
                let items = data.items;
                img_results.innerHTML = "";
                items.forEach(item => {
                    let image = item.image;
                    let link = image.thumbnailLink;
                    let full_img = item.link;

                    let html = `<a target="_blank" rel="noopener noreferrer" href="${full_img}"><img src="${link}"></a>`;

                    img_results.innerHTML += html;
                });
            });
    }
}

let fetcher = new Fetcher();

function search(fetcher) {
    fetcher.fetch_data();
    fetcher.fetch_images();
}

// function fetch_data() {
//     let query = document.getElementById("search").value;
//     const api_key = "AIzaSyBQ8ws0H0wGV4ebfxryzozGQvmI2RZtvlk";
//     const id = "010322573715000370992:czmt2iylhz8";
//
//     const web_results = document.getElementsByClassName("web-results")[0];
//
//     const endpoint = `https://www.googleapis.com/customsearch/v1?key=${api_key}&cx=${id}&q=${query}`;
//     let items = fetch(endpoint)
//         .then(blob => blob.json())
//         .then(data => {
//             console.log(data);
//             let items = data.items;
//             web_results.innerHTML = "";
//             items.forEach(item => {
//                 let title = item.title;
//                 let link = item.link;
//                 let snippet = item.snippet;
//                 let html = `<div class="web-item">
//                                 <h5 class="web-title">${item.htmlTitle}</h5>
//                                 <a class="web-link" href="${item.link}">${item.link}</a>
//                                 <p class="web-snippet">${item.snippet}</p>
//                             </div>`;
//
//                 web_results.innerHTML += html;
//             });
//
//         });
// }
//
// function fetch_images() {
//     let query = document.getElementById("search").value;
//     const api_key = "AIzaSyBQ8ws0H0wGV4ebfxryzozGQvmI2RZtvlk";
//     const id = "010322573715000370992:czmt2iylhz8";
//     const searchType = "image";
//
//     const img_results = document.getElementsByClassName("img-results")[0];
//
//     const endpoint = `https://www.googleapis.com/customsearch/v1?key=${api_key}&cx=${id}&q=${query}&searchType=${searchType}`;
//     let items = fetch(endpoint)
//         .then(blob => blob.json())
//         .then(data => {
//             console.log(data);
//             let items = data.items;
//             img_results.innerHTML = "";
//             items.forEach(item => {
//                 let image = item.image;
//                 let link = image.thumbnailLink;
//                 let full_img = item.link;
//
//                 let html = `<a target="_blank" rel="noopener noreferrer" href="${full_img}"><img src="${link}"></a>`;
//
//                 img_results.innerHTML += html;
//             });
//         });
// }



// let current_page = 1;
// let records_per_page = 2;
//
// let items = [];
//
// function prevPage() {
//     if (current_page > 1) {
//         current_page--;
//         changePage(current_page);
//     }
// }
//
// function nextPage() {
//     if (current_page < numPages()) {
//         current_page++;
//         changePage(current_page);
//     }
// }
//
// function changePage(page) {
//     let btn_next = document.getElementById("btn_next");
//     let btn_prev = document.getElementById("btn_prev");
//     let web_results = document.getElementById("w-results");
//     let page_span = document.getElementById("page");
//
//     // Validate page
//     if (page < 1) page = 1;
//     if (page > numPages()) page = numPages();
//
//     web_results.innerHTML = "";
//
//     for (let i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
//         web_results.innerHTML += objJson[i].adName + "<br>";
//     }
//     page_span.innerHTML = page;
//
//     if (page === 1) {
//         btn_prev.style.visibility = "hidden";
//     } else {
//         btn_prev.style.visibility = "visible";
//     }
//
//     if (page === numPages()) {
//         btn_next.style.visibility = "hidden";
//     } else {
//         btn_next.style.visibility = "visible";
//     }
// }
//
// function numPages() {
//     return Math.ceil(items.length / records_per_page);
// }
//
// window.onload = function () {
//     changePage(1);
// };