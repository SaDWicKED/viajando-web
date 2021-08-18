import { Component, OnInit } from '@angular/core';
import {FaqsService} from "../../api/faqs/services/faqs.service";
import {HeaderService} from "../../shared/ui/header/header.service";
import {Faq} from "../../api/faqs/models/faq";
import {RedirectionService} from "../../shared/services/redirection.service";

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss']
})
export class FaqsPage implements OnInit {

  questions: Faq[];
  filteredFaqs: Faq[];

  constructor(private faqsService: FaqsService,
              private headerService: HeaderService,
              private redirectionService: RedirectionService,) {
    headerService.setTitle('Preguntas Frecuentes')
    redirectionService.setReturnURL('/faqs');
    this.questions = [];
    this.filteredFaqs = [];
  }

  ngOnInit(): void {
    this.faqsService.faqs().subscribe(data => {
      this.questions = data;
      this.filteredFaqs = data;
    });
  }

  onKey(filter: string): void {
    this.filteredFaqs = this.questions.filter(q => q.question?.toLowerCase().includes(filter.toLowerCase()));
  }
}
