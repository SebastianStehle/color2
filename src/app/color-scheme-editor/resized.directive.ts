import { Directive, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, Output } from '@angular/core';
import { ResizeListener, ResizeService } from './resize.service';

@Directive({
    selector: '[appResized], [appResizeCondition]',
})
export class ResizedDirective implements OnDestroy, OnChanges, ResizeListener {
    private condition: ((rect: ClientRect) => boolean) | undefined;
    private conditionValue = false;
    private subscription: () => void;

    @Input('appResizeMinWidth')
    public minWidth?: number;

    @Input('appResizeMaxWidth')
    public maxWidth?: number;

    @Output('appResizeCondition')
    public resizeCondition = new EventEmitter<boolean>();

    @Output('appResized')
    public resize = new EventEmitter<ClientRect>();

    constructor(resizeService: ResizeService, element: ElementRef,
        private readonly zone: NgZone,
    ) {
        this.subscription = resizeService.listen(element.nativeElement, this);
    }

    public ngOnDestroy() {
        this.subscription();
    }

    public ngOnChanges() {
        const minWidth = parseInt(this.minWidth as any, 10);
        const maxWidth = parseInt(this.maxWidth as any, 10);

        if (minWidth > 0 && maxWidth > 0) {
            this.condition = rect => rect.width < minWidth! || rect.width > maxWidth!;
        } else if (maxWidth > 0) {
            this.condition = rect => rect.width > maxWidth!;
        } else if (minWidth > 0) {
            this.condition = rect => rect.width < minWidth!;
        } else {
            this.condition = undefined;
        }
    }

    public onResize(rect: ClientRect) {
        if (this.condition) {
            const value = this.condition(rect);

            if (this.conditionValue !== value) {
                this.zone.run(() => {
                    this.resizeCondition.emit(value);
                });

                this.conditionValue = value;
            }
        } else {
            this.zone.run(() => {
                this.resize.emit(rect);
            });
        }
    }
}