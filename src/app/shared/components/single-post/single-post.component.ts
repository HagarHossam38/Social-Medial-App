import { Component, ElementRef, HostListener, inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { IPost } from '../../../core/models/IPost/ipost.interface';
import { TopCommentComponent } from "../top-comment/top-comment.component";
import { IUser } from '../../../core/models/User/iuser.interface';
import { isPlatformBrowser } from '@angular/common';
import { PostsService } from '../../../core/services/posts/posts.service';
import { RouterLink } from "@angular/router";
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PostCommentsComponent } from "../post-comments/post-comments.component";
import { TimeAgoPipePipe } from '../../pipes/TimeAgoPipe/time-ago-pipe-pipe';

@Component({
  selector: 'app-single-post',
  imports: [TopCommentComponent, RouterLink, FormsModule, ReactiveFormsModule,
    PostCommentsComponent, TimeAgoPipePipe],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent {
  @Input({ required: true }) post!: IPost;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly postsService = inject(PostsService);

  currentUserId!: string | number;
  loggedInUser!: IUser;
  //============================
  //==Flags==
  showAllComments: boolean = false;
  isImgModal = false;
  isPostEditing = false;
  sendingUpdateRequest = false;
  postMenuOpened = false;
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
    this.postBody = new FormControl(this.post?.body, [Validators.required]);

  }


  togglePostMenu() {
    this.postMenuOpened = !this.postMenuOpened;
  }
  @ViewChild('menuWrapper') menuWrapper!: ElementRef;
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (this.menuWrapper?.nativeElement && this.postMenuOpened) {
      if (!this.menuWrapper.nativeElement.contains(target)) {
        this.postMenuOpened = false;
      }
    }

  }
  showDeleteModal: boolean = false;

  showDeleteModalf() {
    this.showDeleteModal = true;
    console.log(this.showDeleteModal);//false???
  }
  deletePostClicked: string | null = null;
  toastMessage: string = '';
  hideToast: boolean = false;
  deletePost() {
    this.deletePostClicked = 'deleting...'
    this.postsService.deletePost(this.post._id).subscribe({
      next: (res) => {
        if (res.success) {
          this.showDeleteModal = false;
          this.deletePostClicked = null;

          this.toastMessage = 'Post deleted successfully!';
          this.hideToast = true;
          this.postsService.triggerRefreshPosts();
          // hide toast after 3 seconds
          setTimeout(() => {
            this.toastMessage = '';
            this.hideToast = false;
          }, 3000);
        }

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  postBody!: FormControl;
  updatePost() {
    this.sendingUpdateRequest = true
    let postFormData = new FormData();
    postFormData.append('body', this.postBody.value);

    if (this.post.image) {
      postFormData.append('image', this.post.image);
    }
    this.postsService.updatePost(this.post._id, postFormData).subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res);
          this.isPostEditing = false;
          //this.postsService.triggerRefreshPosts();
          this.sendingUpdateRequest = false;
          this.post.body = res.data.post.body;
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
    // this.postsService.updatePost()
  }


  /////////


}
