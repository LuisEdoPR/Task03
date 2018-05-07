import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ShowOptionDeleteDirective } from './show-option-delete.directive';

@NgModule({
	declarations: [ AppComponent, ItemsComponent, ShowOptionDeleteDirective ],
	imports: [ BrowserModule ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
