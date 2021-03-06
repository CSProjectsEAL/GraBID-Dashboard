import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { AceEditorModule } from 'ng2-ace-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DndListModule} from '@fjsc/ng2-dnd-list';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardElementComponent } from './dashboard-element/dashboard-element.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PieComponent } from './chart-types/pie/pie.component';
import { BarComponent } from './chart-types/bar/bar.component';
import { ExpLineComponent } from './chart-types/exp-line/exp-line.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SearchComponent,
    MenuComponent,
    DashboardElementComponent,
    PageNotFoundComponent,
    PieComponent,
    BarComponent,
    ExpLineComponent
  ],
  imports: [
    BrowserModule,
    NgxEchartsModule,
    AceEditorModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DndListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
