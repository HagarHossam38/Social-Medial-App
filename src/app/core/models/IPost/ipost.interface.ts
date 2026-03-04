import { ITopComment } from "../topComment/itop-comment.interface";
import { IUser } from "../User/iuser.interface";

export interface IPost {
    _id: string;
    body: string;
    image: string;
    privacy: string;
    user: IUser;
    sharedPost: null;
    likes: any[];
    createdAt: string;
    commentsCount: number;
    topComment: ITopComment;
    sharesCount: number;
    likesCount: number;
    isShare: boolean;
    id: string;
    bookmarked: boolean;
}


interface SharedPost {
    privacy: string;
    _id: string;
    body: string;
    image: string;
    user: IUser;
    sharedPost: null;
    likes: string[];
    createdAt: string;
    commentsCount: number;
    topComment: ITopComment;
    sharesCount: number;
    likesCount: number;
    isShare: boolean;
    id: string;
}






