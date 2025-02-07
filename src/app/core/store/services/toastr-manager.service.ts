import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { EntityAction, EntityCacheAction, ofEntityOp, OP_ERROR, OP_SUCCESS } from '@ngrx/data';
import { Actions, ofType } from '@ngrx/effects';

import { ToastrService } from 'ngx-toastr';

import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ToastrManagerService {
  isBrowser = false;
  constructor(
    actions$: Actions,
    private readonly _toasterService: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    actions$.pipe(
      ofEntityOp(),
      filter(
        (ea: EntityAction) =>
        (ea.payload.entityOp.endsWith(OP_SUCCESS) && !ea.payload.entityOp.includes('query') && !ea.payload.entityName.includes('SchoolCourse')
        ))
    )
      // this service never dies so no need to unsubscribe
      .subscribe(action =>
        _toasterService.info(
          `${action.payload.entityOp} action`,
          action.payload.entityName
        )
      );

    actions$.pipe(
      ofEntityOp(),
      filter(
        (ea: EntityAction) =>
          ea.payload.entityOp.endsWith(OP_ERROR)
      )
    )
      // this service never dies so no need to unsubscribe
      .subscribe(action =>
        _toasterService.warn(
          `${action.payload.entityName} action`,
          action.payload.entityOp
        )
      );


    actions$
      .pipe(ofType(EntityCacheAction.SAVE_ENTITIES_SUCCESS))
      .subscribe((action: any) =>
        _toasterService.success(`${action.type} - url: ${action.payload.url}`, 'SaveEntities')
      );

    actions$
      .pipe(ofType(EntityCacheAction.SAVE_ENTITIES_ERROR))
      .subscribe((action: any) =>
        _toasterService.error(`${action.type} - url: ${action.payload.url}`, 'SaveEntities')
      );
  }


}
