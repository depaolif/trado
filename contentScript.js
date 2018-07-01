console.log('🐝 running contentscript.js');
window.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 75 && evt.metaKey) {
    evt.preventDefault();
    evt.stopPropagation();
    const selection = window.getSelection().toString();
    if (selection) getTranslation(selection);
  }
})

const getTranslation = (selection) => {

}