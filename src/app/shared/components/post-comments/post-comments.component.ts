import { Component, inject, Input, PLATFORM_ID } from '@angular/core';
import { Icomment } from '../../../core/models/Icomment/icomment.interface';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { IUser } from '../../../core/models/User/iuser.interface';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateCommentComponent } from '../create-comment/create-comment.component';
import { CommentComponent } from "../comment/comment.component";

@Component({
  selector: 'app-post-comments',
  imports: [CreateCommentComponent, ReactiveFormsModule, CommentComponent],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css',
})
export class PostCommentsComponent {

  private readonly commentsService = inject(CommentsService);
  postComments: Icomment[] = [];
  iSCommentLoaded = true;
  @Input({ required: true }) postId: string | number = '';
  @Input({ required: true }) postCommentsLenght!: number;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getAllComment();
    this.commentsService.refreshComments$.subscribe(() => {
      this.getAllComment()
    });
  }
  getAllComment() {
    if (this.postCommentsLenght != 0) {
      this.iSCommentLoaded = false;
      this.commentsService.getPostComments(this.postId).subscribe({
        next: (res) => {
          console.log(res);
          if (res.success) {
            this.postComments = res.data.comments;
            this.iSCommentLoaded = true;
          }

        },
        error: (err) => {
          console.log(err);
          this.iSCommentLoaded = true;
        }
      });
    }
  }


}
