import { Route } from "@angular/router";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";


export const USER_ROUTES: Route[] = [
  {
    path: '',
    component: ProfilePageComponent
  },
]
