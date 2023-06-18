import {Component, Input} from '@angular/core';
import {HobbyService} from "../../../services/hobby.service";
import {HobbyDTO} from "../../../models/hobby-dto";

@Component({
  selector: 'app-user-hobbies-list',
  templateUrl: './user-hobbies-list.component.html',
  styleUrls: ['./user-hobbies-list.component.css']
})
export class UserHobbiesListComponent {

  @Input() id: number = 0;

  hobbies: HobbyDTO[] = [];



  constructor(private hobbyService: HobbyService) {

  }

  ngOnInit(){


    this.hobbyService.getHobbiesOfUser(this.id).subscribe({
      next: (response) => {
        // in case of success

        for(let i = 0; i < response.length; i++) this.hobbies.push(response[i]);
      },
      error: (error) => {
        // in case of failure
        console.error('Could not get user hobbies', error);
      }
    });
  }

}
