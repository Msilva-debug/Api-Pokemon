import { ViewportScroller } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilService {
  private viewportScroller = inject(ViewportScroller);

  public scrollInicio() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
