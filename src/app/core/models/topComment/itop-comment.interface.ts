import { IUser } from "../User/iuser.interface";

export interface ITopComment {

    _id: string;
    content: string;
    commentCreator: IUser;
    post: string;
    parentComment: null;
    likes: any[];
    createdAt: string;

}
