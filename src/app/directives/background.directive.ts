import { Directive, ElementRef, Input } from '@angular/core';


@Directive({
  selector: '[appBackground]',
  standalone: true
})
export class BackgroundDirective {

  @Input('appBackgroundColor') backgroundColor: string = 'lightgray';

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.el.nativeElement.style.backgroundColor = this.backgroundColor;
  }

}
