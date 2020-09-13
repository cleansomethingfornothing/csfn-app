import '@capacitor-community/http';
import axios from 'axios'

import {Plugins} from '@capacitor/core';

export default class HttpTool {

  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  public post(path: string, data?: Record<string, any>, auth?: { username: string, password: string }) {
    return this.request({
      path,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth && 'Basic ' + btoa(auth.username + ':' + auth.password)
      }
    })
  }

  public postFile(path: string, images: File[]) {
    const data = new FormData()

    images.forEach((image, i) => data.append('images', image, i + '.jpg'))

    return axios.post(process.env.VUE_APP_BACK_URL + this.baseUrl + path, data)
  }

  public get(path: string) {
    return this.request({path, method: 'GET'})
  }

  public patch(path: string, data) {
    return this.request({path, method: 'PATCH', data, headers: {'Content-Type': 'application/json'}})
  }

  private request({path, method, data, headers}: { path: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', data?: any, headers?: Record<string, string> }) {
    const {Http} = Plugins;
    return Http.request({
      method,
      url: process.env.VUE_APP_BACK_URL + this.baseUrl + path,
      headers,
      data
    }).then(response => response.status >= 200 && response.status < 300
      ? Promise.resolve(response)
      : Promise.reject(response))
  }

}
