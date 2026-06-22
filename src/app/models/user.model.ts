// Interface que define a estrutura de um usuário

export interface IUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  profileImageUrl?: string | null;
  createdAt: string; // DateTime -> string (ISO 8601)
}

// DTO para exibir/atualizar perfil do usuário
export interface IUserProfileDTO {
  name?: string;
  email?: string;
  profileImageUrl?: string | null;
}

export interface IRegisterUserDTO {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginDTO {
  email: string;
  password: string;
}

export interface ILoginResponseDTO {
  token: string;
  name: string;
}