//get the element 

const btn = document.getElementById('btn');
const frontPage = document.getElementById('frontPage');
const videoSection = document.getElementById('video_section');
const countdown = document.getElementById("countdown1");





btn.addEventListener('click',()=>{
    frontPage.style.display = 'none';
    videoSection.classList.remove('hidden');


    let counter = 10;

    function updateCounter() {
      counter -= 1;
      countdown.style.cssText = `--value: ${counter}`
    }


    const intervalId = setInterval(updateCounter, 1000);

    

    function stopCounter() {
      clearInterval(intervalId);
      console.log("Counter stopped.");
      captureAndDownload()
    }
    setTimeout(stopCounter,10000);


});



