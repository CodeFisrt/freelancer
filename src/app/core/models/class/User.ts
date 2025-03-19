export class UserRegister {
    userId: number ;
    userName: string;
    emailId: string;
    fullName: string;
    password: string;

    constructor(){
        this.emailId = '';
        this.fullName = '';
        this.password = "";
        this.userId = 0;
        this.userName = "";
    }
}