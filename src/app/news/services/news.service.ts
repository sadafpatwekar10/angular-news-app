import { Injectable } from '@angular/core';
import { News } from '../models/news.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap, pluck } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  url = environment.newsApiURL;
  key = environment.newsApiKey;

  news: News[] = [];
  newsUpdated: Subject<any> = new Subject();

  private _newsItem: any;

  constructor(private http: HttpClient) {}

  getNews() {
    return this.http
      .get(`${this.url}/home.json?api-key=${this.key}`)
      .pipe(map((data: any) => (this.news = data.results)));
  }

  getCategorizedNews(category: string) {
    this.http
      .get(`${this.url}/${category}.json?api-key=${this.key}`)
      .pipe(
        map((data: any) => (this.news = data.results)),
        tap((res) => this.newsUpdated.next(this.news))
      )
      .subscribe();
  }

  get newsItem() {
    return this._newsItem;
  }

  set newsItem(newsItem: any) {
    this._newsItem = newsItem;
  }
  
}
