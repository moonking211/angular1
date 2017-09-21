import {
  Component,
  ViewChild
} from '@angular/core';
import { flyInOutTrigger } from '../animations/flyInOutTrigger-animation';
import { hostConfig } from '../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from '../abstract-demo.component';
import {
  MdlDialogComponent
} from '../../../lib/components/dialog/index';
import { MdlTextFieldComponent } from '../../../lib/components/textfield/mdl-textfield.component';
import { MdlDialogReference } from '../../../lib/components/dialog/mdl-dialog.service';

@Component({
  selector: 'dialog-declarative-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'dialog-declarative.component.html'
})
export class DialogDeclarativeDemo extends AbstractDemoComponent {

  public username: string = 'Marvin';
  public editedUsername: string;

  @ViewChild('editUserDialog') private  editUserDialog: MdlDialogComponent;
  @ViewChild(MdlTextFieldComponent) private tfName: MdlTextFieldComponent;

  constructor(
    router: Router,
    route: ActivatedRoute,
    titleService: Title) {
    super(router, route, titleService);
  }

  public alertConfirmd(){
    console.log('alertConfirmd');
  }

  public saveUser() {
    console.log('user saved!');
    this.username = this.editedUsername;
    this.editUserDialog.close();
  }

  public onDialogShow(dialogRef: MdlDialogReference){
    console.log(`dialog shown`, dialogRef);
    this.editedUsername = this.username;
    this.tfName.setFocus();
  }


  public onDialogHide(){
    console.log(`dialog hidden`);
  }
}
