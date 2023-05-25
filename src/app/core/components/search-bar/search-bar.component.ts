import {Component, OnInit} from '@angular/core';
import {SearchBarService} from "../../services/search-bar.service";
import {HobbyDTO} from "../../../models/hobby-dto";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchUserChecked = false;
  searchHobbyChecked = false;
  searchActivityChecked = false;
  searchResults: any[] = [];

  constructor(private searchBarService: SearchBarService) {
  }

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
    this.searchResults = [];
    if (this.searchUserChecked) {
      this.onUserClicked(searchText);
    }
    if (this.searchHobbyChecked) {
      this.onHobbyClicked(searchText);
    }
  }

  onUserClicked(searchText: string): void {
    this.searchBarService.searchUser(searchText).subscribe(response => {

    });
  }

  onHobbyClicked(searchText: string): void {
    this.searchBarService.searchHobby(searchText).subscribe(
      {
        next: (response) => {
          response.forEach((hobby) => {
            if (hobby.id) {
              const hobbyDTO = new HobbyDTO(hobby.id, hobby.name, hobby.image)
              const existingHobby = this.searchResults.flat().find(hobby => hobby.id == hobbyDTO.id)
              if (!existingHobby) {
                this.searchResults.push(hobbyDTO);
              }
            }
          })
        },
        error: (error) => {
          // Gestion des erreurs en cas d'échec
          console.error('Erreur lors de la récupération du hobby', error);
        }
      });
  }

  onActivityClicked(searchText: string): void {
    this.searchBarService.searchActivity(searchText).subscribe(response => {

    });
  }
}

