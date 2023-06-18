import { HttpClient, HttpParams } from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {apiUrl} from "../../services/urls";
import {UserDTO} from "../../models/user-dto";
import {HobbyDTO} from "../../models/hobby-dto";
import {ActivityDTO} from "../../posts/models/activity-dto";
import {PostDTO} from "../../posts/models/post-dto";


@Injectable({
  providedIn: "root"
})
/**
 * Service that allows to search certain type of data to the backend for the search bar
 */
export class SearchBarService {
  constructor(private http: HttpClient) {}

  /**
   * Method that search to the backend the type of research and returns any type of object in relation to the search of the user
   * @param searchType
   * @param searchTerm
   */
  search(searchType: string, searchTerm: string): Observable<any[]> {
    const params = new HttpParams()
      .set('searchType', searchType)
      .set('searchTerm', searchTerm);

    return this.http.get<any[]>(`${apiUrl}/search.php`, { params });
  }

  /**
   * Method that search a user to the backend
   * @param user
   */
  searchUser(user: string): Observable<UserDTO[]> {
    return this.search('user', user);
  }

  /**
   * Method that search a hobby to the backend
   * @param hobby
   */
  searchHobby(hobby: string): Observable<HobbyDTO[]> {
    return this.search('hobby', hobby);
  }
  /**
   * Method that search a post to the backend
   * @param post
   */
  searchPost(post: string): Observable<PostDTO[]> {
    return this.search('post', post);
  }
  /**
   * Method that search an activity to the backend
   * @param activity
   */
  searchActivity(activity: string): Observable<ActivityDTO[]> {
    return this.search('activity-flashcard', activity);
  }

}
