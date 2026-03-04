
import { Component, OnInit, ElementRef, inject, PLATFORM_ID, ViewChild, HostListener, Input } from '@angular/core';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { log } from 'console';
import { IUser } from '../../../core/models/User/iuser.interface';
import { isPlatformBrowser } from '@angular/common';
import { CommentsService } from '../../../core/services/comments/comments.service';
@Component({
  selector: 'app-create-comment',
  imports: [PickerComponent, ReactiveFormsModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.css',
})
export class CreateCommentComponent implements OnInit {
  @Input({ required: true }) postId!: number | string;
  private readonly commentsService = inject(CommentsService);
  commentBody: FormControl = new FormControl(null, [Validators.required]);

  selectedImage: File | null = null;
  ngOnInit(): void {

  }
  ///Handle input Image
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedImage = file;//Save image to send to API
      //To show the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
      input.value = ''; //3shan a2dr a5tar nfs el sora aktr mn marra
    }
  }
  previewUrl: string | null = null;
  removePreviewImg() {
    this.previewUrl = null;
    this.selectedImage = null;
  }
  //===================================
  //Handle Emoji picker
  showEmojiPicker = false;
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }
  addEmoji(event: any) {
    const { native } = event.emoji;
    const currentValue = this.commentBody.value || '';
    this.commentBody.setValue(currentValue + native);
  }

  @ViewChild('emojiContainer') EmojiDivRef?: ElementRef;
  @HostListener('document:click', ['$event'])
  HandleClickOutsideEmodiDiv(event: MouseEvent) {
    if (!this.EmojiDivRef?.nativeElement.contains(event.target)) {
      this.showEmojiPicker = false;
    }
  }
  //===================================
  //Create Comment API
  isCommentCreated: boolean = true;
  createComment(event: Event) {
    event.preventDefault();
    this.isCommentCreated = false;
    let commentForm = new FormData();
    if (this.commentBody.valid) {
      commentForm.append('content', this.commentBody.value);
      if (this.selectedImage) {
        commentForm.append('image', this.selectedImage);
      }
      this.commentsService.createComment(this.postId, commentForm).subscribe({
        next: (res) => {
          console.log(res);
          this.commentBody.setValue('');
          this.removePreviewImg();
          this.commentsService.triggerRefresh();
          this.isCommentCreated = true;

        },
        error: (err) => {
          console.log(err);
          this.isCommentCreated = true;
        },
      })


    }

  }

}
