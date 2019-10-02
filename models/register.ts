
export class Register{
  username:string;
  password:string;
  passwordCheck:string;
  name: string;
  memberDate: Date;
  //CONSTRUCTOR
  constructor(
    username:string,
    password:string,
    name: string,
    memberDate: Date){
      this.username = username;
      this.password = password;
      this.name = name;
      this.memberDate = memberDate;
    }

}
