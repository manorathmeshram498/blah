import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {  MatCardModule} from '@angular/material/card';
import { MatDialogModule} from '@angular/material/dialog';
import {  MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';

import {CdkTableModule} from '@angular/cdk/table';

import { from } from 'rxjs';

export const modules = [
  // CDK
  CdkTableModule,

  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatListModule,
  MatTableModule,
  MatSlideToggleModule,
];

@NgModule({
    imports: modules,
    exports: modules
  })
  export class AresMaterialModule {
  }
