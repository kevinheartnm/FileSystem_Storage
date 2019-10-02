
export class User{
  username:string;
  password:string;
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
    getUserName(){return  this.username;}
    getPassword(){return  this.password;}
    getName(){return  this.name;}
    getMemberDate(){return  this.memberDate;}

}
