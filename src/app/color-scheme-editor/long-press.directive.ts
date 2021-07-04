import {
    Directive,
    Input,
    Output,
    EventEmitter,
    HostBinding,
    HostListener
} from '@angular/core';

@Directive({ selector: '[onLongPress]' })
export class LongPressDirective {
    private pressing = false;
    private pressingLong = false;
    private timeout: any;
    private mouseX: number = 0;
    private mouseY: number = 0;

    @Input()
    duration: number = 500;

    @Output()
    onLongPress: EventEmitter<any> = new EventEmitter();
    
    @Output()
    onLongPressing: EventEmitter<any> = new EventEmitter();
    
    @Output() 
    onLongPressEnd: EventEmitter<any> = new EventEmitter();


    @HostBinding('class.press')
    get press() { 
        return this.pressing; 
    }

    @HostBinding('class.longpress')
    get longPress() { 
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
            
            this.onLongPress.emit(event);

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
                this.onLongPressing.emit(event);
                this.loop(event);
            }, 50);
        }
    }

    endPress() {
        clearTimeout(this.timeout);

        this.pressingLong = false;
        this.pressing = false;

        this.onLongPressEnd.emit(true);
    }
}