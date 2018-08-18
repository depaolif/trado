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

const requestTranslation = async (text, lang) => {
  console.log('🐝 in requesttranslation');
  text = encodeURI(text);
  const path = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
  const method = 'POST';
  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Content-Length', text.length);
  headers.append('Accept', '*/*');
  const finalPath = `${path}?key=${subscriptionKey}&text=${text}&lang=${lang}`;
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

const translateText = async (text) => {
  const translatePromise = new Promise((resolve) => {
    return getLanguage;
  })
  translatePromise.then((lang) => requestTranslation(text, lang))
  translatePromise.then((r) => console.log('🐝 r -- ', r));
  // validateText(text);
  // const langPromise = getLanguage;
  // langPromise.then((lang) => {
  //   console.log('🐝 got lang -- ', lang);
  //   return requestTranslation(text, lang)
  // });
  // langPromise.then((r) => console.log('🐝 again -- ', r))
}

const getLanguage = new Promise((resolve) => {
  chrome.storage.sync.get(
    { 'targetLanguage': 'en' },
    (result) => {
      console.log('🐝 result -- ', result);
      resolve(result.targetLanguage);
    }
  );
})

// 1. language at very top, loads with script and just keep checking if it's loaded. Only allow translateText to be used once lang has been defined
// 2. same as 1. except that the interval and lang constant live in translateText
// 3. put chrome.storage into a Promise inside translate Text; that promise only resolves once we have a result.translationText