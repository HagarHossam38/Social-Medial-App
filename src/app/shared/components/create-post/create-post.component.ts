import { PostsService } from './../../../core/services/posts/posts.service';
import { Component, ElementRef, HostListener, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { log } from 'console';
import { IUser } from '../../../core/models/User/iuser.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-create-post',
  imports: [PickerComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  postBody: FormControl = new FormControl('', [Validators.required]);

  showEmojiPicker = false;
  selectedImage: File | null = null;


  private readonly platformId = inject(PLATFORM_ID);
  loggedInUser!: IUser;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem("loggedUserData");
      if (storedUser) {
        this.loggedInUser = JSON.parse(storedUser);
      }
    }
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }
  addEmoji(event: any) {
    const { native } = event.emoji;
    const currentValue = this.postBody.value || '';
    this.postBody.setValue(currentValue + native);
  }

  previewUrl: string | null = null;



  removePreviewImg() {
    this.previewUrl = null;
    this.selectedImage = null;
  }
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

  @ViewChild('emojiContainer') EmojiDivRef?: ElementRef;
  @HostListener('document:click', ['$event'])
  HandleClickOutsideEmodiDiv(event: MouseEvent) {
    if (!this.EmojiDivRef?.nativeElement.contains(event.target)) {
      this.showEmojiPicker = false;
    }
  }

  private readonly postsService = inject(PostsService);
  createPost() {
    let postFormData = new FormData();
    console.log(this.postBody.value);
    console.log(this.selectedImage!);
    //string dol mfrod yb2u nfs el asmaa elly el api mstneha
    if (this.postBody.valid) {
      postFormData.append('body', this.postBody.value);
      if (this.selectedImage) {
        postFormData.append('image', this.selectedImage);
      }
      this.postsService.createPost(postFormData).subscribe(
        {
          next: (res) => {
            console.log(res);
            this.postBody.setValue('');
            this.removePreviewImg();
            this.postsService.triggerRefreshPosts();
          },
          error: (err) => {
            console.log(err);
          }
        }
      );
    }

  }
}
