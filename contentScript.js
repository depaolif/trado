let popup;

// Set subscription key in storage to be accessed by Options.js
chrome.storage.sync.set({subscriptionKey});

const handleKeyPress = (evt) => {
  if (evt.keyCode === 68 && evt.metaKey) {
    evt.preventDefault();
    evt.stopPropagation();
    const selection = window.getSelection();
    const originText = selection.toString();
    if (originText) createTranslation(originText, selection);
  }
};

const createTranslation = async (originText, selection) => {
  const translation = await requestTranslation(originText);
  const selectionPosition = selection.getRangeAt(0).getBoundingClientRect();
  displayTranslation(translation, selectionPosition);
  window.addEventListener('click', handleClick);
  window.addEventListener('scroll', removeListeners);
};

const displayTranslation = (translation, selectionPosition) => {
  // create popup, text, and arrow elements, assigning respective css
  popup = document.createElement('div');
  popup.classList.add('trado-wrapper');
  const text = document.createElement('div');
  text.classList.add('trado-text');
  text.innerText = translation;
  const arrow = document.createElement('div');
  arrow.classList.add('trado-arrow');

  // calculate position
  const textLeftPos = selectionPosition.left;
  const textRightPos = selectionPosition.right;
  const textCenterPos = textLeftPos + ((textRightPos - textLeftPos) / 2);
  const wrapperCenterPos = textCenterPos - 50;

  popup.style.left = `${wrapperCenterPos}px`;
  popup.style.top = `${selectionPosition.top - 50}px`;

  // create html element node
  popup.appendChild(text);
  popup.appendChild(arrow);

  // append completed node to page
  document.body.appendChild(popup);
};

const handleClick = (evt) => {
  if (!evt.target.className.includes('trado')) removeListeners();
};

const removeListeners = () => {
  popup.remove();
  popup = null;
  window.removeEventListener('click', handleClick);
  window.removeEventListener('scroll', removeListeners);
};

window.addEventListener('keydown', handleKeyPress);
