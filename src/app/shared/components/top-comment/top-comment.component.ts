import { Component, inject, Input } from '@angular/core';
import { ITopComment } from '../../../core/models/topComment/itop-comment.interface';
import { PostCommentsComponent } from "../post-comments/post-comments.component";

@Component({
  selector: 'app-top-comment',
  imports: [PostCommentsComponent],
  templateUrl: './top-comment.component.html',
  styleUrl: './top-comment.component.css',
})
export class TopCommentComponent {
  showAllComments: boolean = false;

  @Input({ required: true }) postTopComment!: ITopComment;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.showAllComments = false;
  }

}
