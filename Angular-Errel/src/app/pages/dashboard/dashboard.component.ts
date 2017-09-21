import {Component} from '@angular/core';
import {IconsService} from '../ui/components/icons/icons.service';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss','../ui/components/buttons/buttons.scss','../ui/components/icons/icons.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {

  icons:any;

  constructor(private _iconsService: IconsService) {
  }

  ngOnInit() {
    this.icons = this._iconsService.getAll();
  }

}
