import { getCamera } from './barcodeDetector.js'

// Add service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../serviceWorker.js')
}

// Check if Barcode Detector is available, get camera on pages with video element
// Else, show no detector error
if (document.querySelector('video')) {
    const videoEl = document.querySelector('video')
    if ('BarcodeDetector' in window) {
        videoEl.style.display = 'block'
        getCamera(videoEl)
    }
}

// Add open/close function for detail pages
if (document.querySelector('.result')) {
    document.querySelector('.result').addEventListener('click', toggleDetails)
}

function toggleDetails() {
    this.classList.toggle('open')
}
