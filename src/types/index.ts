
export interface LoginUserInput {
  email: string;
  password: string;
}
export interface ChangePasswordUserInput {
  oldPassword: string;
  newPassword: string;
}
export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export type MenuList = {
  title: string;
  active: boolean;
  dropDownActive?: boolean;
  icon?: string;
  link?: string;
  // role: "NEW" | "ADMIN" | "STAFF" | "CEO" | "CFO" | "CAO" | "HOD" | "SAO";
  submenu?: MenuList[];
};


export type AuthResponseType = {
  token: string;
  message: string;
  error: boolean;
  user?: UserType;
  role?: Role;
};

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  accountNonExpired?: boolean;
  credentialsNonExpired?: boolean;
  authorities: Authority[];
  department: DepartmentType;
  roles: Role[];
};

export type Role = {
  id: number;
  code: string;
  name: "NEW" | "ADMIN" | "STAFF" | "CEO" | "CFO" | "CAO" | "HOD" | "SAO";
};

export type Alert = {
  message: string;
  variant: "error";
  closeable: true;
};

export enum SortOrder {
  DESC,
  ASC,
}

export enum QueryByColumn {
  Name,
  Status,
}

export type Response = {
  message: string;
  error: boolean;
  requisitions: any;
};

export type Authority = {
  authority: "NEW" | "ADMIN" | "STAFF" | "CEO" | "CFO" | "CAO" | "HOD" | "SAO";
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roles: Role[];
  requisitions?: any;
  enabled: boolean;
  username: string;
  authorities: Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
};

export type DepartmentType = {
  id?: number;
  name: string;
  type: "SUB" | "MAIN";
  icon: string;
  balance?: number;
  code: string;
  address: string;
  phone: string;
  about: string;
};
