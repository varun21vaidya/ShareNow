import { Component, OnInit, Input } from '@angular/core';
import { SendurlService } from '../services/sendurl.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css'],
})
export class CompletedComponent implements OnInit {
  constructor(private geturl: SendurlService) {}
  link = this.geturl.link;
  ngOnInit(): void {}
  /* To copy Text from Textbox */
  copyInputMessage(inputElement: any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
