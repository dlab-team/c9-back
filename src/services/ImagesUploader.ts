import fileUpload = require('express-fileupload');

export type ImagesFilesType = Array<fileUpload.UploadedFile> | fileUpload.UploadedFile

export class ImagesUploader {
  async uploadImages(imageFiles: ImagesFilesType): Promise<string[]> {
    const imagesFilesList = Array.isArray(imageFiles) ? imageFiles : [imageFiles];
    //Cambiar metodo por el servico de Azure
    return this.localSave(imagesFilesList);
  }

  private async localSave(imageFiles: fileUpload.UploadedFile[]) {
    const imagesUrl = imageFiles.map(file => {
      const fileName = `${Date.now()}${file.name}`;
      const path = `${__dirname}/../../public/files/images/${fileName}`;

      file.mv(path, err => {
        if (err) {
          console.error(err);
        }
      });

      return 'http://localhost:3000/public/images/' + fileName;
    });

    return imagesUrl;
  }
}
