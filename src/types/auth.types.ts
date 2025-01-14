export interface IAuth {
	email: string;
	password: string;
}

export interface IRegister extends IAuth {
	name: string;
	password_confirmation: string;
}
