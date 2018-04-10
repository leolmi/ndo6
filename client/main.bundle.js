webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.animations.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fadeAnimation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_animations__ = __webpack_require__("../../../animations/esm5/animations.js");

var fadeAnimation = Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["l" /* trigger */])('fadeAnimation', [
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["k" /* transition */])('* => *', [
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["g" /* query */])(':enter', [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["j" /* style */])({ opacity: 0 }),
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["e" /* animate */])('2s', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["j" /* style */])({ opacity: 1 }))
        ], { optional: true })
    ])
]);


/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- LOADER -->\n<div class=\"loader-container\" *ngIf=\"u.idle\">\n<!--<div class=\"loader-container\">-->\n  <div class=\"loader\"></div>\n</div>\n\n<!-- HEADER -->\n<div class=\"map-header\" *ngIf=\"!u.overpage.type && user.settings.token && user.settings.map\" layout-row>\n  <div class=\"map-name\" flex>{{user.settings.map}}</div>\n  <div class=\"map-owner\">{{user.settings.nick}}</div>\n  <mat-icon class=\"map-owner-icon\">person</mat-icon>\n</div>\n\n<!-- MAP -->\n<div id=\"map-canvas\" [ngClass]=\"{'blur':u.err || u.overpage.type || u.modalActive}\"></div>\n\n<!-- CENTER -->\n<div class=\"map-center\" *ngIf=\"!u.err && !u.overpage.type && !u.modalActive\">\n  <div class=\"map-center-H\"></div>\n  <div class=\"map-center-V\"></div>\n</div>\n\n<!-- ERROR -->\n<div class=\"error-container\" *ngIf=\"u.err\" (click)=\"hideError()\">\n  <div class=\"error-title\">Error :(</div>\n  <div class=\"error\">{{u.err}}</div>\n</div>\n\n<!-- TOOLBAR -->\n<div *ngIf=\"!u.overpage.type\" class=\"toolbar\" layout-row>\n  <button class=\"location-button\" [color]=\"(ndo6.followMarker&&initialized) ? 'accent' : ((ndo6.last&&initialized) ? 'primary' : '')\" mat-fab matTooltip=\"location\" (click)=\"location()\">\n    <mat-icon>my_location</mat-icon>\n  </button>\n  <div flex></div>\n  <button *ngIf=\"debug || user.system.token\" class=\"right-margin\" mat-fab matTooltip=\"test\" (click)=\"overpage('test')\">\n    <mat-icon>bug_report</mat-icon>\n  </button>\n  <button mat-fab matTooltip=\"map\" color=\"primary\" (click)=\"overpage('map')\">\n    <mat-icon>map</mat-icon>\n  </button>\n</div>\n\n<!-- OVERPAGES -->\n<div *ngIf=\"!!u.overpage.type\" class=\"overpage-container\" [ngSwitch]=\"u.overpage.type\">\n  <div class=\"overpage-toolbar\" layout-row>\n    <span flex></span>\n    <button *ngIf=\"u.overpage.back\" class=\"back-button\" mat-icon-button matTooltip=\"go back\" (click)=\"backOverpage()\">\n      <mat-icon>chevron_left</mat-icon>\n    </button>\n    <button class=\"close-button\" mat-icon-button matTooltip=\"close page\" (click)=\"closeOverpage()\">\n      <mat-icon>close</mat-icon>\n    </button>\n  </div>\n  <app-overpage-test *ngSwitchCase=\"'test'\"></app-overpage-test>\n  <app-overpage-settings *ngSwitchCase=\"'settings'\"></app-overpage-settings>\n  <app-overpage-marker *ngSwitchCase=\"'marker'\"></app-overpage-marker>\n  <app-overpage-map *ngSwitchCase=\"'map'\"></app-overpage-map>\n  <app-overpage-elements *ngSwitchCase=\"'elements'\"></app-overpage-elements>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_animations__ = __webpack_require__("../../../../../src/app/app.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_interaction_service__ = __webpack_require__("../../../../../src/app/services/interaction.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_user_settings_service__ = __webpack_require__("../../../../../src/app/services/user-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_utils_service__ = __webpack_require__("../../../../../src/app/services/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_maps_service__ = __webpack_require__("../../../../../src/app/services/maps.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_ndo6_service__ = __webpack_require__("../../../../../src/app/services/ndo6.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_log_service__ = __webpack_require__("../../../../../src/app/services/log.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var GOOGLE_MAP_URL = 'https://maps.googleapis.com/maps/api/js?key={URL}&libraries=geometry,places&callback={CALLBACK}';
var GOOGLE_CALLBACK_NAME = 'googleMapsInitialized';
var initializer = {
    run: function (info) {
        return new Promise(function (resolve) {
            window[GOOGLE_CALLBACK_NAME] = resolve;
            var url = GOOGLE_MAP_URL.replace(/\{URL\}/g, info.googleKey);
            url = url.replace(/\{CALLBACK\}/g, GOOGLE_CALLBACK_NAME);
            // console.log('URL: %s', url);
            var script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
        });
    }
};
var AppComponent = (function () {
    function AppComponent(interaction, log, user, u, maps, ndo6, zone) {
        this.interaction = interaction;
        this.log = log;
        this.user = user;
        this.u = u;
        this.maps = maps;
        this.ndo6 = ndo6;
        this.zone = zone;
        this.initialized = false;
        this.info = {};
        this.debug = !__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].production;
        this.u.idle = true;
    }
    AppComponent.prototype.refresh = function () {
        var self = this;
        self.u.err = null;
        self.info = {};
        self.ndo6.reset();
        self.interaction.getInfo().subscribe(function (data) {
            self.info = data;
            if (data.debug === true) {
                self.debug = true;
            }
            initializer.run(data).then(function () {
                self.maps.create(function (ctx) {
                    self.ndo6.clickOnMarker = function (m) {
                        self.clickOnMarker(m);
                    };
                    self.ndo6.activate(ctx);
                });
                self.u.idle = false;
            }, function (err) {
                self.log.error(err, true);
                self.u.idle = false;
            });
        }, function (err) {
            self.log.error(err, true);
            self.u.idle = false;
        });
    };
    AppComponent.prototype.ngOnInit = function () {
        var self = this;
        self.ndo6.events.subscribe(function (e) {
            self.zone.run(function () {
                switch (e.type) {
                    case 'marker':
                        self.clickOnMarker(e.data);
                        break;
                    case 'firstpos':
                        self.initialized = !!self.ndo6.last || !!self.ndo6.followMarker;
                        break;
                    case 'changepos':
                        if (!!self.user.settings.token) {
                            self.log.info('SEND POSITION - event: ', e);
                            self.interaction.position({
                                id: e.data.id,
                                type: self.ndo6.markers.owner,
                                latitude: e.data.latitude,
                                longitude: e.data.longitude,
                                timestamp: Date.now()
                            }, function (err) {
                                if (err) {
                                    self.log.error(err);
                                    self.user.logdata();
                                }
                                else {
                                    self.log.info('Position sending successfully');
                                }
                            });
                        }
                        break;
                }
            });
        });
        self.initialized = !!self.ndo6.last || !!self.ndo6.followMarker;
        this.refresh();
    };
    AppComponent.prototype.overpage = function (type, o) {
        if (o === void 0) { o = null; }
        this.u.openOverpage(type, o);
    };
    AppComponent.prototype.hideError = function () {
        this.u.err = null;
    };
    AppComponent.prototype.clickOnMarker = function (m) {
        var self = this;
        self.overpage('marker', {
            marker: m,
            latitude: m.position.lat(),
            longitude: m.position.lng()
        });
    };
    AppComponent.prototype.location = function () {
        if (this.ndo6.last) {
            this.ndo6.centerMap(this.ndo6.last);
        }
    };
    AppComponent.prototype.closeOverpage = function () {
        this.u.closeOverpage();
    };
    AppComponent.prototype.backOverpage = function () {
        this.u.backOverpage();
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            animations: [__WEBPACK_IMPORTED_MODULE_2__app_animations__["a" /* fadeAnimation */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_interaction_service__["a" /* InteractionService */],
            __WEBPACK_IMPORTED_MODULE_8__services_log_service__["a" /* LogService */],
            __WEBPACK_IMPORTED_MODULE_4__services_user_settings_service__["a" /* UserSettingsService */],
            __WEBPACK_IMPORTED_MODULE_5__services_utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_6__services_maps_service__["a" /* MapsService */],
            __WEBPACK_IMPORTED_MODULE_7__services_ndo6_service__["a" /* Ndo6Service */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgZone */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__token_interceptor__ = __webpack_require__("../../../../../src/app/token.interceptor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_interaction_service__ = __webpack_require__("../../../../../src/app/services/interaction.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_user_settings_service__ = __webpack_require__("../../../../../src/app/services/user-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_utils_service__ = __webpack_require__("../../../../../src/app/services/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_log_service__ = __webpack_require__("../../../../../src/app/services/log.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_maps_service__ = __webpack_require__("../../../../../src/app/services/maps.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_ndo6_service__ = __webpack_require__("../../../../../src/app/services/ndo6.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_ndo6_icons_service__ = __webpack_require__("../../../../../src/app/services/ndo6-icons.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_confirm_dialog_confirm_dialog_component__ = __webpack_require__("../../../../../src/app/components/confirm-dialog/confirm-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_overpages_overpages_component__ = __webpack_require__("../../../../../src/app/components/overpages/overpages.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_log_monitor_log_monitor_component__ = __webpack_require__("../../../../../src/app/components/log-monitor/log-monitor.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









// SERVICES







// COMPONENTS



var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["H" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_confirm_dialog_confirm_dialog_component__["a" /* ConfirmDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_overpages_overpages_component__["g" /* OverpageTestComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_overpages_overpages_component__["e" /* OverpageMarkerComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_overpages_overpages_component__["f" /* OverpageSettingsComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_overpages_overpages_component__["d" /* OverpageMapComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_overpages_overpages_component__["c" /* OverpageElementsComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_overpages_overpages_component__["a" /* MapElementPointComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_overpages_overpages_component__["b" /* MapElementWayComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_log_monitor_log_monitor_component__["a" /* LogMonitorComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["i" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["C" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["m" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["c" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["D" /* MatTooltipModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["o" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["l" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["n" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["u" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["s" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["r" /* MatProgressBarModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["y" /* MatSnackBarModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["d" /* MatButtonToggleModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["w" /* MatSlideToggleModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["A" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginatorModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["z" /* MatSortModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["p" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["i" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["g" /* MatChipsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["v" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["k" /* MatExpansionModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["f" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["t" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MatAutocompleteModule */]
            ],
            providers: [
                {
                    provide: __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                    useClass: __WEBPACK_IMPORTED_MODULE_7__token_interceptor__["a" /* TokenInterceptor */],
                    multi: true
                },
                __WEBPACK_IMPORTED_MODULE_10__services_utils_service__["a" /* UtilsService */],
                __WEBPACK_IMPORTED_MODULE_11__services_log_service__["a" /* LogService */],
                __WEBPACK_IMPORTED_MODULE_9__services_user_settings_service__["a" /* UserSettingsService */],
                __WEBPACK_IMPORTED_MODULE_8__services_interaction_service__["a" /* InteractionService */],
                __WEBPACK_IMPORTED_MODULE_12__services_maps_service__["a" /* MapsService */],
                __WEBPACK_IMPORTED_MODULE_13__services_ndo6_service__["a" /* Ndo6Service */],
                __WEBPACK_IMPORTED_MODULE_14__services_ndo6_icons_service__["a" /* Ndo6IconsService */]
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_15__components_confirm_dialog_confirm_dialog_component__["a" /* ConfirmDialogComponent */]
            ],
            bootstrap: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/components/confirm-dialog/confirm-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<h1 *ngIf=\"!!data.title\">{{data.title}}</h1>\n<div mat-dialog-content>\n  <div class=\"confirm-message\">{{data.message}}</div>\n  <input matInput *ngIf=\"data.withValue\" class=\"confirm-value\" placeholder=\"{{data.placeholder||'value...'}}\" [(ngModel)]=\"data.value\">\n</div>\n<div mat-dialog-actions>\n  <button *ngIf=\"data['ok']\" color=\"accent\" mat-button cdkFocusInitial (click)=\"onClick('ok')\">{{data['ok'] || 'Ok'}}</button>\n  <button *ngIf=\"data['no']\" mat-button (click)=\"onClick('no')\">{{data['no'] || 'No'}}</button>\n  <button *ngIf=\"data['cancel']\" mat-button (click)=\"onClick('cancel')\">{{data['cancel'] || 'Cancel'}}</button>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/confirm-dialog/confirm-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var ConfirmDialogComponent = (function () {
    function ConfirmDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ConfirmDialogComponent.prototype.onClick = function (resp) {
        this.data.resp = resp;
        this.dialogRef.close(this.data);
    };
    ConfirmDialogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-confirm-dialog',
            template: __webpack_require__("../../../../../src/app/components/confirm-dialog/confirm-dialog.component.html")
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatDialogRef */], Object])
    ], ConfirmDialogComponent);
    return ConfirmDialogComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/log-monitor/log-monitor.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"log-monitor\">\n  <div class=\"log-line\" *ngFor=\"let line of log.lines\">{{line}}</div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/log-monitor/log-monitor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogMonitorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_log_service__ = __webpack_require__("../../../../../src/app/services/log.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LogMonitorComponent = (function () {
    function LogMonitorComponent(log) {
        this.log = log;
    }
    LogMonitorComponent.prototype.ngOnInit = function () {
    };
    LogMonitorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-log-monitor',
            template: __webpack_require__("../../../../../src/app/components/log-monitor/log-monitor.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_log_service__["a" /* LogService */]])
    ], LogMonitorComponent);
    return LogMonitorComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/overpages/elements/element-point.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"map-element-editor\" layout-col>\r\n  <div layout-row>\r\n    <button mat-icon-button [matMenuTriggerFor]=\"colorMenu\">\r\n      <mat-icon>{{u.overpage.options.element.content.icon.code}}</mat-icon>\r\n    </button>\r\n    <mat-menu #colorMenu=\"matMenu\">\r\n      <button mat-menu-item *ngFor=\"let idef of graph.icons\" (click)=\"setIcon(idef)\">\r\n        <mat-icon class=\"'color-' + {{u.overpage.options.element.content.icon.color}}\">{{idef.code}}</mat-icon>\r\n        <span>{{idef.name}}</span>\r\n      </button>\r\n    </mat-menu>\r\n    <mat-form-field flex>\r\n      <input matInput [(ngModel)]=\"u.overpage.options.element.name\" placeholder=\"Name\">\r\n    </mat-form-field>\r\n  </div>\r\n  <mat-form-field>\r\n    <input matInput [(ngModel)]=\"u.overpage.options.element.content.desc\" placeholder=\"Description\">\r\n  </mat-form-field>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/overpages/elements/element-way.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"map-element-editor\" layout-col>\r\n  <div layout-row>\r\n    <mat-icon>timeline</mat-icon>\r\n    <mat-form-field flex>\r\n      <input matInput [(ngModel)]=\"info.name\" placeholder=\"Name\">\r\n    </mat-form-field>\r\n  </div>\r\n  <mat-form-field>\r\n    <input matInput [(ngModel)]=\"info.content.desc\" placeholder=\"Description\">\r\n  </mat-form-field>\r\n\r\n  <p>TODO....</p>\r\n  <!-- TODO: way fields... -->\r\n\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/overpages/overpage-elements.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"overpage-content page-elements\" [ngSwitch]=\"u.overpage.options.elementType\">\r\n  <div *ngSwitchCase=\"''\">\r\n    <div class=\"map-element\" *ngFor=\"let ele of elements\" layout-row>\r\n      <div class=\"map-element-info\" flex>\r\n        <div class=\"title\">{{ele.title}}</div>\r\n        <div class=\"desc\">{{ele.desc}}</div>\r\n      </div>\r\n      <button mat-mini-fab color=\"primary\" (click)=\"select(ele.type)\">\r\n        <mat-icon>{{ele.icon}}</mat-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <app-element-way *ngSwitchCase=\"'way'\"></app-element-way>\r\n  <app-element-point *ngSwitchCase=\"'point'\"></app-element-point>\r\n  <div *ngIf=\"!!u.overpage.options.elementType\" layout-row>\r\n    <span flex></span>\r\n    <button color=\"warn\" mat-raised-button (click)=\"addToMap()\">SHARE ON MAP</button>\r\n    <span flex></span>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/overpages/overpage-map.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"overpage-content page-map\" layout-col>\r\n  <form class=\"login-data\" *ngIf=\"!logged\" layout-col>\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input type=\"text\" name=\"name\" placeholder=\"Pick a map name\" [(ngModel)]=\"data.name\" aria-label=\"map name\" (focus)=\"resetError()\" matInput [formControl]=\"mapName\" [matAutocomplete]=\"auto\">\r\n      <mat-autocomplete #auto=\"matAutocomplete\">\r\n        <mat-option *ngFor=\"let option of filteredOptions | async\" [value]=\"option\">{{ option }}</mat-option>\r\n      </mat-autocomplete>\r\n    </mat-form-field>\r\n    <mat-form-field>\r\n      <input name=\"password\" matInput type=\"password\" [(ngModel)]=\"data.password\" (focus)=\"resetError()\" placeholder=\"Password\">\r\n    </mat-form-field>\r\n    <mat-form-field>\r\n      <input name=\"nick\" matInput [(ngModel)]=\"data.nick\" (focus)=\"resetError()\" placeholder=\"Nikname\">\r\n    </mat-form-field>\r\n    <p></p>\r\n    <div class=\"login-toolbar\" layout-row>\r\n      <button mat-raised-button color=\"primary\" [disabled]=\"!validate()\" (click)=\"login()\">LOGIN</button>\r\n      <div flex></div>\r\n      <button mat-raised-button color=\"accent\" [disabled]=\"!validate()\" (click)=\"create()\">CREATE</button>\r\n    </div>\r\n  </form>\r\n  <div class=\"login-data info\" *ngIf=\"logged\" layout-col>\r\n    <div label>Current Map</div>\r\n    <div class=\"map-state button-row\" layout-row>\r\n      <div class=\"map-name\">{{data.name}}</div>\r\n      <div class=\"map-owner\" flex>{{data.nick}}</div>\r\n      <button mat-mini-fab color=\"warn\" (click)=\"logout()\">\r\n        <mat-icon>power_settings_new</mat-icon>\r\n      </button>\r\n    </div>\r\n    <div class=\"button-row button-row-label\" layout-row>\r\n      <div label flex>Elements</div>\r\n      <button mat-mini-fab color=\"warn\" (click)=\"addElement()\">\r\n        <mat-icon>add</mat-icon>\r\n      </button>\r\n    </div>\r\n    <div class=\"map-elements\">\r\n      <div *ngIf=\"!elements.length\" class=\"grey\">no elements</div>\r\n      <div class=\"map-element button-row\" *ngFor=\"let ele of elements\" layout-row>\r\n        <div class=\"map-element-type\" flex>{{ele.name}}</div>\r\n        <button mat-icon-button (click)=\"find(ele.marker)\">\r\n          <mat-icon>{{ele.marker.ndo6.content.icon.code}}</mat-icon>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <div label>Party</div>\r\n    <div class=\"map-owners\">\r\n      <div class=\"map-owner button-row\" layout-row>\r\n        <div class=\"map-owner-name\" flex>{{data.nick}}</div>\r\n        <button mat-mini-fab color=\"primary\" (click)=\"find(ndo6.last)\">\r\n          <mat-icon>person_pin_circle</mat-icon>\r\n        </button>\r\n      </div>\r\n      <div class=\"map-owner button-row\" *ngFor=\"let own of owners\" layout-row>\r\n        <div class=\"map-owner-name\" flex>{{own.name}}</div>\r\n        <button mat-mini-fab color=\"primary\" (click)=\"find(own.marker)\">\r\n          <mat-icon>person_pin_circle</mat-icon>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"error\">{{error}}</div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/overpages/overpage-marker.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"overpage-content\"  layout-col [ngSwitch]=\"marker.type\">\r\n  <!-- DATA: nick e altre info -->\r\n  <div label>Data</div>\r\n  <!-- TYPE: OWNER -->\r\n  <div *ngSwitchCase=\"'owner'\" class=\"ndo6-property\"><span class=\"name\">Nick:</span><span class=\"value\">{{marker.owner||'(unknown)'}}</span> </div>\r\n  <!-- TYPE: POINT -->\r\n  <div *ngSwitchCase=\"'point'\" class=\"ndo6-property\"><span class=\"name\">Name:</span><span class=\"value\">{{marker.name||'(unknown)'}}</span> </div>\r\n  <div *ngSwitchCase=\"'point'\" class=\"ndo6-property\"><span class=\"name\">Description:</span><span class=\"value\">{{marker.content.desc}}</span> </div>\r\n  <div *ngSwitchCase=\"'point'\" class=\"ndo6-property\"><span class=\"name\">Author:</span><span class=\"value\">{{marker.owner||'(unknown)'}}</span> </div>\r\n  <!-- (TODO) TYPE: WAY -->\r\n  <!-- POSITION -->\r\n  <div class=\"ndo6-property\"><span class=\"name\">Latitude:</span><span class=\"value\">{{u.overpage.options.latitude}}</span> </div>\r\n  <div class=\"ndo6-property\"><span class=\"name\">Longitude:</span><span class=\"value\">{{u.overpage.options.longitude}}</span> </div>\r\n  <!-- OPTIONS -->\r\n  <div label>Options</div>\r\n  <mat-slide-toggle *ngSwitchCase=\"'owner'\" color=\"accent\" [(ngModel)]=\"followed\" (change)=\"changeOption()\">Follow Me</mat-slide-toggle>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/overpages/overpage-settings.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"overpage-content\">\r\n  <!-- TODO: user settings... -->\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/overpages/overpage-test.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"overpage-content page-test\">\r\n  <div layout-col>\r\n    <h1>Test page {{user.system.token ? ' (system)' : ''}}</h1>\r\n    <mat-form-field>\r\n      <input matInput [(ngModel)]=\"user.settings.host\" (blur)=\"updateSettings()\" placeholder=\"Server host\">\r\n    </mat-form-field>\r\n    <mat-slide-toggle color=\"accent\" [(ngModel)]=\"user.settings.debug\" (change)=\"updateSettings()\">Debug mode</mat-slide-toggle>\r\n    <mat-slide-toggle color=\"accent\" [(ngModel)]=\"user.settings.socketMode\" (change)=\"updateSettings()\">Socket active</mat-slide-toggle>\r\n    <button mat-raised-button (click)=\"testStorage()\">Test storage functionality</button>\r\n    <button mat-raised-button (click)=\"sendPos()\" *ngIf=\"user.settings.token\">Test send my position</button>\r\n    <button mat-raised-button (click)=\"test()\" *ngIf=\"user.system.token && user.settings.token\">Server test func</button>\r\n    <button mat-raised-button (click)=\"deleteMap()\" color=\"warn\" *ngIf=\"user.system.token && user.settings.token\">Delete this Map</button>\r\n    <button mat-raised-button (click)=\"emptyMap()\" color=\"warn\" *ngIf=\"user.system.token && user.settings.token\">Empty Map</button>\r\n    <button mat-raised-button (click)=\"resetDb()\" color=\"warn\" *ngIf=\"user.system.token\">Reset db</button>\r\n  </div>\r\n  <div label>Monitor</div>\r\n  <div class=\"monitor ndo6-scrollbar\">\r\n    <div *ngFor=\"let p of positions\">[{{p.timestamp}}] {{p.owner}}: {{p.latitude}},{{p.longitude}}</div>\r\n  </div>\r\n  <div label>Console</div>\r\n  <div class=\"console-options button-row\" layout-row>\r\n    <mat-checkbox [(ngModel)]=\"types.error\" (change)=\"updateFilter()\">Errors</mat-checkbox>\r\n    <mat-checkbox [(ngModel)]=\"types.info\" (change)=\"updateFilter()\">Infos</mat-checkbox>\r\n    <mat-checkbox [(ngModel)]=\"types.warning\" (change)=\"updateFilter()\">Warnings</mat-checkbox>\r\n    <!--<mat-checkbox [(ngModel)]=\"types.special\" (change)=\"updateFilter()\">X</mat-checkbox>-->\r\n    <div flex></div>\r\n    <button mat-mini-fab (click)=\"clearLog()\">\r\n      <mat-icon>delete</mat-icon>\r\n    </button>\r\n  </div>\r\n  <div class=\"monitor ndo6-scrollbar\">\r\n    <div *ngFor=\"let line of lines\" class=\"log-line\" [ngClass]=\"'line-'+line.type\">[{{line.time}}] {{line.type}}: {{line.text}}</div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/overpages/overpages.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return OverpageSettingsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return OverpageTestComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return OverpageMarkerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return OverpageMapComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return OverpageElementsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapElementPointComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MapElementWayComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators_startWith__ = __webpack_require__("../../../../rxjs/_esm5/operators/startWith.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators_map__ = __webpack_require__("../../../../rxjs/_esm5/operators/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_utils_service__ = __webpack_require__("../../../../../src/app/services/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_user_settings_service__ = __webpack_require__("../../../../../src/app/services/user-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_ndo6_service__ = __webpack_require__("../../../../../src/app/services/ndo6.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_ndo6_icons_service__ = __webpack_require__("../../../../../src/app/services/ndo6-icons.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_maps_service__ = __webpack_require__("../../../../../src/app/services/maps.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_interaction_service__ = __webpack_require__("../../../../../src/app/services/interaction.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_log_service__ = __webpack_require__("../../../../../src/app/services/log.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var OverpageSettingsComponent = (function () {
    function OverpageSettingsComponent(user) {
        this.user = user;
    }
    OverpageSettingsComponent.prototype.ngOnInit = function () {
    };
    OverpageSettingsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-overpage-settings',
            template: __webpack_require__("../../../../../src/app/components/overpages/overpage-settings.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_user_settings_service__["a" /* UserSettingsService */]])
    ], OverpageSettingsComponent);
    return OverpageSettingsComponent;
}());

var OverpageTestComponent = (function () {
    function OverpageTestComponent(user, interaction, u, log) {
        this.user = user;
        this.interaction = interaction;
        this.u = u;
        this.log = log;
        this.positions = [];
        this.lines = [];
        this.types = {
            error: true,
            info: false,
            warning: false,
            special: false
        };
    }
    OverpageTestComponent.prototype.updateFilter = function () {
        var self = this;
        var types = [];
        __WEBPACK_IMPORTED_MODULE_11_lodash___default.a.keys(self.types).forEach(function (t) {
            if (self.types[t]) {
                types.push(t);
            }
        });
        self.lines = __WEBPACK_IMPORTED_MODULE_11_lodash___default.a.filter(self.log.lines, function (l) { return types.indexOf(l.type) > -1; });
    };
    OverpageTestComponent.prototype.clearLog = function () {
        this.log.clear();
    };
    OverpageTestComponent.prototype.ngOnInit = function () {
        this.updateFilter();
    };
    OverpageTestComponent.prototype.updateSettings = function () {
        this.user.update();
    };
    OverpageTestComponent.prototype.sendPos = function () {
        var self = this;
        self.interaction.position({
            latitude: 11.4363463,
            longitude: 43.52164346,
            timestamp: Date.now()
        }, function (err) {
            if (err) {
                self.log.error(err);
            }
            else {
                self.log.info('Position sending successfully');
            }
        });
    };
    OverpageTestComponent.prototype.testStorage = function () {
        var self = this;
        var test_key = 'NDO6_TEST_STORAGE_KEY';
        self.u.storage.set(test_key, { name: 'test-object', value: 123.63437 });
        var o = self.u.storage.get(test_key);
        self.log.info('STORAGGE TEST: ', o || 'undefined');
    };
    OverpageTestComponent.prototype.deleteMap = function () {
        this.interaction.deleteMap({ view: this.user.settings.map });
    };
    OverpageTestComponent.prototype.emptyMap = function () {
        this.interaction.emptyMap({ view: this.user.settings.map });
    };
    OverpageTestComponent.prototype.resetDb = function () {
        this.interaction.resetDb();
    };
    OverpageTestComponent.prototype.test = function () {
        var self = this;
        self.interaction.test({ view: this.user.settings.map }, function (err, result) {
            if (err) {
                console.error(err);
            }
            else {
                self.log.info('Server test successfully', result);
            }
        });
    };
    OverpageTestComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-overpage-test',
            template: __webpack_require__("../../../../../src/app/components/overpages/overpage-test.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_user_settings_service__["a" /* UserSettingsService */],
            __WEBPACK_IMPORTED_MODULE_9__services_interaction_service__["a" /* InteractionService */],
            __WEBPACK_IMPORTED_MODULE_4__services_utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_10__services_log_service__["a" /* LogService */]])
    ], OverpageTestComponent);
    return OverpageTestComponent;
}());

var OverpageMarkerComponent = (function () {
    function OverpageMarkerComponent(u, ndo6) {
        this.u = u;
        this.ndo6 = ndo6;
        this.followed = false;
        this.marker = null;
    }
    OverpageMarkerComponent.prototype.ngOnInit = function () {
        this.followed = this.ndo6.followMarker === this.u.overpage.options.marker;
        this.marker = (this.u.overpage.options.marker || {}).ndo6 || {};
    };
    OverpageMarkerComponent.prototype.changeOption = function () {
        if (this.followed) {
            this.ndo6.followMarker = this.u.overpage.options.marker;
            this.ndo6.checkPos();
        }
        else {
            this.ndo6.followMarker = null;
        }
    };
    OverpageMarkerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-overpage-marker',
            template: __webpack_require__("../../../../../src/app/components/overpages/overpage-marker.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_6__services_ndo6_service__["a" /* Ndo6Service */]])
    ], OverpageMarkerComponent);
    return OverpageMarkerComponent;
}());

var OverpageMapComponent = (function () {
    function OverpageMapComponent(u, log, user, interaction, ndo6, maps) {
        this.u = u;
        this.log = log;
        this.user = user;
        this.interaction = interaction;
        this.ndo6 = ndo6;
        this.maps = maps;
        this.mapName = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.data = {
            name: 'New Map',
            nick: 'my nickname'
        };
        this.options = [];
        this.logged = false;
        this.error = '';
        this.elements = [];
        this.owners = [];
    }
    OverpageMapComponent.prototype.ngOnInit = function () {
        var self = this;
        self.logged = !!self.user.settings.token;
        self.data.name = self.user.settings.map || self.data.name;
        self.data.nick = self.user.settings.nick || self.data.nick;
        self.interaction.getMaps(function (err, maps) { return self.options = __WEBPACK_IMPORTED_MODULE_11_lodash___default.a.map(maps || [], function (m) { return m.name; }); });
        self.filteredOptions = self.mapName.valueChanges
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators_startWith__["a" /* startWith */])(''), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_map__["a" /* map */])(function (val) { return self.filter(val); }));
        self.maps.elements.forEach(function (e) {
            switch (e.ndo6.type) {
                case self.ndo6.markers.owner:
                    if (e.ndo6.owner !== self.user.settings.nick) {
                        self.owners.push({
                            name: e.ndo6.owner,
                            marker: e
                        });
                    }
                    break;
                case self.ndo6.markers.point:
                    self.elements.push({
                        name: e.ndo6.name,
                        marker: e
                    });
                    break;
            }
        });
    };
    OverpageMapComponent.prototype.filter = function (val) {
        return this.options.filter(function (option) {
            return option.toLowerCase().indexOf(val.toLowerCase()) === 0;
        });
    };
    OverpageMapComponent.prototype.resetError = function () {
        this.error = '';
    };
    OverpageMapComponent.prototype.validate = function () {
        return this.u.validate(this.data.name) &&
            this.u.validate(this.data.password, '^[a-zA-Z0-9]{4,10}$') &&
            this.u.validate(this.data.nick);
    };
    OverpageMapComponent.prototype.logout = function () {
        var _this = this;
        this.u.idle = true;
        this.interaction.logout({}, function (err) {
            _this.ndo6.logout(true);
        });
    };
    OverpageMapComponent.prototype.handleErr = function (err) {
        if (err) {
            this.error = this.u.getErrorMessage(err);
        }
        this.u.idle = false;
        return !!this.error;
    };
    OverpageMapComponent.prototype.login = function () {
        var _this = this;
        this.u.idle = true;
        var info = {
            name: this.data.name,
            owner: this.data.nick,
            password: this.data.password,
            position: this.ndo6.getLastPos()
        };
        this.error = '';
        this.interaction.login(info, function (err, result) {
            if (_this.handleErr(err)) {
                return;
            }
            delete _this.data.password;
            if (result.system) {
                _this.user.system.token = result.token;
                _this.u.closeOverpage();
            }
            else {
                _this.ndo6.login(result.token, _this.data);
            }
        });
    };
    OverpageMapComponent.prototype.create = function () {
        var _this = this;
        this.error = '';
        var info = {
            name: this.data.name,
            owner: this.data.nick,
            password: this.data.password,
            center: ''
        };
        this.interaction.create(info, function (err, result) {
            if (_this.handleErr(err)) {
                return;
            }
            delete _this.data.password;
            _this.log.info('CREATE', result);
            _this.user.logdata(result.token, _this.data);
            _this.u.closeOverpage();
            _this.ndo6.checkState();
        });
    };
    OverpageMapComponent.prototype.addElement = function () {
        this.u.openOverpage('elements');
    };
    OverpageMapComponent.prototype.find = function (m) {
        this.ndo6.centerMap(m);
        this.u.closeOverpage();
    };
    OverpageMapComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-overpage-map',
            template: __webpack_require__("../../../../../src/app/components/overpages/overpage-map.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_10__services_log_service__["a" /* LogService */],
            __WEBPACK_IMPORTED_MODULE_5__services_user_settings_service__["a" /* UserSettingsService */],
            __WEBPACK_IMPORTED_MODULE_9__services_interaction_service__["a" /* InteractionService */],
            __WEBPACK_IMPORTED_MODULE_6__services_ndo6_service__["a" /* Ndo6Service */],
            __WEBPACK_IMPORTED_MODULE_8__services_maps_service__["a" /* MapsService */]])
    ], OverpageMapComponent);
    return OverpageMapComponent;
}());

var OverpageElementsComponent = (function () {
    function OverpageElementsComponent(u, ndo6) {
        this.u = u;
        this.ndo6 = ndo6;
        this.elements = [{
                title: 'Point',
                icon: 'place',
                desc: 'Add new place marker in current position',
                type: this.ndo6.mapElements.point
            }, {
                title: 'Way',
                icon: 'timeline',
                desc: 'Define a new way from a place to an other',
                type: this.ndo6.mapElements.way
            }];
        // this.u.overpage.back = { type: 'elements' };
    }
    OverpageElementsComponent.prototype.ngOnInit = function () {
        this.u.overpage.options = this.u.overpage.options || {};
        this.u.overpage.options.elementType = '';
        this.u.overpage.options.element = {};
        this.u.overpageBack({ type: 'map' });
    };
    OverpageElementsComponent.prototype.select = function (type) {
        this.u.overpage.options.elementType = type;
    };
    OverpageElementsComponent.prototype.addToMap = function () {
        this.ndo6.addToMap(this.u.overpage.options.element);
        this.u.closeOverpage();
    };
    OverpageElementsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-overpage-elements',
            template: __webpack_require__("../../../../../src/app/components/overpages/overpage-elements.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_6__services_ndo6_service__["a" /* Ndo6Service */]])
    ], OverpageElementsComponent);
    return OverpageElementsComponent;
}());

var MapElementPointComponent = (function () {
    function MapElementPointComponent(u, ndo6, graph) {
        this.u = u;
        this.ndo6 = ndo6;
        this.graph = graph;
        this.info = {
            position: {},
            type: '',
            name: 'New Point',
            content: {}
        };
    }
    MapElementPointComponent.prototype.ngOnInit = function () {
        var e = __WEBPACK_IMPORTED_MODULE_11_lodash___default.a.clone(this.info);
        e.type = this.ndo6.mapElements.point;
        e.content.desc = '';
        e.content.icon = this.graph.getDef('flag');
        e.content.color = this.graph.defaults.color;
        e.content.position = this.ndo6.getCurrentPos();
        this.u.overpage.options.element = e;
    };
    MapElementPointComponent.prototype.setIcon = function (idef) {
        var source = this.u.overpage.options.element.content;
        var color = source.icon.color || this.graph.defaults.color;
        source.icon = this.graph.getDef(idef.code);
        if (source.icon.colors.indexOf(color) < 0) {
            source.icon.color = this.graph.defaults.color;
        }
        else {
            source.icon.color = color;
        }
    };
    MapElementPointComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-element-point',
            template: __webpack_require__("../../../../../src/app/components/overpages/elements/element-point.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_6__services_ndo6_service__["a" /* Ndo6Service */],
            __WEBPACK_IMPORTED_MODULE_7__services_ndo6_icons_service__["a" /* Ndo6IconsService */]])
    ], MapElementPointComponent);
    return MapElementPointComponent;
}());

var MapElementWayComponent = (function () {
    function MapElementWayComponent(u, ndo6) {
        this.u = u;
        this.ndo6 = ndo6;
        this.info = {
            position: {},
            type: '',
            name: 'New Way',
            content: {}
        };
    }
    MapElementWayComponent.prototype.ngOnInit = function () {
        var e = __WEBPACK_IMPORTED_MODULE_11_lodash___default.a.clone(this.info);
        e.type = this.ndo6.mapElements.way;
        e.content.desc = '';
        e.content.start = '';
        e.content.end = '';
        this.u.overpage.options.element = e;
    };
    MapElementWayComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-element-way',
            template: __webpack_require__("../../../../../src/app/components/overpages/elements/element-way.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_6__services_ndo6_service__["a" /* Ndo6Service */]])
    ], MapElementWayComponent);
    return MapElementWayComponent;
}());



/***/ }),

/***/ "../../../../../src/app/services/interaction.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export InteractionEvent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InteractionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_settings_service__ = __webpack_require__("../../../../../src/app/services/user-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_service__ = __webpack_require__("../../../../../src/app/services/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__log_service__ = __webpack_require__("../../../../../src/app/services/log.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var InteractionEvent = (function () {
    function InteractionEvent(code) {
        this.code = code;
    }
    return InteractionEvent;
}());

var InteractionService = (function () {
    function InteractionService(http, user, u, log) {
        this.http = http;
        this.user = user;
        this.u = u;
        this.log = log;
        this.events = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    InteractionService.prototype._err = function (cb) {
        var self = this;
        return function (err) {
            if (err) {
                self.log.error(err);
            }
            if ((err || {}).status === 401) {
                self.events.emit(new InteractionEvent(401));
            }
            if (cb) {
                cb(err);
            }
        };
    };
    InteractionService.prototype._check = function (data) {
        data.owner = this.user.settings.nick;
        // data.token = this.user.settings.token;  // by interceptor
        return data;
    };
    InteractionService.prototype._checkSystem = function (data) {
        data._system = true;
        return data;
    };
    InteractionService.prototype.ngOnInit = function () {
        var self = this;
        if (self.user.settings.token) {
            self.getInfo().subscribe(function (r) {
                // è loggato inizializza le info di mappa
                self.log.info('getInfo: ', r);
                self.log.active = !!r.debug;
            }, self._err(function () {
                // reset data login
            }));
        }
    };
    InteractionService.prototype.getInfo = function () {
        return this.http.get(this.user.getUrl('api/view/info'));
    };
    InteractionService.prototype.getMaps = function (cb) {
        this.http.get(this.user.getUrl('api/view'))
            .subscribe(function (r) { return cb(null, r); }, this._err(cb));
    };
    InteractionService.prototype.login = function (data, cb) {
        this.http.post(this.user.getUrl('auth/login'), this._check(data))
            .subscribe(function (r) { return cb(null, r); }, this._err(cb));
    };
    InteractionService.prototype.logout = function (data, cb) {
        this.http.post(this.user.getUrl('auth/logout'), this._check(data))
            .subscribe(function (r) { return cb(null, r); }, this._err(cb));
    };
    InteractionService.prototype.getState = function (cb) {
        this.http.post(this.user.getUrl('api/view'), this._check({}))
            .subscribe(function (r) { return cb(null, r); }, this._err(cb));
    };
    InteractionService.prototype.create = function (data, cb) {
        this.http.post(this.user.getUrl('api/view/create'), this._check(data))
            .subscribe(function (r) { return cb(null, r); }, this._err(cb));
    };
    InteractionService.prototype.position = function (data, cb) {
        this.http.post(this.user.getUrl('api/view/position'), this._check(data))
            .subscribe(function (r) { return cb(null, r); }, this._err(cb));
    };
    InteractionService.prototype.message = function (data, cb) {
        this.http.post(this.user.getUrl('api/view/message'), this._check(data))
            .subscribe(function (r) { return cb(null, r); }, this._err(cb));
    };
    InteractionService.prototype.element = function (data, cb) {
        this.http.post(this.user.getUrl('api/view/element'), this._check(data))
            .subscribe(function (r) { return cb(null, r); }, this._err(cb));
    };
    //////////////////////////////////////////////////////
    // SYSTEM METHODS
    //////////////////////////////////////////////////////
    InteractionService.prototype.test = function (data, cb) {
        this.http.post(this.user.getUrl('api/view/test'), this._checkSystem(data))
            .subscribe(function (r) { return cb(null, r); }, this._err(cb));
    };
    InteractionService.prototype.resetDb = function () {
        this.http.post(this.user.getUrl('api/view/reset'), this._checkSystem({}))
            .subscribe(function (r) { }, this._err());
    };
    InteractionService.prototype.deleteMap = function (data) {
        this.http.post(this.user.getUrl('api/view/burn'), this._checkSystem(data))
            .subscribe(function (r) { }, this._err());
    };
    InteractionService.prototype.emptyMap = function (data) {
        this.http.post(this.user.getUrl('api/view/empty'), this._checkSystem(data))
            .subscribe(function (r) { }, this._err());
    };
    InteractionService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__user_settings_service__["a" /* UserSettingsService */],
            __WEBPACK_IMPORTED_MODULE_3__utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_4__log_service__["a" /* LogService */]])
    ], InteractionService);
    return InteractionService;
}());



/***/ }),

/***/ "../../../../../src/app/services/log.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_service__ = __webpack_require__("../../../../../src/app/services/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LOGTYPES = {
    error: 'error',
    warning: 'warning',
    info: 'info',
    special: 'special'
};
var LogService = (function () {
    function LogService(u) {
        this.u = u;
        this.lines = [];
        this.active = true;
        this.types = LOGTYPES;
    }
    LogService.prototype.add = function (txt, type) {
        if (type === void 0) { type = LOGTYPES.info; }
        var now = new Date();
        var line = {
            time: now.getTime(),
            type: type,
            text: txt
        };
        if (this.active) {
            this.lines.push(line);
        }
        // console.log(line);
    };
    LogService.prototype.error = function (err, show) {
        if (show === void 0) { show = false; }
        this.add(this.u.getErrorMessage(err), LOGTYPES.error);
        console.error(err);
        if (show) {
            this.u.error(err);
        }
    };
    LogService.prototype.warning = function (txt) {
        this.add(txt, LOGTYPES.warning);
        console.warn(txt);
    };
    LogService.prototype.info = function (txt, obj, type) {
        if (obj === void 0) { obj = null; }
        if (type === void 0) { type = LOGTYPES.info; }
        if (__WEBPACK_IMPORTED_MODULE_2_lodash___default.a.isObject(obj)) {
            console.log(txt, obj);
            txt = txt + ' ' + JSON.stringify(obj);
        }
        this.add(txt, type);
    };
    LogService.prototype.clear = function () {
        this.lines.splice(0);
    };
    LogService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__utils_service__["a" /* UtilsService */]])
    ], LogService);
    return LogService;
}());



/***/ }),

/***/ "../../../../../src/app/services/maps.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_service__ = __webpack_require__("../../../../../src/app/services/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MapsService = (function () {
    function MapsService(u) {
        this.u = u;
        this.elements = [];
    }
    MapsService.prototype.getOptions = function () {
        return {
            zoom: 14,
            center: new google.maps.LatLng(43.7681469, 11.2527254),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    };
    MapsService.prototype.create = function (cb, dommap, domfinder, o) {
        if (dommap === void 0) { dommap = null; }
        if (domfinder === void 0) { domfinder = null; }
        if (o === void 0) { o = null; }
        var self = this;
        o = o || self.getOptions();
        cb = cb || self.u.noop;
        dommap = dommap || 'map-canvas';
        // domfinder = domfinder || 'map-finder';
        var context = {
            options: o,
            map: new google.maps.Map(document.getElementById(dommap), o),
            directionsService: new google.maps.DirectionsService,
            directionsDisplay: new google.maps.DirectionsRenderer,
            searchBox: {}
        };
        // Crea il box per la ricerca e lo sincronizza con la mappa
        if (domfinder) {
            var input = document.getElementById(domfinder);
            context.searchBox = new google.maps.places.SearchBox(input);
            context.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            context.directionsDisplay.setMap(context.map);
            context.map.addListener('bounds_changed', function () {
                context.searchBox.setBounds(context.map.getBounds());
            });
            context.searchBox.addListener('places_changed', function () {
                var places = context.searchBox.getPlaces();
                if (places.length) {
                    // self.ndo6.center(places[0].geometry.location);
                }
            });
        }
        google.maps.event.addListenerOnce(context.map, 'idle', function () {
            cb(context);
        });
        return context;
    };
    /**
     * Restituisce un latlng
     * @param pos
     * @returns {google.maps.LatLng}
     */
    MapsService.prototype.getLatLng = function (pos) {
        if (pos) {
            if (pos.coords) {
                pos = pos.coords;
            }
            var lat = pos.latitude ? pos.latitude : (pos.G ? pos.G : (__WEBPACK_IMPORTED_MODULE_2_lodash___default.a.isFunction(pos.lat) ? pos.lat() : undefined));
            var lng = pos.longitude ? pos.longitude : (pos.K ? pos.K : (__WEBPACK_IMPORTED_MODULE_2_lodash___default.a.isFunction(pos.lng) ? pos.lng() : undefined));
            return new google.maps.LatLng(lat, lng);
        }
    };
    MapsService.prototype.clearMapElements = function () {
        this.elements.forEach(function (e) { return e.setMap(null); });
        this.elements.splice(0);
    };
    MapsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__utils_service__["a" /* UtilsService */]])
    ], MapsService);
    return MapsService;
}());



/***/ }),

/***/ "../../../../../src/app/services/ndo6-icons.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ndo6IconsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Ndo6IconsService = (function () {
    function Ndo6IconsService() {
        this.defaults = {
            anchor: {
                x: 24,
                y: 48
            },
            color: 'orange',
            code: 'position',
            personIcon: 'position',
            placeIcon: 'flag'
        };
        this.icons = [
            {
                name: 'Palace',
                code: 'account_balance',
                colors: ['black', 'orange']
            },
            {
                name: 'Add Photo',
                code: 'add_a_photo',
                colors: ['black', 'orange']
            },
            {
                name: 'Adjust',
                code: 'adjust',
                colors: ['black', 'orange'],
                anchor: { x: 24, y: 24 }
            },
            {
                name: 'Audio Track',
                code: 'audiotrack',
                colors: ['black', 'orange']
            },
            {
                name: 'Block',
                code: 'block',
                colors: ['black', 'orange'],
                anchor: { x: 24, y: 24 }
            },
            {
                name: 'Build',
                code: 'build',
                colors: ['black', 'orange']
            },
            {
                name: 'Camera',
                code: 'camera',
                colors: ['black', 'orange'],
                anchor: { x: 24, y: 24 }
            },
            {
                name: 'Error',
                code: 'error',
                colors: ['black', 'orange']
            },
            {
                name: 'Face',
                code: 'face',
                colors: ['black', 'orange']
            },
            {
                name: 'Favorite',
                code: 'favorite',
                colors: ['black', 'orange']
            },
            {
                name: 'Favorite Border',
                code: 'favorite_border',
                colors: ['black', 'orange']
            },
            {
                name: 'Feedback',
                code: 'feedback',
                colors: ['black', 'orange'],
                anchor: { x: 4, y: 48 }
            },
            {
                name: 'Point',
                code: 'fiber_manual_record',
                colors: ['black', 'orange'],
                anchor: { x: 24, y: 24 }
            },
            {
                name: 'Flag',
                code: 'flag',
                anchor: { x: 4, y: 48 },
                colors: ['black', 'orange']
            },
            {
                name: 'Flash',
                code: 'flash_on',
                colors: ['black', 'orange']
            },
            {
                name: 'Flight',
                code: 'flight_takeoff',
                colors: ['black', 'orange']
            },
            {
                name: 'Star',
                code: 'grade',
                colors: ['black', 'orange'],
                anchor: { x: 24, y: 24 }
            },
            {
                name: 'Help',
                code: 'help',
                colors: ['black', 'orange'],
                anchor: { x: 24, y: 24 }
            },
            {
                name: 'Highlight',
                code: 'highlight',
                colors: ['black', 'orange']
            },
            {
                name: 'Emoticon',
                code: 'insert_emoticon',
                colors: ['black', 'orange'],
                anchor: { x: 24, y: 24 }
            },
            {
                name: 'Lightbulb',
                code: 'lightbulb_outline',
                colors: ['black', 'orange']
            },
            {
                name: 'Location Off',
                code: 'location_off',
                colors: ['black', 'orange']
            },
            {
                name: 'Message',
                code: 'message',
                colors: ['black', 'orange'],
                anchor: { x: 4, y: 48 }
            },
            {
                name: 'Money',
                code: 'monetization_on',
                colors: ['black', 'orange'],
                anchor: { x: 24, y: 24 }
            },
            {
                name: 'Pets',
                code: 'pets',
                colors: ['black', 'orange']
            },
            {
                name: 'Photo',
                code: 'photo',
                colors: ['black', 'orange']
            },
            {
                name: 'Rowing',
                code: 'rowing',
                colors: ['black', 'orange']
            },
            {
                name: 'Feed',
                code: 'rss_feed',
                colors: ['black', 'orange'],
                anchor: { x: 4, y: 48 }
            },
            {
                name: 'Settings',
                code: 'settings',
                colors: ['black', 'orange'],
                anchor: { x: 24, y: 24 }
            },
            {
                name: 'Shopping',
                code: 'shopping_cart',
                colors: ['black', 'orange']
            },
            {
                name: 'Thumb Down',
                code: 'thumb_down',
                colors: ['black', 'orange'],
                anchor: { x: 24, y: 24 }
            },
            {
                name: 'Thumb Up',
                code: 'thumb_up',
                colors: ['black', 'orange'],
                anchor: { x: 24, y: 24 }
            },
            {
                name: 'Verified',
                code: 'verified_user',
                colors: ['black', 'orange']
            },
            {
                name: 'Visibility On',
                code: 'visibility',
                colors: ['black', 'orange'],
                anchor: { x: 24, y: 24 }
            },
            {
                name: 'Visibility Off',
                code: 'visibility_off',
                colors: ['black', 'orange'],
                anchor: { x: 24, y: 24 }
            },
            {
                name: 'Volume Off',
                code: 'volume_off',
                colors: ['black', 'orange']
            },
            {
                name: 'Volume Up',
                code: 'volume_up',
                colors: ['black', 'orange']
            },
            {
                name: 'Key',
                code: 'vpn_key',
                colors: ['black', 'orange']
            },
            {
                name: 'Warning',
                code: 'warning',
                colors: ['black', 'orange'],
                anchor: { x: 24, y: 24 }
            },
            {
                name: 'Sunny',
                code: 'wb_sunny',
                colors: ['black', 'orange'],
                anchor: { x: 24, y: 24 }
            },
            {
                name: 'Position',
                code: 'position',
                colors: ['black', 'blue', 'green', 'orange', 'red']
            },
            {
                name: 'Person',
                code: 'person_pin_circle',
                colors: ['black', 'orange']
            },
            {
                name: 'Place',
                code: 'place',
                colors: ['black', 'orange']
            }
        ];
    }
    Ndo6IconsService.prototype.getDef = function (code) {
        var ic = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.find(this.icons, function (i) { return i.code === code; });
        return __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.clone(ic);
    };
    Ndo6IconsService.prototype.getIcon = function (info) {
        var ic = null;
        if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isObject(info)) {
            if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isObject(info.icon)) {
                ic = this.getDef(info.icon.code);
            }
            else {
                ic = this.getDef(info.icon || info.code);
            }
        }
        else if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isString(info)) {
            ic = this.getDef(info);
        }
        if (!ic) {
            return console.error('Undefined icon info', info);
        }
        ic.color = ic.color || this.defaults.color;
        ic.code = ic.code || ic.icon || this.defaults.code;
        ic.anchor = ic.anchor || this.defaults.anchor;
        return {
            url: './assets/elements/' + ic.color + '/' + ic.code + '.png',
            size: new google.maps.Size(48, 48),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(ic.anchor.x, ic.anchor.y)
        };
    };
    Ndo6IconsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], Ndo6IconsService);
    return Ndo6IconsService;
}());



/***/ }),

/***/ "../../../../../src/app/services/ndo6.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Ndo6Event */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ndo6Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__maps_service__ = __webpack_require__("../../../../../src/app/services/maps.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_settings_service__ = __webpack_require__("../../../../../src/app/services/user-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_service__ = __webpack_require__("../../../../../src/app/services/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__log_service__ = __webpack_require__("../../../../../src/app/services/log.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__interaction_service__ = __webpack_require__("../../../../../src/app/services/interaction.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ndo6_icons_service__ = __webpack_require__("../../../../../src/app/services/ndo6-icons.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var Ndo6Event = (function () {
    function Ndo6Event(type, data) {
        if (data === void 0) { data = null; }
        this.type = type;
        this.data = data;
    }
    return Ndo6Event;
}());

var GEOLOCATION_OPTIONS = {
    maximumAge: 10,
    enableHighAccuracy: false,
    timeout: 10000
};
var MARKERS = {
    owner: 'owner',
    point: 'point'
};
var MAP_ELEMENT_TYPES = {
    point: 'point',
    way: 'way'
};
var Ndo6Service = (function () {
    function Ndo6Service(maps, user, u, log, interaction, icons) {
        this.maps = maps;
        this.user = user;
        this.u = u;
        this.log = log;
        this.interaction = interaction;
        this.icons = icons;
        this.events = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.positionChecker = null;
        this.last = null;
        this.session = {
            user: {},
            map: null,
            context: null
        };
        this.onfirstpos = false;
        this.followMarker = null;
        this.watchId = null;
        this.active = false;
        this.center = false;
        this.posErrorCounter = 0;
        this.clickOnMarker = null;
        this.pooling = null;
        this.markers = MARKERS;
        this.mapElements = MAP_ELEMENT_TYPES;
        var self = this;
        self.interaction.events.subscribe(function (e) {
            switch (e.code) {
                case 401:
                    self.logout();
                    break;
            }
        });
    }
    Ndo6Service.prototype.setZoom = function (zoom) {
        var self = this;
        if (!zoom || !self.session.context) {
            return;
        }
        var listener = google.maps.event.addListener(self.session.context.map, 'idle', function () {
            self.session.context.map.setZoom(zoom);
            google.maps.event.removeListener(listener);
        });
    };
    /**
     * centra la mappa
     */
    Ndo6Service.prototype.centerMap = function (pos, zoom, finder) {
        if (zoom === void 0) { zoom = null; }
        if (finder === void 0) { finder = null; }
        var self = this;
        if (!self.session.context || !pos) {
            return;
        }
        // il centro è considerato più in alto per
        // lasciare lo spazio al monitor
        var bounds = self.session.context.map.getBounds();
        if (!bounds) {
            return;
        }
        // Imposta il centro della mappa
        self.session.context.map.setCenter(pos.position);
        var mrk = finder ? finder() : null;
        if (mrk) {
            // Se ha trovato il marker lo anima
            mrk.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                mrk.setAnimation(null);
            }, 1000);
        }
        self.setZoom(zoom);
    };
    Ndo6Service.prototype._checkGeoError = function (err) {
        var self = this;
        switch (err.code) {
            case 1:
                self.log.error('Geolocation permission denied');
                break;
            case 2:
                self.log.error('Geolocation position unavailable');
                break;
            case 3:
                self.log.warning('Geolocation timed out');
                break;
            default: self.log.error(err);
        }
    };
    Ndo6Service.prototype.watchGeo = function (cb) {
        var self = this;
        self.watchId = navigator.geolocation.watchPosition(cb, function (err) {
            self._checkGeoError(err);
        }, GEOLOCATION_OPTIONS);
    };
    Ndo6Service.prototype.checkGeo = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            if (!navigator.geolocation) {
                var err = 'Geolocation is not supported by this browser.';
                self.log.error(err);
                return reject(err);
            }
            else {
                navigator.geolocation.getCurrentPosition(resolve, function (err) {
                    self._checkGeoError(err);
                    reject(err);
                }, GEOLOCATION_OPTIONS);
            }
        });
    };
    Ndo6Service.prototype.reset = function () {
        if (this.positionChecker) {
            clearTimeout(this.positionChecker);
        }
        this.active = false;
        this.clickOnMarker = null;
    };
    Ndo6Service.prototype.samePos = function (p1, p2) {
        return p1 && p2 && p1 === p2;
    };
    Ndo6Service.prototype.samePosOf = function (m, pos) {
        return (m && pos && m.position.lat() === pos.latitude && m.position.lng() === pos.longitude);
    };
    Ndo6Service.prototype.validMarkerPos = function (m) {
        return m && m.position.lat() !== 0 && m.position.lng() !== 0;
    };
    Ndo6Service.prototype.validPos = function (pos) {
        if ((pos || {}).coords) {
            pos = pos.coords;
        }
        return pos && pos.latitude !== 0 && pos.longitude !== 0;
    };
    Ndo6Service.prototype.setPos = function (pos) {
        var self = this;
        if (!self.last) {
            self.onfirstpos = true;
            self.last = self.getMarker({
                type: 'user',
                icon: 'person_pin_circle',
                label: self.user.settings.nick[0],
                nick: self.user.settings.nick,
                owner: self.user.settings.nick,
                id: self.user.settings.id
            });
        }
        self.log.info('POSITION: ', pos);
        if (!self.samePosOf(self.last, pos) && self.validPos(pos)) {
            var latlng = self.maps.getLatLng(pos);
            self.last.setPosition(latlng);
            self.log.info('EMIT POSITION: ', pos);
            self.events.emit(new Ndo6Event('changepos', {
                latitude: pos.latitude,
                longitude: pos.longitude,
                id: self.last.ndo6.id
            }));
            var center = self.center || self.samePos(self.followMarker, self.last);
            if (center === true) {
                self.centerMap(self.last);
                self.center = false;
            }
            if (self.onfirstpos) {
                self.events.emit(new Ndo6Event('firstpos'));
                self.onfirstpos = false;
            }
        }
    };
    Ndo6Service.prototype.checkPos = function () {
        var self = this;
        self.positionChecker = setTimeout(function () {
            self.checkGeo()
                .then(function (pos) {
                self.posErrorCounter = 0;
                self.log.info('read position: ' + self.u.format('{latitude},{longitude}', pos.coords));
                self.setPos(pos);
                if (self.active) {
                    self.checkPos();
                }
            }, function (err) {
                if (err) {
                    self.posErrorCounter++;
                }
                self.checkPos();
            });
        }, self.user.settings.delay || 1000);
    };
    Ndo6Service.prototype.clearGeo = function () {
        var self = this;
        if (self.positionChecker) {
            clearTimeout(self.positionChecker);
        }
    };
    Ndo6Service.prototype.stopGeo = function () {
        var self = this;
        if (self.watchId) {
            navigator.geolocation.clearWatch(self.watchId);
        }
    };
    Ndo6Service.prototype.activateW = function (context) {
        var self = this;
        self.session.context = context;
        self.stopGeo();
        self.center = true;
        self.watchGeo(function (pos) {
            self.setPos(pos);
        });
        self.active = true;
        self.checkState();
    };
    Ndo6Service.prototype.activate = function (context) {
        var self = this;
        self.session.context = context;
        self.clearGeo();
        self.center = true;
        self.checkPos();
        self.active = true;
        self.checkState();
    };
    Ndo6Service.prototype.logout = function (close) {
        if (close === void 0) { close = false; }
        this.user.logdata();
        if (this.u.overpage.type !== 'map' || close) {
            this.u.closeOverpage();
        }
        this.checkState();
    };
    Ndo6Service.prototype.login = function (token, data) {
        this.user.logdata(token, data);
        this.u.closeOverpage();
        this.checkState();
    };
    Ndo6Service.prototype.checkState = function () {
        var self = this;
        // se esiste il token attiva il pool oppure connette il socket (secondo lo impostazioni)
        if (!!self.user.settings.token) {
            if (self.user.settings.socketMode) {
                // TODO: se non connesso connette il socket
            }
            else if (!self.pooling) {
                // se non attivo accende il pooling
                self.pooling = setInterval(function () {
                    self.interaction.getState(function (err, res) {
                        // self.log.info('read state: ', res, self.log.types.special);
                        if (err) {
                            return;
                        }
                        res = res || {};
                        self.checkPositions(res.positions);
                        self.checkElements(res.elements);
                        self.checkMessages(res.messages);
                    });
                }, self.user.settings.poolingTime || 1000);
            }
        }
        else {
            // se attivo spenge il pooling
            if (self.pooling) {
                clearInterval(self.pooling);
                self.pooling = null;
            }
            // TODO: se connesso sconnette il socket
            // elimina gli oggetti sulla mappa
            self.maps.clearMapElements();
        }
    };
    Ndo6Service.prototype.checkPositions = function (ps) {
        if (!__WEBPACK_IMPORTED_MODULE_7_lodash___default.a.isArray(ps)) {
            return;
        }
        var self = this;
        var last = self.last || {};
        ps.forEach(function (pos) {
            // console.log('[CHECK POS]: pos=', pos);
            // console.log('[CHECK POS]: last=', self.last);
            if (pos.id === last.id || pos.owner === last.owner) {
                return;
            }
            var ex = __WEBPACK_IMPORTED_MODULE_7_lodash___default.a.find(self.maps.elements, function (e) { return e.ndo6.owner === pos.owner && e.ndo6.type === MARKERS.owner; });
            if (ex) {
                var latlng = self.maps.getLatLng(pos);
                ex.setPosition(latlng);
            }
            else {
                pos.label = pos.owner[0] || '?';
                pos.type = MARKERS.owner;
                pos.icon = pos.icon || self.icons.defaults.personIcon;
                ex = self.getMarker(pos);
                self.maps.elements.push(ex);
            }
        });
    };
    Ndo6Service.prototype.checkElements = function (es) {
        if (!__WEBPACK_IMPORTED_MODULE_7_lodash___default.a.isArray(es)) {
            return;
        }
        var self = this;
        es.forEach(function (ele) {
            var ex = __WEBPACK_IMPORTED_MODULE_7_lodash___default.a.find(self.maps.elements, function (e) { return e.ndo6.type === ele.type && e.ndo6._id === ele._id; });
            if (ex) {
            }
            else {
                ele.latitude = ele.content.position.latitude;
                ele.longitude = ele.content.position.longitude;
                ele.icon = ele.content.icon || self.icons.defaults.placeIcon;
                ex = self.getMarker(ele);
                self.maps.elements.push(ex);
            }
        });
    };
    Ndo6Service.prototype.checkMessages = function (ms) {
        if (!__WEBPACK_IMPORTED_MODULE_7_lodash___default.a.isArray(ms)) {
            return;
        }
        // TODO: messaggi
    };
    // getMarkerIcon(info: any, color = this.icons.defaults.color) {
    //   if (info) {
    //     if (!_.isObject(info)) {
    //       info = {
    //         code: info,
    //         color: color,
    //         anchor: this.icons.defaults.anchor
    //       };
    //     }
    //     info.color = info.color || this.icons.defaults.color;
    //     info.code = info.code || info.icon || this.icons.defaults.code;
    //     info.anchor = info.anchor || this.icons.defaults.anchor;
    //     return {
    //       url: './assets/elements/' + info.color + '/' + info.code + '.png',
    //       size: new google.maps.Size(48, 48),
    //       origin: new google.maps.Point(0, 0),
    //       anchor: new google.maps.Point(info.anchor.x, info.anchor.y)
    //     };
    //   }
    // }
    Ndo6Service.prototype.getMarker = function (info) {
        var self = this;
        if (!self.session.context) {
            return null;
        }
        var latlnt = self.maps.getLatLng(info);
        var m = new google.maps.Marker({
            map: self.session.context.map,
            label: info.label,
            position: latlnt,
            title: info.title || info.description || info.nick,
            icon: self.icons.getIcon(info)
        });
        m.ndo6 = {};
        __WEBPACK_IMPORTED_MODULE_7_lodash___default.a.extend(m.ndo6, info);
        m.ndo6.id = m.ndo6.id || self.u.guid();
        google.maps.event.addListener(m, 'click', function () {
            self.events.emit(new Ndo6Event('marker', m));
        });
        return m;
    };
    Ndo6Service.prototype.getNick = function (m) {
        if (m === this.last) {
            return this.user.settings.nick;
        }
        return m.ndo6.owner;
    };
    Ndo6Service.prototype.getLastPos = function () {
        if (this.validMarkerPos(this.last)) {
            return {
                latitude: this.last.position.lat(),
                longitude: this.last.position.lng(),
                timestamp: this.last.timestamp
            };
        }
    };
    Ndo6Service.prototype.getCurrentPos = function () {
        var pos = (this.session || {}).context ? this.session.context.map.getCenter() : null;
        return pos ? {
            latitude: pos.lat(),
            longitude: pos.lng()
        } : null;
    };
    Ndo6Service.prototype.addToMap = function (ele) {
        var self = this;
        console.log('NEW ELEMENT BY CLIENT:', ele);
        self.interaction.element(ele, function (err) {
            if (!err) {
                self.u.snack('Element shared on map.');
            }
        });
    };
    Ndo6Service = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__maps_service__["a" /* MapsService */],
            __WEBPACK_IMPORTED_MODULE_2__user_settings_service__["a" /* UserSettingsService */],
            __WEBPACK_IMPORTED_MODULE_3__utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_4__log_service__["a" /* LogService */],
            __WEBPACK_IMPORTED_MODULE_5__interaction_service__["a" /* InteractionService */],
            __WEBPACK_IMPORTED_MODULE_6__ndo6_icons_service__["a" /* Ndo6IconsService */]])
    ], Ndo6Service);
    return Ndo6Service;
}());



/***/ }),

/***/ "../../../../../src/app/services/user-settings.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserSettingsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_service__ = __webpack_require__("../../../../../src/app/services/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var STORE_KEY = 'NDO6-USER-SETTINGS';
var DEFAULT_SERVER_HOST = 'http://localhost:6001';
var UserSettingsService = (function () {
    function UserSettingsService(u) {
        this.u = u;
        this.settings = {};
        this.system = {};
        var sts = this.u.storage.get(STORE_KEY) || {};
        __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.extend(this.settings, sts);
        __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.defaults(this.settings, {
            host: DEFAULT_SERVER_HOST,
            debug: false,
            delay: 1000,
            nick: 'io',
            id: u.guid(),
            map: '',
            token: '',
            socketMode: false,
            poolingTime: 1000
        });
    }
    UserSettingsService.prototype.keep = function (value, target) {
        if (value) {
            this.settings[target] = value;
        }
    };
    UserSettingsService.prototype.update = function () {
        this.u.storage.set(STORE_KEY, this.settings);
    };
    UserSettingsService.prototype.getUrl = function () {
        var parts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parts[_i] = arguments[_i];
        }
        var self = this;
        var args = Array.prototype.slice.call(arguments);
        var host = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production ? self.u.getOrigin() : (self.settings['host'] || DEFAULT_SERVER_HOST);
        args.unshift(host);
        return self.u.checkUrl.apply(null, args);
    };
    UserSettingsService.prototype.logdata = function (token, data) {
        if (token === void 0) { token = ''; }
        if (data === void 0) { data = null; }
        this.settings.token = token;
        this.keep((data || {}).name, 'map');
        this.keep((data || {}).nick, 'nick');
        this.update();
    };
    UserSettingsService.prototype.ngOnInit = function () {
    };
    UserSettingsService.prototype.ngOnDestroy = function () {
        this.update();
    };
    UserSettingsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__utils_service__["a" /* UtilsService */]])
    ], UserSettingsService);
    return UserSettingsService;
}());



/***/ }),

/***/ "../../../../../src/app/services/utils.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_confirm_dialog_confirm_dialog_component__ = __webpack_require__("../../../../../src/app/components/confirm-dialog/confirm-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TYPES = {
    string: 'string',
    number: 'number',
    date: 'date',
    boolean: 'bool',
    object: 'object'
};
var UtilsService = (function () {
    function UtilsService(dialog, snackBar, app) {
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.app = app;
        this.storage = {
            set: function (key, o) {
                var o_str = o ? JSON.stringify(o) : '';
                localStorage.setItem(key, o_str);
            },
            get: function (key) {
                var o_str = localStorage.getItem(key) || '';
                return o_str ? JSON.parse(o_str) : null;
            },
            del: function (key) {
                localStorage.removeItem(key);
            }
        };
        this.modalActive = false;
        this.overpage = {};
        this.idle = false;
        this.err = null;
    }
    UtilsService_1 = UtilsService;
    UtilsService._s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    UtilsService._isText = function (txt) {
        return __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.isString(txt) && !__WEBPACK_IMPORTED_MODULE_3_lodash___default.a.startsWith(txt || '', '<!');
    };
    UtilsService.prototype.clone = function (o) {
        if (!__WEBPACK_IMPORTED_MODULE_3_lodash___default.a.isObject(o)) {
            return o;
        }
        var str = JSON.stringify(o);
        return JSON.parse(str);
    };
    UtilsService.prototype.raiseChange = function () {
        this.app.tick();
    };
    UtilsService.prototype.openOverpage = function (type, o) {
        if (type === void 0) { type = null; }
        if (o === void 0) { o = null; }
        this.overpage.back = null;
        this.overpage.type = type;
        this.overpage.options = o || {};
        this.idle = false;
    };
    UtilsService.prototype.closeOverpage = function () {
        this.openOverpage();
    };
    UtilsService.prototype.backOverpage = function () {
        if (__WEBPACK_IMPORTED_MODULE_3_lodash___default.a.isFunction(this.overpage.back)) {
            this.overpage.back();
        }
        else if (__WEBPACK_IMPORTED_MODULE_3_lodash___default.a.isObject(this.overpage.back)) {
            this.openOverpage(this.overpage.back.type, this.overpage.back.options);
        }
    };
    UtilsService.prototype.overpageBack = function (o) {
        var self = this;
        setTimeout(function () {
            self.overpage.back = o;
        }, 400);
    };
    UtilsService.prototype.noop = function () { };
    UtilsService.prototype.checkUrl = function () {
        var parts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parts[_i] = arguments[_i];
        }
        var args = Array.prototype.slice.call(arguments);
        var url = [];
        args.forEach(function (part) {
            part = part.replace(/:\/\//, '{ECHO-PDL}');
            part.split(/\//).forEach(function (p) {
                if (p === '..') {
                    url.pop();
                }
                else if (p) {
                    url.push(p.replace(/{ECHO-PDL}/, '://'));
                }
            });
        });
        return url.join('/');
    };
    UtilsService.prototype._enc = function (v) {
        return (v + '');
    };
    UtilsService.prototype.format = function (str, o) {
        if (o === void 0) { o = {}; }
        str = str || '';
        __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.keysIn(o).forEach(function (pn) {
            var rgx = new RegExp('{' + pn + '}', 'g');
            str = str.replace(rgx, o[pn] || '');
        });
        return str;
    };
    UtilsService.prototype.getUrlParams = function (o) {
        var self = this;
        var params_cll = [];
        if (o) {
            __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.keys(o).forEach(function (pn) { return params_cll.push(self._enc(pn) + '=' + self._enc(o[pn])); });
        }
        return params_cll.length ? '?' + params_cll.join('&') : '';
    };
    UtilsService.prototype.parseUrlId = function (url, cb) {
        var pos = (url || '').lastIndexOf('/');
        var part_url = (pos > 1) ? url.slice(0, pos) : url;
        var part_id = (pos > 1) ? url.slice(pos + 1) : null;
        if (cb) {
            cb(part_url, part_id);
        }
        return part_url;
    };
    UtilsService.prototype.upperFirst = function (txt) {
        if ((txt || '').length > 0) {
            txt = txt.slice(0, 1).toUpperCase() + txt.slice(1);
        }
        return txt;
    };
    UtilsService.prototype.getErrorMessage = function (err, def) {
        def = def || 'Generic error!';
        if (__WEBPACK_IMPORTED_MODULE_3_lodash___default.a.isString(err)) {
            return err;
        }
        if (__WEBPACK_IMPORTED_MODULE_3_lodash___default.a.isObject(err)) {
            if (err.error && __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.isString(err.error) && UtilsService_1._isText(err.error)) {
                return err.error;
            }
            if (err.error && __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.isObject(err.error) && UtilsService_1._isText(err.error.message)) {
                return err.error.message;
            }
            if (err.status === 0) {
                return 'Server seems to be down!';
            }
            if (err.message) {
                return err.message;
            }
            if (err.data && __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.isString(err.data)) {
                return err.data;
            }
            if (__WEBPACK_IMPORTED_MODULE_3_lodash___default.a.isObject(err.data)) {
                return JSON.stringify(err.data);
            }
            if (err && err.status < 0 && __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.isObject(err.config)) {
                return '"' + err.config.method + '" on "' + err.config.url + '" has caused an error';
            }
            if (err.statusText) {
                return err.status ? err.status + ' - ' + err.statusText : err.statusText;
            }
            try {
                return JSON.stringify(err) || def;
            }
            catch (ex) { }
        }
        return def;
    };
    UtilsService.prototype.guid = function () {
        return UtilsService_1._s4() + UtilsService_1._s4() + '-' + UtilsService_1._s4() + '-' +
            UtilsService_1._s4() + '-' + UtilsService_1._s4() + '-' + UtilsService_1._s4() + UtilsService_1._s4() + UtilsService_1._s4();
    };
    UtilsService.prototype.getNewName = function (list, template, prop) {
        prop = prop || 'name';
        var name = template;
        var index = 0;
        while (!!__WEBPACK_IMPORTED_MODULE_3_lodash___default.a.find(list, function (i) { return i[prop] === name; })) {
            name = template + '(' + (++index) + ')';
        }
        return name;
    };
    UtilsService.prototype.empty = function (o, pn) {
        if (o) {
            if (pn) {
                __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.isArray(pn) ? pn.forEach(function (k) { return delete o[k]; }) : delete o[pn];
            }
            else {
                __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.keys(o).forEach(function (k) { return delete o[k]; });
            }
        }
    };
    UtilsService.prototype.getDataType = function (type) {
        type = type || '';
        switch (type.toLowerCase()) {
            case 'int':
            case 'tiny':
            case 'tinyint':
            case 'short':
            case 'smallint':
            case 'int24':
            case 'long':
            case 'longlong':
            case 'bigint':
            case 'integer':
            case 'number':
            case 'numeric':
            case 'float':
            case 'real':
            case 'double':
            case 'decimal':
            case 'newdecimal':
            case 'currency':
            case 'money':
                return TYPES.number;
            case 'date':
            case 'time':
            case 'time2':
            case 'year':
            case 'newdate':
            case 'datetime':
            case 'datetime2':
            case 'timestamp':
            case 'timestamp2':
            case 'interval':
            case 'smalldatetime':
            case 'datetimeoffset':
                return TYPES.date;
            case 'string':
            case 'var_string':
            case 'character':
            case 'nchar':
            case 'nvarchar':
            case 'char':
            case 'varchar':
            case 'text':
            case 'xml':
            case 'json':
                return TYPES.string;
            case 'bit':
            case 'bool':
            case 'boolean':
                return TYPES.boolean;
            default:
                return TYPES.object;
        }
    };
    UtilsService.prototype._isText = function (v, o) {
        if (o.textSeparator) {
            var txt_rgx = new RegExp('^' + o.textSeparator + '.*' + o.textSeparator + '$', 'g');
            return txt_rgx.test(v || '');
        }
    };
    UtilsService.prototype._isNumeric = function (v) {
        var fl = parseFloat(v) + '';
        var fl_rgx = new RegExp('^' + fl.split('.')[0] + '\\.0+$', 'g');
        return (fl === (v || '') + '' || fl_rgx.test(v || ''));
    };
    UtilsService.prototype._isDate = function (v) {
        // TODO: auto riconoscimento di stringhe = date
        return false;
    };
    UtilsService.prototype._isBoolean = function (v) {
        // TODO: auto riconoscimento di stringhe = bool
        return (v === 'true' || v === 'false');
    };
    UtilsService.prototype.decodeType = function (v, o) {
        if (v) {
            if (this._isText(v, o)) {
                return TYPES.string;
            }
            if (this._isNumeric(v)) {
                return TYPES.number;
            }
            if (this._isDate(v)) {
                return TYPES.date;
            }
            if (this._isBoolean(v)) {
                return TYPES.boolean;
            }
        }
        return TYPES.string;
    };
    UtilsService.prototype.getTypeIcon = function (type) {
        switch (this.getDataType(type)) {
            case TYPES.string: return 'font_download';
            case TYPES.boolean: return 'check_box';
            case TYPES.date: return 'event';
            case TYPES.number: return 'looks_two';
            case TYPES.object:
            default: return 'texture';
        }
    };
    UtilsService.prototype.confirm = function (o, cb) {
        var confirm = this.dialog.open(__WEBPACK_IMPORTED_MODULE_2__components_confirm_dialog_confirm_dialog_component__["a" /* ConfirmDialogComponent */], {
            width: o.width || '340px',
            data: o
        });
        confirm.afterClosed().subscribe(function (result) { return cb(result); });
    };
    UtilsService.prototype.snack = function (message, duration) {
        this.snackBar.open(message, null, {
            duration: duration || 3000
        });
    };
    UtilsService.prototype.error = function (err) {
        if (!err) {
            return;
        }
        // console.error(err);
        this.err = this.getErrorMessage(err);
    };
    UtilsService.prototype.getOrigin = function () {
        return window['origin'] ||
            window.location.origin ||
            window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    };
    UtilsService.prototype.validate = function (str, rgxstr) {
        if (rgxstr === void 0) { rgxstr = null; }
        var rgx = (rgxstr) ? new RegExp(rgxstr) : null;
        var valid = (rgx) ? rgx.test(str) : true;
        return valid && str && __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.isString(str) && str.trim().length > 1;
    };
    UtilsService = UtilsService_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialog */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["x" /* MatSnackBar */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], UtilsService);
    return UtilsService;
    var UtilsService_1;
}());



/***/ }),

/***/ "../../../../../src/app/token.interceptor.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_settings_service__ = __webpack_require__("../../../../../src/app/services/user-settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TokenInterceptor = (function () {
    function TokenInterceptor(user) {
        this.user = user;
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        var sys = this.user.system;
        var token = (request.body || {})._system && sys.token ? sys.token : this.user.settings.token;
        sys.active = false;
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + token
            }
        });
        return next.handle(request);
    };
    TokenInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_user_settings_service__["a" /* UserSettingsService */]])
    ], TokenInterceptor);
    return TokenInterceptor;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map