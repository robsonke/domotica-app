import { DeviceComponent } from './../components/device.component';
import { DevicePipe } from './../pipes/device.pipe';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from "@angular/http";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MqttModule, MqttService } from 'ngx-mqtt';
import { HttpClientModule } from '@angular/common/http';

import { DomoticaApp } from './app.component';
import { LightPage } from '../pages/light/light';
import { SoundPage } from '../pages/sound/sound';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

export const MQTT_SERVICE_OPTIONS = {
  hostname: '192.168.0.110',
  port: 9001,
  path: '/'
};

export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}

@NgModule({
  declarations: [
    DomoticaApp,
    LightPage,
    SoundPage,
    HomePage,
    TabsPage,
    DevicePipe,
    DeviceComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(DomoticaApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: HomePage, name: 'HomePage', segment: 'home-page' },
        { component: SoundPage, name: 'SoundPage', segment: 'sound-page' }
      ]
    }),
    IonicStorageModule.forRoot(),
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: mqttServiceFactory
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DomoticaApp,
    LightPage,
    SoundPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
