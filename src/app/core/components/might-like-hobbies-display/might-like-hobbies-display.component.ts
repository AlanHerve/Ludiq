import { Component } from '@angular/core';
import {HobbiesService} from "../../../services/hobbies.service";
import {RequestDTO} from "../../../models/requestDTO";
import {HobbyDTO} from "../../../models/hobby-dto";

@Component({
  selector: 'app-might-like-hobbies-display',
  templateUrl: './might-like-hobbies-display.component.html',
  styleUrls: ['./might-like-hobbies-display.component.css']
})
export class MightLikeHobbiesDisplayComponent {

  requestDTO: RequestDTO = {
    function_to_call: "fetchAllHobbies"
  };

  requestDTO2: RequestDTO = {
    function_to_call: "fetchDisplayHobbies"
  };

  constructor(private hobbiesService: HobbiesService) {

  }

  fetchAllHobbies(){
    this.hobbiesService.fetchAllHobbies(this.requestDTO).subscribe({
      next: (response) => {
        // Traitement de la réponse du serveur en cas de succès
        response.hobbies.forEach(function (index: HobbyDTO){
          console.log(index);
        });


      },
      error: (error) => {
        // Gestion des erreurs en cas d'échec
        console.error('Hiccup occured', error);
      }
    })
  }

  fetchDisplayHobbies(){
    this.hobbiesService.fetchDisplayHobbies(this.requestDTO2).subscribe({
      next: (response) => {
        // Traitement de la réponse du serveur en cas de succès
        console.log("top");
        response.top_hobbies.forEach(function (index: HobbyDTO){
          console.log(index);
        });

        console.log("random");
        response.rand_hobbies.forEach(function (index: HobbyDTO){
          console.log(index);
        });


      },
      error: (error) => {
        // Gestion des erreurs en cas d'échec
        console.error('Hiccup occured', error);
      }
    })
  }

}
