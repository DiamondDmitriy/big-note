import HttpClient from '@/shared/api/client/http.client.ts'

export default class RestClient {
  public http: HttpClient

  constructor() {
    this.http = new HttpClient()
  }
}
