import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  of, Subject } from 'rxjs';
import { TokenService } from "./Services/token.service";
export const BASICTOKEN = 'eXV6ZWVfY2xpZW50OjI5MDIzNmNmLTgxZDItNDg5MS1hYmNlLWYzZmUzYzA5NWMxMA==';
@Injectable({
    providedIn: 'root'
})

export class ApiService {
    getTokenUrl = 'sessions/token';
    authUrl = 'register';
    appBaseUrl = 'http://45.79.249.189/dm/api/';
    getTokenAccess: any = {};
    headersConfig: any = {};
    apiRoute: any = {};
    userId: string;
    loadingSubscriber = new Subject();
    refreshTokenSubscriber = new Subject();
    errorSubscriber = new Subject();
    constructor(public http: HttpClient, private token:TokenService) { }


    loadConfig(headerValue) {
        let token;
                if (headerValue == 'h1') {
                    this.headersConfig = new HttpHeaders()
                        .set('Content-Type', 'application/json')
                        .set('Accept-Language', 'en-US');
                } else if (headerValue == 'h2') {
                    this.headersConfig = new HttpHeaders()
                        .set('Content-Type', 'application/x-www-form-urlencoded')
                        .set('Authorization', 'token')
                        .set('Accept-Language', 'en-US')
                        .set('user-id', this.getTokenAccess.userId.toString());
                } else if (headerValue == 'h3') {
                    console.log("Header value",headerValue, token);
                    this.headersConfig = new HttpHeaders()
                        .set('Content-Type', 'application/json')
                        .set('Authorization', token)
                        .set('Accept-Language', 'en-US')
                } else if (headerValue == 'h4') {
                    this.headersConfig = new HttpHeaders()
                        .set('Content-Type', 'application/json')
                        .set('Authorization', token)
                        .set('Accept-Language', 'en-US')
                        .set('user-id', this.getTokenAccess.userId.toString())
                        .set('language', 'en');
                } else if (headerValue == 'h5') {
                    this.headersConfig = new HttpHeaders()
                        .set('Content-Type', 'application/json')
                        .set('Accept-Language', 'en-US')
                        .set('Authorization', token);
                } else if (headerValue == 'h6') {
                    this.headersConfig = new HttpHeaders()
                        .set('Authorization', token)
                        .set('Accept-Language', 'en-US')
                        .set('user-id', this.getTokenAccess.userId.toString());
                }
                else if (headerValue == 'h7') {
                    this.headersConfig = new HttpHeaders()
                        .set('Access-Control-Allow-Origin', '*')
                }
                return of([]);

    }

    get = (route, headerValue) => {
        return new Promise((resolve, reject) => {
            this.loadConfig(headerValue)
            .subscribe(res => {
                console.log("HEADER: ",res);
                this.http.get(this.appBaseUrl + route.apiroute, {
                    headers: this.headersConfig
                })
                .subscribe(res => {
                   this.errorSubscriber.next(res)
                    resolve(res);
                }, (err) => {
                  this.errorSubscriber.next(err)
                    reject();
                });
            }, (err) => {
                reject(err);
            });
        });
    }
   
    post = (route, headerValue) => {
        return new Promise((resolve, reject) => {
            this.loadConfig(headerValue)
                .subscribe(config => {
                     console.log('POST method called !!!',config);
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
        });
    }

    put = (route, headerValue) => {
        return new Promise((resolve, reject) => {
            this.loadConfig(headerValue)
            .subscribe(res => {
                 console.log('res PUT config res');
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
        });
    }

    delete = (route, headerValue) => {
        return new Promise((resolve, reject) => {
            this.loadConfig(headerValue)
            .subscribe(res => {
                 console.log('res DELETE config res ', res);
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
        });
    }

    getAuthToken = (route, headerValue) => {
        return new Promise((resolve, reject) => {
            this.loadConfig(headerValue)
            .subscribe(res => {
                console.log("HEADER: ",res);
                this.http.get(this.appBaseUrl + route.apiroute, {
                    headers: this.headersConfig
                })
                .subscribe(res => {
                   this.errorSubscriber.next(res)
                    resolve(res);
                }, (err) => {
                  this.errorSubscriber.next(err)
                    reject();
                });
            }, (err) => {
                reject(err);
            });
        });
    }
    
}