import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { ProductListComponent } from './product-list/product-list.component'
import { LoginComponent } from './login/login.component'
import { FormsModule } from '@angular/forms'
import { EditorCellComponent } from './editor-cell/editor-cell.component'

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    LoginComponent,
    EditorCellComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
