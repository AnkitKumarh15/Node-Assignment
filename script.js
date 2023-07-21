async function shortenUrl(event) {
    event.preventDefault();
    const form = event.target;
    const longUrl = form.elements.longUrl.value;
  
    try {
      const response = await axios.post('/shorten', { destinationUrl: longUrl });
  
      if (response.status === 200) {
        const shortUrl = response.data.shortUrl;
        displayResult(shortUrl);
      } else {
        displayResult('Failed to shorten URL');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      displayResult('Failed to shorten URL');
    }
  }
  
  function displayResult(shortUrl) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>Shortened URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a></p>`;
  }
  
  const form = document.getElementById('urlShortenForm');
  form.addEventListener('submit', shortenUrl);
  