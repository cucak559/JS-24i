document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn_prev").style.visibility = "hidden";
    document.getElementById("btn_current").style.visibility = "hidden";
    document.getElementById("btn_next").style.visibility = "hidden";
});

class Fetcher {
    constructor() {
        this.api_key = "AIzaSyBQ8ws0H0wGV4ebfxryzozGQvmI2RZtvlk";
        this.id = "010322573715000370992:czmt2iylhz8";
        this.endpoint = `https://www.googleapis.com/customsearch/v1?key=${this.api_key}&cx=${this.id}`;
        this.start = 1;
        this.page = 1;
        this.limit = 3;
    }

    display_next(){
        let next = document.getElementById("btn_next");
        next.style.visibility = "visible";
        next.text = this.page + 1;
    }

    display_current(){
        let current = document.getElementById("btn_current");
        current.style.visibility = "visible";
        current.text = this.page;
    }

    display_buttons(){
        this.display_prev();
        this.display_current();
        this.display_next();
    }

    display_prev(){
        if (this.start > this.limit) {
            let prev = document.getElementById("btn_prev");
            prev.style.visibility = "visible";
            prev.text = this.page - 1;

        } else {
            document.getElementById("btn_prev").style.visibility = "hidden";
        }
    }

    next_page() {
        this.start += this.limit;
        this.page += 1;
        this.display_buttons();
    }

    prev_page() {
        if (this.start > this.limit) {
            this.start -= this.limit;
            this.page -= 1;
            this.display_buttons();
        }
    }

    fetch_data() {
        document.getElementById("btn_next").style.visibility = "visible";
        document.getElementById("btn_current").style.visibility = "visible";

        let query = document.getElementById("search").value;
        const web_results = document.getElementsByClassName("web-results")[0];
        const endpoint = this.endpoint + `&q=${query}&start=${this.start}&num=${this.limit}`;

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

    fetch_images() {
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

function search() {
    fetcher.fetch_data();
    fetcher.fetch_images();
}

function nextPage() {
    fetcher.next_page();
    fetcher.fetch_data();
}

function prevPage() {
    fetcher.prev_page();
    fetcher.fetch_data();
}

function currentPage() {
    fetcher.prev_page();
    fetcher.fetch_data();
}


