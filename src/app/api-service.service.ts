import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from './post';
import { Comment } from './comment';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
 })
};

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = 'http://localhost:8000';

  constructor(
    private http: HttpClient
  ) { } 

  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl + '/api/post');
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl + '/api/post', post, httpOptions);
  }

  editPost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(this.apiUrl + '/api/post/' + id, post, httpOptions);
  }

  deletePost(id: number): any{
    return this.http.delete(this.apiUrl + '/api/post/' + id);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl + '/api/comment', comment, httpOptions);
  }

  editComment(id: number, comment: Comment): Observable<Post> {
    return this.http.put<Post>(this.apiUrl + '/api/comment/' + id, comment, httpOptions);
  }

  deleteComment(id: number): any{
    return this.http.delete(this.apiUrl + '/api/comment/' + id);
  }
}
