
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




// =============== 4th try here i add the mirror effect ==============
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const sequenceFolder = 'png/';
const imageFileExtension = '.png';
const numberOfFrames = 117; // Adjust this to the number of frames in your sequence.
let currentFrame = 1;
const frameRate = 24; // Frames per second (adjust this to slow down or speed up).

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
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.save();
        ctx.scale(-1, 1); // Mirror effect: Flip the video horizontally.
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        ctx.restore();
        
        const scaleFactor = 0.3;
        const hf = imgFront.height * scaleFactor;
        const wf = imgFront.width * scaleFactor;
        const hb = video.videoHeight;
        // const hb = imgBack.height;
        // const wb = imgBack.width;

        ctx.drawImage(imgFront, 0, hb - hf, wf, hf);

        // Load the next frame
        currentFrame = (currentFrame % numberOfFrames) + 1;

        // Calculate the delay in milliseconds based on frame rate.
        const delay = 1000 / frameRate;

        // Use setTimeout to slow down the sequence.
        // Use setTimeout to slow down the sequence.
        setTimeout(requestAnimationFrame(overlayImage), delay);
    };
}

startCamera().then(overlayImage);