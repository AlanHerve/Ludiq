import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {apiUrl} from "../../../../services/api-url";
import {ProfileDTO} from "../models/profile-dto";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  getProfileInformation(id_user: number): Observable<ProfileDTO> {
    const params = new HttpParams()
      .set('id_user', id_user)
    return this.http.get<ProfileDTO>(`${apiUrl}/profile.php`, {params});
  }


}
