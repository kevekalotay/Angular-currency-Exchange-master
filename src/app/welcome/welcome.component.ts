import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],

})
export class WelcomeComponent implements OnInit {

  private user;

  constructor() {}

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
  }

  ngOnInit() {
  }

}
