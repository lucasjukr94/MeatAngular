import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";
import { NotificationService } from "./shared/messages/notification.service";

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler{

    constructor(private ns: NotificationService){
        super()
    }

    handleError(errorResponse:HttpErrorResponse | any){
        this.ns.notify('ERRO')
        super.handleError(errorResponse)
    }

}