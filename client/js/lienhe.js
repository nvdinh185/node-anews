var myname = document.querySelector('input[name="name"]');
var phone = document.querySelector('input[name="phone"]');
var web = document.querySelector('input[name="web"]');
var gender = document.querySelector('select[name="gender"]');
var picture = document.querySelector('input[name="picture"]');
var content = document.querySelector('textarea[name="content"]');

var form = document.forms.form;

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    var arrPicStr = picture.value.split("\\");
    var contact = {
        name: myname.value,
        phone: phone.value,
        web: web.value,
        gender: gender.value,
        picture: arrPicStr[arrPicStr.length - 1],
        content: content.value
    }

    let inserted = await axios.post('/news/save-contact', contact);
    inserted = inserted.data;
    console.log("inserted: ", inserted);
})