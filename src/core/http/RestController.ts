import Http from '@/core/http/Http.ts'

export default class RestController {
  public http: Http

  constructor() {
    this.http = new Http()
  }
}
