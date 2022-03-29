export async function getCamera(video) {
    const camera = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: {
                ideal: 'environment',
            },
        },
        audio: false,
    })
    video.srcObject = camera
    await video.play()

    detectBarcode(video)
}

function detectBarcode(video) {
    const barcodeDetector = new BarcodeDetector({ formats: ['ean_13'] })

    window.setInterval(async () => {
        const barcodes = await barcodeDetector.detect(video)
        if (barcodes.length <= 0) {
            return
        } else {
            window.location.pathname = 'product/' + barcodes[0].rawValue

            const detailsEl = document.querySelector('.details')
            detailsEl.innerHTML = `
            <h1>Product info ophalen...</h1>
            <img src="../img/spinner.gif" />
            `
        }
    }, 1000)
}