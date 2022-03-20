import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// directives
import { NumberOnlyService } from './directives/number-only/number-only.service';


// angular material
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule, MAT_TABS_CONFIG } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// component
import { HeaderComponent } from './component/main-page/header/header.component';
import { LandingPageComponent } from './component/main-page/landing-page/landing-page.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { BillManagementComponent } from './component/bill/bill-management/bill-management.component';

const routes: Routes = [
    {
        path: '', component: LandingPageComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'bill/management', component: BillManagementComponent },
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule.forChild(routes),

        //angular material 
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatListModule,
        MatSidenavModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatButtonToggleModule,
        MatIconModule,
        MatToolbarModule,
        MatDividerModule,
        MatSelectModule,
        MatStepperModule,
        MatTabsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatTooltipModule,
        MatRadioModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatTableModule,
        MatProgressBarModule,

    ],
    exports: [RouterModule],
    declarations: [
        HeaderComponent,
        LandingPageComponent,
        DashboardComponent,
        BillManagementComponent,

        NumberOnlyService
    ],
    entryComponents: [
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppRoutingModule { }