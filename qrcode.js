const form = document.querySelector("#Form");
const qrCode = document.querySelector("#qr-code");
// const fileName = document.getElementById('fileName');



// const url = fileName.innerText;
// const url2 = 'https://xri.com.bd/AR?q=1';
const url2 = 'https://arbooth.cyclic.cloud/image/625fea3c-c86b-414d-9bea-a2533c94527d'

function createQrCode(url){
    const qr = new QRCode(document.getElementById("qr-code"), {
          text: url,
          width: 300,
          height: 300,
        });

    console.log(qr);

}
createQrCode(url2);
