import {Observable, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {apiUrl} from "./urls";
import {Injectable} from "@angular/core";

import {HobbyRequestDTO} from "../models/hobby-request-dto";
import {HobbyDTO} from "../models/hobby-dto";
import {HobbyFlashcardDTO} from "../models/hobby-flashcard-dto";
import {UserDTO} from "../models/user-dto";

@Injectable({
  providedIn: 'root'
})
export class HobbyService {

  newPost!: HobbyFlashcardDTO;

  private messageSource = new Subject<number>();
  currentMessage = this.messageSource.asObservable();

  private needDelete = new Subject<number>();
  currentDeleteState = this.needDelete.asObservable();
  constructor(private http: HttpClient) {}

  getAllHobbies(): Observable<{hobbies: HobbyDTO[]}> {
    const params = new HttpParams()
      .set('function_to_call', "getAllHobbies");

    //const function_to_call: string = "fetchALLHobbies";
    return this.http.get<{hobbies: HobbyDTO[]}>(`${apiUrl}/hobbies.php`, {params}).pipe(
      map(response => {
        console.log(response);
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

        return response;
      })
    );
  }

  getHobbiesFlashcardsOfUser(id_user: number): Observable<HobbyFlashcardDTO[]>{
    const params = new HttpParams()
      .set('function_to_call', "getHobbiesFlashcardsOfUser")
      .set('id_user', id_user);

    return this.http.get<HobbyFlashcardDTO[]>(`${apiUrl}/hobbies.php`, {params}).pipe(

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
        return response;
      })
    );
  }

  getNewPost(){
    return this.newPost;
  }

  getHobbyById(id_hobby: number): Observable<HobbyDTO> {
    const params = new HttpParams()
      .set('function_to_call', "getHobbyById")
      .set('id_hobby', id_hobby);

    return this.http.get<HobbyDTO>(`${apiUrl}/hobbies.php`, {params}).pipe(
      map(response => {
        return response;
      })
    );
  }

  getHobbyUsers(id_hobby: number): Observable<UserDTO[]> {
    const params = new HttpParams()
      .set('function_to_call', "hobby_users")
      .set('id_hobby', id_hobby);
    return this.http.get<UserDTO[]>(`${apiUrl}/hobbies.php`, {params});
  }

  destroyHobbyPost(id_hobby_post: number){
    const params = new HttpParams()
      .set('function_to_call', "destroyHobbyPost")
      .set('id_hobby_post', id_hobby_post);
    return this.http.get<String>(`${apiUrl}/hobbies.php`, {params}).pipe(
      map(response => {
        this.needDelete.next(id_hobby_post);
        return response;
      })
    );
  }

  newHobbyPost(hobbyPostDTO: HobbyFlashcardDTO): Observable<{hobby: HobbyFlashcardDTO}> {
    return this.http.post<{hobby: HobbyFlashcardDTO}>(`${apiUrl}/hobbies.php`, hobbyPostDTO).pipe(
      map(response => {
        this.newPost = response.hobby;
        console.log(response);
        this.messageSource.next(hobbyPostDTO.id_hobby);
        return response;
      })
    );
  }

  findHobbyById(hobbyId: number): Observable<HobbyDTO> {
    const params = new HttpParams()
      .set('function_to_call', "findHobby")
      .set('id_hobby', hobbyId);
    return this.http.get<HobbyDTO>(`${apiUrl}/hobbies.php`, {params});
  }


  updateFavoriteHobby(userId: number, hobbyId: number): Observable<any> {
    const params = new HttpParams()
      .set('function_to_call', "updateFavoriteHobby")
      .set('id_user', userId.toString())
      .set('id_hobby', hobbyId.toString());

    return this.http.get<any>(`${apiUrl}/hobbies.php`, {params})
      .pipe(
        map(response => {
          return response;
        })
      );
  }


}
