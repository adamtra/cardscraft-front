import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private dialog: MatDialog, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 403) {
                localStorage.removeItem('token');
                this.router.navigate(['/login']);
            }
            else if (err.status === 401) {
                this.dialog.open(ErrorDialogComponent, {
                    data: 'Podano złe dane do logowania.',
                });
            } else if (err.status === 400) {
                this.dialog.open(ErrorDialogComponent, {
                    data: err.error,
                });
            } else if (err.status === 500) {
                this.dialog.open(ErrorDialogComponent, {
                    data: 'Wystąpił błąd podczas wykonywania operacji.',
                });
            } else if (err.status === 0) {
                this.dialog.open(ErrorDialogComponent, {
                    data: 'Serwer nie odpowiada.',
                });
            }
            const error = err.error || err.statusText;
            return throwError(error);
        }));
    }
}
