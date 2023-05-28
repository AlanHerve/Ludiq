import {Component, Input} from '@angular/core';
import {HobbiesService} from "../../../services/hobbies.service";
import {RequestDTO} from "../../../models/requestDTO";
import {HobbyDTO} from "../../../models/hobby-dto";

@Component({
  selector: 'app-user-hobbies-list',
  templateUrl: './user-hobbies-list.component.html',
  styleUrls: ['./user-hobbies-list.component.css']
})
export class UserHobbiesListComponent {

  @Input() id: number = 0;

  hobbies: HobbyDTO[] = [];

  requestDTO : RequestDTO = {
    function_to_call: "fetchHobbiesOfUser",
    id_user: 0
  };

  constructor(private hobbyService: HobbiesService) {

  }

  ngOnInit(){
    console.log(this.id);
    //this.requestDTO.id_user = this.id
    this.requestDTO.id_user = this.id;
    console.log(this.requestDTO.id_user);
    this.hobbyService.fetchHobbiesOfUser(this.requestDTO).subscribe({
      next: (response) => {
        // in case of success

        for(let i = 0; i < response.hobbies.length; i++) this.hobbies.push(response.hobbies[i]);
        /*response.hobbies.forEach(function(value){
          console.log(value);
        })*/
      },
      error: (error) => {
        // in case of failure
        console.error('Could not get display hobbies', error);
      }
    });
  }

}
