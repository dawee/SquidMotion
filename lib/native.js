import fs from 'fs';

export const readFile = (file, callback) => {
  if (typeof file === 'string') {
    return fs.readFile(file, 'utf-8', callback);
  }

  var reader = new FileReader();

  reader.onload = function () {
    callback(reader.result);
  };

  reader.readAsText(file);
};


export const maximizeWindow = () => {
  if (typeof nw === 'undefined') return;

  nw.Window.get().setMaximumSize(0, 0);
  nw.Window.get().setMinimumSize(0, 0);
  nw.Window.get().maximize();
};

export const parseXML = (xmlString, rootTagName) => {
  if (typeof document ===  'undefined') return;

  var wrapper = document.createElement('div');

  wrapper.innerHTML = xmlString;
  return wrapper.getElementsByTagName(rootTagName)[0];
}