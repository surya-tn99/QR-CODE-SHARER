import QRCode from 'qrcode';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const encodedUrl = params.get('r');

  // Logic 1: Redirect Page
  if (window.location.pathname.includes('/redirect/') || encodedUrl) {
    handleRedirect(encodedUrl);
  }

  // Logic 2: Generator Page
  const generateBtn = document.getElementById('generateBtn');
  if (generateBtn) {
    generateBtn.addEventListener('click', generateQRCode);

    // Also trigger on Enter key
    document.getElementById('urlInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') generateQRCode();
    });
  }
});

function handleRedirect(encoded) {
  const statusText = document.getElementById('statusText');

  if (!encoded) {
    if (statusText) statusText.innerText = "ERROR: NO DATA FOUND";
    return;
  }

  try {
    const decodedUrl = atob(encoded);

    // Validate decoded URL just in case
    new URL(decodedUrl); // Will throw if invalid

    if (statusText) statusText.innerText = `TARGET: ${decodedUrl}`;

    setTimeout(() => {
      window.location.href = decodedUrl;
    }, 1500); // 1.5s delay for effect

  } catch (e) {
    if (statusText) statusText.innerText = "ERROR: INVALID DATA CORRUPTION";
    console.error(e);
  }
}

async function generateQRCode() {
  const urlInput = document.getElementById('urlInput');
  const qrContainer = document.getElementById('qrContainer');
  const rawUrl = urlInput.value.trim();

  // Basic Validation
  if (!rawUrl) {
    alert("INPUT REQUIRED");
    return;
  }

  try {
    // Ensure protocol exists
    let formattedUrl = rawUrl;
    if (!/^https?:\/\//i.test(rawUrl)) {
      formattedUrl = 'https://' + rawUrl;
    }

    // Validate URL
    new URL(formattedUrl);

    // Encode
    const encoded = btoa(formattedUrl);

    // Construct Redirect URL
    // User requested to force this to the production GitHub Pages URL
    const baseUrl = 'https://surya-tn99.github.io/QR-CODE-SHARER/redirect/';
    const finalLink = `${baseUrl}?r=${encoded}`;

    console.log("Target:", formattedUrl);
    console.log("Redirect Link:", finalLink);

    // Generate QR
    qrContainer.innerHTML = '';
    const canvas = document.createElement('canvas');
    qrContainer.appendChild(canvas);

    await QRCode.toCanvas(canvas, finalLink, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });

    // Text removed by user request

  } catch (err) {
    alert("INVALID PROTOCOL (URL)");
    console.error(err);
  }
}
