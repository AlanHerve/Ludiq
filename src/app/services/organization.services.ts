import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {apiUrl} from "./urls";
import {Injectable} from "@angular/core";
import {OrganizationDTO} from "../models/organization-dto";



@Injectable({
  providedIn: 'root'
})

export class OrganizationService {

 constructor(private http: HttpClient) {
 }
  getOrganzationById(organizationDTO: OrganizationDTO): Observable<{organization: OrganizationDTO}> {
    //const function_to_call: string = "fetchALLHobbies";
    const params = new HttpParams()
      .set('function_to_call', "getOrganzationById")
      .set('id_organization', organizationDTO.id_organization);
    return this.http.get<{organization: OrganizationDTO}>(`${apiUrl}/organization.php`, {params}).pipe(
      map(response => {
        console.log(response);
        return response;
      })
    );
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




}
