import { Component, Input } from '@angular/core';

@Component({
  selector: 'device-name-widget-config',
  template: `<div class="form-group">
    <c8y-form-group>
    </c8y-form-group>
  </div>`
})
export class DeviceNameWidgetConfig {
  @Input() config: any = {};
}