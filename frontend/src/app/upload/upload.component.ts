import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileuploadService } from '../services/fileupload.service';
import { Router } from '@angular/router';
import { SendurlService } from '../services/sendurl.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  errmsg = '';

  fileInfos?: Observable<any>;

  constructor(
    private uploadService: FileuploadService,
    private router: Router,
    private sendurl: SendurlService
  ) {}

  ngOnInit(): void {}

  // drag and drop files
  processing?: boolean;

  onDrag(event: any) {
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();

    this.onFileChange(event.dataTransfer.files);
  }

  onChange(event: any) {
    this.onFileChange(event.target.files);
  }

  private onFileChange(files: any) {
    this.processing = true;
    this.selectedFiles = files;
    setTimeout(() => {
      console.log('processed');
      this.processing = false;
    }, 1000);
  }

  // select file
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      console.log('file has been selected');
      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
              console.log(this.progress);
              // console.log(event.loaded);
            } else if (event instanceof HttpResponse) {
              console.log('this is file link', event.body.file);
              this.message = event.body.file;

              // this service will send the download link from the server
              // to child component of upload complete
              this.sendurl.link = this.message;
              this.router.navigate(['/', 'uploaded']);
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.errmsg = err.error.message;
            } else {
              this.errmsg = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          },
        });
      }

      this.selectedFiles = undefined;
    }
  }
}
