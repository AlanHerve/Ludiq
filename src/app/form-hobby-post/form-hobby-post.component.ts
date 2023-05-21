import { Component } from '@angular/core';

@Component({
  selector: 'app-form-hobby-post',
  templateUrl: './form-hobby-post.component.html',
  styleUrls: ['./form-hobby-post.component.css']
})
export class FormHobbyPostComponent {

  hobbies : string[] = ["potterie", "dessin", "velo", "marche"];

  selection!: string;

  submitted() {
    console.log("selection: " + this.selection);
  }
}
