import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    public lightTheme = false;

    constructor(
        private theme: ThemeService,
        private router: Router,
        private user: UserService) {}

    ngOnInit() {
        this.check();
        const theme = localStorage.getItem('theme') === null ? 'dark-theme' : localStorage.getItem('theme');
        this.lightTheme = theme === 'light-theme';
        this.theme.setTheme(theme);
    }

    onSetTheme() {
        this.theme.setTheme(this.lightTheme ? 'light-theme' : 'dark-theme');
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    check() {
        this.user.check().subscribe();
    } 
}