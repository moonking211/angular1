import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/toPromise';

import { API_ROOT } from 'src/config'

@Injectable()
export class ArticleTagService {

  private _apiUrl = `${API_ROOT}/tag`;

  constructor(private http: AuthHttp,
              private _notificationsService: NotificationsService) {}

  // 成功处理
  private handleResponse = (response: any): Promise<any> => {
    const data = response.json();
    if(data.code) {
      this._notificationsService.success(data.message, '数据请求成功');
      return Promise.resolve(data);
    } else {
      this._notificationsService.error(data.message, data.debug ? data.debug.message : data.message);
      return Promise.reject(data);
    }
  }

  // 失败处理
  private handleError = (error: any): Promise<any> => {
    const errmsg = [500, 504].indexOf(error.status) > -1 ? error._body : JSON.parse(error._body).message;
    this._notificationsService.error('请求失败', errmsg);
    return Promise.reject(error);
  }

  // 获取标签
  getTags(get_params:any): Promise<any> {
    let params: URLSearchParams = new URLSearchParams();
    if (get_params) {
      Object.keys(get_params).forEach(k => { 
        params.set(k, get_params[k])
      });
    }
    return this.http
      .get(this._apiUrl, { search: params })
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  addTag(tag: any): Promise<any> {
    return this.http
      .post(this._apiUrl, tag)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  putTag(tag: any): Promise<any> {
    return this.http
      .put(`${ this._apiUrl }/${ tag._id }`, tag)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  delTag(tag_id: any): Promise<any> {
    return this.http
      .delete(`${ this._apiUrl }/${ tag_id }`)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  delTags(tags: any): Promise<any> {
    return this.http
      .delete(this._apiUrl, new RequestOptions({ body: { tags }}))
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }
}
