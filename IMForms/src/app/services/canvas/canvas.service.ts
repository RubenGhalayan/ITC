import { Injectable } from '@angular/core';

@Injectable()
export class ListenCanvasChangesService {
    private dirty: boolean;
    constructor() {}

    setDirty(dirty: any) {
        this.dirty = dirty;
    }

    checkDirty() {
        return this.dirty;
    }
}
