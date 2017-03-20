import { SoloudFile } from './SoloudFile';

export class Photo extends SoloudFile {
  url: string = null;

  //Supress index signature 'any' type error
  [key: string]: string | Uint8Array;
}
