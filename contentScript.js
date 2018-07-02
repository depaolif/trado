console.log('🐝 running contentscript.js');
const handleKeyPress = async (evt) => {
  if (evt.keyCode === 68 && evt.metaKey) {
    evt.preventDefault();
    evt.stopPropagation();
    const selection = window.getSelection();
    const originText = selection.toString();
    if (selection) {
      const translation = await getTranslation(originText);
      const selectionPosition = selection.getRangeAt(0).getBoundingClientRect();
      displayTranslation(translation, selectionPosition);
    };
  }
}

const displayTranslation = (translation, selectionPosition) => {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.style.left = `${selectionPosition.left}px`;
  popup.style.top = `${selectionPosition.top - 50}px`;
  popup.innerText = translation;
  document.body.appendChild(popup);
  
}

window.addEventListener('keydown', handleKeyPress);
