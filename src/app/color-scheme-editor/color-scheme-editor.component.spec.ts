import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSchemeEditorComponent } from './color-scheme-editor.component';

describe('ColorSchemeEditorComponent', () => {
    let component: ColorSchemeEditorComponent;
    let fixture: ComponentFixture<ColorSchemeEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ColorSchemeEditorComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ColorSchemeEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
