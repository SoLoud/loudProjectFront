import { Photo } from './Photo';

export class Contest {
  constructor(genericObj?: any) {

    for (let prop in genericObj) {
      if (this.hasOwnProperty(prop))
        if (prop == "examplePhotos" || prop == "productPhotos") {
          this[prop] = objArrayToPhotoArray(genericObj[prop]);
        }
        else if (prop == "requiredHashTags" || prop == "optionalHashTags") {
          if (!!genericObj[prop])
            this[prop] = genericObj[prop].split(',');
        }
        else if (prop == "createdAt" || prop == "endingAt") {
          this[prop] = new Date(genericObj[prop]);
        }
        else
          this[prop] = genericObj[prop];
    }

    function objArrayToPhotoArray(array: any[]): Photo[] {
      var returnValue = new Array<Photo>();

      for (let i = 0; i < array.length; i++) {
        let newPhoto = objToPhoto(array[i]);
        returnValue.push(newPhoto);
      }

      return returnValue;
    }

    function objToPhoto(obj: any): Photo {
      var returnValue = new Photo();

      for (let prop in obj)
        if (returnValue.hasOwnProperty(prop))
          returnValue[prop] = obj[prop];

      return returnValue;
    }
  }

  examplePhotos: Photo[] = [];
  productPhotos: Photo[] = [];
  title: string = null;
  description: string = null;
  createdAt: Date = null;
  endingAt: Date = null;
  category: number = null;
  requiredHashTags: string[] = [];
  optionalHashTags: string[] = [];
  id: string = null;
  userId: string = null;

  //Supress index signature 'any' type error
  [key: string]: string | Photo[] | Date | string[] | number;
}
