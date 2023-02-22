(async () => {
    try {
        var listNews = await axios.get('/news/list-news');
        listNews = listNews.data;
        const ulElement = document.querySelector("#list-news");

        listNews.forEach(function (news) {
            const liElement = document.createElement('li');
            liElement.innerHTML = `
                <h2>
                    <a href="chitiet.html?did=${news.id}" title="">${news.description}</a>
                </h2>
                <div class="item">
                    <p>${news.detail}</p>
                    <div class="clr"></div>
                </div>
            `;

            ulElement.appendChild(liElement);

        })
    } catch (error) {
        console.log('Lỗi ', error);
    }
})()