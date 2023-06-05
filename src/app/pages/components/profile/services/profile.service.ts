import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {apiUrl} from "../../../../services/api-url";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  getNumPosts(id_user: number): Observable<number> {
    const params = new HttpParams()
      .set('type', 'getNumPosts')
      .set('id_user', id_user)
    return this.http.get<number>(`${apiUrl}/profile.php`, {params});
  }

  getNumHobbies(id_user: number): Observable<number> {
    const params = new HttpParams()
      .set('type', 'getNumHobbies')
      .set('id_user', id_user)
    return this.http.get<number>(`${apiUrl}/profile.php`, {params});
  }

}
