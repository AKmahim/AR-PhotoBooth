
// =========== first try with png overlay ====

// const video = document.getElementById('video');
// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// async function startCamera() {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         video.srcObject = stream;
//     } catch (error) {
//         console.error('Error accessing camera:', error);
//     }
// }

// function overlayImage() {
//     const imgBack = new Image();
//     imgBack.src = 'main.jpg';

//     const imgFront = new Image();
//     imgFront.src = 'watermark.png';

//     imgBack.onload = function () {
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;

//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
//         imgFront.onload = function () {
//             const scaleFactor = 0.2;
//             const hf = imgFront.height * scaleFactor;
//             const wf = imgFront.width * scaleFactor;
//             const hb = imgBack.height;
//             const wb = imgBack.width;

//             ctx.drawImage(imgFront, 0, hb - hf, wf, hf);

//             requestAnimationFrame(overlayImage);
//         };
//     };
// }

// startCamera().then(overlayImage);









// ==== 2nd try with png sequence but with fast frame rate =


// const video = document.getElementById('video');
// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// const sequenceFolder = 'png/';
// const imageFileExtension = '.png';
// const numberOfFrames = 117; // Adjust this to the number of frames in your sequence.
// let currentFrame = 1;

// async function startCamera() {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         video.srcObject = stream;
//     } catch (error) {
//         console.error('Error accessing camera:', error);
//     }
// }

// function overlayImage() {
//     const imgBack = new Image();
//     imgBack.src = 'main.jpg';

//     const imgFront = new Image();
//     imgFront.src = `${sequenceFolder}${currentFrame}${imageFileExtension}`;

//     imgBack.onload = function () {
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;

//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
//         imgFront.onload = function () {
//             const scaleFactor = 0.2;
//             const hf = imgFront.height * scaleFactor;
//             const wf = imgFront.width * scaleFactor;
//             const hb = imgBack.height;
//             const wb = imgBack.width;

//             ctx.drawImage(imgFront, 0, hb - hf, wf, hf);

//             // Load the next frame
//             currentFrame = (currentFrame % numberOfFrames) + 1;

//             requestAnimationFrame(overlayImage);
//         };
//     };
// }

// startCamera().then(overlayImage);

// ============================= 3th try here video Animation is working but i need mirror effect ======


// const video = document.getElementById('video');
// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// const sequenceFolder = 'png/';
// const imageFileExtension = '.png';
// const numberOfFrames = 117; // Adjust this to the number of frames in your sequence.
// let currentFrame = 1;
// const frameRate = 24; // Frames per second (adjust this to slow down or speed up).

// async function startCamera() {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         video.srcObject = stream;
//     } catch (error) {
//         console.error('Error accessing camera:', error);
//     }
// }

// function overlayImage() {
//     const imgBack = new Image();
//     imgBack.src = 'main.jpg';

//     const imgFront = new Image();
//     imgFront.src = `${sequenceFolder}${currentFrame}${imageFileExtension}`;

//     imgBack.onload = function () {
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;

//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
//         imgFront.onload = function () {
//             const scaleFactor = 0.5;
//             const hf = imgFront.height * scaleFactor;
//             const wf = imgFront.width * scaleFactor;
//             const hb = imgBack.height;
//             const wb = imgBack.width;

//             ctx.drawImage(imgFront, 0, hb - hf, wf, hf);

//             // Load the next frame
//             currentFrame = (currentFrame % numberOfFrames) + 1;

//             // Calculate the delay in milliseconds based on frame rate.
//             const delay = 1000 / frameRate;

//             // Use setTimeout to slow down the sequence.
//             setTimeout(requestAnimationFrame(overlayImage), delay);
            
//         };
//     };
// }

// startCamera().then(overlayImage);




// =============== 4th try here i add the mirror effect and user can download the picture with a button ==============
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const sequenceFolder = 'png/';
const imageFileExtension = '.png';
const numberOfFrames = 117; // Adjust this to the number of frames in your sequence.
let currentFrame = 1;
const frameRate = 24; // Frames per second (adjust this to slow down or speed up).


// Add an event listener for the capture button
const captureButton = document.getElementById('captureButton');
captureButton.addEventListener('click', captureAndDownload);



async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error('Error accessing camera:', error);
    }
}

function overlayImage() {
    // const imgBack = new Image();
    // imgBack.src = 'main.jpg';

    const imgFront = new Image();
    imgFront.src = `${sequenceFolder}${currentFrame}${imageFileExtension}`;

    imgFront.onload = function () {
        // canvas.width = video.videoWidth;
        // canvas.height = video.videoHeight;

        canvas.height = 700;
        canvas.width = 1024;


        ctx.save();
        ctx.scale(-1, 1); // Mirror effect: Flip the video horizontally.
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        ctx.restore();
        
        const scaleFactor = 0.8;
        const hf = imgFront.height * scaleFactor;
        const wf = imgFront.width * scaleFactor;
        const hb = video.videoHeight;
        // const hb = imgBack.height;
        // const wb = imgBack.width;

        ctx.drawImage(imgFront, -400,20, wf, hf);

        // Load the next frame
        currentFrame = (currentFrame % numberOfFrames) + 1;

        // Calculate the delay in milliseconds based on frame rate.
        const delay = 1000 / frameRate;

        // Use setTimeout to slow down the sequence.
        // Use setTimeout to slow down the sequence.
        setTimeout(requestAnimationFrame(overlayImage), delay);
    };
}

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

const qrCode = document.querySelector("#qr-code");
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

function uploadImage(file){
    // Create a FormData object and append the image file to it
    const formData = new FormData();
    formData.append('image', file);

    // Make a POST request to the API
    fetch('https://arbooth.cyclic.cloud/upload', {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to upload image');
        }
        })
        .then((data) => {
        // Handle the API response here
        console.log('Image upload successful:', data);
        })
        .catch((error) => {
        // Handle errors here
        console.error('Error uploading image:', error);
        });
}

function captureAndDownload() {
    // Capture the current content of the canvas
    // const capturedImage = new Image();
    
    const srcValue = canvas.toDataURL('image/jpeg'); // You can choose the desired image format (e.g., 'image/png', 'image/jpeg')
    // console.log(srcValue);
    // capturedImage.src = srcValue;
    
    // Create a download link for the captured image
    // const downloadLink = document.createElement('a');
    // downloadLink.href = capturedImage.src;
    // downloadLink.download = 'captured_image.jpg'; // Set the desired file name and extension

    // Simulate a click on the download link to trigger the download
    // downloadLink.click();
    var file = dataURLtoFile(srcValue, 'filename.jpg');
    console.log(file);
    uploadImage(file);
    
    
    
    //Usage example:
    // var base64String = "data:image/jpeg;base64,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"
    
}

startCamera().then(overlayImage);
