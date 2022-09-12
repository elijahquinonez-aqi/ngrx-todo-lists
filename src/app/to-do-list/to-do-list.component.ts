import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { ToDoItem } from './to-do-item.model';
import { ToDoList } from './to-do-list.model';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  @Input() toDoItems: ToDoItem[] = [];

  private _isAdding = true;
  @Input() set isAdding(value: null | undefined | boolean) {
    this._isAdding = !!value;
  }
  get isAdding(): boolean {
    return this._isAdding;
  }

  private _selectedList?: ToDoList;
  @Input() set selectedList(value: ToDoList | null | undefined) {
    if (!value) return;
    this._selectedList = value;
    this.listName = this._selectedList.name || '';
  }
  get selectedList() {
    return this._selectedList;
  }

  private _isNameUnique = true;
  @Input() set isNameUnique(value: boolean | null) {
    this._isNameUnique = !!value;
  }
  get isNameUnique() {
    return this._isNameUnique;
  }

  @Output() addToDoItem = new EventEmitter<string>();
  @Output() listNameChange = new EventEmitter<string>();
  @Output() saveList = new EventEmitter<ToDoList>();
  @Output() itemCompleted = new EventEmitter<ToDoItem>();

  get canAddList() {
    if (!this.listName) return false;
    if (!this.isNameUnique) return false;
    if (!this.selectedList?.toDoItems.length) return false;
    return true;
  }

  listName = this.selectedList?.name ?? '';

  nameErrorMessage = '';

  newItemName = '';

  private containsCapitalLetter(text: string) {
    const rx = new RegExp('[A-Z]');
    return rx.test(text);
  }

  private containsNumber(text: string) {
    const rx = new RegExp('[0-9]');
    return rx.test(text);
  }

  constructor() {}

  ngOnInit(): void {}

  completeList() {}

  reorderList(event: CdkDragDrop<string[]>) {}

  addToDo() {
    if (!this.selectedList || !this.newItemName) return;
    if (
      this.selectedList.toDoItems.map((i) => i.name).includes(this.newItemName)
    ) {
      window.alert('An item with same description exists.');
      return;
    }
    this.addToDoItem.emit(this.newItemName);
    this.newItemName = '';
  }

  onCompleteItem(event: MatSelectionListChange) {
    const selectedItems = event.options.filter(i => i.selected);
    const item: ToDoItem = {...selectedItems[selectedItems.length -1].value}
    this.itemCompleted.emit(item)
  }

  onListNameChanged(newName: string) {
    if (!this.containsCapitalLetter(newName)) {
      this.nameErrorMessage =
        'Name should include at lease one capital letter.';
      return;
    }
    if (!this.containsNumber(newName)) {
      this.nameErrorMessage = 'Name should include at least one number.';
      return;
    }
    this.nameErrorMessage = '';
    this.listNameChange.emit(newName);
  }

  onAddListButtonClick() {
    if (!this.selectedList) return;
    const list = new ToDoList();
    list.name = this.listName;
    list.toDoItems = [...this.selectedList?.toDoItems];
    this.saveList.emit(list);
  }
}
