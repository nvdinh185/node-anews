(async () => {
    try {
        function getParameterByName(name, url = window.location.href) {
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }

        var cId = getParameterByName('cid');

        var listDanhMuc = await axios.get('http://localhost:3000/news/cats');

        listDanhMuc = listDanhMuc.data;

        var listNewsByCat = await axios.get('http://localhost:3000/news/list-news-by-cat', {
            params: {
                cId: cId
            }
        });

        listNewsByCat = listNewsByCat.data;

        const ulElement = document.querySelector("#list-news-by-cat");

        listNewsByCat.forEach(function (news) {
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

        var catName = listDanhMuc.find(function (it) {
            return it.id == cId;
        }).name;

        var h3 = document.querySelector('#h3');

        h3.innerText = 'Tin tức :: ' + catName;
    } catch (error) {
        console.log('Lỗi ', error);
    }
})()