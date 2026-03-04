import { Component, inject, Input, PLATFORM_ID } from '@angular/core';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { Icomment } from '../../../core/models/Icomment/icomment.interface';
import { IUser } from '../../../core/models/User/iuser.interface';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TimeAgoPipePipe } from '../../pipes/TimeAgoPipe/time-ago-pipe-pipe';

@Component({
  selector: 'app-comment',
  imports: [ReactiveFormsModule, DatePipe, TimeAgoPipePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  @Input({ required: true }) singleComment!: Icomment;
  @Input({ required: true }) postID!: string | number;
  private readonly commentsService = inject(CommentsService);
  commentMenuOpened: boolean = false;


  isDeleteModalOpen: boolean = false;
  toastMessage: string = '';
  hideToast: boolean = false;
  deleteCommentClicked: string | null = null;


  currentUserId!: string | number;
  loggedInUser!: IUser
  private readonly platformId = inject(PLATFORM_ID);
  commentBody!: FormControl;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem("loggedUserData");
      if (storedUser) {
        this.loggedInUser = JSON.parse(storedUser);
        this.currentUserId = this.loggedInUser._id;
      }
    }
    this.commentBody = new FormControl(this.singleComment.content, [Validators.required]);
  }
  deleteComment() {

    this.deleteCommentClicked = 'Deleting...'
    this.commentsService.deleteComment(this.postID, this.singleComment._id).subscribe({
      next: (res) => {
        if (res.success) {
          this.isDeleteModalOpen = false;
          this.deleteCommentClicked = null;
          this.toastMessage = 'Comment deleted successfully!';
          this.hideToast = true;
          this.commentsService.triggerRefresh();

          setTimeout(() => {
            this.toastMessage = '';
            this.hideToast = false;
          }, 3000);
        }
      },
      error: (err) => {
        console.log(err);
        this.deleteCommentClicked = null;
        this.isDeleteModalOpen = false;
        this.toastMessage = 'Error...';
        this.hideToast = true;
        setTimeout(() => {
          this.toastMessage = '';
          this.hideToast = false;
        }, 3000);
      }
    })

  }




  showDeleteModalf() {
    this.isDeleteModalOpen = true;
    this.commentMenuOpened = false;
  }


  isCommentEditing: boolean = false;
  clickEditComment() {
    this.isCommentEditing = true;
    this.commentMenuOpened = false;
  }

  isSaveCommentCliked: boolean = false;
  updateComment() {
    this.isSaveCommentCliked = true;
    let formData = new FormData();

    formData.append('content', this.commentBody.value);
    this.commentsService.updateComment(this.postID, this.singleComment._id, formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.isCommentEditing = false;
          // this.getAllComment();
          this.singleComment.content = res.data.comment.content;
          // console.log(res);
          this.commentsService.triggerRefresh();
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }



}
