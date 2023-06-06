import { HttpClient, HttpParams } from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {apiUrl} from "../../services/api-url";
import {UserDTO} from "../../models/user-dto";
import {HobbyDTO} from "../../models/hobby-dto";
import {ActivityDTO} from "../../posts/models/activity-dto";
import {PostDTO} from "../../posts/models/post-dto";


@Injectable({
  providedIn: "root"
})
export class SearchBarService {
  constructor(private http: HttpClient) {}

  search(searchType: string, searchTerm: string): Observable<any[]> {
    const params = new HttpParams()
      .set('searchType', searchType)
      .set('searchTerm', searchTerm);

    return this.http.get<any[]>(`${apiUrl}/search.php`, { params });
  }
  searchUser(user: string): Observable<UserDTO[]> {
    return this.search('user', user);
  }

  searchHobby(hobby: string): Observable<HobbyDTO[]> {
    return this.search('hobby', hobby);
  }

  searchPost(post: string): Observable<PostDTO[]> {
    return this.search('post', post);
  }

  searchActivity(activity: string): Observable<ActivityDTO[]> {
    return this.search('activity', activity);
  }

}
