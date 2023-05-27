import {UserDTO} from "../models/user-dto";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {apiUrl} from "./api-url";
import {Injectable} from "@angular/core";
import {RegularPostDTO} from "../models/regular-post-dto";
import {HobbyDTO} from "../models/hobby-dto";
import {RequestDTO} from "../models/requestDTO";
import {HobbyRequestDto} from "../models/hobby-request-dto";
//import * as string_decoder from "string_decoder";

@Injectable({
  providedIn: 'root'
})
export class HobbiesService {

  constructor(private http: HttpClient) {}

  fetchAllHobbies(requestDTO: RequestDTO): Observable<HobbyRequestDto> {
    //const function_to_call: string = "fetchALLHobbies";
    return this.http.post<HobbyRequestDto>(`${apiUrl}/hobbies.php`, requestDTO).pipe(
      map(response => {
        return response;
      })
    );
  }

  fetchDisplayHobbies(requestDTO: RequestDTO): Observable<HobbyRequestDto>{
    return this.http.post<HobbyRequestDto>(`${apiUrl}/hobbies.php`, requestDTO).pipe(
      map(response => {
        return response;
      })
    );
  }

}
