import { Component } from '@angular/core';
import { TruncatePipe } from "../pipes/truncate.pipe";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  imports: [TruncatePipe],
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

}
