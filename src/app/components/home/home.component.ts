import {Component, ViewChild, AfterViewInit, OnInit, OnDestroy} from '@angular/core';
import {VERSION} from '@angular/material';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import {MatSelect} from '@angular/material';

import { ReplaySubject } from 'rxjs';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

interface Bank {
  id: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor() { }

  version = VERSION;

  /** control for the selected bank */
  public bankCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();

  /** list of banks */
  private banks: Bank[] = [
    {name: 'Delhi', id: 'A'},
    {name: 'Mumbai', id: 'B'},
    {name: 'Chennai', id: 'C'},
    {name: 'Bangalore', id: 'D'},
    {name: 'Kolkata', id: 'E'},
    {name: 'Lucknow', id: 'F'},
    {name: 'Jaipur', id: 'G'},
    {name: 'Udaipur', id: 'H'},
    {name: 'Gangtok', id: 'I'},
    {name: 'Bhopal', id: 'J'},
    {name: 'Kanpur', id: 'K'},
    {name: 'Allahabad', id: 'L'},
    {name: 'Vijaywada', id: 'M'},
    {name: 'Hyderabad', id: 'N'},
    {name: 'Kochi', id: 'O'}
  ]

  /** list of banks filtered by search keyword */
  public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();
  selectedCityName: any;

  ngOnInit() {
    // set initial selection
    this.bankCtrl.setValue(this.banks[10]);

    // load the initial bank list
    this.filteredBanks.next(this.banks.slice());

    // listen for search field value changes
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  selectCityForWeatherCheck(event: MatAutocompleteSelectedEvent) {
    // this.bankCtrl = selectedValue;
    console.log(event);
    const selectedCity = {
      name: event.option.value.name,
      id: event.option.value.id
    };
    this.bankCtrl.setValue(selectedCity.name);
    this.selectedCityName = selectedCity.name;
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  private setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        // this.singleSelect.compareWith = (a: Bank, b: Bank) => a.id === b.id;
        this.bankCtrl.setValue(this.banks[10].name);
        this.selectedCityName = this.banks[10].name;
      });
  }

  private filterBanks() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }
}


