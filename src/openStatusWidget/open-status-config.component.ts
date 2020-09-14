import { Component, Input } from '@angular/core';

@Component({
  selector: 'open-status-widget-config',
  template: `<div class="form-group">
    <c8y-form-group>
    </c8y-form-group>
  </div>`
})
export class OpenStatusWidgetConfig {
  @Input() config: any = {};
}