export interface User {
    name: string;
    email: string;
    password: string;
    phone:string;
    rooms:[string]
}

export type userInfo = {
    name:string,
    email:string,
    _id:string,
    rooms:[string]
};

export type SignInInput = Pick<User, 'email' | 'password'>;
