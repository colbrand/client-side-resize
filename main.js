window.onload = function () {
    var preImg = document.getElementById('mainImg');
    var reader = new FileReader();
    var slider = document.getElementById('sizeSlider');
    var btn = document.getElementById('btnRes');

    var handler = document.getElementById('inputEle');

    handler.onchange = function () {
        var selectedFile = handler.files[0];

        reader.addEventListener('load', () => {
            preImg.src = reader.result;
            slider.oninput = function () {
                var prc = slider.value / 100;
                btn.innerHTML = prc + '%';
                reCreateImg(preImg, prc);
            };
        }, false);

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    }
};

function reCreateImg(src, prcSize) {
    console.log(prcSize);
    var img = new Image();
    img.src = src.src;

    img.addEventListener('load', (e) => {
        resize(img, prcSize);
    }, false);

}


function resize(img, prcSize) {
    var canvas = document.createElement('canvas');

    canvas.width = img.width * prcSize;
    canvas.height = img.height * prcSize;

    var ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    document.getElementById('preImg').src = canvas.toDataURL('image/jpeg');
}