import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['/src/styles.css']
})
export class LatestNewsComponent  {
  latestNews = [
    { title: 'Punjab Illegal Liquor Trade: SC Slams State For Inaction, Says, Common People & Not The Ones Who Can Afford Good Whiskey Are Real Sufferers', url: 'https://example.com/news1' },
    { title: 'Gauhati High Court Directs Excise Department To Hear Objections Of Local Public As Per Assam Excise', url: 'https://example.com/news2' },
    { title: 'Public Interest Also An Element On Consideration Of Which Employee Can Be Placed Under Suspension', url: 'https://example.com/news3' },
    { title: 'Public Interest Also An Element On Consideration Of Which Employee Can Be Placed Under Suspension', url: 'https://example.com/news3' },
    { title: 'Punjab Illegal Liquor Trade: SC Slams State For Inaction, Says, Common People & Not The Ones Who Can Afford Good Whiskey Are Real Sufferers', url: 'https://example.com/news1' },
    { title: 'Gauhati High Court Directs Excise Department To Hear Objections Of Local Public As Per Assam Excise', url: 'https://example.com/news2' },
    { title: 'Public Interest Also An Element On Consideration Of Which Employee Can Be Placed Under Suspension', url: 'https://example.com/news3' },
    { title: 'Punjab Illegal Liquor Trade: SC Slams State For Inaction, Says, Common People & Not The Ones Who Can Afford Good Whiskey Are Real Sufferers', url: 'https://example.com/news1' },
    { title: 'Gauhati High Court Directs Excise Department To Hear Objections Of Local Public As Per Assam Excise', url: 'https://example.com/news2' },
    { title: 'Public Interest Also An Element On Consideration Of Which Employee Can Be Placed Under Suspension', url: 'https://example.com/news3' },
    { title: 'Punjab Illegal Liquor Trade: SC Slams State For Inaction, Says, Common People & Not The Ones Who Can Afford Good Whiskey Are Real Sufferers', url: 'https://example.com/news1' },
    { title: 'Gauhati High Court Directs Excise Department To Hear Objections Of Local Public As Per Assam Excise', url: 'https://example.com/news2' },
    { title: 'Public Interest Also An Element On Consideration Of Which Employee Can Be Placed Under Suspension', url: 'https://example.com/news3' },
    { title: 'Punjab Illegal Liquor Trade: SC Slams State For Inaction, Says, Common People & Not The Ones Who Can Afford Good Whiskey Are Real Sufferers', url: 'https://example.com/news1' },
  ];

  constructor() { }

  ngOnInit(): void {
    
  }
  
}
