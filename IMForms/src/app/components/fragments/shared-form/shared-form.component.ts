import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material'
import { ElementRef } from '@angular/core';
import { HttpClient } from '../../../services/HttpClient';

@Component({
  selector: 'app-shared-form',
  templateUrl: './shared-form.component.html',
  styleUrls: ['./shared-form.component.css']
})
export class SharedFormComponent {
  public query = '';
  public selected = [];
  public users = [];
  public filteredList = [];
  public elementRef;
  public component: any;
  public title;
  public formID;
  constructor( @Inject(MD_DIALOG_DATA) public data: any,
    private myElement: ElementRef,
    private httpClient: HttpClient) {
    this.title = data.title;
    this.elementRef = myElement;
    this.component = data.content.component;
    if (this.component === 0) {
      this.users = data.content.users;
      this.formID = data.content.formID;
    } else if (this.component === 1) {
      this.selected = data.content.users;
    } else if (this.component === 2) {
      this.users = data.content.users;
    }
  }
  filter() {
    if (this.query !== '') {
      this.filteredList = this.users.filter(function (el) {
        return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
      if (this.filteredList.length > 5) {
        this.filteredList.splice(5, this.filteredList.length - 3)
      }
    } else {
      this.filteredList = [];
    }
  }

  select(item) {
    if (this.selected.indexOf(item) === -1) {
      this.selected.push(item);
      this.users.splice(this.users.indexOf(item), 1);
    }
    this.query = '';
    this.filteredList = [];
  }
  remove(item) {
    this.users.push(item);
    this.selected.splice(this.selected.indexOf(item), 1);
  }
  share(data, subject) {
    const url = 'users/shared/' + this.formID;
    this.httpClient.Post(url, { 'users': this.selected, 'message': data, 'subject': subject }).subscribe((response) => { });
  }

  send(data, subject) {
    const url = 'users/sendMessage/';
    this.httpClient.Post(url, { 'users': this.selected, 'message': data, 'subject': subject }).subscribe((response) => { });
  }
}
