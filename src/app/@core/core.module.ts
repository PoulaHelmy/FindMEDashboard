import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule {
  // constructor(@Optional() @SkipSelf() core: CoreModule) {
  //   if (core) {
  //     throw new Error('You should import core module only in the root module');
  //   }
  // }
}
