import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {apiUrl} from "./api-url";
import {Injectable} from "@angular/core";

import {RequestDTO} from "../models/request-dto";
import {HobbyRequestDTO} from "../models/hobby-request-dto";
import {HobbyPostDTO} from "../models/hobby-post-dto";

@Injectable({
  providedIn: 'root'
})
export class HobbiesService {

  constructor(private http: HttpClient) {}

  fetchAllHobbies(RequestDTO: RequestDTO): Observable<HobbyRequestDTO> {
    //const function_to_call: string = "fetchALLHobbies";
    return this.http.post<HobbyRequestDTO>(`${apiUrl}/hobbies.php`, RequestDTO).pipe(
      map(response => {
        return response;
      })
    );
  }

  fetchDisplayHobbies(RequestDTO: RequestDTO): Observable<HobbyRequestDTO>{
    return this.http.post<HobbyRequestDTO>(`${apiUrl}/hobbies.php`, RequestDTO).pipe(
      map(response => {
        return response;
      })
    );
  }

  fetchHobbiesOfUser(RequestDTO: RequestDTO): Observable<HobbyRequestDTO>{
    return this.http.post<HobbyRequestDTO>(`${apiUrl}/hobbies.php`, RequestDTO).pipe(
      map(response => {
        return response;
      })
    );
  }

  fetchAvailableHobbiesOfUser() : Observable<HobbyRequestDTO>{
    let RequestDTO: RequestDTO = {
      function_to_call: "fetchAvailableHobbiesOfUser",
      id_user: 2
    }

    return this.http.post<HobbyRequestDTO>(`${apiUrl}/hobbies.php`, RequestDTO).pipe(
      map(response => {
        return response;
      })
    );
  }

  newHobbyPost(HobbyPostDTO: HobbyPostDTO) {
    let RequestDTO: RequestDTO = {
      function_to_call: "newHobbyPost",
      id_user: 2,
      HobbyPostDTO: HobbyPostDTO
    };
    console.log("hey");
    return this.http.post<HobbyRequestDTO>(`${apiUrl}/hobbies.php`, RequestDTO).pipe(
      map(response => {
        return response;
      })
    );
  }

}
