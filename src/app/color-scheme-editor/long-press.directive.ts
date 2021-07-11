import {
    Directive,
    Input,
    Output,
    EventEmitter,
    HostBinding,
    HostListener
} from '@angular/core';

@Directive({ selector: '[longPress]' })
export class LongPressDirective {
    private pressing = false;
    private pressingLong = false;
    private timeout: any;
    private mouseX: number = 0;
    private mouseY: number = 0;

    @Input('longPressDuration')
    duration: number = 500;

    @Output()
    longPress: EventEmitter<any> = new EventEmitter();
    
    @Output()
    longPressing: EventEmitter<any> = new EventEmitter();
    
    @Output() 
    longPressEnd: EventEmitter<any> = new EventEmitter();


    @HostBinding('class.press')
    get pressClass() { 
        return this.pressing; 
    }

    @HostBinding('class.longpress')
    get longPressClass() { 
        return this.pressingLong;
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        if (event.which !== 1) {
            return;
        }

        this.mouseX = event.clientX;
        this.mouseY = event.clientY;

        this.pressing = true;
        this.pressingLong = false;

        this.timeout = setTimeout(() => {
            this.pressingLong = true;
            
            this.longPress.emit(event);

            this.loop(event);
        }, this.duration);

        this.loop(event);
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        if (this.pressing && !this.pressingLong) {
            const xThres = (event.clientX - this.mouseX) > 10;
            const yThres = (event.clientY - this.mouseY) > 10;

            if (xThres || yThres) {
                this.endPress();
            }
        }
    }

    @HostListener('mouseup')
    onMouseUp() { 
        this.endPress();
    }

    loop(event: MouseEvent) {
        if (this.pressingLong) {
            this.timeout = setTimeout(() => {
                this.longPressing.emit(event);
                this.loop(event);
            }, 50);
        }
    }

    endPress() {
        clearTimeout(this.timeout);

        this.pressingLong = false;
        this.pressing = false;

        this.longPressEnd.emit(true);
    }
}