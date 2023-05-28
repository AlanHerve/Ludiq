import { Component } from '@angular/core';
import {HobbiesService} from "../../../services/hobbies.service";
import {RequestDTO} from "../../../models/requestDTO";
import {HobbyDTO} from "../../../models/hobby-dto";

@Component({
  selector: 'app-might-like-hobbies-display',
  templateUrl: './might-like-hobbies-display.component.html',
  styleUrls: ['./might-like-hobbies-display.component.css']
})
/**
 * @requestDTO : request to fetch all hobbies
 * @requestDTO2 : request to fetch display hobbies
 */
export class MightLikeHobbiesDisplayComponent {

  // request to fetch all hobbies
  requestDTO: RequestDTO = {
    function_to_call: "fetchAllHobbies"
  };

  // request to fetch display hobbies
  requestDTO2: RequestDTO = {
    function_to_call: "fetchDisplayHobbies"
  };

  //Store top 3 hobbies
  top_hobbies: HobbyDTO[] = [];

  //store 3 random hobbies
  rand_hobbies: HobbyDTO[] = [];

  constructor(private hobbiesService: HobbiesService) {
    this.fetchDisplayHobbies();
  }

  fetchAllHobbies(){
    this.hobbiesService.fetchAllHobbies(this.requestDTO).subscribe({
      next: (response) => {
        // in case of success
        response.hobbies.forEach(function (index: HobbyDTO){
          console.log(index);
        });
      },
      error: (error) => {
        // in case of failure
        console.error('Could not get all hobbies', error);
      }
    })
  }
//TODO : display errors
  //fetch 3 top hobbies and 3 random hobbies
  fetchDisplayHobbies(){
    this.rand_hobbies.length = 0;
    this.top_hobbies.length = 0;
    this.hobbiesService.fetchDisplayHobbies(this.requestDTO2).subscribe({
      next: (response) => {
        // in case of success
        let i = 0
        if(response.hobbies.length > 3) {
          // could get top hobbies and some random hobbies
          for (i = 0; i < 3; i++) this.top_hobbies.push(response.hobbies[i]);
          for (i = 3; i < response.hobbies.length; i++) this.rand_hobbies.push(response.hobbies[i]);
        }else{
          // got less than 3 random hobbies
          for (i = 0; i < response.hobbies.length; i++) this.top_hobbies.push(response.hobbies[i]);
        }
      },
      error: (error) => {
        // in case of failure
        console.error('Could not get display hobbies', error);
      }
    })
  }

}
