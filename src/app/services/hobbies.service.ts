import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {apiUrl} from "./api-url";
import {Injectable} from "@angular/core";

import {RequestDTO} from "../models/request-dto";
import {HobbyRequestDTO} from "../models/hobby-request-dto";
import {HobbyPostDTO} from "../models/hobby-post-dto";
import {HobbyDTO} from "../models/hobby-dto";

@Injectable({
  providedIn: 'root'
})
export class HobbiesService {

  constructor(private http: HttpClient) {}

  fetchAllHobbies(RequestDTO: RequestDTO): Observable<HobbyDTO[]> {
    //const function_to_call: string = "fetchALLHobbies";
    return this.http.post<HobbyDTO[]>(`${apiUrl}/hobbies.php`, RequestDTO).pipe(
      map(response => {
        return response;
      })
    );
  }


  fetchDisplayHobbies(): Observable<HobbyRequestDTO>{
    const params = new HttpParams()
      .set('function_to_call', "fetchDisplayHobbies");

    return this.http.get<HobbyRequestDTO>(`${apiUrl}/hobbies.php`, {params}).pipe(

      map(response => {
        return response;
      })
    );
  }


  fetchHobbiesOfUser(): Observable<HobbyDTO[]>{
    const params = new HttpParams()
      .set('function_to_call', "fetchHobbiesOfUser")
      .set('id_user', 2);
    return this.http.get<HobbyDTO[]>(`${apiUrl}/hobbies.php`, {params}).pipe(

      map(response => {
        return response;
      })
    );
  }

  fetchAvailableHobbiesOfUser() : Observable<HobbyDTO[]>{
    let RequestDTO: RequestDTO = {
      function_to_call: "fetchAvailableHobbiesOfUser",
      id_user: 2
    }
    const params = new HttpParams()
      .set('function_to_call', "fetchAvailableHobbiesOfUser")
      .set('id_user', 2);

    return this.http.get<HobbyDTO[]>(`${apiUrl}/hobbies.php`, {params}).pipe(
      map(response => {
        return response
      })
    );

    /*return this.http.get<HobbyRequestDTO>(`${apiUrl}/hobbies.php`, {params}).pipe(
      map(response => {
        return response.hobbies;
      })
    );*/
  }

  newHobbyPost(hobbyPostDTO: HobbyPostDTO) {
    let RequestDTO: RequestDTO = {
      function_to_call: "newHobbyPost",
      id_user: 2,
      HobbyPostDTO: hobbyPostDTO
    };

    console.log("hey");
    return this.http.post<HobbyRequestDTO>(`${apiUrl}/hobbies.php`, hobbyPostDTO).pipe(

      map(response => {
        return response;
      })
    );
  }

}
