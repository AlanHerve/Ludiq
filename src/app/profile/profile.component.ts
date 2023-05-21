import { Component } from '@angular/core';
import {FetchDataService} from "../fetch-data.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent{
  user: string[] = [];
  error = '';
  success = '';

  constructor(private fetchData: FetchDataService) {
  }

  ngOnInit(){
    this.initFetch();
  }

  initFetch() : void {
    this.fetchData.getAll().subscribe(
      (data: string[]) => {
        this.user = data;
        this.success = 'retrieved data';
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    )

    console.log('success '+this.success
               +'\nerrror' + this.success);
  }

}
