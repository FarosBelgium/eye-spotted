import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Pipe({
  name: 'base64Image'
})
export class Base64ImagePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(base64: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + base64);
  }

}
