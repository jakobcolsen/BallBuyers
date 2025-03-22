const imageField = document.getElementById('image');

imageField.addEventListener('change', (e) => {
    const file = e.target.files[0];

    if (file.size > 2 * 1024 * 1024) {
        alert("File too large: max size is 2MB");
        imageField.value = "";
    }
});