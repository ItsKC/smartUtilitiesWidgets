import { Component, Input } from '@angular/core';

@Component({
  selector: 'device-search-widget-config',
  template: `<div class="form-group">
    <c8y-form-group>
    </c8y-form-group>
  </div>`
})
export class DeviceSearchWidgetConfig {
  @Input() config: any = {};
}