import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { ColorSchemeEditorComponent } from './color-scheme-editor/color-scheme-editor.component';
import { GridComponent } from './color-scheme-editor/grid.component';
import { LongPressDirective } from './color-scheme-editor/long-press.directive';

@NgModule({
  declarations: [
    AppComponent,
    ColorSchemeEditorComponent,
    GridComponent,
    LongPressDirective
  ],
  imports: [
    BrowserModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
