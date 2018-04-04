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

module.exports = "<!-- LOADER -->\n<div class=\"loader-container\" *ngIf=\"loading\">\n  <div class=\"loader\"></div>\n</div>\n\n<!-- HEADER -->\n<div class=\"map-header\" *ngIf=\"!u.overpage.type && user.settings.token && user.settings.map\" layout-row>\n  <div class=\"map-name\" flex>{{user.settings.map}}</div>\n  <div class=\"map-owner\">{{user.settings.nick}}</div>\n  <mat-icon class=\"map-owner-icon\">person</mat-icon>\n</div>\n\n<!-- MAP -->\n<div id=\"map-canvas\" [ngClass]=\"{'blur':u.err || u.overpage.type || u.modalActive}\"></div>\n\n<!-- CENTER -->\n<div class=\"map-center\" *ngIf=\"!u.err && !u.overpage.type && !u.modalActive\">\n  <div class=\"map-center-H\"></div>\n  <div class=\"map-center-V\"></div>\n</div>\n\n<!-- ERROR -->\n<div class=\"error-container\" *ngIf=\"u.err\" (click)=\"hideError()\">\n  <div class=\"error-title\">Error :(</div>\n  <div class=\"error\">{{u.err}}</div>\n</div>\n\n<!-- TOOLBAR -->\n<div *ngIf=\"!u.overpage.type\" class=\"toolbar\" layout-row>\n  <button class=\"location-button\" [color]=\"(ndo6.followMarker&&initialized) ? 'accent' : ((ndo6.last&&initialized) ? 'primary' : '')\" mat-fab matTooltip=\"location\" (click)=\"location()\">\n    <mat-icon>my_location</mat-icon>\n  </button>\n  <div flex></div>\n  <button *ngIf=\"develop\" class=\"right-margin\" mat-fab matTooltip=\"test\" (click)=\"overpage('test')\">\n    <mat-icon>bug_report</mat-icon>\n  </button>\n  <button mat-fab matTooltip=\"map\" color=\"primary\" (click)=\"overpage('map')\">\n    <mat-icon>map</mat-icon>\n  </button>\n</div>\n\n<!-- OVERPAGES -->\n<div *ngIf=\"!!u.overpage.type\" class=\"overpage-container\" [ngSwitch]=\"u.overpage.type\">\n  <button class=\"close-button\" mat-icon-button matTooltip=\"close page\" (click)=\"closeOverpage()\">\n    <mat-icon>close</mat-icon>\n  </button>\n  <app-overpage-test *ngSwitchCase=\"'test'\"></app-overpage-test>\n  <app-overpage-settings *ngSwitchCase=\"'settings'\"></app-overpage-settings>\n  <app-overpage-marker *ngSwitchCase=\"'marker'\"></app-overpage-marker>\n  <app-overpage-map *ngSwitchCase=\"'map'\"></app-overpage-map>\n</div>\n"

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
            console.log('URL: %s', url);
            var script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
        });
    }
};
var AppComponent = (function () {
    function AppComponent(interaction, user, u, maps, ndo6, zone) {
        this.interaction = interaction;
        this.user = user;
        this.u = u;
        this.maps = maps;
        this.ndo6 = ndo6;
        this.zone = zone;
        this.initialized = false;
        this.loading = true;
        this.info = {};
        this.develop = !__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].production;
    }
    AppComponent.prototype.refresh = function () {
        var self = this;
        self.u.err = null;
        self.info = {};
        self.ndo6.reset();
        self.interaction.getInfo().subscribe(function (data) {
            self.info = data;
            initializer.run(data).then(function () {
                self.maps.create(function (ctx) {
                    self.ndo6.clickOnMarker = function (m) {
                        self.clickOnMarker(m);
                    };
                    self.ndo6.activate(ctx);
                });
                self.loading = false;
            }, function (err) {
                self.u.error(err);
                self.loading = false;
            });
        }, function (err) {
            self.u.error(err);
            self.loading = false;
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
                            self.interaction.position({
                                latitude: e.latitude,
                                longitude: e.longitude,
                                timestamp: (new Date()).getTime()
                            }, function (err) {
                                self.user.logdata();
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
        this.u.overpage.options = o;
        this.u.overpage.type = type;
    };
    AppComponent.prototype.hideError = function () {
        this.u.err = null;
    };
    AppComponent.prototype.clickOnMarker = function (m) {
        this.overpage('marker', {
            marker: m,
            latitude: m.position.lat(),
            longitude: m.position.lng()
        });
    };
    AppComponent.prototype.location = function () {
        if (this.ndo6.last) {
            this.ndo6.centerMap(this.ndo6.last.marker.position);
        }
    };
    AppComponent.prototype.closeOverpage = function () {
        this.u.closeOverpage();
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            animations: [__WEBPACK_IMPORTED_MODULE_2__app_animations__["a" /* fadeAnimation */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_interaction_service__["a" /* InteractionService */],
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_confirm_dialog_confirm_dialog_component__ = __webpack_require__("../../../../../src/app/components/confirm-dialog/confirm-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_overpages_overpages_component__ = __webpack_require__("../../../../../src/app/components/overpages/overpages.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_log_monitor_log_monitor_component__ = __webpack_require__("../../../../../src/app/components/log-monitor/log-monitor.component.ts");
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
                __WEBPACK_IMPORTED_MODULE_14__components_confirm_dialog_confirm_dialog_component__["a" /* ConfirmDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_overpages_overpages_component__["d" /* OverpageTestComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_overpages_overpages_component__["b" /* OverpageMarkerComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_overpages_overpages_component__["c" /* OverpageSettingsComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_overpages_overpages_component__["a" /* OverpageMapComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_log_monitor_log_monitor_component__["a" /* LogMonitorComponent */]
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
                __WEBPACK_IMPORTED_MODULE_13__services_ndo6_service__["a" /* Ndo6Service */]
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_14__components_confirm_dialog_confirm_dialog_component__["a" /* ConfirmDialogComponent */]
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

/***/ "../../../../../src/app/components/overpages/overpage-map.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"overpage-content\" layout-col>\r\n  <form class=\"login-data\" *ngIf=\"!logged\" layout-col>\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input type=\"text\" name=\"name\" placeholder=\"Pick a map name\" [(ngModel)]=\"data.name\" aria-label=\"map name\" (focus)=\"resetError()\" matInput [formControl]=\"mapName\" [matAutocomplete]=\"auto\">\r\n      <mat-autocomplete #auto=\"matAutocomplete\">\r\n        <mat-option *ngFor=\"let option of filteredOptions | async\" [value]=\"option\">{{ option }}</mat-option>\r\n      </mat-autocomplete>\r\n    </mat-form-field>\r\n    <mat-form-field>\r\n      <input name=\"password\" matInput type=\"password\" [(ngModel)]=\"data.password\" (focus)=\"resetError()\" placeholder=\"Password\">\r\n    </mat-form-field>\r\n    <mat-form-field>\r\n      <input name=\"nick\" matInput [(ngModel)]=\"data.nick\" (focus)=\"resetError()\" placeholder=\"Nikname\">\r\n    </mat-form-field>\r\n    <p></p>\r\n    <div class=\"login-toolbar\" layout-row>\r\n      <button mat-raised-button color=\"primary\" [disabled]=\"!validate()\" (click)=\"login()\">LOGIN</button>\r\n      <div flex></div>\r\n      <button mat-raised-button color=\"accent\" [disabled]=\"!validate()\" (click)=\"create()\">CREATE</button>\r\n    </div>\r\n  </form>\r\n  <div class=\"login-data\" *ngIf=\"logged\" layout-col>\r\n    <div class=\"title\" info>{{data.name}}</div>\r\n    <div info>{{data.nick}}</div>\r\n    <div class=\"login-toolbar distant\" layout-row>\r\n      <span flex></span>\r\n      <button mat-raised-button color=\"primary\" (click)=\"logout()\">LOGOUT</button>\r\n      <span flex></span>\r\n    </div>\r\n  </div>\r\n  <div class=\"error\">{{error}}</div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/overpages/overpage-marker.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"overpage-content\" layout-col>\r\n  <!-- DATA: nick e altre info -->\r\n  <div label>Data</div>\r\n  <div class=\"ndo6-property\">Nick: <span class=\"value\">{{u.overpage.options.nick||'io'}}</span> </div>\r\n  <!-- POSITION -->\r\n  <div class=\"ndo6-property\">Latitude: <span class=\"value\">{{u.overpage.options.latitude}}</span> </div>\r\n  <div class=\"ndo6-property\">Longitude: <span class=\"value\">{{u.overpage.options.longitude}}</span> </div>\r\n  <!-- OPTIONS -->\r\n  <div label>Options</div>\r\n  <mat-slide-toggle color=\"accent\" [(ngModel)]=\"followed\" (change)=\"changeOption()\">Follow Me</mat-slide-toggle>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/overpages/overpage-settings.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"overpage-content\">\r\n  <!-- TODO: user settings... -->\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/overpages/overpage-test.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"overpage-content\" layout-col>\r\n  <h1>Test page</h1>\r\n  <mat-form-field>\r\n    <input matInput [(ngModel)]=\"user.settings.host\" (blur)=\"updateSettings()\" placeholder=\"Server host\">\r\n  </mat-form-field>\r\n  <mat-slide-toggle color=\"accent\" [(ngModel)]=\"user.settings.debug\" (change)=\"updateSettings()\">Debug mode</mat-slide-toggle>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/overpages/overpages.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return OverpageSettingsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return OverpageTestComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return OverpageMarkerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OverpageMapComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators_startWith__ = __webpack_require__("../../../../rxjs/_esm5/operators/startWith.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators_map__ = __webpack_require__("../../../../rxjs/_esm5/operators/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_utils_service__ = __webpack_require__("../../../../../src/app/services/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_user_settings_service__ = __webpack_require__("../../../../../src/app/services/user-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_ndo6_service__ = __webpack_require__("../../../../../src/app/services/ndo6.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_interaction_service__ = __webpack_require__("../../../../../src/app/services/interaction.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_lodash__);
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
    function OverpageTestComponent(user) {
        this.user = user;
    }
    OverpageTestComponent.prototype.ngOnInit = function () {
    };
    OverpageTestComponent.prototype.updateSettings = function () {
        this.user.update();
    };
    OverpageTestComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-overpage-test',
            template: __webpack_require__("../../../../../src/app/components/overpages/overpage-test.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_user_settings_service__["a" /* UserSettingsService */]])
    ], OverpageTestComponent);
    return OverpageTestComponent;
}());

var OverpageMarkerComponent = (function () {
    function OverpageMarkerComponent(u, ndo6) {
        this.u = u;
        this.ndo6 = ndo6;
        this.followed = false;
    }
    OverpageMarkerComponent.prototype.ngOnInit = function () {
        this.followed = this.ndo6.followMarker === this.u.overpage.options.marker;
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
    function OverpageMapComponent(u, user, interaction) {
        this.u = u;
        this.user = user;
        this.interaction = interaction;
        this.mapName = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.data = {
            name: 'New Map',
            nick: 'my nickname'
        };
        this.options = [];
        this.logged = false;
        this.error = '';
    }
    OverpageMapComponent.prototype.ngOnInit = function () {
        var self = this;
        self.logged = !!self.user.settings.token;
        self.data.name = self.user.settings.map || self.data.name;
        self.data.nick = self.user.settings.nick || self.data.nick;
        self.interaction.getMaps(function (err, maps) { return self.options = __WEBPACK_IMPORTED_MODULE_8_lodash___default.a.map(maps || [], function (m) { return m.name; }); });
        self.filteredOptions = self.mapName.valueChanges
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators_startWith__["a" /* startWith */])(''), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_map__["a" /* map */])(function (val) { return self.filter(val); }));
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
        this.interaction.logout({}, function (err) {
            _this.user.logdata();
            _this.u.closeOverpage();
        });
    };
    OverpageMapComponent.prototype.handleErr = function (err) {
        if (err) {
            this.error = this.u.getErrorMessage(err);
        }
        return !!this.error;
    };
    OverpageMapComponent.prototype.login = function () {
        var _this = this;
        var info = {
            name: this.data.name,
            owner: this.data.nick,
            password: this.data.password
        };
        this.error = '';
        this.interaction.login(info, function (err, result) {
            if (_this.handleErr(err)) {
                return;
            }
            delete _this.data.password;
            _this.user.logdata(result.token, _this.data);
            _this.u.closeOverpage();
        });
    };
    OverpageMapComponent.prototype.create = function () {
        var _this = this;
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
            console.log('CREATE', result);
            _this.user.logdata(result.token, _this.data);
            _this.u.closeOverpage();
        });
    };
    OverpageMapComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-overpage-map',
            template: __webpack_require__("../../../../../src/app/components/overpages/overpage-map.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_5__services_user_settings_service__["a" /* UserSettingsService */],
            __WEBPACK_IMPORTED_MODULE_7__services_interaction_service__["a" /* InteractionService */]])
    ], OverpageMapComponent);
    return OverpageMapComponent;
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
    function InteractionEvent(type) {
        this.type = type;
    }
    return InteractionEvent;
}());

var InteractionService = (function () {
    function InteractionService(http, user, u) {
        this.http = http;
        this.user = user;
        this.u = u;
        this.events = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    InteractionService_1 = InteractionService;
    InteractionService._err = function (cb) {
        return function (err) {
            if (err) {
                console.error(err);
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
    InteractionService.prototype.ngOnInit = function () {
        if (this.user.settings.token) {
            this.getInfo().subscribe(function (r) {
                // è loggato inizializza le info di mappa
                console.log('getInfo: ', r);
            }, InteractionService_1._err(function () {
                // reset data login
            }));
        }
    };
    InteractionService.prototype.getInfo = function () {
        return this.http.get(this.user.getUrl('api/view/info'));
    };
    InteractionService.prototype.getMaps = function (cb) {
        this.http.get(this.user.getUrl('api/view'))
            .subscribe(function (r) { return cb(null, r); }, InteractionService_1._err(cb));
    };
    InteractionService.prototype.login = function (data, cb) {
        this.http.post(this.user.getUrl('auth/login'), this._check(data))
            .subscribe(function (r) { return cb(null, r); }, InteractionService_1._err(cb));
    };
    InteractionService.prototype.logout = function (data, cb) {
        this.http.post(this.user.getUrl('auth/logout'), this._check(data))
            .subscribe(function (r) { return cb(null, r); }, InteractionService_1._err(cb));
    };
    InteractionService.prototype.getState = function (data, cb) {
        this.http.post(this.user.getUrl('api/view'), this._check(data))
            .subscribe(function (r) { return cb(null, r); }, InteractionService_1._err(cb));
    };
    InteractionService.prototype.create = function (data, cb) {
        this.http.post(this.user.getUrl('api/view/create'), this._check(data))
            .subscribe(function (r) { return cb(null, r); }, InteractionService_1._err(cb));
    };
    InteractionService.prototype.position = function (data, cb) {
        this.http.post(this.user.getUrl('api/view/position'), this._check(data))
            .subscribe(function (r) { return cb(null, r); }, InteractionService_1._err(cb));
    };
    InteractionService.prototype.message = function (data, cb) {
        this.http.post(this.user.getUrl('api/view/message'), this._check(data))
            .subscribe(function (r) { return cb(null, r); }, InteractionService_1._err(cb));
    };
    InteractionService.prototype.element = function (data, cb) {
        this.http.post(this.user.getUrl('api/view/element'), this._check(data))
            .subscribe(function (r) { return cb(null, r); }, InteractionService_1._err(cb));
    };
    InteractionService = InteractionService_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__user_settings_service__["a" /* UserSettingsService */],
            __WEBPACK_IMPORTED_MODULE_3__utils_service__["a" /* UtilsService */]])
    ], InteractionService);
    return InteractionService;
    var InteractionService_1;
}());



/***/ }),

/***/ "../../../../../src/app/services/log.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_service__ = __webpack_require__("../../../../../src/app/services/utils.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LogService = (function () {
    function LogService(u) {
        this.u = u;
        this.lines = [];
    }
    LogService.prototype.add = function (txt) {
        var now = new Date();
        var line = '[' + now.getTime() + '] > ' + txt;
        this.lines.push(line);
        console.log(line);
    };
    LogService.prototype.error = function (err) {
        this.add(this.u.getErrorMessage(err));
    };
    LogService.prototype.info = function (txt) {
        this.add(txt);
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
            var lat = pos.latitude ? pos.latitude : (pos.G ? pos.G : (__WEBPACK_IMPORTED_MODULE_2_lodash___default.a.isFunction(pos.lat) ? pos.lat() : undefined));
            var lng = pos.longitude ? pos.longitude : (pos.K ? pos.K : (__WEBPACK_IMPORTED_MODULE_2_lodash___default.a.isFunction(pos.lng) ? pos.lng() : undefined));
            return new google.maps.LatLng(lat, lng);
        }
    };
    MapsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__utils_service__["a" /* UtilsService */]])
    ], MapsService);
    return MapsService;
}());



/***/ }),

/***/ "../../../../../src/app/services/ndo6.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Ndo6Event */
/* unused harmony export Position */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ndo6Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__maps_service__ = __webpack_require__("../../../../../src/app/services/maps.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_settings_service__ = __webpack_require__("../../../../../src/app/services/user-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_service__ = __webpack_require__("../../../../../src/app/services/utils.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__log_service__ = __webpack_require__("../../../../../src/app/services/log.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash__);
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

var Position = (function () {
    function Position(info, data) {
        if (info === void 0) { info = null; }
        if (data === void 0) { data = null; }
        this.info = info;
        this.data = data;
        this.last = false;
        this.latitude = null;
        this.longitude = null;
        this.altitude = null;
        this.accuracy = null;
        this.altitudeAccuracy = null;
        this.heading = null;
        this.speed = null;
        this.timestamp = null;
        this.marker = null;
        this.keep(info);
        this.id = data ? data.id : '';
        this.title = data ? data.title : '';
        this.label = data ? data.label : '';
        this.type = data ? data.type : '';
    }
    Position.prototype.isValid = function () {
        return (this.latitude && this.longitude);
    };
    Position.prototype.getLatLng = function () {
        return new google.maps.LatLng(this.latitude, this.longitude);
    };
    Position.prototype.sameOf = function (pos) {
        return pos &&
            pos.latitude === this.latitude &&
            pos.longitude === this.longitude &&
            pos.altitude === this.altitude;
    };
    Position.prototype.keep = function (pos) {
        if (pos) {
            this.id = pos.id;
            this.title = pos.title;
            this.label = pos.label;
            this.type = pos.type;
            if (pos.timestamp) {
                this.timestamp = pos.timestamp;
            }
            if (pos.coords) {
                pos = pos.coords;
            }
            this.latitude = pos.latitude;
            this.longitude = pos.longitude;
            this.altitude = pos.altitude;
            this.accuracy = pos.accuracy;
            this.altitudeAccuracy = pos.altitudeAccuracy;
            this.heading = pos.heading;
            this.speed = pos.speed;
        }
    };
    Position.prototype.dispose = function () {
        if (this.marker) {
            this.marker.setMap(null);
        }
    };
    return Position;
}());

var GEOLOCATION_OPTIONS = {
    maximumAge: 10,
    enableHighAccuracy: false,
    timeout: 1000
};
var Ndo6Service = (function () {
    function Ndo6Service(maps, user, u, log) {
        this.maps = maps;
        this.user = user;
        this.u = u;
        this.log = log;
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
        // Calcola le coordinate del centro
        var gpos = self.maps.getLatLng(pos);
        // Imposta il centro della mappa
        self.session.context.map.setCenter(gpos);
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
    Ndo6Service.prototype.watchGeo = function (cb) {
        var self = this;
        self.watchId = navigator.geolocation.watchPosition(cb, function (err) {
            switch (err.code) {
                case 1:
                    self.log.error('Geolocation permission denied');
                    break;
                case 2:
                    self.log.error('Geolocation position unavailable');
                    break;
                case 3:
                    self.log.error('Geolocation timed out');
                    break;
                default: self.log.error(err);
            }
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
                    switch (err.code) {
                        case 1:
                            self.log.error('Geolocation permission denied');
                            break;
                        case 2:
                            self.log.error('Geolocation position unavailable');
                            break;
                        case 3:
                            self.log.error('Geolocation timed out');
                            break;
                        default: self.log.error(err);
                    }
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
    Ndo6Service.prototype.setPos = function (pos) {
        var self = this;
        var nick = (self.session.user.nick || 'self');
        var npos = new Position(pos, {
            id: 'user@' + nick,
            title: nick,
            label: nick.slice(0, 1),
            type: 'user'
        });
        if (!self.last) {
            self.last = new Position();
            self.onfirstpos = true;
        }
        if (!self.last.marker) {
            self.last.marker = self.getMarker(self.last);
        }
        if (!self.last.sameOf(npos) && npos.isValid()) {
            var latlng = npos.getLatLng();
            self.last.marker.setPosition(latlng);
            self.events.emit(new Ndo6Event('changepos', latlng));
            var center = self.center || self.samePos(self.followMarker, self.last.marker);
            if (center === true) {
                self.centerMap(npos);
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
    };
    Ndo6Service.prototype.activate = function (context) {
        var self = this;
        self.session.context = context;
        self.clearGeo();
        self.center = true;
        self.checkPos();
        self.active = true;
    };
    Ndo6Service.prototype.getMarkerIcon = function (url) {
        if (url) {
            return {
                url: url,
                size: new google.maps.Size(22, 40),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(11, 40)
            };
        }
    };
    Ndo6Service.prototype.getMarker = function (info) {
        var self = this;
        if (!self.session.context) {
            return null;
        }
        var latlnt = self.maps.getLatLng(info);
        var m = new google.maps.Marker({
            map: self.session.context.map,
            label: info.label || 'P',
            position: latlnt,
            title: info.title || info.description,
            icon: self.getMarkerIcon(info.icon)
        });
        m.ndo6 = {
            id: self.u.guid()
        };
        __WEBPACK_IMPORTED_MODULE_5_lodash___default.a.extend(m.ndo6, info);
        google.maps.event.addListener(m, 'click', function () {
            self.events.emit(new Ndo6Event('marker', m));
        });
        return m;
    };
    Ndo6Service = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__maps_service__["a" /* MapsService */],
            __WEBPACK_IMPORTED_MODULE_2__user_settings_service__["a" /* UserSettingsService */],
            __WEBPACK_IMPORTED_MODULE_3__utils_service__["a" /* UtilsService */],
            __WEBPACK_IMPORTED_MODULE_4__log_service__["a" /* LogService */]])
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
        var sts = this.u.storage.get(STORE_KEY) || {};
        __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.extend(this.settings, sts);
        __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.defaults(this.settings, {
            host: DEFAULT_SERVER_HOST,
            debug: false,
            delay: 1000,
            nick: 'io',
            map: '',
            token: ''
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
    UtilsService.prototype.closeOverpage = function () {
        this.overpage.type = null;
        this.overpage.options = {};
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
        console.error(err);
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
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + this.user.settings.token
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