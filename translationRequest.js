// MICROSOFT
// const path = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en';

// MICROSOFT TRANSLATOR
// const requestTranslation = async (text) => {
//   const requestBody = [{ Text: text }];
//   const headers = new Headers();
//   headers.append('Content-Type', 'application/json');
//   headers.append('Content-Length', text.length);
//   headers.append('Ocp-Apim-Subscription-Key', subscriptionKey);
//   const reply = await fetch(path, {
//     method,
//     headers,
//     body: JSON.stringify(requestBody)
//   })
//   .then((response) => response.json())
//   .then((response) => response[0].translations[0].text)
//   return reply;
// };

// Yandex
// https://translate.yandex.net/api/v1.5/tr.json/translate
//  ? key=<API key>
//  & text=<text to translate>
//  & lang=<translation direction>
//  & [format=<text format>]
//  & [options=<translation options>]
//  & [callback=<name of the callback function>]

const requestTranslation = async (text) => {
  validateText(text);
  text = encodeURI(text);
  const path = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
  const method = 'POST';
  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Content-Length', text.length);
  headers.append('Accept', '*/*');
  const finalPath = `${path}?key=${subscriptionKey}&text=${text}&lang=en`;
  const reply = await fetch(finalPath, {
    method,
    headers,
  })
  .then((response) => response.json())
  .then((response) => response.text[0]);
  return reply;
}

const validateText = (text) => {
  if (text.length > 20) throw new Error('Selection to be translated must be 20 characters or less');
}