import { IMovie, IUser } from "../components/types/types"

export type ApiParams = {
  baseUrl: string
  withCredentials?: boolean
  credentials?: string
}

type Method = 'GET' | 'PUT' | 'UPDATE' | 'DELETE' | 'PATCH' | 'POST'

type CustomError = { error: string }

export class Api {
  _baseUrl: string
  _options: {}

  constructor({ baseUrl, ...options }: ApiParams) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  _fetch(path: string, method: Method, headers?: Record<string, string>,
    bodyObject?: IUser | IMovie, renderLoading?: (isLoading: boolean) => void) {

    if (renderLoading) renderLoading(true)
    return fetch(`${this._baseUrl}${path}`, {
      method: method,
      headers: { 'Content-Type': 'application/json', ...headers },
      body: bodyObject ? JSON.stringify(bodyObject) : undefined,
      ...this._options
    })
      .then(this._checkResponse)
      .finally(() => {
        if (renderLoading) renderLoading(false)
      });
  }

  _checkResponse(res: Response) {
    if (res.ok) return res.json();
    return res.json().then((data: Error & CustomError) => {
      const validationError = Object.values(data)[3]?.body?.message;
      validationError && console.log(validationError)
      throw new Error(data.error)
    });
  }

}
