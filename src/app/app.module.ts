import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { ColorSchemeEditorComponent } from './color-scheme-editor/color-scheme-editor.component';
import { GridComponent } from './color-scheme-editor/grid.component';
import { LongPressDirective } from './color-scheme-editor/long-press.directive';
import { ResizedDirective } from './color-scheme-editor/resized.directive';
import { ResizeService } from './color-scheme-editor/resize.service';
import { LayoutPercentPipe, LayoutPixelPipe } from './color-scheme-editor/size.pipes';

@NgModule({
  declarations: [
    AppComponent,
    ColorSchemeEditorComponent,
    GridComponent,
    LayoutPercentPipe,
    LayoutPixelPipe,
    LongPressDirective,
    ResizedDirective
  ],
  imports: [
    BrowserModule,
    DragDropModule
  ],
  providers: [
    ResizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
