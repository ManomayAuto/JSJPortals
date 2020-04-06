export class User {
    constructor(public id: string, public name: string, public CC: string) {}
  }
  
  export interface IUserResponse {
    total: number;
    results: User[];
  }