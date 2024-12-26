import { RowDataPacket } from "mysql2";

export type DbUser = {
  id: number,
  name: string,
  email: string,
  password: string
} & RowDataPacket

export type LoginUser = {
  id: number,
  name: string,
  email: string,
  password: string
}

export type NewRegisterUser = {
  name: string,
  email: string,
  password: string,
}