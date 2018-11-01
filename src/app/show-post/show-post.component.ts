import { Component, OnInit } from '@angular/core';

import { ApiServiceService } from '../api-service.service';

import { Post } from '../post';
import { Comment } from '../comment';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {

  posts: Post[];
  comments: Comment[];

  data = { 
    'post_id': 0,
    'post_text': "",
    'post_index': 0,
    'comment_id': 0,
    'comment_text': "",
    'comment_index': 0
  };

  display1 = 'none';
  display2 = 'none';

  constructor(
    private apiService: ApiServiceService
  ) { }

  ngOnInit() {
    this.apiService.getPost().subscribe(
      posts => this.posts = posts
    );
  }

  openEditPost(post_index: number){
    this.display1 = 'block';
    this.data.post_id = this.posts[post_index].id;
    this.data.post_text = this.posts[post_index].post_text;
    this.data.post_index = post_index;
  }

  openEditComment(post_index: number , comment_index: number){
    this.display2 = 'block';
    this.data.post_id = this.posts[post_index].id;
    this.data.comment_id = this.posts[post_index].comment[comment_index].id;
    this.data.comment_text = this.posts[post_index].comment[comment_index].comment_text;
    this.data.comment_index = comment_index;
    this.data.post_index = post_index;
  }

  onCloseAndSaveEdit(){
    this.display1 = 'none';
    this.editPost( this.data.post_id , this.data.post_text , this.data.post_index );
  }

  onCloseAndSaveComment(){
    this.display2 = 'none';
    this.editComment( this.data.comment_id , this.data.comment_text , this.data.post_id , this.data.comment_index , this.data.post_index)
  }

  onClose(){
    this.display1 = 'none';
    this.display2 = 'none';
  }

  addPost(post_text: string): void {
    post_text = post_text.trim();
    this.apiService.addPost({ post_text } as Post)
      .subscribe(post => {
        post.comment = [];
        this.posts.push(post);
    });
  }

  editPost(id: number , post_text: string , index: number): void {
    post_text = post_text.trim();
    this.apiService.editPost(id , { post_text } as Post)
      .subscribe(isEdit => {
        if(isEdit) this.posts[index].post_text = post_text;
      });
  }

  deletePost(post_index: number , id: number): void {
    this.apiService.deletePost(id).subscribe(isDelete => {
      if(isDelete) {
        if(this.posts.length == 1) this.posts = [];
        else this.posts.splice(post_index,1);
      }
    });
  }

  addComment(comment_text: string , post_id: number , i:number): void {
    comment_text = comment_text.trim();
    this.apiService.addComment({ comment_text , post_id } as Comment)
      .subscribe(comment => {
        this.posts[i].comment.push(comment);
      });
  }

  editComment(id: number , comment_text: string , post_id: number , comment_index: number , post_index: number): void {
    comment_text = comment_text.trim();
    this.apiService.editComment(id , { comment_text , post_id } as Comment)
      .subscribe(isEdit => {
        if(isEdit) this.posts[post_index].comment[comment_index].comment_text = comment_text;
      });
  }

  deleteComment(post_index: number , comment_index: number , id: number): void {
    this.apiService.deleteComment(id).subscribe(isDelete => {
      if(isDelete) {
        if(this.posts[post_index].comment.length == 1) this.posts[post_index].comment = [];
        else this.posts[post_index].comment.splice(comment_index,1);
      }
    });
  }
}