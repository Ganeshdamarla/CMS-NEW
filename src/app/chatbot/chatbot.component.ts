import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  predefinedQuestions: { question: string, answer: string, action?: () => void }[] = [
    { question: 'What is the excise duty rate?', answer: 'The excise duty rate is 18%.' },
    { question: 'How to file an excise return?', answer: 'You can file an excise return by logging into our portal and following the steps provided.' },
    { question: 'What documents are required for excise registration?', answer: 'You need to provide identity proof, address proof, and business registration documents.' },
    { question: 'Are you here to raise a complaint?', answer: '', action: () => this.showRegisterComplaint() }
  ];
  chatHistory: { from: string, message: string }[] = [];
  isOpen: boolean = false;
  userInput: string = '';
  initialQuestionAsked: boolean = false;
  showRegisterComplaintButton: boolean = false;
  showPredefinedQuestions: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && !this.initialQuestionAsked) {
      this.askInitialQuestion();
    }
  }

  askInitialQuestion() {
    this.chatHistory.push({ from: 'bot', message: 'How can I assist you today?' });
    this.initialQuestionAsked = true;
  }

  sendMessage() {
    if (this.userInput.trim()) {
      this.chatHistory.push({ from: 'user', message: this.userInput });
      this.handleUserInput(this.userInput);
      this.userInput = '';
    }
  }

  handleUserInput(message: string) {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage === 'hi' || lowerCaseMessage === 'hello') {
      this.chatHistory.push({ from: 'bot', message: 'Hello! How can I help you today?' });
      this.showPredefinedQuestions = false;
    } else {
      const question = this.predefinedQuestions.find(q => q.question.toLowerCase() === lowerCaseMessage);
      if (question) {
        this.handlePredefinedQuestionClick(question);
        this.showPredefinedQuestions = false;
      } else {
        this.chatHistory.push({ from: 'bot', message: 'Sorry, I do not understand. Please ask another question or choose from the predefined questions below:' });
        this.showPredefinedQuestions = true;
      }
    }
  }

  showRegisterComplaint() {
    this.chatHistory.push({ from: 'bot', message: 'Please click the button below to register your complaint.' });
    this.showRegisterComplaintButton = true;
    this.showPredefinedQuestions = false;
  }

  registerComplaint() {
    this.router.navigate(['/public-form']);
  }

  handlePredefinedQuestionClick(question: { question: string, answer: string, action?: () => void }) {
    this.chatHistory.push({ from: 'user', message: question.question });
    this.showRegisterComplaintButton = false;
    if (question.action) {
      question.action();
    } else {
      this.chatHistory.push({ from: 'bot', message: question.answer });
    }
    this.showPredefinedQuestions = false;
  }
}
