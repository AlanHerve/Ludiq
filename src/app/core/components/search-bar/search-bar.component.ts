import {Component, OnInit} from '@angular/core';
import {SearchBarService} from "../../services/search-bar.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchUserChecked = false;
  searchHobbyChecked = false;
  searchActivityChecked = false;
  constructor(private searchBarService: SearchBarService) {}

  ngOnInit(): void {
    const textarea = document.querySelector('.explorer') as HTMLTextAreaElement;
    const menu = document.querySelector('.menu') as HTMLElement;

    textarea.addEventListener('input', () => {
      if (textarea.value.trim() !== '') {
        console.log("Writing on explorer !!");
        // Ajouter une classe pour activer l'animation d'ouverture du menu
        menu.classList.add('open');
      } else {
        // Supprimer la classe pour désactiver l'animation d'ouverture du menu
        menu.classList.remove('open');
      }
    });
  }

  onSearch(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value;
    if(this.searchUserChecked) {
      this.onUserClicked(searchText);
    }
    if(this.searchHobbyChecked) {
      this.onHobbyClicked(searchText);
    }
  }

  onUserClicked(searchText: string): void {
    this.searchBarService.searchUser(searchText).subscribe(response => {

    });
  }

  onHobbyClicked(searchText: string): void {
    this.searchBarService.searchHobby(searchText).subscribe(response => {

    });
  }

  onActivityClicked(searchText: string): void {
    this.searchBarService.searchActivity(searchText).subscribe(response => {

    });
  }
}

