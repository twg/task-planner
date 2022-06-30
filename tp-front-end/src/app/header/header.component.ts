import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;
  isSearchActive: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {
    this.searchForm = this.formBuilder.group({
      searchTerm: '',
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isSearchActive = this.router.url.includes('home');
      }
    });
  }

  onSearch(event: any) {
    this.appService.publishSearchTerm(event.searchTerm);
  }
}
