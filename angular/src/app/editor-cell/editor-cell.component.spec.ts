import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditorCellComponent } from './editor-cell.component'

describe('EditorCellComponent', () => {
  let component: EditorCellComponent;
  let fixture: ComponentFixture<EditorCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
