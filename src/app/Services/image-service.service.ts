import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  imageData:any;
  
  constructor() { }

  setImageData(data: string) {
    this.imageData = data;
  }

  getImageData(): string {
    return this.imageData;
  }
}
