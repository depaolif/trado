// Initiate variables for Options.js
let languagesHash;
const select = document.getElementById('options-select');

// Get subscription key from Chrome Storage, then load list of languages
let subscriptionKey;
chrome.storage.sync.get('subscriptionKey', function(result) {
  subscriptionKey = result.subscriptionKey;
  getLanguages();
});

const requestOptions = async () => {
  // request list of languages from Yandex
  const path = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs';
  const method = 'POST';
  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Accept', '*/*');
  const finalPath = `${path}?key=${subscriptionKey}&ui=en`;
  const reply = await fetch(finalPath, {
    method,
    headers,
  })
  .then((response) => response.json())
  .then((response) => response.langs);
  return reply;
}

const getLanguages = async () => {
  // puts languages into select options
  languagesHash = await requestOptions();
  Object.keys(languagesHash).forEach(createLangNode);
  allowSave();
  // getLanguageButton.onclick = null;
}

const createLangNode = (lang) => {
  // creates a language node with value and language in English
  const langNode = document.createElement('option');
  langNode.value = lang;
  langNode.innerHTML = languagesHash[lang];
  select.appendChild(langNode);
}

const allowSave = () => {
  // creates save button to set language chosen from select to chrome.storage
  const saveButton = document.getElementById('set-language');
  saveButton.style.display = 'block';
  saveButton.onclick = setLanguage;
}

const setLanguage = () => {
  // sets target language to chrome storage
  const targetLanguage = select.value;
  chrome.storage.sync.set({ targetLanguage });
}
