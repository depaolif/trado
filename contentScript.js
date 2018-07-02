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
  // create popup, text, and arrow elements, assigning respective css
  const popup = document.createElement('div');
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
}

window.addEventListener('keydown', handleKeyPress);
