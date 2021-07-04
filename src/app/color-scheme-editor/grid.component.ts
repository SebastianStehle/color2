import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type PositionedLabel = { label: string; position: string };

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent {    
    public xScales: string[] = [];   
    public yScales: string[] = [];

    public xPositionedLabels: PositionedLabel[] = [];
    public yPositionedLabels: PositionedLabel[] = [];

    @Input()
    public set xLabels(value: string[]) {
        this.xPositionedLabels = computeLabels(value);
    }

    @Input()
    public set yLabels(value: string[]) {
        this.yPositionedLabels = computeLabels(value);
    }

    @Input()
    public set xSegments(value: number) {
        this.xScales = computePositions(value);
    }

    @Input()
    public set ySegments(value: number) {
        this.yScales = computePositions(value);
    }
}

function computeLabels(labels: string[]) {
    const result: PositionedLabel[] = [];

    let i = 0;

    for (let label of labels) {
        result.push({
            position: `${i * (100 / (labels.length - 1))}%`,
            label
        });

        i++;
    }

    return result;
}

function computePositions(value: number) {
    const result: string[] = [];

    for (let i = 1; i <= value; i++) {
        result.push(`${i * (100 / value)}%`);
    }

    return result;
}