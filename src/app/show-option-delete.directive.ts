import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[appShowOptionDelete]'
})
export class ShowOptionDeleteDirective {
	@HostListener('mouseenter')
	onmouseenter() {
		this.elementRef.nativeElement.lastElementChild.style.display = '';
	}

	@HostListener('mouseleave')
	onmouseleave() {
		this.elementRef.nativeElement.lastElementChild.style.display = 'none';
	}

	constructor(private elementRef: ElementRef) {}
}
