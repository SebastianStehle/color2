import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent {    
    public xScales: string[] = [];   
    public yScales: string[] = [];

    @Input()
    public set xSegments(value: number) {
        this.xScales = [];

        for (let i = 1; i <= value; i++) {
            this.xScales.push(`${i * (100 / value)}%`);
        }
    }

    @Input()
    public set ySegments(value: number) {
        this.yScales = [];

        for (let i = 1; i <= value; i++) {
            this.yScales.push(`${i * (100 / value)}%`);
        }
    }
}