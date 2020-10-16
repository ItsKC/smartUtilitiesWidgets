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
import { MonthlyCountWidget } from './src/monthlyCountWidget/monthly-count-widget.component';
import { MonthlyCountWidgetConfig } from './src/monthlyCountWidget/monthly-count-config.component';
import { MonthlyCountWidgetService } from './src/monthlyCountWidget/monthly-count-widget.service';
import { OperationsWidget } from './src/operationsWidget/operations-widget.component';
import { OperationsWidgetConfig } from './src/operationsWidget/operations-config.component';
import { OperationsWidgetService } from './src/operationsWidget/operations-widget.service';
import { CoreModule, HOOK_COMPONENT, RouterModule } from '@c8y/ngx-components';
import { UpgradeModule, HybridAppModule, UPGRADE_ROUTES } from '@c8y/ngx-components/upgrade';
import { AssetsNavigatorModule } from '@c8y/ngx-components/assets-navigator';
import { ReportsModule } from '@c8y/ngx-components/reports';
import { ContextDashboardModule } from '@c8y/ngx-components/context-dashboard';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { DeviceNameWidget } from './src/deviceNameWidget/device-name-widget.component';
import { DeviceNameWidgetConfig } from './src/deviceNameWidget/device-name-config.component';
import { FlipCardModule } from './src/flip-card/flip-card.module';
import { DeviceSearchWidget } from './src/deviceSearchWidget/device-search-widget.component';
import { DeviceSearchWidgetConfig } from './src/deviceSearchWidget/device-search-config.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule} from '@angular/common/http'
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { StatusWidget } from 'src/statusWidget/status-widget.component';
import { StatusWidgetConfig } from 'src/statusWidget/status-config.component';
import { StatusWidgetService } from 'src/statusWidget/status-widget.service';


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
    FlipCardModule,
    ChartsModule,
    FormsModule,
    // Upgrade module must be the last
    UpgradeModule,
    // @angular/material
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [ActiveStatusWidget, ActiveStatusWidgetConfig, DeviceTypesWidget, DeviceTypesWidgetConfig,
	OpenStatusWidget, OpenStatusWidgetConfig, DailyCountWidget, DailyCountWidgetConfig, OperationsWidget, 
	OperationsWidgetConfig, MonthlyCountWidget, MonthlyCountWidgetConfig, DeviceNameWidget, DeviceNameWidgetConfig, DeviceSearchWidget, DeviceSearchWidgetConfig, StatusWidget, StatusWidgetConfig],      
  entryComponents: [ActiveStatusWidget, ActiveStatusWidgetConfig, DeviceTypesWidget ,DeviceTypesWidgetConfig, 
	OpenStatusWidget, OpenStatusWidgetConfig, DailyCountWidget, DailyCountWidgetConfig, OperationsWidget,
	OperationsWidgetConfig, MonthlyCountWidget, MonthlyCountWidgetConfig, DeviceNameWidget, DeviceNameWidgetConfig, DeviceSearchWidget, DeviceSearchWidgetConfig, StatusWidget, StatusWidgetConfig],
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
      id: 'status.widget',                         
      label: 'Sayaçlarda Vana Durumu 2',
      description: 'Sayaçların açık ya da kapalı sayılarını gösterir.',
      component: StatusWidget,                         
      configComponent: StatusWidgetConfig,
    }
  },
  {
    provide: HOOK_COMPONENT,                         
    multi: true,
    useValue: {
      id: 'daily.count.widget',                         
      label: 'Haftalık Cihaz Kaydı',
      description: 'Haftalık kaydolan cihaz grafiğini görmenizi sağlar.',
      component: DailyCountWidget,                         
      configComponent: DailyCountWidgetConfig,
    }
  },
  {
    provide: HOOK_COMPONENT,                         
    multi: true,
    useValue: {
      id: 'monthly.count.widget',                         
      label: 'Ay Bazında Kaydolan Cihazlar',
      description: 'Ay bazında kaydolan cihaz sayısı grafiğini görmenizi sağlar.',
      component: MonthlyCountWidget,                         
      configComponent: MonthlyCountWidgetConfig,
    }
  },
  {
    provide: HOOK_COMPONENT,                         
    multi: true,
    useValue: {
      id: 'device.name.widget',                         
      label: 'Cihaz Adları',
      description: 'Ay bazında kaydolan cihaz sayısı grafiğini görmenizi sağlar.',
      component: DeviceNameWidget,                         
      configComponent: DeviceNameWidgetConfig,
    }
  },
  {
    provide: HOOK_COMPONENT,                         
    multi: true,
    useValue: {
      id: 'device.search.widget',                         
      label: 'Cihaz Arama',
      description: 'Cihaz bilgilerini tablodan aratmamıza yarar.',
      component: DeviceSearchWidget,                         
      configComponent: DeviceSearchWidgetConfig,
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
  {
    provide: HAMMER_LOADER,
    useValue: () => new Promise(() => {})
  },
  ThemeService,
  ActiveStatusWidgetService,
  DeviceTypesWidgetService,
  OpenStatusWidgetService,
  DailyCountWidgetService,
  MonthlyCountWidgetService,
  OperationsWidgetService,
  StatusWidgetService
  ]
})
export class AppModule extends HybridAppModule {
  constructor(protected upgrade: NgUpgradeModule) {
    super();
  }
}
