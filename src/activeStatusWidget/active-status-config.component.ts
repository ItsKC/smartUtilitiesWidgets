import { Component, Input } from '@angular/core';

@Component({
  selector: 'active-status-widget-config',
  template: `<div class="form-group">
    <c8y-form-group>
      <label translate>Text</label>
      <textarea style="width:100%" [(ngModel)]="config.text"></textarea>
    </c8y-form-group>
  </div>`
})
export class ActiveStatusWidgetConfig {
  @Input() config: any = {};
}