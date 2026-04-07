// export interface CreateUser {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   role: "CASHIER" | "SUPER_ADMIN";
// }

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "CASHIER" | "SUPER_ADMIN";

  constructor(user: any) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
  }
}
