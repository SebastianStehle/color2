import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';

interface ColorScheme {
    channels: ColorChannel[];
}

interface ColorChannel {
    name: string;

    class: string;

    points: number[][];
}

module SVG {
    export type Point = { x: number, y: number };
}

@Component({
    selector: 'app-color-scheme-editor',
    templateUrl: './color-scheme-editor.component.html',
    styleUrls: ['./color-scheme-editor.component.scss']
})
export class ColorSchemeEditorComponent {
    @Input()
    public scheme: ColorScheme;

    public selectedChannel: ColorChannel;

    public sizeX = 500;
    public sizeY = 300;

    public currentX = 0;
    public currentY = 0;

    public dragging = false;

    public get width() {
        return `${this.sizeX}px`;
    }

    public get height() {
        return `${this.sizeY}px`;
    }

    public get channels() {
        return this.scheme.channels;
    }

    public elements: { svg: string, points: SVG.Point[] }[] = [];

    constructor() {
        this.scheme = {
            channels: [{
                name: 'Red',
                points: [
                    [10, 10],
                    [20, 20],
                    [30, 10],
                    [40, 40]
                ],
                class: 'red'
            }, {
                name: 'Green',
                points: [
                    [10, 10],
                    [20, 20],
                    [30, 10],
                    [40, 40]
                ],
                class: 'green'
            }, {
                name: 'Blue',
                points: [
                    [10, 10],
                    [20, 20],
                    [30, 10],
                    [40, 40]
                ],
                class: 'blue'
            }]
        }

        this.selectedChannel = this.scheme.channels[0];

        for (const channel of this.scheme.channels) {
            const points = this.getPoints(channel);

            this.elements.push({ points, svg: this.getPath(points) });
        }
    }

    public selectChannel(channel: ColorChannel) {
        this.selectedChannel = channel;
    }

    public onMoved(index: number, channel: ColorChannel, event: CdkDragEnd) {
        this.dragging = true;

        this.currentX = event.source.freeDragPosition.x + event.distance.x;
        this.currentY = event.source.freeDragPosition.y + event.distance.y;

        const points = this.getPoints(channel);

        points[index + 1].x += event.distance.x;
        points[index + 1].y += event.distance.y;

        points.sort((rhs, lhs) => rhs.x - lhs.x);

        this.elements[this.channels.indexOf(channel)].svg =  this.getPath(points);
    }

    public onMoveEnded(index: number, channel: ColorChannel, event: CdkDragEnd) {
        this.dragging = false;
    
        const newX = Math.min(this.sizeX, Math.max(event.source.freeDragPosition.x + event.distance.x, 0));
        const newY = Math.min(this.sizeY, Math.max(event.source.freeDragPosition.y + event.distance.y, 0));

        channel.points[index][0] = (newX / this.sizeX) * 100;
        channel.points[index][1] = (newY / this.sizeY) * 100;

        this.updateChannel(channel);
    }

    public onRemove(index: number, channel: ColorChannel) {
        if (confirm('Löschen')) {
            channel.points.splice(index, 1);

            this.updateChannel(channel);
        }
    }

    public onAdd(channel: ColorChannel, event: MouseEvent) {
        const x = event.offsetX;
        const y = event.offsetY;

        channel.points.push([
            (x / this.sizeX) * 100,
            (y / this.sizeY) * 100,
        ]);

        this.updateChannel(channel);
    }

    private updateChannel(channel: ColorChannel) {
        channel.points.sort((lhs, rhs) => lhs[0] - rhs[0]);
        
        const element = this.elements[this.channels.indexOf(channel)];
        
        element.points = this.getPoints(channel);
        element.svg = this.getPath(element.points);
    }

    private getPoints(channel: ColorChannel) {
        const points: SVG.Point[] = [{
            x: 0, y: this.sizeY
        }];

        for (let i = 0; i < channel.points.length; i++) {    
            const x = Math.round(this.sizeX * (channel.points[i][0] / 100));
            const y = Math.round(this.sizeY * (channel.points[i][1] / 100));

            points.push({ x, y });
        }

        points.push({ x: this.sizeX, y: this.sizeY });

        return points;
    }

    public getPath(points: SVG.Point[]) {
        let path = `M${points[0].x},${points[0].y}`;

        for (let i = 0; i < points.length; i++) {
            const { x, y } = points[i];
            
            path += ` L${x},${y}`;
        }

        return path;
    }
}