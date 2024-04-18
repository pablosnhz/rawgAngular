import { ActivatedRouteSnapshot, BaseRouteReuseStrategy, RouteReuseStrategy } from "@angular/router";

export class RouteReuseStrategyChange extends BaseRouteReuseStrategy {
  public override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    if(curr.routeConfig?.data?.['doNotReuse']) {
      return false;
    }
    return future.routeConfig === curr.routeConfig
  }
}
