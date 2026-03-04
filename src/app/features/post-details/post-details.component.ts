import { Component, inject, Input, OnInit } from '@angular/core';
import { SinglePostComponent } from "../../shared/components/single-post/single-post.component";
import { IPost } from '../../core/models/IPost/ipost.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { url } from 'inspector';
import { PostsService } from '../../core/services/posts/posts.service';
import { BlobOptions } from 'buffer';
import { BlockList } from 'net';

@Component({
  selector: 'app-post-details',
  imports: [SinglePostComponent, RouterLink],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  //to get post id from URL inject activate route
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postsService = inject(PostsService);

  postId: string | number = ''; //Global variable to store id
  selectedPost!: IPost;

  ngOnInit(): void {
    this.getPostIDFromRoute();
    this.getPostDetails();
  }

  getPostIDFromRoute(): void {
    //ParamMap:contains URL
    this.activatedRoute.paramMap.subscribe((urlPath) => {
      console.log(urlPath);
      let id = urlPath.get('id');
      if (id) {
        this.postId = id;
      }
    });
  }
  isLoaded:boolean = false;
  getPostDetails() {
    this.isLoaded = false;
    this.postsService.getSinglePost(this.postId).subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res);
          this.selectedPost = res.data.post;
          console.log('cuureeent', this.selectedPost);
          this.isLoaded = true;
        }
      },
      error: (err) => {
        this.isLoaded = true;
        console.log(err);
      }
    })
  }
}
