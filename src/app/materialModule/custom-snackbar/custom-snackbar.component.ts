import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.css']
})
export class CustomSnackbarComponent implements OnInit {
  message: any;
  faIcon: any;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    if (data) {
      this.message = data.message;
      this.faIcon = data.faIcon;
    }
  }

  ngOnInit() {
  }

}
