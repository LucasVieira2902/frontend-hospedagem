import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from '../app-routing.module';
import { ApolloConfigModule } from '../apollo-config-module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    SharedModule,
    ApolloConfigModule
  ],
  exports: [
    AppRoutingModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule){
      throw new Error('CoreModule já foi carregado. Importe somente no AppModule.');
    }

  }

}