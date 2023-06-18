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

  //used to notify the frontend when a new hobby flashcard has been posted
  private messageNeedToAddHobby = new Subject<HobbyFlashcardDTO>();
  currentNeedToAddHobby = this.messageNeedToAddHobby.asObservable();

  //used to notify the frontend when a hobby flashcard has been deleted by the backend
  private needDelete = new Subject<number>();
  currentDeleteState = this.needDelete.asObservable();

  //used to notify the frontend to change the favorite hobby of a user
  private needChangeFavorite = new Subject<HobbyDTO>();
  currentNeedChangeFavorite = this.needChangeFavorite.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * get all available hobbies of the website
   * used for forms
   */
  getAllHobbies(): Observable<{hobbies: HobbyDTO[]}> {
    const params = new HttpParams()
      .set('function_to_call', "getAllHobbies");

    //const function_to_call: string = "fetchALLHobbies";
    return this.http.get<{hobbies: HobbyDTO[]}>(`${apiUrl}/hobbies.php`, {params}).pipe(
      map(response => {

        return response;

      })
    );
  }

  /**
   * fetch the 3 most popular hobbies on the website and 3 random hobbies
   * the 3 random hobbies can't be the same as the top 3
   */
  fetchDisplayHobbies(): Observable<HobbyRequestDTO>{
    const params = new HttpParams()
      .set('function_to_call', "fetchDisplayHobbies");

    return this.http.get<HobbyRequestDTO>(`${apiUrl}/hobbies.php`, {params}).pipe(

      map(response => {
        return response;
      })
    );
  }

  /**
   * fetch the hobby flashcards of a user
   * @param id_user
   */
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

  /**
   * get the hobbies a user can still add to his bio (a user can't have the same hobby more than once in his bio)
   * @param id_user
   */
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

  /**
   * get the name and image of a hobby
   * @param id_hobby
   */
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

  /**
   * get all users who partake in the hobby
   * @param id_hobby
   */
  getHobbyUsers(id_hobby: number): Observable<UserDTO[]> {
    const params = new HttpParams()
      .set('function_to_call', "hobby_users")
      .set('id_hobby', id_hobby);
    return this.http.get<UserDTO[]>(`${apiUrl}/hobbies.php`, {params});
  }

  /**
   * delete a hobby flashcard
   * @param id_hobby_post
   */
  destroyHobbyPost(id_hobby_post: number){
    const params = new HttpParams()
      .set('function_to_call', "destroyHobbyPost")
      .set('id_hobby_post', id_hobby_post);

    return this.http.get<String>(`${apiUrl}/hobbies.php`, {params}).pipe(
      map(response => {
        //notify the front end to delete the flashcard
        this.needDelete.next(id_hobby_post);
        return response;
      })
    );
  }

  /**
   * new hobby flashcard
   * @param hobbyPostDTO
   */
  newHobbyPost(hobbyPostDTO: HobbyFlashcardDTO): Observable<{hobby: HobbyFlashcardDTO}> {
    const params =  {
      type: 'newHobbyPost',
      hobbyPostDTO: hobbyPostDTO
    }
    return this.http.post<{hobby: HobbyFlashcardDTO}>(`${apiUrl}/hobbies.php`, params).pipe(
      map(response => {
        //notify the front end to add a flashcard
        this.messageNeedToAddHobby.next(response.hobby);
        return response;
      })
    );
  }

  /**
   * set the favorite hobby of a user
   * @param hobbyDTO: the hobby to set as favorite
   * @param id_user
   */
  setFavoriteHobby(hobbyDTO: number, id_user: number): Observable<HobbyDTO> {
    const params = {
      type: "setFavoriteHobby",
      hobbyDTO: hobbyDTO,
      id_user: id_user
    };
    console.log("logging");
    console.log(params.hobbyDTO);
    console.log("logged");
    return this.http.post<HobbyDTO>(`${apiUrl}/hobbies.php`, params).pipe(
      map(response => {
        //notify the front end to change the favorite hobby
        this.needChangeFavorite.next(response);
        return response;
      })
    );
  }
}
