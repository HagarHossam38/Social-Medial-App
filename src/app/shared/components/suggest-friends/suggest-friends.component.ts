import { Component, inject } from '@angular/core';
import { IUser } from '../../../core/models/User/iuser.interface';
import { UserService } from '../../../core/services/user/user.service';
import { FiltrationPipe } from '../../pipes/Filtration/filtration-pipe';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-suggest-friends',
  imports: [FiltrationPipe, FormsModule],
  templateUrl: './suggest-friends.component.html',
  styleUrl: './suggest-friends.component.css',
})
export class SuggestFriendsComponent {
  private readonly userService = inject(UserService);
  suggestedFriends: IUser[] = [];
  showedSuggested: IUser[] = []; //show first 5

  searchFriendTerm: string = '';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getFollowSuggestions();
  }
  getFollowSuggestions() {
    console.log('folllow:');

    this.userService.getFollowSuggestions().subscribe({
      next: (res) => {
        console.log(res);
        this.suggestedFriends = res.data.suggestions;
        this.showedSuggested = this.suggestedFriends.slice(0, 5);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
