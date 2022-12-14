import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToDoList } from '../to-do-list/to-do-list.model';

@Component({
  selector: 'app-to-do-list-collection',
  templateUrl: './to-do-list-collection.component.html',
  styleUrls: ['./to-do-list-collection.component.scss'],
})
export class ToDoListCollectionComponent implements OnInit {
  private _lists: ToDoList[] = [];
  @Input() set lists(value: ToDoList[]) {
    this._lists = value;
  }
  get lists() {
    return this._lists;
  }

  private _addingNewList: null | undefined | boolean = false;
  @Input() set addingNewList(value: boolean | null | undefined) {
    this._addingNewList = value;
  }
  get addingNewList() {
    return this._addingNewList;
  }

  private _selectedList: null | undefined | ToDoList = null;
  @Input() set selectedList(value: ToDoList|null | undefined) {
    this._selectedList = value;
  }
  get selectedList() {
    return this._selectedList;
  }

  @Output() newListRequested = new EventEmitter();
  @Output() listSelected = new EventEmitter<ToDoList>();

  constructor() {}

  ngOnInit(): void {}

  isListSelected(list: ToDoList) {
    if (!this.selectedList) return false;
    if (list.name === this.selectedList.name) return true;
    return false;
  }

  onListClick(list: ToDoList) {
    if (this.selectedList && this.selectedList.name === list.name)
      return this.newListRequested.emit();
    this.listSelected.emit(list)
  }
}
