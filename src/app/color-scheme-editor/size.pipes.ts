import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'layoutPixel',
    pure: true
})
export class LayoutPixelPipe implements PipeTransform {
    public transform(value: number) {
        return `${value}px`;
    }
}

@Pipe({
    name: 'layoutPercent',
    pure: true
})
export class LayoutPercentPipe implements PipeTransform {
    public transform(value: number) {
        return `${value}%`;
    }
}