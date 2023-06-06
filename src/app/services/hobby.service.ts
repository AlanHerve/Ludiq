import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {apiUrl} from "./api-url";
import {Injectable} from "@angular/core";

import {RequestDTO} from "../models/request-dto";
import {HobbyRequestDTO} from "../models/hobby-request-dto";
import {HobbyDTO} from "../models/hobby-dto";
import {HobbyPostDTO} from "../models/hobby-post-dto";

@Injectable({
  providedIn: 'root'
})
export class HobbyService {

  newPost!: HobbyPostDTO;

  private messageSource = new BehaviorSubject('a');
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) {}

  getAllHobbies(RequestDTO: RequestDTO): Observable<HobbyDTO[]> {
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


  getHobbiesOfUser(id_user: number): Observable<HobbyDTO[]>{
    const params = new HttpParams()
      .set('function_to_call', "getHobbiesOfUser")
      .set('id_user', id_user);

    return this.http.get<HobbyDTO[]>(`${apiUrl}/hobbies.php`, {params}).pipe(

      map(response => {
        console.log(response)
        return response;
      })
    );
  }

  getHobbiesFlashcardsOfUser(id_user: number): Observable<{hobbies: HobbyPostDTO[]}>{
    const params = new HttpParams()
      .set('function_to_call', "getHobbiesFlashcardsOfUser")
      .set('id_user', id_user);

    return this.http.get<{hobbies: HobbyPostDTO[]}>(`${apiUrl}/hobbies.php`, {params}).pipe(

      map(response => {
        return response;
      })
    );
  }

  getAvailableHobbiesOfUser(id_user: number) : Observable<HobbyDTO[]>{
    const params = new HttpParams()
      .set('function_to_call', "fetchAvailableHobbiesOfUser")
      .set('id_user', id_user);

    return this.http.get<HobbyDTO[]>(`${apiUrl}/hobbies.php`, {params}).pipe(
      map(response => {
        console.log(response);
        return response;
      })
    );
  }

  getNewPost(){
    return this.newPost;
  }

  newHobbyPost(hobbyPostDTO: HobbyPostDTO) {
    return this.http.post<HobbyPostDTO>(`${apiUrl}/hobbies.php`, hobbyPostDTO).pipe(
      map(response => {
        this.newPost = response;
        return response;
      })
    );
  }

}
