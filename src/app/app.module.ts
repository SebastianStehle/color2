import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { ColorSchemeEditorComponent } from './color-scheme-editor/color-scheme-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorSchemeEditorComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
