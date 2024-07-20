let fs, path;

if (typeof window === 'undefined') {
  import('fs').then(fsModule => {
    fs = fsModule.default || fsModule;
  });

  import('path').then(pathModule => {
    path = pathModule.default || pathModule;
  });
}

class Helper {

    fileUploadMiddleware(formData,filePath) {
    if (typeof window === 'undefined') {

        const fileStream = fs.createReadStream(filePath);
        const fileName = path.basename(filePath);

        formData.append('upfile', fileStream, { filename: fileName, contentType: 'image/png' });
      } else {

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.name = 'upfile';
        fileInput.files[0] = filePath;

        formData.append('upfile', fileInput.files[0]);
      }
    }

    addParamsInURL(url,options) {
        if (options && options.walletId) {
            url = url + '?walletID=' + options.walletId
        };
        return url
    }
}

export default new Helper();