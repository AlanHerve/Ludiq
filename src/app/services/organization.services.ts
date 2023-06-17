import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {apiUrl} from "./urls";
import {Injectable} from "@angular/core";
import {OrganizationDTO} from "../models/organization-dto";
import {PostDTO} from "../posts/models/post-dto";
import {ActivityDTO} from "../posts/models/activity-dto";



@Injectable({
  providedIn: 'root'
})

export class OrganizationService {

 constructor(private http: HttpClient) {
 }
  getOrganizationById(id: number): Observable<OrganizationDTO> {

    //const function_to_call: string = "fetchALLHobbies";
    const params = new HttpParams()
      .set('function_to_call', "getOrganizationById")
      .set('id_organization', id);
    return this.http.get<OrganizationDTO>(`${apiUrl}/organization.php`, {params});
  }

  fetchAllOrganizations(): Observable<{organizations: OrganizationDTO[]}>{
    const params = new HttpParams()
      .set('function_to_call', "fetchAllOrganizations");
    return this.http.get<{organizations: OrganizationDTO[]}>(`${apiUrl}/organization.php`, {params}).pipe(
      map(response => {
        return response;
      })
    );
  }
  fetchOrganizationPosts(id: number): Observable<PostDTO[]> {
   const params = new HttpParams()
     .set('function_to_call', "fetchOrganizationPosts")
     .set('id_organization', id);
   return this.http.get<PostDTO[]>(`${apiUrl}/organization.php`, {params});
  }

  fetchOrganizationActivities(id:number): Observable<ActivityDTO[]> {
   const params = new HttpParams()
     .set('function_to_call', "fetchOrganizationActivities")
     .set('id_organization', id);
   return this.http.get<ActivityDTO[]>(`${apiUrl}/organization.php`,{params});
  }



}
