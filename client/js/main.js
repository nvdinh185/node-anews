(async () => {
    try {
        let listNews = await axios.get('/news/list-news');
        listNews = listNews.data;
        console.log("listNews : ", listNews);
    } catch (error) {
        console.log('Lỗi ', error);
    }
})()