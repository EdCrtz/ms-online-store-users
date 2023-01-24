export class UserDTO {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    orders: any[];

    constructor(user: any) {
        this.id = user._id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}
