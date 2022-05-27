import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {  of, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    authUrl = 'register';
    appBaseUrl = 'http://45.79.249.189/dm/api/';
    getTokenAccess: any = {};
    headersConfig: any = {};
    apiRoute: any = {};
    userId: string;
    loadingSubscriber = new Subject();
    refreshTokenSubscriber = new Subject();
    errorSubscriber = new Subject();
    constructor(public http: HttpClient) { }


    loadConfig(headerValue,res) {
        if (localStorage.getItem('LoginResponceToken')) {
                this.getTokenAccess = JSON.parse(localStorage.getItem('LoginResponceToken'));
                    if(res == true){this.getTokenAccess.access_token = this.getTokenAccess.access_token}
                    else{this.getTokenAccess.access_token = res}
                    if (headerValue == 'h1') {
                        this.headersConfig = new HttpHeaders()
                            .set('Content-Type', 'application/json')
                            .set('Accept-Language', 'en-US');
                    } else if (headerValue == 'h2') {
                        this.headersConfig = new HttpHeaders()
                            .set('Content-Type', 'application/x-www-form-urlencoded')
                            .set('Authorization', 'Bearer ' + this.getTokenAccess.access_token)
                            .set('Accept-Language', 'en-US')
                            .set('userId', this.getTokenAccess.userId.toString());
                    } else if (headerValue == 'h3') {
                        this.headersConfig = new HttpHeaders()
                            .set('Content-Type', 'application/json')
                            .set('Authorization', this.getTokenAccess.access_token)
                            .set('Accept-Language', 'en-US')
                    } else if (headerValue == 'h4') {
                        this.headersConfig = new HttpHeaders()
                            .set('Content-Type', 'application/json')
                            .set('Authorization', 'Bearer ' + this.getTokenAccess.access_token)
                            .set('Accept-Language', 'en-US')
                            .set('userId', this.getTokenAccess.userId.toString())
                            .set('language', 'en');
                    } else if (headerValue == 'h5') {
                        this.headersConfig = new HttpHeaders()
                            .set('Content-Type', 'application/json')
                            .set('Accept-Language', 'en-US')
                            .set('Authorization', 'Bearer ' + this.getTokenAccess.access_token);
                    } else if (headerValue == 'h6') {
                        this.headersConfig = new HttpHeaders()
                            .set('Authorization', 'Bearer ' + this.getTokenAccess.access_token)
                            .set('Accept-Language', 'en-US')
                            .set('userId', this.getTokenAccess.userId.toString());
                    }
                    else if (headerValue == 'h7') {
                        this.headersConfig = new HttpHeaders()
                            .set('Access-Control-Allow-Origin', '*')
                    }
        } else {
            this.headersConfig = new HttpHeaders().set('Content-Type', 'application/json');
        }
        return of([]);
    }

    get = (route, headerValue) => {
        return new Promise((resolve, reject) => {
            this.checkIsTokenValidOrNot()
            .then((res: any) => {
                // console.log("subscribe res", res)
                this.loadConfig(headerValue,res)
                .subscribe(res => {
                    this.http.get(this.appBaseUrl + route.apiroute, {
                        headers: this.headersConfig
                    })
                    .subscribe(res => {
                      // this.errorSubscriber.next(res)
                        resolve(res);
                    }, (err) => {
                      this.errorSubscriber.next(err)
                        reject();
                    });
                }, (err) => {
                    reject(err);
                });
            }, (err) => {
                reject(err);
            });
        });
    }
    google = (route, headerValue) => {
        return new Promise((resolve, reject) => {
                    this.http.get(route.apiroute)
                    .subscribe(res => {
                        resolve(res);
                    }, (err) => {
                      this.errorSubscriber.next(err)
                        reject();
                    });
                })
    }

    post = (route, headerValue) => {
        return new Promise((resolve, reject) => {
            this.checkIsTokenValidOrNot()
            .then(res => {
                // console.log('res POST toke res token or boolean',res);
                this.loadConfig(headerValue,res)
                .subscribe(config => {
                    // console.log('POST method called !!!');
                    this.http.post(this.appBaseUrl + route.apiroute, route.data, {
                        headers: this.headersConfig
                    })
                    .subscribe(res => {
                        resolve(res);
                    }, (err) => {
                        reject(err);
                    });
                    // console.log('res POST config res');
                }, (err) => {
                    reject(err);
                });
            }, (err) => {
                console.log('<<< POST ERR >>>', err);
                reject(err);
            });
        });
    }

    put = (route, headerValue) => {
        return new Promise((resolve, reject) => {
            this.checkIsTokenValidOrNot()
            .then(res => {
                // console.log('res PUT toke res');
                this.loadConfig(headerValue,res)
                .subscribe(res => {
                    // console.log('res PUT config res');
                    this.http.put(this.appBaseUrl + route.apiroute, route.data, {
                        headers: this.headersConfig
                    })
                    .subscribe(res => {
                        resolve(res);
                    }, (err) => {
                        reject(err);
                    });
                }, (err) => {
                    reject(err);
                });
            }, (err) => {
                reject(err);
            });
        });
    }

    delete = (route, headerValue) => {
        return new Promise((resolve, reject) => {
            this.checkIsTokenValidOrNot()
            .then(res => {
                // console.log('res DELETE toke res');
                this.loadConfig(headerValue,res)
                .subscribe(res => {
                    // console.log('res DELETE config res');
                    this.http.delete(this.appBaseUrl + route.apiroute, {
                        headers: this.headersConfig
                    })
                    .subscribe(res => {
                        resolve(res);
                    }, (err) => {
                        reject(err);
                    });
                }, (err) => {
                    reject(err);
                });
            }, (err) => {
                reject(err);
            });
        });
    }

    checkIsTokenValidOrNot() {
        return new Promise((resolve, reject) => {
           resolve(true);
        });
    }

    getRefreshToken(refreshToken) {
    }


    

}