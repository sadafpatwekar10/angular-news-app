import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {
  newsList: any[] = [];
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getNews();
    this.newsService.newsUpdated.subscribe((res) => (this.newsList = res));
  }

  getNews() {
    this.newsService.getNews().subscribe((res) => {
      this.newsList = res;
    });
  }
}
