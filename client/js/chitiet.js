const detailElement = document.querySelector("#detail");

const listNews = [
    {
        id: 1,
        description: 'Trung Quốc điều thêm 17 tàu đến khu vực giàn khoan',
        detail: `Để bảo vệ giàn khoan, Trung Quốc đã điều thêm 17 tàu các loại so với hôm trước, sẵn
        sàng đâm va vào tàu Việt Nam.`,
        catId: 1
    },
    {
        id: 2,
        description: 'Trọng tài - vết đen của kỳ World Cup sôi động',
        detail: `World Cup 2014 chưa đi hết lượt đầu vòng bảng nhưng các trọng tài đẳng cấp FIFA đã có
        tới bốn trận bị chỉ trích dữ dội.`,
        catId: 2
    },
    {
        id: 3,
        description: 'Những mỹ nhân Việt duyên dáng ở tuổi tứ tuần',
        detail: `Những mỹ nhân Việt duyên dáng, Trung Quốc đã điều thêm 17 tàu các loại so với hôm trước, sẵn
        sàng đâm va vào tàu Việt Nam.`,
        catId: 1
    },
    {
        id: 4,
        description: 'Chuyển nhượng 17/6: Arsenal mua Balotelli, tráo hàng Man Utd',
        detail: `Đội bóng thành London đang đẩy mạnh việc tuyển lựa những vị trí còn yếu trong đội
        hình ở cả ba tuyến.`,
        catId: 3
    },
    {
        id: 5,
        description: 'Chuyên gia Anh tin chắc vị trí MH370 rơi',
        detail: `Các chuyên gia thuộc công ty viễn thông Anh Inmarsat cho rằng họ xác định được vị trí
        chiếc máy bay MH370 đã rơi xuống trên Ấn Độ Dương, tuy nhiên đội.`,
        catId: 1
    }
]

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var dId = getParameterByName('did');

var newsById = listNews.filter(function (news) {
    return news.id == dId;
})

newsById.forEach(function (news) {
    detailElement.innerHTML = `
        <h3>${news.description}</h3>
        <div class="main-content">
            <p>${news.detail}</p>
        </div>
    `;

})