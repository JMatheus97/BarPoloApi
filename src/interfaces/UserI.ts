export interface UserI  {
  _id: number,
  nome: string,
  userName: string,
  password: string,
  perfil: string
}

export type TypePerfil = 'Gerencial' | 'Comum';
