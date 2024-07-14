import { Component, Input, Output, EventEmitter } from '@angular/core';

interface ApiParam {
  key: string;
  value: string;
}

interface ApiHeader {
  key: string;
  value: string;
}

interface Api {
  method: string;
  url: string;
  params: ApiParam[];
  headers: ApiHeader[];
  body: string;
}

@Component({
  selector: 'app-add-api-form',
  templateUrl: './add-api-form.component.html',
  styleUrls: ['./add-api-form.component.css']
})
export class AddApiFormComponent {
  @Input() api: Api = { method: 'GET', url: '', params: [], headers: [], body: '' };
  @Input() index: number = 0;
  @Output() remove = new EventEmitter<number>();

  methods = ['GET', 'POST', 'PUT', 'DELETE'];

  addParam() {
    this.api.params.push({ key: '', value: '' });
  }

  removeParam(index: number) {
    this.api.params.splice(index, 1);
  }

  addHeader() {
    this.api.headers.push({ key: '', value: '' });
  }

  removeHeader(index: number) {
    this.api.headers.splice(index, 1);
  }

  sendRequest() {
    // Function to send the request
  }

  removeApi() {
    this.remove.emit(this.index);
  }
}
