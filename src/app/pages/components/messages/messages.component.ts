import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserDTO} from "../../../models/user-dto";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  friend!: UserDTO;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const id_number = parseInt(id, 10);
        this.userService.findUserById(id_number).subscribe({
          next: response => {
            console.log('success:', response);
            this.friend = response;
          },
          error: error => {
            console.log('error:', error);
          }
        });
      }
    });
  }

}
