import { Component, Input } from '@angular/core';

@Component({
  selector: 'status-widget-config',
  template: `<div class="form-group">
    <c8y-form-group>
    </c8y-form-group>
  </div>`
})
export class StatusWidgetConfig {
  @Input() config: any = {};
}