import {Marker} from '@ionic-native/google-maps'
import Coords from '@/types/Coords'
import {locationProvider} from '@/providers/location/location.provider'

declare const google: any

export default class Map {

  static zoom = 15

  map: any
  origin: Coords
  selected: Coords
  markers: any[] = []
  isInput: boolean

  constructor({element, origin, isInput}: { element: string, origin: Coords, isInput: boolean }) {
    this.origin = origin
    this.selected = origin
    this.isInput = isInput
    this.map = new google.maps.Map(document.getElementById(element), {
      center: origin,
      zoom: Map.zoom,
      disableDefaultUI: true,
      clickableIcons: false
    })

    const centerControlDiv = document.createElement('div');
    new Map.CenterControl(centerControlDiv, this.map, this.origin, this.myLocationClicked.bind(this));

    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);

    if (isInput) {
      this.map.addListener('click', this.mapClicked.bind(this))
    }
  }

  public addMarker(position: Coords) {
    const marker = new google.maps.Marker({
      position,
      animation: google.maps.Animation.DROP,
      icon: '/img/pin.png',
      map: this.map,
    })

    this.markers.push(marker)
  }

  public getSelectedPosition(): Coords {
    return this.selected
  }

  private mapClicked({latLng}) {
    this.positionSelected(new Coords(latLng.lat(), latLng.lng()))
  }

  private myLocationClicked() {
    locationProvider.getCurrentCoords()
      .then((coords) => {
        if (this.isInput) {
          this.positionSelected(coords)
        }
        this.moveCamera(coords)
      })
  }

  public positionSelected(position: Coords) {
    this.selected = position
    this.markers.splice(0, 1)[0].setMap(null)
    this.addMarker(position)
  }

  public moveCamera(position) {
    this.map.panTo(position)
    this.map.setZoom(Map.zoom)
  }

  static CenterControl(controlDiv, map, origin, clicked) {
    // Set CSS for the control border.
    const controlUI = document.createElement('div');
    controlUI.className = 'ion-activatable ripple-parent'
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '100%';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginTop = '12px';
    controlUI.style.marginRight = '12px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    const controlText = document.createElement('div');
    controlText.style.fontSize = '2.5em'
    controlText.style.paddingTop = '6px';
    controlText.style.paddingLeft = '7px';
    controlText.style.paddingRight = '7px';
    controlText.innerHTML = '<ion-icon name="locate" color="dark"></ion-icon><ion-ripple-effect></ion-ripple-effect>';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function () {
      clicked()
    });

  }

}
