import type { BaseFormType, BaseType, DocumentId } from "./common/base_type";

export interface User extends BaseType {
  email: string;
  username: string;
}

export interface FormUser extends BaseFormType {
	email: string;
  username:string;
}
