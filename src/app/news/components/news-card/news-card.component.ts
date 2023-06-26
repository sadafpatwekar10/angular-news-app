import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit {
  @Input('news') news!: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {}
  
  navigateToDetails(news: any) {
    this.newsService.newsItem = news;
    this.router.navigate(['./details'], { relativeTo: this.route });
  }
}
