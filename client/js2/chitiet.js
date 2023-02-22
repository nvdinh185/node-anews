(async () => {
    try {
        const detailElement = document.querySelector("#detail");

        function getParameterByName(name, url = window.location.href) {
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }

        var dId = getParameterByName('did');

        var newsById = await axios.get('/news/detail', {
            params: {
                dId: dId
            }
        });

        newsById = newsById.data;

        detailElement.innerHTML = `
            <h3>${newsById.description}</h3>
            <div class="main-content">
                <p>${newsById.detail}</p>
            </div>
        `;
    } catch (error) {
        console.log('Lỗi ', error);
    }
})()