import { Component } from '@angular/core';
import {HobbiesService} from "../../../services/hobbies.service";
import {RequestDTO} from "../../../models/request-dto";
import {HobbyDTO} from "../../../models/hobby-dto";
import {HobbyCountDTO} from "../../../models/hobby-count-dto";

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


  // request to fetch display hobbies
  RequestDTO2: RequestDTO = {
    function_to_call: "fetchDisplayHobbies"
  };

  //Store top 3 hobbies
  top_hobbies: HobbyCountDTO[] = [];

  //store 3 random hobbies
  rand_hobbies: HobbyCountDTO[] = [];

  constructor(private hobbiesService: HobbiesService) {
    this.fetchDisplayHobbies();
  }


//TODO : display errors
  //fetch 3 top hobbies and 3 random hobbies
  fetchDisplayHobbies(){
    this.rand_hobbies.length = 0;
    this.top_hobbies.length = 0;
    this.hobbiesService.fetchDisplayHobbies(this.RequestDTO2).subscribe({
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
