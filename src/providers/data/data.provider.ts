import HttpTool from '@/tools/HttpTool'

export default abstract class DataProvider {

  public http: HttpTool

  protected constructor(path: string) {
    this.http = new HttpTool(path)
  }

}
