// angular
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// libs
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

// app
import { BaseContainerComponent } from '~/app/framework/core';
import { createColumn, createOptions, createRouteButton, DataTable } from '~/app/shared/data-table';
import { routeAnimation, Scrollable } from '~/app/shared';
import { Airline, airlineActions, AirlineSelectors, State } from '~/app/store';

@Component({
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnimation]
})
export class AirlineComponent extends BaseContainerComponent implements OnInit {
  airlines$: Observable<Array<Airline>>;
  baseRoute: Array<any>;
  airlineTable: DataTable;

  constructor(private readonly router: Router,
              protected readonly store$: Store<State>) {
    super(store$);
  }

  ngOnInit(): void {
    this.baseRoute = ['/', 'air-universal', 'airlines'];

    this.airlineTable = {
      cols: [
        createColumn('_id', 'PUBLIC.AIR_UNIVERSAL.AIRLINE.AIRLINE_TABLE.ID_COL_TITLE'),
        createColumn('iataCode', 'PUBLIC.AIR_UNIVERSAL.AIRLINE.AIRLINE_TABLE.IATA_CODE_COL_TITLE'),
        createColumn('name', 'PUBLIC.AIR_UNIVERSAL.AIRLINE.AIRLINE_TABLE.NAME_COL_TITLE')
      ],
      filterCol: 'name',
      buttons: [createRouteButton('', 'edit', 'PUBLIC.SHARED.ACTION.EDIT', this.baseRoute, '_id')],
      options: createOptions('', 'PUBLIC.AIR_UNIVERSAL.AIRLINE.AIRLINE_TABLE.TITLE', Scrollable.Full)
    };

    this.isProcessing$ = this.store$
      .pipe(select(AirlineSelectors.getIsProcessing));
    this.error$ = this.store$
      .pipe(select(AirlineSelectors.getError));
    this.airlines$ = this.store$
      .pipe(select(AirlineSelectors.getMany));

    this.store$.dispatch(airlineActions.airUniversalGetManyAirlines());
  }

  createAirline(): void {
    this.router.navigate([...this.baseRoute, 'create']);
  }

  refresh(): void {
    this.store$.dispatch(airlineActions.airUniversalGetManyAirlines());
  }
}
