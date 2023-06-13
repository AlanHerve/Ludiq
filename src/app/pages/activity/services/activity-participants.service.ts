import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ActivityParticipantsService {
  constructor(private http: HttpClient) {
  }

  registerUser(userId: number) {

  }
}
