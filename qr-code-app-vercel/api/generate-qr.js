export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Only POST allowed' });
  }

  const { url } = req.body;

  const response = await fetch('https://me-qr.com/api/qr', {
    method: 'POST',
    headers: {
      Authorization: `Bearer 4230495c8a668fe740c987ee91c92046a883be139efed8ca38aefaaeed685557`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: url,
      title: 'Generated via Form',
      design: {
        type: 'standard',
        color: '#000000'
      }
    })
  });

  const data = await response.json();

  if (response.ok) {
    res.status(200).json({
      short_url: data.short_url,
      qr_url: data.qr_png
    });
  } else {
    res.status(500).json({ error: data.message || 'Failed to generate QR code' });
  }
}