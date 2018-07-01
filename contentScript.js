console.log('🐝 running contentscript.js');
window.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 68 && evt.metaKey) {
    evt.preventDefault();
    evt.stopPropagation();
    const selection = window.getSelection().toString();
    if (selection) getTranslation(selection);
  }
})

const displayTranslation = (translation) => {
  
}