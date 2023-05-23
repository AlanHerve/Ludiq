import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserDTO} from "../models/user-dto";
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "./api-url";

@Injectable({
  providedIn: "root"
})
export class SearchBarService {

  constructor(private http: HttpClient) {
  }
  searchUser(userInfo: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${apiUrl}`);
  }
}
