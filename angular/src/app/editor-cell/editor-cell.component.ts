import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-editor-cell',
  templateUrl: './editor-cell.component.html',
  styleUrls: ['./editor-cell.component.css']
})
export class EditorCellComponent {
  @Input() editing = false
  @Input() value: string | null = ''
  @Output() toggle = new EventEmitter()
}
