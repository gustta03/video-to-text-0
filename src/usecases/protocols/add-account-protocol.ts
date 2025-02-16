/* eslint-disable @typescript-eslint/no-namespace */
export interface AddAccount {
  add: (params: AddAccont.Params) => Promise<AddAccont.Response>
}

export namespace AddAccont {
  export type Params = { name: string, email: string, whatsapp: string }
  export type Response = string
}
