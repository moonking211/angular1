import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'article-edit-submit',
  template: require('./submit.html')
})

export class ArticleEditSubmit {

  @Input() isEdit;
  @Input() state;
  @Input() ppublic;
  @Input() password;
  @Output() stateChange: EventEmitter<any> = new EventEmitter();
  @Output() ppublicChange: EventEmitter<any> = new EventEmitter();
  @Output() passwordChange: EventEmitter<any> = new EventEmitter();
  @Output() submitArticle = new EventEmitter();

  constructor() {}
}
