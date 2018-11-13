//This class is used for fetching data and images, contains all information needed to create a request
class Fetcher {
    constructor() {
        this.api_key = "AIzaSyBQ8ws0H0wGV4ebfxryzozGQvmI2RZtvlk";
        this.id = "010322573715000370992:czmt2iylhz8";
        this.endpoint = `https://www.googleapis.com/customsearch/v1?key=${this.api_key}&cx=${this.id}`;
        this.start = 1;
        this.img_start = 1;
        this.page = 1;
        this.limit = 3;
        this.img_limit = 10;
    }

    //Displays next page link with number
    display_next() {
        let next = document.getElementById("btn_next");
        next.style.visibility = "visible";
        next.text = this.page + 1;
    }

    //Displays number of current page
    display_current() {
        let current = document.getElementById("btn_current");
        current.style.visibility = "visible";
        current.text = this.page;
    }

    //Displays next page link with number
    display_prev() {
        if (this.start > this.limit) {
            let prev = document.getElementById("btn_prev");
            prev.style.visibility = "visible";
            prev.text = this.page - 1;

        } else {
            document.getElementById("btn_prev").style.visibility = "hidden";
        }
    }

    //Wrapper for displaying pagination
    display_buttons() {
        this.display_prev();
        this.display_current();
        this.display_next();
    }

    //Sets next page
    next_page() {
        this.start += this.limit;
        this.img_start += this.img_limit;
        this.page += 1;
        this.display_buttons();
    }

    //Sets prev page
    prev_page() {
        if (this.start > this.limit) {
            this.start -= this.limit;
            this.img_start -= this.img_limit;
            this.page -= 1;
            this.display_buttons();
        }
    }

    //Fetches web results
    fetch_data() {
        //Displays pagination links, except prev because we might be on first page
        document.getElementById("btn_next").style.visibility = "visible";
        document.getElementById("btn_current").style.visibility = "visible";

        //Prepare a request and place for putting response data
        let query = document.getElementById("search").value;
        const web_results = document.getElementsByClassName("web-results")[0];
        const endpoint = this.endpoint + `&q=${query}&start=${this.start}&num=${this.limit}`;

       //Fetch data using Custom Search JSON API
        fetch(endpoint)
            .then(blob => blob.json())
            .catch(err => console.log(err))
            .then(data => {
                let items = data.items;
                //Reset web_results innerHtml
                web_results.innerHTML = "";
                //Populate web_results with images from response
                items.forEach(item => {
                    //Prepare information for displaying web result on website
                    let title = item.title;
                    let link = item.link;
                    let snippet = item.snippet;
                    let html = `<div class="web-item">
                                <h5 class="web-title">${item.htmlTitle}</h5>
                                <a class="web-link" href="${item.link}">${item.link}</a>
                                <p class="web-snippet">${item.snippet}</p>
                            </div>`;

                    //Displays web result on website
                    web_results.innerHTML += html;
                });
            }).catch(err => console.log(err));
    }

    //Fetches web images
    fetch_images() {
        //Prepare a request and place for putting response data
        let query = document.getElementById("search").value;
        const img_results = document.getElementsByClassName("img-results")[0];
        const endpoint = this.endpoint + `&q=${query}&start=${this.img_start}&num=${this.img_limit}&searchType=image`;

        //Fetch data using Custom Search JSON API
        fetch(endpoint)
            .then(blob => blob.json()).catch(err => console.log(err))
            .then(data => {
                let items = data.items;
                //Reset img_results innerHtml
                img_results.innerHTML = "";
                //Populate img_results with images from response
                items.forEach(item => {
                    //Prepare information for displaying image on website
                    let image = item.image;
                    let link = image.thumbnailLink;
                    let full_img = item.link;

                    let html = `<a target="_blank" rel="noopener noreferrer" href="${full_img}"><img src="${link}"></a>`;

                    //Displays img on website
                    img_results.innerHTML += html;
                });

            }).catch(err => console.log(err));
    }
}
