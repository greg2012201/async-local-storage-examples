type Notification = {
    id: number;
    message: string;
};

type Book = {
    id: number;
    title: string;
    author: string;
};

export type UserData = {
    userId: string;
    lastLogin: string;
    totalLogins: number;
    notifications: Notification[];
    books: Book[];
    name: string;
    email: string;
};

export type UserContext = {
    userId: string;
};
