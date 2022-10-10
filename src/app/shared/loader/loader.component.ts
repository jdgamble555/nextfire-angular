import { Component, Input } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  private _show: boolean = false;

  @Input()
  get show(): boolean {
    return this._show;
  }
  set show(value: BooleanInput) {
    this._show = coerceBooleanProperty(value);
  }

  constructor(private ls: LoaderService) {
    this._show = this.ls.loading;
  }
}
