import {Component, OnInit} from '@angular/core';
import {SearchBarService} from "../../services/search-bar.service";
import {HobbyDTO} from "../../../models/hobby-dto";
import {UserDTO} from "../../../models/user-dto";

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
    this.searchBarService.searchUser(searchText).subscribe({
      next: (response) => {
        response.forEach((user) => {
          if (user.id) {
            const userDTO = new UserDTO(+user.id, user.name, user.username, user.password, user.email);
            console.log(userDTO.id);
            const existingUser = this.searchResults.find(user => user.id == userDTO.id);
            if (!existingUser) {
              this.searchResults.push(userDTO);
            }
          }
        })
      },
      error: (error) => {
        // Gestion des erreurs en cas d'échec
        console.error('Erreur lors de la récupération de l\'utilisateur', error);
      }
    });
  }

  /**
   * Method that updates the search content in relation to the radio button
   */
  onCheckUser(): void {
    /*
    If the radio button is checked, we search the user in relation to the text written in the search bar
     */
    if (this.searchUserChecked) {
      const searchText = (document.querySelector('.explorer') as HTMLTextAreaElement).value;
      this.onUserClicked(searchText);
    }
    /*
    In case that the radio button is not checked, we need to remove the instances of User in the results of the search bar
     */
    else {
      this.searchResults = this.searchResults.filter(result => !(result instanceof UserDTO));
    }
  }

  /**
   * Method that updates the search content in relation to the radio button
   */
  onCheckHobby(): void {
    if (this.searchHobbyChecked) {
      const searchText = (document.querySelector('.explorer') as HTMLTextAreaElement).value;
      this.onHobbyClicked(searchText);
    } else {
      this.searchResults = this.searchResults.filter(result => !(result instanceof HobbyDTO));
    }
  }

  /**
   * Method that updates the search content in relation to the radio button
   */
  onCheckActivity(): void {

  }

  onHobbyClicked(searchText: string): void {
    this.searchBarService.searchHobby(searchText).subscribe({
      next: (response) => {
        response.forEach((hobby) => {
          if (hobby.id) {
            const hobbyDTO = new HobbyDTO(hobby.id, hobby.name, hobby.image);
            const existingHobby = this.searchResults.find(result => result instanceof HobbyDTO && result.id === hobbyDTO.id);
            if (!existingHobby) {
              this.searchResults.push(hobbyDTO);
            }
          }
        });
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

