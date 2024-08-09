import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acts-and-rules',
  templateUrl: './acts-and-rules.component.html',
  styleUrls: ['/src/styles.css']
})
export class ActsAndRulesComponent implements OnInit {
  actsAndRules = [
    {
      title: 'Excise Act 1964',
      date: new Date(2024, 6, 1),
      description: 'The Excise Act of 1964 is a comprehensive statute that governs the regulation of alcoholic beverages and narcotic substances.',
      pdfLink: 'https://example.com/act1964.pdf',
      showDescription: false
    },
    {
      title: 'Excise Duties Act 1985',
      date: new Date(2024, 6, 12),
      description: 'This Act outlines the duties and taxes imposed on the manufacture and sale of excisable goods within the state.',
      pdfLink: 'https://example.com/act1985.pdf',
      showDescription: false
    },
    {
      title: 'Excise Rules 1990',
      date: new Date(2023, 1, 20),
      description: 'These rules provide detailed guidelines for the implementation of the Excise Acts, including procedures for enforcement and compliance.',
      pdfLink: 'https://example.com/rules1990.pdf',
      showDescription: false
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleDescription(item: any) {
    item.showDescription = !item.showDescription;
  }
}
