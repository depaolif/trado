// Yandex
// https://translate.yandex.net/api/v1.5/tr.json/translate
//  ? key=<API key>
//  & text=<text to translate>
//  & lang=<translation direction>
//  & [format=<text format>]
//  & [options=<translation options>]
//  & [callback=<name of the callback function>]

const validateText = (text) => {
  if (text.length > 40) throw new Error('Selection to be translated must be 40 characters or less');
}

const getLanguage = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(
      { 'targetLanguage': 'en' },
      (result) => resolve(result.targetLanguage)
    );
  })
}

const requestTranslation = (text, lang) => {
  text = encodeURI(text);
  const path = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
  const method = 'POST';
  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Content-Length', text.length);
  headers.append('Accept', '*/*');
  const finalPath = `${path}?key=${subscriptionKey}&text=${text}&lang=${lang}`;
  const reply = fetch(finalPath, { method, headers })
  .then((response) => response.json())
  .then((response) => response.text[0]);
  return reply;
}

const translateText = async (text) => {
  validateText(text);
  const targetLang = await getLanguage();
  const translation = await requestTranslation(text, targetLang);
  return translation;
}

// 1. language at very top, loads with script and just keep checking if it's loaded. Only allow translateText to be used once lang has been defined
// 2. same as 1. except that the interval and lang constant live in translateText
// 3. put chrome.storage into a Promise inside translate Text; that promise only resolves once we have a result.translationText