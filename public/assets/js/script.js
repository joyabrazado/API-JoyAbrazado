// API KEY
const apiKey = 'tBQx6CdSjb7gp9Phm2zA8hJ46rei4jrXM54ksp4B';

document.addEventListener('DOMContentLoaded', (event) => {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('max', today);
});

async function fetchAPOD() {
    const date = document.getElementById('date').value;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayAPOD(data);
    } catch (error) {
        console.error('Error fetching the APOD:', error);
    }
}

function displayAPOD(data) {
    const title = document.getElementById('title');
    const image = document.getElementById('image');
    const video = document.getElementById('video');
    const description = document.getElementById('description');

    title.textContent = data.title;
    description.textContent = data.explanation;

    if (data.media_type === 'image') {
        image.src = data.url;
        image.style.display = 'block';
        video.style.display = 'none';
    } else if (data.media_type === 'video') {
        video.src = data.url;
        video.style.display = 'block';
        image.style.display = 'none';
    }
}