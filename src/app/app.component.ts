// Copyright 2022 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */
import { Filter} from './Interface/car-filter';
import { Make, Model, Trim, Bodies, Engine, DoorCount } from './Classes/Vehicle'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DeviceInfoService } from './Services/device-info.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { UserDataService } from './Services/user-data.service';
import { TokenService } from 'dm-api';
import { CarFiltersService } from './Services/car-filters.service';
import { CamGalService } from './Services/cam-gal.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
export type platform_name = 'ios' | 'android' | 'web';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  platform_name: platform_name;
  authUrl = 'register';
  apiRoute: any = {};
  getTokenAccess: any = {};
  refreshToken: any = {};

  lang: string = 'ar'; // ar, en
  theme: string = 'light'; // light, dark

  constructor(
    private platform: Platform,
    private deviceInfo: DeviceInfoService,
    private router: Router,
    private userData: UserDataService,
    private token: TokenService,
    private filters: CarFiltersService,
    private camGal: CamGalService,
    private iab: InAppBrowser,
    public translate: TranslateService
  ) {
    this.translate.setDefaultLang('ar');

    window.addEventListener('statusTap', function () {
      console.log('statusbar tapped');
    });
    
  }


  

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  ngOnInit(): void {
    this.initializeApp();
    this.userData.isSignedIn().then((status:any)=>{
        console.log('Signed In: ', status);
    })
  }

  initializeApp() {
    if (Capacitor.getPlatform() === (this.platform_name = 'ios')) {
      console.log('Platform:', 'IOS');
    } else if (Capacitor.getPlatform() === (this.platform_name = 'android')) {
      console.log('Platform:', 'Android');
    } else if (Capacitor.getPlatform() == (this.platform_name = 'web')) {
      console.log('Platform:', 'Web');
    }

    //this.router.navigate(['register']);

    /*this.auth.getAuthToken()
    .then((token:string)=>{
      console.log("TOKEN GOT", token);
    })
    .catch((error)=>{
      console.log("TOKEN ERROR: ", error);
    });*/

    // GETTING USER OBJECT FROM LOCAL STORAGE.
    this.userData.getUserObj().then((obj) => {
      console.log('User OBJ :', JSON.parse(obj.value));
    });

    // GETTING USER ID FROM LOCAL STORAGE.
    this.userData.getUserId().then((id) => {
      console.log('USER ID: ', id);
    });

    this.platform.ready().then((plt) => {
      // SETTING DEVICE HEIGHT AND WIDTH
      this.deviceInfo.setDeviceHeight(this.platform.height());

      // CHECK DEFAULT LANGUAGE OF THE APP.
      this.deviceInfo.getDefaultLanguage().then((res) => {
        if (res == null) {
          // SET DEFAULT LANGUAGE OF THE APP IF ITS NOT SET.
          this.deviceInfo.setDefaultLanguage(this.lang);
        }
      });

      /**
       * fetch('http://localhost:3000', {
  
            // HTTP request type
            method: "POST",
  
            // Sending our blob with our request
            body: blob
        })
        .then(response => alert('Blob Uploaded'))
        .catch(err => alert(err));
    }
       */

      // CHECK DEFAULT THEME OF THE APP
      this.deviceInfo.getDefaultTheme().then((res: string) => {
        if (res == null) {
          this.deviceInfo.setDefaultTheme(this.theme);
        } else {
          this.deviceInfo.applyTheme(res);
        }
      });

      // getDefaultTheme();
      // getDefaultFontsize();
      if (localStorage.getItem('lang')) {
        this.lang = localStorage.getItem('lang');
        this.translate.use(this.lang);
      } else {
        localStorage.setItem('lang', 'ar');
      }
    });
  }

  createFilters() {
    // CREATING ARRAY OF FILTERS
    let apiResp = [
      {
        name: {en: 'Body', ar: 'الهيكل'},

        path: "Kbody"
      },
      {
          "_id": "62276e52de5b632b481db497",
          "name": {
              "en": "Condition",
              "ar": "الحالة"
          },
          "path": "Condition",
          "addVehicleOrder": 0,
          "filterOrder": 0,
          "types": [
              {
                  "_id": "a83d7d24-5e48-4bd1-83a9-05d51b6fe839",
                  "name": {
                      "en": "Used",
                      "ar": "مستخدمة"
                  }
              },
              {
                  "_id": "c96de34f-2116-44ed-ada2-509bb993e36a",
                  "name": {
                      "en": "New",
                      "ar": "جديدة"
                  }
              }
          ]
      },
      {
          "_id": "62276e52de5b632b481db49e",
          "name": {
              "en": "Model Year",
              "ar": "سنة الطراز"
          },
          "path": "Kyear",
          "addVehicleOrder": 1,
          "filterOrder": 0,
          "types": [
              {
                  "_id": "aa802a42-7009-4f25-a6dd-ac5dc39b9a32",
                  "name": {
                      "en": "2005",
                      "ar": "2005"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "9d7f878d-05d8-4090-81ae-847496b0d696",
                  "name": {
                      "en": "2004",
                      "ar": "2004"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "e8df18b9-4c9b-454b-bc7c-3dc48f451df2",
                  "name": {
                      "en": "2003",
                      "ar": "2003"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "a778ccbf-f6b7-4f4d-bff9-d6d71e5ed11e",
                  "name": {
                      "en": "2002",
                      "ar": "2002"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "4f09ccca-c0b3-40d5-b9e3-78edd399982e",
                  "name": {
                      "en": "2001",
                      "ar": "2001"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "3f075008-dadb-4da1-975d-e2f04cde1006",
                  "name": {
                      "en": "2000",
                      "ar": "2000"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "c091176e-9f63-4eec-88ac-a2f11fadbdb0",
                  "name": {
                      "en": "1999",
                      "ar": "1999"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "8a20b531-45e5-4ca1-8485-3ae617f898a0",
                  "name": {
                      "en": "1998",
                      "ar": "1998"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "7ec3be53-5f0d-4663-ad92-fc8be4117905",
                  "name": {
                      "en": "1997",
                      "ar": "1997"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "5817b9d7-7491-411d-be94-e205c759acd0",
                  "name": {
                      "en": "1996",
                      "ar": "1996"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "ff39b543-2f1a-4bff-89ea-00297f056863",
                  "name": {
                      "en": "1995",
                      "ar": "1995"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "7a0fb18a-6c6e-429c-9863-8d892d2b3f45",
                  "name": {
                      "en": "1994",
                      "ar": "1994"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "d1743931-b888-4335-af02-221b81a00c09",
                  "name": {
                      "en": "1993",
                      "ar": "1993"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "b1bccf2e-5438-4721-abe7-e8d6c648babc",
                  "name": {
                      "en": "1992",
                      "ar": "1992"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "7c777200-1437-4d5b-a340-9003e05a0e35",
                  "name": {
                      "en": "1991",
                      "ar": "1991"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "9f99fab6-28f5-4166-8064-6cfd97bb1b33",
                  "name": {
                      "en": "1990",
                      "ar": "1990"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "7a6c2961-16ef-4b0e-a193-30bbf3e22cd2",
                  "name": {
                      "en": "1989",
                      "ar": "1989"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "b7d803b7-0787-4073-836c-28d26b33aa33",
                  "name": {
                      "en": "1988",
                      "ar": "1988"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "0e488668-d5de-481b-84c7-23143902ae40",
                  "name": {
                      "en": "1987",
                      "ar": "1987"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "07b3970b-25f6-4660-b14a-fad5dceaf3bf",
                  "name": {
                      "en": "1986",
                      "ar": "1986"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "fabd6928-cdea-489a-b4f9-fd115f732388",
                  "name": {
                      "en": "1985",
                      "ar": "1985"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "56a1d182-4b1e-46d6-b174-9e4e58bf4961",
                  "name": {
                      "en": "1984",
                      "ar": "1984"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "e4047924-4e3f-4d86-bc39-725361b32a09",
                  "name": {
                      "en": "1983",
                      "ar": "1983"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "0f5d53c8-4cd6-4396-a887-31b9b0914db7",
                  "name": {
                      "en": "1982",
                      "ar": "1982"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "82544b13-c9c6-4f1d-81d1-5cad454e6d04",
                  "name": {
                      "en": "1981",
                      "ar": "1981"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "57f48b61-2ab8-4585-b558-e56aa09d24ca",
                  "name": {
                      "en": "1980",
                      "ar": "1980"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "59c9425d-ce37-48ac-80c0-cced2d53dab4",
                  "name": {
                      "en": "1979",
                      "ar": "1979"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "a60881c8-ffae-4057-b8d0-fcdacf41aa6e",
                  "name": {
                      "en": "1978",
                      "ar": "1978"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "e93f4312-f2d5-4796-afa5-645a882b9e4c",
                  "name": {
                      "en": "1977",
                      "ar": "1977"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "f60ce05a-cfc7-481f-a23b-a75f4c01fba6",
                  "name": {
                      "en": "1976",
                      "ar": "1976"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "bcb5fc60-0d87-4184-a246-948f5c5ec56c",
                  "name": {
                      "en": "1975",
                      "ar": "1975"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "5601d813-a018-4461-a9c6-53a3fa520155",
                  "name": {
                      "en": "1974",
                      "ar": "1974"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "31f3bd8c-3554-4a2a-9d0a-7f61c5b648db",
                  "name": {
                      "en": "1973",
                      "ar": "1973"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "624ecde2-4732-4dd1-9edd-35444341b0c2",
                  "name": {
                      "en": "1972",
                      "ar": "1972"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "a99d2d0f-9751-4d38-8214-aa2ed71a3aff",
                  "name": {
                      "en": "1971",
                      "ar": "1971"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "b5a41dfd-b96a-481c-b430-827c693405b7",
                  "name": {
                      "en": "1970",
                      "ar": "1970"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "1e6954e9-7aff-46aa-9b24-a520fbf990aa",
                  "name": {
                      "en": "1969",
                      "ar": "1969"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "83a2e5cd-c487-4616-a5f9-f6a89e9610b0",
                  "name": {
                      "en": "1968",
                      "ar": "1968"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "1c392885-23b3-4b0a-acd8-eb3a950ab397",
                  "name": {
                      "en": "1967",
                      "ar": "1967"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "8564e3d5-800a-477a-8684-f837aaea2da5",
                  "name": {
                      "en": "1966",
                      "ar": "1966"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "6c92cfcc-ba91-43c9-9746-3de9c3897cef",
                  "name": {
                      "en": "1965",
                      "ar": "1965"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "79e218ab-b71f-400a-b94b-a676fa483b19",
                  "name": {
                      "en": "1964",
                      "ar": "1964"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "9de82f55-d241-479a-be6b-7334f8f97d05",
                  "name": {
                      "en": "1963",
                      "ar": "1963"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "3ee4c28b-07dc-415f-b4b7-d4b967ac860e",
                  "name": {
                      "en": "1962",
                      "ar": "1962"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "e30d6749-9544-468a-92b4-8d7d5a48cd33",
                  "name": {
                      "en": "1961",
                      "ar": "1961"
                  },
                  "error": {
                      "en": "Someting went wrong ",
                      "ar": "Someting went wrong "
                  }
              },
              {
                  "_id": "1dd8075e-8c51-45c7-bb80-70720a79648f",
                  "name": {
                      "en": "1960",
                      "ar": "1960"
                  },
                  "minTravelledDistance": 200000,
                  "error": {
                      "en": "This vehicle year must be driven more than 200,000 Kilometer",
                      "ar": "يجب أن لا تقل المسافة المقطوعة لسنة الطراز هذه عن 200,000 كيلومتر"
                  }
              }
          ]
      },
      {
          "_id": "630b56c43486c25bc36d9afd",
          "name": {
              "en": "Exterior Color",
              "ar": "اللون الخارجي"
          },
          "path": "exterior_color",
          "addVehicleOrder": 2,
          "filterOrder": 0,
          "types": [
              {
                  "_id": "91aca7e7-cd1e-4b88-9e2e-e9b0cabeb77d",
                  "name": {
                      "en": "White",
                      "ar": "أبيض"
                  },
                  "cssHex": "#FFFFFF"
              },
              {
                  "_id": "91aca7e7-cd1e-4b88-9e2e-e9b0cabeb7ow",
                  "name": {
                      "en": "Off White",
                      "ar": "حليبي"
                  },
                  "cssHex": "#F9F5EC"
              },
              {
                  "_id": "a298a89b-2e0e-4b7d-91c4-49d7bd1fbba0",
                  "name": {
                      "en": "Beige",
                      "ar": "بايج"
                  },
                  "cssHex": "#ECEBC9"
              },
              {
                  "_id": "ca927ed0-42f6-4941-b991-a0bc99467f5e",
                  "name": {
                      "en": "Yellow",
                      "ar": "أصفر"
                  },
                  "cssHex": "#FFE142"
              },
              {
                  "_id": "7ddb9954-cf08-46de-8a00-2c217beda0d2",
                  "name": {
                      "en": "Gold",
                      "ar": "ذهبي"
                  },
                  "cssHex": "#EFCA00"
              },
              {
                  "_id": "3a486c4d-156f-4ec5-b52f-cb2cfb4b69f3",
                  "name": {
                      "en": "Orange",
                      "ar": "برتقالي"
                  },
                  "cssHex": "#FF8B02"
              },
              {
                  "_id": "3a486c4d-156f-4ec5-b52f-cb2cfb4b69sa",
                  "name": {
                      "en": "Saffron",
                      "ar": "زعفراني"
                  },
                  "cssHex": "#E2B322"
              },
              {
                  "_id": "3a486c4d-156f-4ec5-b52f-cb2cfb4b69tan",
                  "name": {
                      "en": "Tan",
                      "ar": "حنطي"
                  },
                  "cssHex": "#B79364"
              },
              {
                  "_id": "1f6c6c01-1a90-4950-872f-bc2341a023c1",
                  "name": {
                      "en": "Brown",
                      "ar": "بني"
                  },
                  "cssHex": "#824101"
              },
              {
                  "_id": "1f6c6c01-1a90-4950-872f-bc2341a023ma",
                  "name": {
                      "en": "Maroon",
                      "ar": "ماروني"
                  },
                  "cssHex": "#6A0101"
              },
              {
                  "_id": "1f6c6c01-1a90-4950-872f-bc2341a023bu",
                  "name": {
                      "en": "Burgundy",
                      "ar": "عنابي"
                  },
                  "cssHex": "#9A2B4C"
              },
              {
                  "_id": "eb388bec-2fa1-4607-94b3-b3764835adb8",
                  "name": {
                      "en": "Red",
                      "ar": "أحمر"
                  },
                  "cssHex": "#C00101"
              },
              {
                  "_id": "eb388bec-2fa1-4607-94b3-b3764835adpin",
                  "name": {
                      "en": "Pink",
                      "ar": "وردي"
                  },
                  "cssHex": "#EEA8B4"
              },
              {
                  "_id": "57e2c879-9c8e-4428-a542-bd6e4b3a5pur",
                  "name": {
                      "en": "Purple",
                      "ar": "بنفسجي"
                  },
                  "cssHex": "#630063"
              },
              {
                  "_id": "28f28f2a-9d38-4fa3-9294-cc02de23beblu",
                  "name": {
                      "en": "Blue",
                      "ar": "أزرق"
                  },
                  "cssHex": "#0000C7"
              },
              {
                  "_id": "28f28f2a-9d38-4fa3-9294-cc02de23bcay7",
                  "name": {
                      "en": "Cyan",
                      "ar": "بحري"
                  },
                  "cssHex": "#00CECE"
              },
              {
                  "_id": "97d02059-2d65-4eae-abef-757ce004greb",
                  "name": {
                      "en": "Green",
                      "ar": "أخضر"
                  },
                  "cssHex": "#01A301"
              },
              {
                  "_id": "97d02059-2d65-4eae-abef-757ce0049sil",
                  "name": {
                      "en": "Silver",
                      "ar": "فضي"
                  },
                  "cssHex": "#D6D6D6"
              },
              {
                  "_id": "97d02059-2d65-4eae-abef-757ce0049gre",
                  "name": {
                      "en": "Grey",
                      "ar": "رمادي"
                  },
                  "cssHex": "#808080"
              },
              {
                  "_id": "d02acd52-9e5b-44ab-8336-a3e440724800",
                  "name": {
                      "en": "Black",
                      "ar": "أسود"
                  },
                  "cssHex": "#000000"
              }
          ]
      },
      {
          "_id": "630b56803486c25bc36d9afc",
          "name": {
              "en": "Interior Color",
              "ar": "اللون الداخلي"
          },
          "path": "interior_color",
          "addVehicleOrder": 3,
          "filterOrder": 0,
          "types": [
              {
                  "_id": "91aca7e7-cd1e-4b88-9e2e-e9b0cabeb77d",
                  "name": {
                      "en": "White",
                      "ar": "أبيض"
                  },
                  "cssHex": "#FFFFFF"
              },
              {
                  "_id": "91aca7e7-cd1e-4b88-9e2e-e9b0cabeb7ow",
                  "name": {
                      "en": "Off White",
                      "ar": "حليبي"
                  },
                  "cssHex": "#F9F5EC"
              },
              {
                  "_id": "a298a89b-2e0e-4b7d-91c4-49d7bd1fbba0",
                  "name": {
                      "en": "Beige",
                      "ar": "بايج"
                  },
                  "cssHex": "#ECEBC9"
              },
              {
                  "_id": "ca927ed0-42f6-4941-b991-a0bc99467f5e",
                  "name": {
                      "en": "Yellow",
                      "ar": "أصفر"
                  },
                  "cssHex": "#FFE142"
              },
              {
                  "_id": "7ddb9954-cf08-46de-8a00-2c217beda0d2",
                  "name": {
                      "en": "Gold",
                      "ar": "ذهبي"
                  },
                  "cssHex": "#EFCA00"
              },
              {
                  "_id": "3a486c4d-156f-4ec5-b52f-cb2cfb4b69f3",
                  "name": {
                      "en": "Orange",
                      "ar": "برتقالي"
                  },
                  "cssHex": "#FF8B02"
              },
              {
                  "_id": "3a486c4d-156f-4ec5-b52f-cb2cfb4b69sa",
                  "name": {
                      "en": "Saffron",
                      "ar": "زعفراني"
                  },
                  "cssHex": "#E2B322"
              },
              {
                  "_id": "3a486c4d-156f-4ec5-b52f-cb2cfb4b69tan",
                  "name": {
                      "en": "Tan",
                      "ar": "حنطي"
                  },
                  "cssHex": "#B79364"
              },
              {
                  "_id": "1f6c6c01-1a90-4950-872f-bc2341a023c1",
                  "name": {
                      "en": "Brown",
                      "ar": "بني"
                  },
                  "cssHex": "#824101"
              },
              {
                  "_id": "1f6c6c01-1a90-4950-872f-bc2341a023ma",
                  "name": {
                      "en": "Maroon",
                      "ar": "ماروني"
                  },
                  "cssHex": "#6A0101"
              },
              {
                  "_id": "1f6c6c01-1a90-4950-872f-bc2341a023bu",
                  "name": {
                      "en": "Burgundy",
                      "ar": "عنابي"
                  },
                  "cssHex": "#9A2B4C"
              },
              {
                  "_id": "eb388bec-2fa1-4607-94b3-b3764835adb8",
                  "name": {
                      "en": "Red",
                      "ar": "أحمر"
                  },
                  "cssHex": "#C00101"
              },
              {
                  "_id": "eb388bec-2fa1-4607-94b3-b3764835adpin",
                  "name": {
                      "en": "Pink",
                      "ar": "وردي"
                  },
                  "cssHex": "#EEA8B4"
              },
              {
                  "_id": "57e2c879-9c8e-4428-a542-bd6e4b3a5pur",
                  "name": {
                      "en": "Purple",
                      "ar": "بنفسجي"
                  },
                  "cssHex": "#630063"
              },
              {
                  "_id": "28f28f2a-9d38-4fa3-9294-cc02de23beblu",
                  "name": {
                      "en": "Blue",
                      "ar": "أزرق"
                  },
                  "cssHex": "#0000C7"
              },
              {
                  "_id": "28f28f2a-9d38-4fa3-9294-cc02de23bcay7",
                  "name": {
                      "en": "Cyan",
                      "ar": "بحري"
                  },
                  "cssHex": "#00CECE"
              },
              {
                  "_id": "97d02059-2d65-4eae-abef-757ce004greb",
                  "name": {
                      "en": "Green",
                      "ar": "أخضر"
                  },
                  "cssHex": "#01A301"
              },
              {
                  "_id": "97d02059-2d65-4eae-abef-757ce0049sil",
                  "name": {
                      "en": "Silver",
                      "ar": "فضي"
                  },
                  "cssHex": "#D6D6D6"
              },
              {
                  "_id": "97d02059-2d65-4eae-abef-757ce0049gre",
                  "name": {
                      "en": "Grey",
                      "ar": "رمادي"
                  },
                  "cssHex": "#808080"
              },
              {
                  "_id": "d02acd52-9e5b-44ab-8336-a3e440724800",
                  "name": {
                      "en": "Black",
                      "ar": "أسود"
                  },
                  "cssHex": "#000000"
              }
          ]
      },
      {
          "_id": "6303119d046e23a7660e3309",
          "name": {
              "en": "Doors",
              "ar": "الأبواب"
          },
          "path": "Kdoor",
          "addVehicleOrder": 4,
          "types": [
              {
                  "_id": "16b4400a-ca99-4709-9c5b-19fb24a9311",
                  "name": {
                      "en": "2",
                      "ar": "2"
                  }
              },
              {
                  "_id": "16b4400a-ca99-4709-9c5b-19fb24a9312",
                  "name": {
                      "en": "3",
                      "ar": "3"
                  }
              },
              {
                  "_id": "16b4400a-ca99-4709-9c5b-19fb24a9313",
                  "name": {
                      "en": "4",
                      "ar": "4"
                  }
              }
          ]
      },
      {
          "_id": "62276e52de5b632b481db499",
          "name": {
              "en": "Cylinders",
              "ar": "الاسطوانات"
          },
          "path": "cylinder_count",
          "addVehicleOrder": 5,
          "filterOrder": 0,
          "types": [
              {
                  "_id": "f17c6346-d653-4f05-914d-8d8ae10be40a",
                  "name": {
                      "en": "0 Cylinder (Electric)",
                      "ar": "0 سلندر (كهربائية)"
                  }
              },
              {
                  "_id": "847e2fe8-a7dd-4bd9-89da-7ce8e36ecfa2",
                  "name": {
                      "en": "1 Cylinder",
                      "ar": "1 سلندر"
                  }
              },
              {
                  "_id": "adab3119-7c2a-4f29-95e0-593d3ec69d8b",
                  "name": {
                      "en": "2 Cylinders",
                      "ar": "2 سلندر"
                  }
              },
              {
                  "_id": "54813c94-530a-483f-b9bd-fa0731875d3b",
                  "name": {
                      "en": "3 Cylinders",
                      "ar": "3 سلندر"
                  }
              },
              {
                  "_id": "abe25044-bed7-4934-a488-df8383b4daeb",
                  "name": {
                      "en": "4 Cylinders",
                      "ar": "4 سلندر"
                  }
              },
              {
                  "_id": "41386ad7-fbed-48d0-a99e-cb26f574ce7a",
                  "name": {
                      "en": "5 Cylinders",
                      "ar": "5 سلندر"
                  }
              },
              {
                  "_id": "5ba37971-5e48-4255-84a7-0dcd5d2d64ab",
                  "name": {
                      "en": "6 Cylinders",
                      "ar": "6 سلندر"
                  }
              },
              {
                  "_id": "42458fe2-153e-452d-b17e-799d2aa51190",
                  "name": {
                      "en": "8 Cylinders",
                      "ar": "8 سلندر"
                  }
              },
              {
                  "_id": "6d8fa6d3-cb73-4144-8fd6-6830c5b22b5c",
                  "name": {
                      "en": "10 Cylinders",
                      "ar": "10 سلندر"
                  }
              },
              {
                  "_id": "de5569d8-f26c-4dce-9ce6-821d3c4d9c4f",
                  "name": {
                      "en": "12 Cylinders",
                      "ar": "12 سلندر"
                  }
              },
              {
                  "_id": "9ff0ff6d-8727-4829-abb3-5a44ceaa85c4",
                  "name": {
                      "en": "16 Cylinders",
                      "ar": "16 سلندر"
                  }
              }
          ]
      },
      {
          "_id": "630313b9046e23a7660e330a",
          "name": {
              "en": "Engine Size",
              "ar": "سعة المحرك"
          },
          "path": "engine_size",
          "addVehicleOrder": 6,
          "types": [
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9311",
                  "name": {
                      "en": "7000",
                      "ar": "7000"
                  }
              },
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9312",
                  "name": {
                      "en": "6500",
                      "ar": "6500"
                  }
              },
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9312",
                  "name": {
                      "en": "6000",
                      "ar": "6000"
                  }
              },
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9313",
                  "name": {
                      "en": "5500",
                      "ar": "5500"
                  }
              },
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9314",
                  "name": {
                      "en": "5000",
                      "ar": "5000"
                  }
              },
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9315",
                  "name": {
                      "en": "4500",
                      "ar": "4500"
                  }
              },
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9316",
                  "name": {
                      "en": "4000",
                      "ar": "4000"
                  }
              },
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9317",
                  "name": {
                      "en": "3500",
                      "ar": "3500"
                  }
              },
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9318",
                  "name": {
                      "en": "3000",
                      "ar": "3000"
                  }
              },
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9319",
                  "name": {
                      "en": "2500",
                      "ar": "2500"
                  }
              },
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9320",
                  "name": {
                      "en": "2000",
                      "ar": "2000"
                  }
              },
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9321",
                  "name": {
                      "en": "1500",
                      "ar": "1500"
                  }
              },
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9322",
                  "name": {
                      "en": "1000",
                      "ar": "1000"
                  }
              },
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9323",
                  "name": {
                      "en": "500",
                      "ar": "500"
                  }
              },
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9324",
                  "name": {
                      "en": "400",
                      "ar": "400"
                  }
              },
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9325",
                  "name": {
                      "en": "300",
                      "ar": "300"
                  }
              },
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9326",
                  "name": {
                      "en": "200",
                      "ar": "200"
                  }
              },
              {
                  "_id": "6b4400a-ca99-4709-9c5b-19fb2en9327",
                  "name": {
                      "en": "100",
                      "ar": "100"
                  }
              }
          ]
      },
      {
          "_id": "62276e52de5b632b481db492",
          "name": {
              "en": "Fuel",
              "ar": "الوقود"
          },
          "path": "fuel",
          "addVehicleOrder": 7,
          "filterOrder": 0,
          "types": [
              {
                  "_id": "2baf665a-7807-40e2-9279-2da4a034685a",
                  "name": {
                      "en": "Petrol",
                      "ar": "بترول"
                  }
              },
              {
                  "_id": "e983a63a-ca76-4b98-9f9c-9d894bbb7137",
                  "name": {
                      "en": "Diesel",
                      "ar": "ديزل"
                  }
              },
              {
                  "_id": "f5e5022e-5105-411e-b78a-a26a97267a36",
                  "name": {
                      "en": "Hybrid",
                      "ar": "هايبرد"
                  }
              },
              {
                  "_id": "c0add185-4b81-4636-9720-ff5d7db59598",
                  "name": {
                      "en": "Eletctric",
                      "ar": "كهرباء"
                  }
              },
              {
                  "_id": "09364984-c825-41e1-98fd-ca4b77bfee77",
                  "name": {
                      "en": "Gas",
                      "ar": "غاز"
                  }
              }
          ]
      },
      {
          "_id": "62276e52de5b632b481db496",
          "name": {
              "en": "Transmission",
              "ar": "الجير"
          },
          "path": "transmission",
          "addVehicleOrder": 8,
          "filterOrder": 0,
          "types": [
              {
                  "_id": "1604d1b5-7b02-46d3-8d53-8780abf0c6a7",
                  "name": {
                      "en": "Automatic",
                      "ar": "أوتوماتيك"
                  }
              },
              {
                  "_id": "a9c612e0-751e-443c-ac6e-1e6b5ee6b2a6",
                  "name": {
                      "en": "Manual",
                      "ar": "عادي"
                  }
              }
          ]
      },
      {
          "_id": "62276e52de5b632b481db49a",
          "name": {
              "en": "Drivetrain",
              "ar": "دفع العجلات"
          },
          "path": "car-drivetrain-type",
          "addVehicleOrder": 9,
          "filterOrder": 0,
          "types": [
              {
                  "_id": "bc1d5167-a7ba-4730-bf53-7c26713b1b36",
                  "name": {
                      "en": "Front Wheel Drive",
                      "ar": "دفع أمامي"
                  }
              },
              {
                  "_id": "ab3a5597-db02-416b-be5d-c818677bb3bc",
                  "name": {
                      "en": "Rear Wheel Drive",
                      "ar": "دفع خلفي"
                  }
              },
              {
                  "_id": "3aa55360-d0fd-4f46-9da4-0bd162d4e392",
                  "name": {
                      "en": "4 Wheel Drive",
                      "ar": "دفع رباعي"
                  }
              }
          ]
      },
      {
          "_id": "62276e52de5b632b481db495",
          "name": {
              "en": "Seats",
              "ar": "المقاعد"
          },
          "path": "seats",
          "addVehicleOrder": 10,
          "filterOrder": 0,
          "types": [
              {
                  "_id": "c8711590-b23c-4afb-8c84-fc1f7daba1be",
                  "name": {
                      "en": "Leather",
                      "ar": "جلد"
                  }
              },
              {
                  "_id": "d76113d0-64e2-4616-867f-043f2daef3ce",
                  "name": {
                      "en": "Fabric",
                      "ar": "قماش"
                  }
              },
              {
                  "_id": "68761919-2f94-44d7-9929-bdd7467b664e",
                  "name": {
                      "en": "Mixed Leather & Fabric",
                      "ar": "مزيج جلد وقماش"
                  }
              }
          ]
      },
      {
          "_id": "62276e52de5b632b481db493",
          "name": {
              "en": "Origin",
              "ar": "مصدر المركبة"
          },
          "path": "origin",
          "addVehicleOrder": 11,
          "filterOrder": 0,
          "types": [
              {
                  "_id": "2e388493-dc01-4563-a746-457410a721d5",
                  "name": {
                      "en": "Oman Dealership",
                      "ar": "وكالة عُمان"
                  }
              },
              {
                  "_id": "840e394d-7414-42fd-a698-5c0fea3bee86",
                  "name": {
                      "en": "GCC",
                      "ar": "خليجي"
                  }
              },
              {
                  "_id": "5b8ddc18-6d95-4dee-a552-ef6ad1effdb9",
                  "name": {
                      "en": "Imported",
                      "ar": "وارد"
                  }
              }
          ]
      },
      {
          "_id": "62276e52de5b632b481db494",
          "name": {
              "en": "Insurance",
              "ar": "التأمين"
          },
          "path": "car-insurance",
          "addVehicleOrder": 11,
          "filterOrder": 0,
          "types": [
              {
                  "_id": "e2e10089-5f51-42b0-86cc-6591b064aca2",
                  "name": {
                      "en": "Without Insurance",
                      "ar": "بدون تأمين"
                  }
              },
              {
                  "_id": "15ecb032-801f-4f38-b62c-f046824f02a2",
                  "name": {
                      "en": "Third Party",
                      "ar": "طرف ثالث"
                  }
              },
              {
                  "_id": "f86fd103-734d-42fe-9bbd-732d7262209f",
                  "name": {
                      "en": "Full Coverage",
                      "ar": "شامل"
                  }
              }
          ]
      },
      {
          "_id": "62276e52de5b632b481db49c",
          "name": {
              "en": "Plate",
              "ar": "اللوحة"
          },
          "path": "plate_type",
          "addVehicleOrder": 13,
          "filterOrder": 0,
          "types": [
              {
                  "_id": "03ac854b-bcae-42cd-91f7-6928266ab94a",
                  "name": {
                      "en": "Personal / Commercial",
                      "ar": "خصوصي / تجاري"
                  }
              },
              {
                  "_id": "9336b87f-7e4a-4ca3-ad02-c5a4d8471d0d",
                  "name": {
                      "en": "Taxi",
                      "ar": "تكسي"
                  }
              },
              {
                  "_id": "526ab539-5df5-4f3f-aacc-95501b12e53f",
                  "name": {
                      "en": "Driving Training",
                      "ar": "تعليم سياقة"
                  }
              }
          ]
      },
      {
          "_id": "62276e52de5b632b481db49b",
          "name": {
              "en": "Driving Readiness",
              "ar": "الجاهزية للقيادة"
          },
          "path": "driving_readiness",
          "addVehicleOrder": 14,
          "filterOrder": 0,
          "types": [
              {
                  "_id": "203fd222-7ad4-43a4-86f0-4869ebe0d0e4",
                  "name": {
                      "en": "Ready for Driving",
                      "ar": "جاهزة للقيادة"
                  }
              },
              {
                  "_id": "b8dfc634-a6e6-44f3-9ace-1099544fdfc2",
                  "name": {
                      "en": "Needs repair",
                      "ar": "تحتاج إلى تصليح"
                  }
              }
          ]
      },
      {
          "_id": "62276e52de5b632b481db498",
          "name": {
              "en": "Sale Type",
              "ar": "نوع البيع"
          },
          "path": "sale_type",
          "addVehicleOrder": 15,
          "filterOrder": 0,
          "types": [
              {
                  "_id": "a998c52f-6240-4d76-aab7-f4959e5a798a",
                  "name": {
                      "en": "For Sale Only",
                      "ar": "للبيع فقط"
                  }
              },
              {
                  "_id": "6f269457-afeb-4861-972f-3299b256c2d4",
                  "name": {
                      "en": "Sale or Exchange",
                      "ar": "للبيع أو المبادلة"
                  }
              }
          ]
      },
      {
          "_id": "62276e52de5b632b481db49f",
          "name": {
              "en": "Warranty Duration",
              "ar": "مدة الضمان"
          },
          "path": "car-warranty-duration",
          "addVehicleOrder": 16,
          "filterOrder": 0,
          "types": [
              {
                  "_id": "dfd25b38-61b7-4ddc-90e9-bdf879f40e57",
                  "name": {
                      "en": "No Warranty",
                      "ar": "بدون ضمان"
                  }
              },
              {
                  "_id": "70add279-8c36-44d7-8a29-aeb5283ea6ab",
                  "name": {
                      "en": "1 Month",
                      "ar": "1 أشهر"
                  }
              },
              {
                  "_id": "927ed937-4468-402e-a4c2-69aedc81a420",
                  "name": {
                      "en": "2 Months",
                      "ar": "2 أشهر"
                  }
              },
              {
                  "_id": "d376e57e-353e-415e-a551-8a7a130b14ed",
                  "name": {
                      "en": "3 Months",
                      "ar": "3 أشهر"
                  }
              },
              {
                  "_id": "6a3d9a8d-1471-4204-86a9-48fc0b27430e",
                  "name": {
                      "en": "4 Months",
                      "ar": "4 أشهر"
                  }
              },
              {
                  "_id": "15ac92b1-7331-41c4-8698-ebdda5f1972d",
                  "name": {
                      "en": "5 Months",
                      "ar": "5 أشهر"
                  }
              },
              {
                  "_id": "9ca2e934-1b71-4281-9b99-67f45b375088",
                  "name": {
                      "en": "6 Months",
                      "ar": "6 أشهر"
                  }
              },
              {
                  "_id": "512766d5-8719-4994-a35d-08498919ff2a",
                  "name": {
                      "en": "7 Months",
                      "ar": "7 أشهر"
                  }
              },
              {
                  "_id": "5b7eb2f9-7a85-4b79-8de4-a1ce736ee487",
                  "name": {
                      "en": "8 Months",
                      "ar": "8 أشهر"
                  }
              },
              {
                  "_id": "07f4bd4c-262a-4a83-a459-d116e223d4f3",
                  "name": {
                      "en": "9 Months",
                      "ar": "9 أشهر"
                  }
              },
              {
                  "_id": "b6a06552-64d1-4882-bf56-d920c49bd32b",
                  "name": {
                      "en": "10 Months",
                      "ar": "10 أشهر"
                  }
              },
              {
                  "_id": "71a6dc64-ab72-4ed6-8160-9853707cc8e5",
                  "name": {
                      "en": "11 Months",
                      "ar": "11 أشهر"
                  }
              },
              {
                  "_id": "e4327211-8b83-4b7c-93f4-b85dd4adee8c",
                  "name": {
                      "en": "1 Year",
                      "ar": "1 سنة "
                  }
              },
              {
                  "_id": "b22355ad-5743-4214-b1fe-9b9a38eb5fbe",
                  "name": {
                      "en": "1 Year & 1 Months",
                      "ar": "1 سنة و 1 أشهر"
                  }
              },
              {
                  "_id": "19ab63f5-143c-48a3-a93c-e31fe76ab207",
                  "name": {
                      "en": "1 Year & 2 Months",
                      "ar": "1 سنة و 2 أشهر"
                  }
              },
              {
                  "_id": "ddf73010-d7c6-481b-9e4c-c59998c7a89b",
                  "name": {
                      "en": "1 Year & 3 Months",
                      "ar": "1 سنة و 3 أشهر"
                  }
              },
              {
                  "_id": "b9b162bf-da2e-4f18-af68-18d8f4bc98da",
                  "name": {
                      "en": "1 Year & 4 Months",
                      "ar": "1 سنة و 4 أشهر"
                  }
              },
              {
                  "_id": "37ec7262-ad8f-4be3-9613-ea4a15ab8e76",
                  "name": {
                      "en": "1 Year & 5 Months",
                      "ar": "1 سنة و 5 أشهر"
                  }
              },
              {
                  "_id": "36bcf9bf-981a-4e18-85d5-f5db9387dd92",
                  "name": {
                      "en": "1 Year & 6 Months",
                      "ar": "1 سنة و 6 أشهر"
                  }
              },
              {
                  "_id": "b0fa614a-f964-4f7f-b460-0a09ec051cb3",
                  "name": {
                      "en": "1 Year & 7 Months",
                      "ar": "1 سنة و 7 أشهر"
                  }
              },
              {
                  "_id": "1132232f-3794-4cb2-aeb0-bbd4d4f5186f",
                  "name": {
                      "en": "1 Year & 8 Months",
                      "ar": "1 سنة و 8 أشهر"
                  }
              },
              {
                  "_id": "264c1fbb-3f96-4656-b6c1-c55c940d20e0",
                  "name": {
                      "en": "1 Year & 9 Months",
                      "ar": "1 سنة و 9 أشهر"
                  }
              },
              {
                  "_id": "00296f15-bb03-4197-8c2f-a9521bd45e09",
                  "name": {
                      "en": "1 Year & 10 Months",
                      "ar": "1 سنة و 10 أشهر"
                  }
              },
              {
                  "_id": "7a55c5e3-95f5-412e-84f2-e46c8aa53227",
                  "name": {
                      "en": "1 Year & 11 Months",
                      "ar": "1 سنة و 11 أشهر"
                  }
              },
              {
                  "_id": "217f2b75-5e40-439c-a547-f38ce07ef731",
                  "name": {
                      "en": "2 Years",
                      "ar": "2 سنة "
                  }
              },
              {
                  "_id": "055e4307-cdb4-4342-beff-a48f3113155a",
                  "name": {
                      "en": "2 Years & 1 Months",
                      "ar": "2 سنة و 1 أشهر"
                  }
              },
              {
                  "_id": "80d915ac-8bd2-4b43-8440-cb173329c67b",
                  "name": {
                      "en": "2 Years & 2 Months",
                      "ar": "2 سنة و 2 أشهر"
                  }
              },
              {
                  "_id": "1d5e1e71-7b52-488a-8b7e-f25f5bedab00",
                  "name": {
                      "en": "2 Years & 3 Months",
                      "ar": "2 سنة و 3 أشهر"
                  }
              },
              {
                  "_id": "9dca1938-365c-4487-8352-a43776a46f7d",
                  "name": {
                      "en": "2 Years & 4 Months",
                      "ar": "2 سنة و 4 أشهر"
                  }
              },
              {
                  "_id": "2d92015e-cf70-49f1-9ec6-94dbe7fb6fb4",
                  "name": {
                      "en": "2 Years & 5 Months",
                      "ar": "2 سنة و 5 أشهر"
                  }
              },
              {
                  "_id": "ad44c7cf-0be3-4dd8-9e48-3a55c11daec2",
                  "name": {
                      "en": "2 Years & 6 Months",
                      "ar": "2 سنة و 6 أشهر"
                  }
              },
              {
                  "_id": "6fc819b4-6f73-40fc-8403-651549cea055",
                  "name": {
                      "en": "2 Years & 7 Months",
                      "ar": "2 سنة و 7 أشهر"
                  }
              },
              {
                  "_id": "95b61758-1deb-49d1-aea2-e6194c3b865a",
                  "name": {
                      "en": "2 Years & 8 Months",
                      "ar": "2 سنة و 8 أشهر"
                  }
              },
              {
                  "_id": "5c3b8183-392a-444c-8d93-e523c3f48409",
                  "name": {
                      "en": "2 Years & 9 Months",
                      "ar": "2 سنة و 9 أشهر"
                  }
              },
              {
                  "_id": "e3eeda63-e45b-42ae-8de0-bc21cb264503",
                  "name": {
                      "en": "2 Years & 10 Months",
                      "ar": "2 سنة و 10 أشهر"
                  }
              },
              {
                  "_id": "edb8eb6b-4179-45db-af2c-7318eeef6f2e",
                  "name": {
                      "en": "2 Years & 11 Months",
                      "ar": "2 سنة و 11 أشهر"
                  }
              },
              {
                  "_id": "9184e25c-e2bb-45c2-af79-3366573e2678",
                  "name": {
                      "en": "3 Years",
                      "ar": "3 سنوات"
                  }
              },
              {
                  "_id": "c2e64653-6c11-4567-afb0-699609546a9f",
                  "name": {
                      "en": "3 Years & 1 Months",
                      "ar": "3 سنوات و 1 أشهر"
                  }
              },
              {
                  "_id": "a13227ce-9f03-4eef-9db8-f5b8cf0472ae",
                  "name": {
                      "en": "3 Years & 2 Months",
                      "ar": "3 سنوات و 2 أشهر"
                  }
              },
              {
                  "_id": "3ae8b1b5-f708-4d4e-90d4-be20fba77431",
                  "name": {
                      "en": "3 Years & 3 Months",
                      "ar": "3 سنوات و 3 أشهر"
                  }
              },
              {
                  "_id": "2678cdc4-ed2f-44a1-bea6-188550e54ce3",
                  "name": {
                      "en": "3 Years & 4 Months",
                      "ar": "3 سنوات و 4 أشهر"
                  }
              },
              {
                  "_id": "685cc70f-82a7-4856-998f-55634baa5409",
                  "name": {
                      "en": "3 Years & 5 Months",
                      "ar": "3 سنوات و 5 أشهر"
                  }
              },
              {
                  "_id": "de0f5224-0b0d-453d-a9ea-4a0a0f24d48f",
                  "name": {
                      "en": "3 Years & 6 Months",
                      "ar": "3 سنوات و 6 أشهر"
                  }
              },
              {
                  "_id": "577086aa-55a3-45a9-a17e-d5e4e8f206fd",
                  "name": {
                      "en": "3 Years & 7 Months",
                      "ar": "3 سنوات و 7 أشهر"
                  }
              },
              {
                  "_id": "a6c8a02f-d050-47b5-bef7-2b867218777e",
                  "name": {
                      "en": "3 Years & 8 Months",
                      "ar": "3 سنوات و 8 أشهر"
                  }
              },
              {
                  "_id": "7890ba77-9180-4ec2-a48f-faf82dc6e3b1",
                  "name": {
                      "en": "3 Years & 9 Months",
                      "ar": "3 سنوات و 9 أشهر"
                  }
              },
              {
                  "_id": "c3fe649d-7391-401d-8fc0-7534f73667b3",
                  "name": {
                      "en": "3 Years & 10 Months",
                      "ar": "3 سنوات و 10 أشهر"
                  }
              },
              {
                  "_id": "fcb6539f-1a5c-4f77-bfaa-5b80913c45a8",
                  "name": {
                      "en": "3 Years & 11 Months",
                      "ar": "3 سنوات و 11 أشهر"
                  }
              },
              {
                  "_id": "7283a3b6-c04c-43e7-872d-da8848cc3072",
                  "name": {
                      "en": "4 Years",
                      "ar": "4 سنوات"
                  }
              },
              {
                  "_id": "20858d75-1ecb-4577-a06f-fdaa6dfb06e6",
                  "name": {
                      "en": "4 Years & 1 Months",
                      "ar": "4 سنوات و 1 أشهر"
                  }
              },
              {
                  "_id": "92562787-2f4b-43bc-af8c-ec2bc40f5c81",
                  "name": {
                      "en": "4 Years & 2 Months",
                      "ar": "4 سنوات و 2 أشهر"
                  }
              },
              {
                  "_id": "20a3ebc4-5c31-4a86-91e0-88d2d37802b4",
                  "name": {
                      "en": "4 Years & 3 Months",
                      "ar": "4 سنوات و 3 أشهر"
                  }
              },
              {
                  "_id": "69f56c9b-4a9c-4cf5-8a89-de8fd8e5cf05",
                  "name": {
                      "en": "4 Years & 4 Months",
                      "ar": "4 سنوات و 4 أشهر"
                  }
              },
              {
                  "_id": "01d0e4ef-154d-4097-a188-a72ff55b3ff5",
                  "name": {
                      "en": "4 Years & 5 Months",
                      "ar": "4 سنوات و 5 أشهر"
                  }
              },
              {
                  "_id": "20347d23-781c-47fd-a6bf-8126663a8418",
                  "name": {
                      "en": "4 Years & 6 Months",
                      "ar": "4 سنوات و 6 أشهر"
                  }
              },
              {
                  "_id": "8fd08829-e0c2-45b1-8803-7e8f55bfa465",
                  "name": {
                      "en": "4 Years & 7 Months",
                      "ar": "4 سنوات و 7 أشهر"
                  }
              },
              {
                  "_id": "c67a9724-04ff-4b3e-b4f4-78cfef6e09bd",
                  "name": {
                      "en": "4 Years & 8 Months",
                      "ar": "4 سنوات و 8 أشهر"
                  }
              },
              {
                  "_id": "54ea1242-931d-4b0e-8ed5-0eb31d070312",
                  "name": {
                      "en": "4 Years & 9 Months",
                      "ar": "4 سنوات و 9 أشهر"
                  }
              },
              {
                  "_id": "7a72f6aa-2ed1-4a02-9a88-4e7b01411d1b",
                  "name": {
                      "en": "4 Years & 10 Months",
                      "ar": "4 سنوات و 10 أشهر"
                  }
              },
              {
                  "_id": "8f817f9a-b82a-4d71-be29-0bd98d3297b1",
                  "name": {
                      "en": "4 Years & 11 Months",
                      "ar": "4 سنوات و 11 أشهر"
                  }
              },
              {
                  "_id": "2fb9e3f6-27bb-4dd7-9b48-ccd1ace2c529",
                  "name": {
                      "en": "5 Years",
                      "ar": "5 سنوات"
                  }
              },
              {
                  "_id": "6cfcaf3f-d182-4ce0-8c52-6b23efda1977",
                  "name": {
                      "en": "5 Years & 1 Months",
                      "ar": "5 سنوات و 1 أشهر"
                  }
              },
              {
                  "_id": "29e3b3ff-a7f0-474f-a2ba-682eb3bf410f",
                  "name": {
                      "en": "5 Years & 2 Months",
                      "ar": "5 سنوات و 2 أشهر"
                  }
              },
              {
                  "_id": "3f5e5458-a195-4943-b57b-bc1cb2c4df73",
                  "name": {
                      "en": "5 Years & 3 Months",
                      "ar": "5 سنوات و 3 أشهر"
                  }
              },
              {
                  "_id": "81d78779-d63e-4bb6-80e5-5d3dc0865357",
                  "name": {
                      "en": "5 Years & 4 Months",
                      "ar": "5 سنوات و 4 أشهر"
                  }
              },
              {
                  "_id": "7d141625-d186-4442-a8ee-d0884823b453",
                  "name": {
                      "en": "5 Years & 5 Months",
                      "ar": "5 سنوات و 5 أشهر"
                  }
              },
              {
                  "_id": "d4b16ea1-43e9-413a-a4cb-9dc32ffe7ad4",
                  "name": {
                      "en": "5 Years & 6 Months",
                      "ar": "5 سنوات و 6 أشهر"
                  }
              },
              {
                  "_id": "f3b1e362-9393-4dc9-a980-93c6f79a3610",
                  "name": {
                      "en": "5 Years & 7 Months",
                      "ar": "5 سنوات و 7 أشهر"
                  }
              },
              {
                  "_id": "c047625a-04ec-41bc-ab23-bd4cc3cc4544",
                  "name": {
                      "en": "5 Years & 8 Months",
                      "ar": "5 سنوات و 8 أشهر"
                  }
              },
              {
                  "_id": "34c0339e-22d1-4e90-905f-eba405538d72",
                  "name": {
                      "en": "5 Years & 9 Months",
                      "ar": "5 سنوات و 9 أشهر"
                  }
              },
              {
                  "_id": "8de513d4-d3ad-436a-a9e6-bb9c3c80ee50",
                  "name": {
                      "en": "5 Years & 10 Months",
                      "ar": "5 سنوات و 10 أشهر"
                  }
              },
              {
                  "_id": "7590bf57-8e4b-4030-97c9-fa1210677b4d",
                  "name": {
                      "en": "5 Years & 11 Months",
                      "ar": "5 سنوات و 11 أشهر"
                  }
              },
              {
                  "_id": "cedbbb77-a37a-4ef7-aab8-e95e0d230df7",
                  "name": {
                      "en": "6 Years",
                      "ar": "6 سنوات"
                  }
              },
              {
                  "_id": "39f24ce0-b5ee-45ec-bc04-83d7c7d3c8d1",
                  "name": {
                      "en": "6 Years & 1 Months",
                      "ar": "6 سنوات و 1 أشهر"
                  }
              },
              {
                  "_id": "8a9caee6-989e-4942-bf47-e98a1a9b0dac",
                  "name": {
                      "en": "6 Years & 2 Months",
                      "ar": "6 سنوات و 2 أشهر"
                  }
              },
              {
                  "_id": "3ec1819e-6bbf-4b13-a8af-e155dfeaeea7",
                  "name": {
                      "en": "6 Years & 3 Months",
                      "ar": "6 سنوات و 3 أشهر"
                  }
              },
              {
                  "_id": "7f88fa1f-304f-4474-aff1-d9a0be5d5387",
                  "name": {
                      "en": "6 Years & 4 Months",
                      "ar": "6 سنوات و 4 أشهر"
                  }
              },
              {
                  "_id": "0363d451-751d-427b-8a11-54b9daf7b756",
                  "name": {
                      "en": "6 Years & 5 Months",
                      "ar": "6 سنوات و 5 أشهر"
                  }
              },
              {
                  "_id": "31090566-b1d5-4188-b9e6-235b1795f4f6",
                  "name": {
                      "en": "6 Years & 6 Months",
                      "ar": "6 سنوات و 6 أشهر"
                  }
              },
              {
                  "_id": "2cb1246c-2c23-4ddc-942b-80314f5d9695",
                  "name": {
                      "en": "6 Years & 7 Months",
                      "ar": "6 سنوات و 7 أشهر"
                  }
              },
              {
                  "_id": "063b5a72-41a0-4eb3-8911-96f3d8728ec8",
                  "name": {
                      "en": "6 Years & 8 Months",
                      "ar": "6 سنوات و 8 أشهر"
                  }
              },
              {
                  "_id": "03ca25ab-f32b-4e21-ad72-0d3d92491f7e",
                  "name": {
                      "en": "6 Years & 9 Months",
                      "ar": "6 سنوات و 9 أشهر"
                  }
              },
              {
                  "_id": "bfab4755-8f16-4927-9569-5fed548bd12d",
                  "name": {
                      "en": "6 Years & 10 Months",
                      "ar": "6 سنوات و 10 أشهر"
                  }
              }
          ]
      },
      {
          "_id": "6316fa5f8c69a23fa29fff99",
          "name": {
              "en": "Features",
              "ar": "المواصفات"
          },
          "addVehicleOrder": 25,
          "filterOrder": 0,
          "types": [
              {
                  "_id": "9616b16a-01fb-4be2-8526-d71ae0ac4152",
                  "name": {
                      "en": "Rear Sensors",
                      "ar": "حساسات خلفية"
                  }
              },
              {
                  "_id": "5e2eefcb-8012-4ba1-a831-2beb8d2c2251",
                  "name": {
                      "en": "Front Sensors",
                      "ar": "حساسات أمامية"
                  }
              },
              {
                  "_id": "015fc83b-c886-4171-95be-3ed93b997e2e",
                  "name": {
                      "en": "Side Sensors",
                      "ar": "حساسات خلفية"
                  }
              }
          ]
      },
      {
          "_id": "6316ff02e5676b262a7636dd",
          "name": {
              "en": "Warranty Kilometers",
              "ar": "ضمان الكيلومترات"
          },
          "addVehicleOrder": 27,
          "filterOrder": 0,
          "types": []
      },
      {
          "_id": "6316fface5676b262a7636de",
          "name": {
              "en": "Distance Travelled",
              "ar": "المسافة المقطوعة"
          },
          "path": "car-distance-travelled",
          "addVehicleOrder": 28,
          "filterOrder": 0,
          "types": []
      }];
    let make = new Make();
    make._id = "123123";
    make.name.en = 'Toyota';
    make.name.ar = 'شنتسيبم';
    // MAKE INITIATED;
    let model:[Model];
    model[0]._id = "123";
    model[0].name.en = "Corolla";
    model[0].name.ar = 'مشتسيب';
    // MODEL INITIATED;
    let trim:[Trim];
    trim[0]._id = "1222";
    trim[0].name.en = "Gli";
    trim[0].name.ar = 'سيتبمسي';
    let filterArray: Filter[] = [];
    apiResp.forEach(x=> {
      let obj = new Filter(x.name,0,x.path,x.addVehicleOrder,x.filterOrder,x._id,x.path);
      filterArray.push(obj);
    });
    console.log('Filters: ', filterArray)
  }
}
