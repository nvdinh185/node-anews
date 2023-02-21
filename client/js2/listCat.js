(async () => {
    try {
        const listCatElement = document.querySelector("#list-danhmuc");

        var listDanhMuc = await axios.get('/news/cats');

        listDanhMuc = listDanhMuc.data;

        listDanhMuc.forEach(function (news) {
            const liElement = document.createElement('li');
            liElement.innerHTML = `
                <a href="danhmuc.html?cid=${news.id}">${news.name}</a>
            `;

            listCatElement.appendChild(liElement);

        })
    } catch (error) {
        console.log('Lỗi ', error);
    }
})()