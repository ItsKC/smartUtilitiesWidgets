import { Component, Input } from '@angular/core';

@Component({
  selector: 'operations-widget-config',
  template: `<div class="form-group">
    <c8y-form-group>
    </c8y-form-group>
  </div>`
})
export class OperationsWidgetConfig {
  @Input() config: any = {};
}