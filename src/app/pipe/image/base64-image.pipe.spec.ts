import {Base64ImagePipe} from './base64-image.pipe';
import {DomSanitizer} from "@angular/platform-browser";
import {TestBed} from "@angular/core/testing";

describe('Base64ImagePipe', () => {
  it('create an instance', () => {
    const sanitizer = TestBed.inject(DomSanitizer)
    const pipe = new Base64ImagePipe(sanitizer);
    expect(pipe).toBeTruthy();
  });
});
