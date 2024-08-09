import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrl: '/src/styles.css',
  animations: [
    trigger('cardAnimation', [
      state('in', style({ opacity: 1, transform: 'scale(1)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('0.5s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({ opacity: 0, transform: 'scale(0.5)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class FeaturesComponent {
  cards = [
    { icon: 'fa-cogs', title: 'User Management', description: 'Manage user roles and permissions.' },
    { icon: 'fa-shield-alt', title: 'Security', description: 'Top-level security features for data protection.' },
    { icon: 'fa-chart-line', title: 'Analytics', description: 'Track and analyze complaint data.' },
    { icon: 'fa-comments', title: 'Customer Support', description: '24/7 support for all your queries.' }
  ];

  steps = [
    { stepNumber: 1, title: 'Step 1', description: 'Submit your complaint through our online form.' },
    { stepNumber: 2, title: 'Step 2', description: 'Our team reviews and assigns your complaint to the relevant department.' },
    { stepNumber: 3, title: 'Step 3', description: 'Receive updates and track the progress of your complaint.' },
    { stepNumber: 4, title: 'Step 4', description: 'Your complaint is resolved, and you receive a notification.' }
  ];

  activeStep = 0;

  toggleStep(stepNumber: number): void {
    this.activeStep = this.activeStep === stepNumber ? 0 : stepNumber;
  }
}
