var form = document.forms.form;

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData();
    for (const el of e.target) {
        if (el.files) {
            formData.append("file", el.files[0]);
        } else if (el.value) {
            formData.append(el.name, el.value);
        }
    }

    var results = await axios({
        method: "POST",
        url: "http://localhost:3000/news/save-contact",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    });

    //handle success
    console.log('results: ', results);
})