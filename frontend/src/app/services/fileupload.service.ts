import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileuploadService {
  // base url
  // host = 'https://share-now-backend.vercel.app/';
  host = 'https://sharenow.onrender.com/';
  // host = 'http://localhost:3000/';
  uploadURL = `${this.host}api/files`;

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('myfile', file);

    const req = new HttpRequest('POST', `${this.uploadURL}`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.uploadURL}`);
  }
}
