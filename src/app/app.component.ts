import { Component, OnInit } from '@angular/core';
import { PokimonHttpService } from './core/providers/pokemon-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pocimon';

  constructor(private pociponHttpService: PokimonHttpService){

  }
  ngOnInit(): void {
    
  }

}
