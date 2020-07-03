"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CRUD_ServiceDTO_1 = require("../../models/CommonModels/CRUD-ServiceDTO");
var CrudMonibService = /** @class */ (function () {
    function CrudMonibService(httpClient, myURL) {
        this.httpClient = httpClient;
        this.myURL = myURL;
    }
    CrudMonibService.prototype.GetAll = function () {
        console.log("hi you are now in way to GetAll for " + this.myURL);
        return this.httpClient.get("" + this.myURL);
    };
    CrudMonibService.prototype.GetAll2 = function (filter) {
        console.log("hi you are now in way to GetAll for " + this.myURL);
        return this.httpClient.post("" + this.myURL + CRUD_ServiceDTO_1.CRUD_ServiceDTO.GetAll2, filter);
    };
    CrudMonibService.prototype.GetById = function (Id) {
        console.log("hi you are now in way to get data by id " + Id + " from " + this.myURL, Id);
        return this.httpClient.get("" + this.myURL + CRUD_ServiceDTO_1.CRUD_ServiceDTO.GetById + Id.toString());
    };
    CrudMonibService.prototype.Insert = function (model) {
        console.log("hi you are now in way to Insert to " + this.myURL, model);
        return this.httpClient.post("" + this.myURL + CRUD_ServiceDTO_1.CRUD_ServiceDTO.Insert, model);
    };
    CrudMonibService.prototype.Update = function (model) {
        console.log("hi you are now in way to Update to " + this.myURL, model);
        return this.httpClient.put("" + this.myURL + CRUD_ServiceDTO_1.CRUD_ServiceDTO.Update, model);
    };
    //   updateElement(element): Observable<any>{
    //     return this.httpClient.put(`${this.myURL}/${element.id}`, element);
    //  }
    CrudMonibService.prototype.Delete = function (Id) {
        console.log("hi you are now in way to Delete to " + this.myURL, Id);
        return this.httpClient.delete("" + this.myURL + CRUD_ServiceDTO_1.CRUD_ServiceDTO.DeleteById + Id.toString());
    };
    return CrudMonibService;
}());
exports.CrudMonibService = CrudMonibService;
//# sourceMappingURL=crud-monib.service.js.map