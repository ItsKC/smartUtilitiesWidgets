import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule as NgRouterModule } from '@angular/router';
import { UpgradeModule as NgUpgradeModule } from '@angular/upgrade/static';
import { ActiveStatusWidget } from './src/activeStatusWidget/active-status-widget.component';
import { ActiveStatusWidgetConfig } from './src/activeStatusWidget/active-status-config.component';
import { ActiveStatusWidgetService } from './src/activeStatusWidget/active-status-widget.service';
import { DeviceTypesWidget } from './src/deviceTypesWidget/device-types-widget.component';
import { DeviceTypesWidgetConfig } from './src/deviceTypesWidget/device-types-config.component';
import { DeviceTypesWidgetService } from './src/deviceTypesWidget/device-types-widget.service';
import { OpenStatusWidget } from './src/openStatusWidget/open-status-widget.component';
import { OpenStatusWidgetConfig } from './src/openStatusWidget/open-status-config.component';
import { OpenStatusWidgetService } from './src/openStatusWidget/open-status-widget.service';
import { DailyCountWidget } from './src/dailyCountWidget/daily-count-widget.component';
import { DailyCountWidgetConfig } from './src/dailyCountWidget/daily-count-config.component';
import { DailyCountWidgetService } from './src/dailyCountWidget/daily-count-widget.service';
import { OperationsWidget } from './src/operationsWidget/operations-widget.component';
import { OperationsWidgetConfig } from './src/operationsWidget/operations-config.component';
import { OperationsWidgetService } from './src/operationsWidget/operations-widget.service';
import { CoreModule, HOOK_COMPONENT, RouterModule } from '@c8y/ngx-components';
import { UpgradeModule, HybridAppModule, UPGRADE_ROUTES } from '@c8y/ngx-components/upgrade';
import { AssetsNavigatorModule } from '@c8y/ngx-components/assets-navigator';
import { ReportsModule } from '@c8y/ngx-components/reports';
import { ContextDashboardModule } from '@c8y/ngx-components/context-dashboard';
import { ChartsModule, ThemeService } from 'ng2-charts';

@NgModule({
  imports: [
    BrowserAnimationsModule,
	RouterModule.forRoot(),
    NgRouterModule.forRoot([
      ...UPGRADE_ROUTES
    ], { enableTracing: false, useHash: true }),
    CoreModule.forRoot(),
    AssetsNavigatorModule,
    ReportsModule,
    NgUpgradeModule,
    ContextDashboardModule,
	ChartsModule,
    // Upgrade module must be the last
    UpgradeModule
  ],
  declarations: [ActiveStatusWidget, ActiveStatusWidgetConfig, DeviceTypesWidget, DeviceTypesWidgetConfig,
	OpenStatusWidget, OpenStatusWidgetConfig, DailyCountWidget, DailyCountWidgetConfig, OperationsWidget, 
	OperationsWidgetConfig],      
  entryComponents: [ActiveStatusWidget, ActiveStatusWidgetConfig, DeviceTypesWidget ,DeviceTypesWidgetConfig, 
	OpenStatusWidget, OpenStatusWidgetConfig, DailyCountWidget, DailyCountWidgetConfig, OperationsWidget,
	OperationsWidgetConfig],
  providers: [{
    provide: HOOK_COMPONENT,                         
    multi: true,
    useValue: {
      id: 'active.status.widget',                         
      label: 'Sayaç Durumu',
      description: 'Sayaçlardan aktif olan ve olmayanların sayılarını gösterir.',
      component: ActiveStatusWidget,                         
      configComponent: ActiveStatusWidgetConfig,
    }
  },
  {
    provide: HOOK_COMPONENT,                         
    multi: true,
    useValue: {
      id: 'device.types.widget',                         
      label: 'Tiplerine Göre Cihazlar',
      description: 'Cihazların tiplerine göre oranını verir.',
      component: DeviceTypesWidget,                         
      configComponent: DeviceTypesWidgetConfig,
    }
  },
  {
    provide: HOOK_COMPONENT,                         
    multi: true,
    useValue: {
      id: 'open.status.widget',                         
      label: 'Sayaçlarda Vana Durumu',
      description: 'Sayaçların açık ya da kapalı sayılarını gösterir.',
      component: OpenStatusWidget,                         
      configComponent: OpenStatusWidgetConfig,
    }
  },
  {
    provide: HOOK_COMPONENT,                         
    multi: true,
    useValue: {
      id: 'daily.count.widget',                         
      label: 'Günlük Kaydolan Cihazlar',
      description: 'Bugün ve dün kaydolan cihaz sayısını gösterir.',
      component: DailyCountWidget,                         
      configComponent: DailyCountWidgetConfig,
    }
  },
  {
    provide: HOOK_COMPONENT,                         
    multi: true,
    useValue: {
      id: 'operations.widget',                         
      label: 'İş Emirleri',
      description: 'Kayıtlı olan iş emirlerini göndermenizi sağlar.',
      component: OperationsWidget,                         
      configComponent: OperationsWidgetConfig,
    }
  },
  ThemeService,
  ActiveStatusWidgetService,
  DeviceTypesWidgetService,
  OpenStatusWidgetService,
  DailyCountWidgetService,
  OperationsWidgetService
  ]
})
export class AppModule extends HybridAppModule {
  constructor(protected upgrade: NgUpgradeModule) {
    super();
  }
}
