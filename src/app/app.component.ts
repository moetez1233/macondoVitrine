import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'macondo-vitrine';
  selectedLanguge : any;

  switchLanguge(){
    console.log(this.selectedLanguge)
  }
}
