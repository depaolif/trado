const path = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en';
const method = 'POST';

const requestTranslation = async (text) => {
  const requestBody = [{ Text: text }];
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Content-Length', text.length);
  headers.append('Ocp-Apim-Subscription-Key', subscriptionKey);
  const reply = await fetch(path, {
    method,
    headers,
    body: JSON.stringify(requestBody)
  })
  .then((response) => response.json())
  .then((response) => response[0].translations[0].text)
  return reply;
};