function requireNative(name) {
  let mod = null;

  try {
    mod = _require(name);
  } catch (err) {
    mod = null;
  }

  return mod;
}

const fs = requireNative('fs');
const electron = requireNative('electron');


exports.readFile = (file, callback) => {
  if (typeof file === 'string' && file.match(/^<svg>.*/)) {
    return callback(null, file);
  }

  if (typeof file === 'string' && file.match(/.*\.svg$/)) {
    return fs.readFile(file, 'utf-8', callback);
  }

  let reader = new FileReader();

  reader.onload = () => {
    callback(reader.result);
  };

  reader.readAsText(file);
};

exports.maximizeWindow = () => {
  if (electron === null) return;

  let win = electron.remote.getCurrentWindow();

  win.setResizable(true);
  win.maximize();
};
