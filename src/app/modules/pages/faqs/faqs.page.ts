import { Component, OnInit } from '@angular/core';
import {FaqsService} from "../../api/faqs/services/faqs.service";
import {HeaderService} from "../../ui/header/header.service";
import {Faq} from "../../api/faqs/models/faq";

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss']
})
export class FaqsPage implements OnInit {

  questions: Faq[];
  filteredFaqs: Faq[];

  constructor(private faqsService: FaqsService,
              private headerService: HeaderService) {
    headerService.setTitle('Preguntas Frecuentes')
    this.questions = [];
    this.filteredFaqs = [];
  }

  ngOnInit(): void {
    this.faqsService.faqs().subscribe(data => {
      this.questions = data;
      this.filteredFaqs = data;
    });
  }

  onKey(filter: string) {
    this.filteredFaqs = this.questions.filter(q => q.question?.toLowerCase().includes(filter.toLowerCase()));
  }
}
