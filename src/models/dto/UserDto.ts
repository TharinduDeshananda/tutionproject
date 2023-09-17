import UserRole from "src/enum/UserRole";

export default class UserDto {
  public id?: string;
  public name?: string;
  public email?: string;
  public imgUrl?: string;
  public mobile?: string;
  public role?: UserRole;
  password?: string;
}
