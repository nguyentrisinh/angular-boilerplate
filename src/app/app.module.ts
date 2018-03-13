import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HttpClient, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Router, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// In-Memory Web API Import
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

// Injectors
import { CustomHttpInterceptor } from './infrastructures/http-interceptor/custom-http-interceptor';

// Components
import { AppComponent } from './app.component';
import { HeroesComponent } from './views/heroes/heroes.component';
import { HeroDetailComponent } from './views/hero-detail/hero-detail.component';

// Services
import { HeroService } from './services/hero-service/hero.service';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageService } from './services/message-service/message.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { ConstantService } from './services/constant-service/constant.service';

// Extra module
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    HeroService,
    MessageService,
    ConstantService,
    InMemoryDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: function( router: Router ) {
        return new CustomHttpInterceptor(router);
      },
      multi: true,
      deps: [Router]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
