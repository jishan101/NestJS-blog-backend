export interface IUserRole {
  roleId: string;
  roleName: string;
  shortForm: string;
}

export class UserPayload {
  sub: string;
  userId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  birthDate: string;
  role: IUserRole;

  constructor(partial?: Partial<UserPayload>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
