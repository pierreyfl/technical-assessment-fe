import { Component, OnInit, Directive, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from '../products';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as markerjs2 from 'markerjs2';

@Component({
  selector: 'app-frame-details',
  templateUrl: './frame-details.component.html',
  styleUrls: ['./frame-details.component.css']
})
export class FrameDetailsComponent implements OnInit {
  product;
  constructor(private route: ActivatedRoute, private _location: Location) {}

  backClicked() {
    this._location.back();
  }

  showMarkerArea() {
    // create a marker.js MarkerArea
    const img = document.getElementById('frame') as HTMLImageElement;
    const markerArea = new markerjs2.MarkerArea(img);
    // attach an event handler to assign annotated image back to our image element
    markerArea.addRenderEventListener((imgURL, state) => {
      console.log(state);
    });
    // launch marker.js

    markerArea.show();
  }

  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('frameId'));

    // Find the product that correspond with the id provided in route.
    this.product = products.find(product => product.id === productIdFromRoute);
  }
}
