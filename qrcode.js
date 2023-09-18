const form = document.querySelector("#Form");
const qrCode = document.querySelector("#qr-code");
// const fileName = document.getElementById('fileName');



// const url = fileName.innerText;
const url = 'Mahim';

function createQrCode(url){
    const qr = new QRCode(document.getElementById("qr-code"), {
          text: url,
          width: 300,
          height: 300,
        });

    console.log(qr);

}
createQrCode(url);

