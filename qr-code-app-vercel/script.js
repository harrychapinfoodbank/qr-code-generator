async function generateQR() {
  const link = document.getElementById('linkInput').value;
  const resultDiv = document.getElementById('result');

  if (!link) {
    resultDiv.innerHTML = "<p style='color:red;'>Please enter a URL.</p>";
    return;
  }

  resultDiv.innerHTML = "<p>Generating QR code...</p>";

  try {
    const response = await fetch('/api/generate-qr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: link })
    });

    const data = await response.json();

    if (response.ok) {
      resultDiv.innerHTML = `
        <p><strong>Short URL:</strong> <a href="${data.short_url}" target="_blank">${data.short_url}</a></p>
        <img src="${data.qr_url}" alt="QR Code" />
      `;
    } else {
      resultDiv.innerHTML = `<p style='color:red;'>${data.error}</p>`;
    }
  } catch (err) {
    resultDiv.innerHTML = `<p style='color:red;'>${err.message}</p>`;
  }
}