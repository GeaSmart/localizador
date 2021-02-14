import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import{ Plugins} from '@capacitor/core';
import { environment } from 'src/environments/environment';
import{filter} from 'rxjs/operators';
import "@capacitor-community/firebase-analytics"
const {FirebaseAnalytics, Device} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  analyticsEnabled = true;

  constructor(private router:Router) { 
    this.initFirebase();

    this.router.events.pipe(
      filter((e: RouterEvent) => e instanceof NavigationEnd),
    ).subscribe((e:RouterEvent) => {
      console.log('route changed: ', e.url);
      this.setScreenName(e.url)
    });
  }

  async initFirebase(){
    if((await Device.getInfo()).platform == 'web'){
      FirebaseAnalytics.initializeFirebase(environment.firebaseConfig);//check
    }
  }

  setUser(){
    FirebaseAnalytics.setUserId({
      userId:"",
    });
  }

  setProperty(){
    FirebaseAnalytics.setUserProperty({
      name:"framework",
      value:"angular",
    });
  }

  logEvent(){
    FirebaseAnalytics.logEvent({
      name:"login",
      params:{
        method:"email"
      }
    });
  }

  setScreenName(screenName){
    FirebaseAnalytics.setScreenName({
      screenName
    });
  }

  toggleAnalytics(){
    this.analyticsEnabled = !this.analyticsEnabled;
    FirebaseAnalytics.setCollectionEnabled({
      enabled:this.analyticsEnabled,
    });

  }
}
