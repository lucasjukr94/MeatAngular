import {Routes} from '@angular/router'
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { OrderSummaryComponent } from './order/order-summary/order-summary.component'
import { MenuComponent } from './restaurant-detail/menu/menu.component'
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component'
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component'
import { RestaurantsComponent } from './restaurants/restaurants.component'
import { LoggedInGuard } from './security/loggedin.guard'
import { LoginComponent } from './security/login/login.component'

export const ROUTES: Routes = [
    {path:'', component:HomeComponent},
    {path:'about', loadChildren:() => import('./about/about.module').then(m => m.AboutModule)},//Exemplo de lazy loading
    {path:'restaurants', component:RestaurantsComponent},
    {path:'restaurants-detail/:id', component:RestaurantDetailComponent,
        children:[
            {path:'', redirectTo:'menu', pathMatch:'full'},
            {path:'menu', component:MenuComponent},
            {path:'reviews', component:ReviewsComponent}
        ]
    },
    {path:'order', loadChildren:() => import('./order/order.module').then(m => m.OrderModule), 
        canLoad: [
            LoggedInGuard
        ],
        canActivate: [
            LoggedInGuard
        ]
    },
    {path:'order-summary', component:OrderSummaryComponent},
    {path:'login/:to', component:LoginComponent},
    {path:'login', component:LoginComponent},
    {path:'**', component:NotFoundComponent}//página de erro, não encontrado 404, rota de wildcard
]
