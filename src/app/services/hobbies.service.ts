import {UserDTO} from "../models/user-dto";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {apiUrl} from "./api-url";
import {Injectable} from "@angular/core";
import {RegularPostDTO} from "../models/regular-post-dto";
import {HobbyDTO} from "../models/hobby-dto";
import {RequestDto} from "../models/request-dto";
import {HobbyRequestDto} from "../models/hobby-request-dto";
import {HobbyPostDto} from "../models/hobby-post-dto";
//import * as string_decoder from "string_decoder";

@Injectable({
  providedIn: 'root'
})
export class HobbiesService {

  constructor(private http: HttpClient) {}

  fetchAllHobbies(requestDTO: RequestDto): Observable<HobbyRequestDto> {
    //const function_to_call: string = "fetchALLHobbies";
    return this.http.post<HobbyRequestDto>(`${apiUrl}/hobbies.php`, requestDTO).pipe(
      map(response => {
        return response;
      })
    );
  }

  fetchDisplayHobbies(): Observable<HobbyRequestDto>{
    const params = new HttpParams()
      .set('function_to_call', "fetchDisplayHobbies");

    return this.http.get<HobbyRequestDto>(`${apiUrl}/hobbies.php`, {params}).pipe(
      map(response => {
        return response;
      })
    );
  }

  fetchHobbiesOfUser(requestDTO: RequestDto): Observable<HobbyRequestDto>{
    const params = new HttpParams()
      .set('function_to_call', "fetchHobbiesOfUser")
      .set('id_user', 2);
    return this.http.get<HobbyRequestDto>(`${apiUrl}/hobbies.php`, {params}).pipe(
      map(response => {
        return response;
      })
    );
  }

  fetchAvailableHobbiesOfUser() : Observable<HobbyRequestDto>{
    let requestDTO: RequestDto = {
      function_to_call: "fetchAvailableHobbiesOfUser",
      id_user: 2
    }

    const params = new HttpParams()
      .set('function_to_call', "fetchAvailableHobbiesOfUser")
      .set('id_user', 2);


    return this.http.get<HobbyRequestDto>(`${apiUrl}/hobbies.php`, {params}).pipe(
      map(response => {
        return response;
      })
    );
  }

  newHobbyPost(hobbypostDTO: HobbyPostDto) {
    let requestDTO: RequestDto = {
      function_to_call: "newHobbyPost",
      id_user: 2,
      hobbyPostDTO: hobbypostDTO
    };
    console.log("hey");
    return this.http.post<HobbyRequestDto>(`${apiUrl}/hobbies.php`, hobbypostDTO).pipe(
      map(response => {
        return response;
      })
    );
  }

}
