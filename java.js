const qrinput = document.querySelector('#qr-input');
const qrimage = document.querySelector('#qr-img');
const qrbtn = document.querySelector('#qr-button');
const qrDownload = document.querySelector('#qr-download');
const qrShare = document.createElement('button'); // Create share button

qrShare.id = 'qr-share';
qrShare.textContent = 'Share QR Code';
document.querySelector('.qr-container').appendChild(qrShare); // Append share button to container

qrbtn.addEventListener('click', () => {
    const inputValue = qrinput.value;
    
    if (!inputValue) {
        alert("Please enter a valid input");
        return;
    } else {
        qrimage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputValue}`;
        qrimage.alt = `QR code for ${inputValue}`;
    }
});

qrDownload.addEventListener('click', () => {
    const qrImage = document.querySelector('#qr-img');
    if (qrImage.src) {
        const link = document.createElement('a');
        link.href = qrImage.src;
        link.download = 'qr-code.png';
        link.click();
    } else {
        alert('Please generate a QR code first.');
    }
});

qrShare.addEventListener('click', async () => {
    const qrImage = document.querySelector('#qr-img');
    if (qrImage.src) {
        try {
            const response = await fetch(qrImage.src);
            const blob = await response.blob();
            const file = new File([blob], 'qr-code.png', { type: blob.type });

            if (navigator.share) {
                await navigator.share({
                    title: 'QR Code',
                    text: 'Check out this QR code!',
                    files: [file]
                });
                alert('QR code shared successfully!');
            } else {
                alert('Web Share API is not supported in your browser.');
            }
        } catch (error) {
            console.error('Error sharing QR code:', error);
            alert('Failed to share QR code.');
        }
    } else {
        alert('Please generate a QR code first.');
    }
});
