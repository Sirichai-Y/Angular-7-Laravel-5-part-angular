import { Comment } from './comment';

export class Post {
    id: number;
    post_text: string;
    comment: Comment[];
}