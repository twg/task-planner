import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService
  ) {
    this.searchForm = this.formBuilder.group({
      searchTerm: '',
    });
  }

  ngOnInit(): void { }
  onSearch(event: any) {
    // if (event.searchTerm.length) {
    this.appService.publishSearchTerm(event.searchTerm);
    // }
  }
}
