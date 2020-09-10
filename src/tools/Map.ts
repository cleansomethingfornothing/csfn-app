import Coords from '@/types/Coords'
import {locationProvider} from '@/providers/location/location.provider'

declare const google: any

export default class Map {

  static zoom = 14

  map: any
  zoom: number
  origin: Coords
  selected: Coords
  markers: any[] = []
  isInput: boolean
  circle: any

  constructor({element, origin, isInput, zoom, onTouch, onReady}: { element: string, origin: Coords, isInput: boolean, zoom?: number, onTouch?: Function, onReady?: Function }) {
    this.origin = origin
    this.selected = origin
    this.isInput = isInput
    this.zoom = zoom
    this.map = new google.maps.Map(document.getElementById(element), {
      center: origin,
      zoom: zoom || Map.zoom,
      disableDefaultUI: true,
      clickableIcons: false
    })

    const centerControlDiv = document.createElement('div');
    new Map.CenterControl(centerControlDiv, this.map, this.origin, this.myLocationClicked.bind(this));

    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);

    if (onReady) {
      this.map.addListener('ready', onReady)
    }

    if (onTouch) {
      this.map.addListener('click', onTouch)
      this.map.addListener('dragend', onTouch)
      this.map.addListener('zoom_changed', onTouch)
      this.map.addListener('tilt_changed', onTouch)
    }

    if (isInput) {
      this.map.addListener('click', this.mapClicked.bind(this))
    }
  }

  public addMarker(position: Coords, pin: string, onClick?: Function) {
    const marker = new google.maps.Marker({
      position,
      icon: pin,
      map: this.map,
    })

    if (onClick) {
      marker.addListener('click', onClick)
    }

    this.markers.push(marker)
  }

  removeMarkers() {
    this.markers.forEach((marker) => marker.setMap(null))
    this.markers = []
  }

  setCircle(coords: Coords, radius: number) {
    this.circle = new google.maps.Circle({
      strokeWeight: 0,
      fillColor: '#59B14A',
      fillOpacity: 0.35,
      clickable: false,
      map: this.map,
      center: coords,
      radius: radius * 1000
    })
  }

  setCircleRadius(radius: number) {
    this.circle && this.circle.setRadius(radius * 1000)
  }

  removeCircle() {
    this.circle && this.circle.setMap(null)
  }

  public getSelectedPosition(): Coords {
    return this.selected
  }

  private mapClicked({latLng}) {
    this.positionSelected(new Coords(latLng.lat(), latLng.lng()))
  }

  private myLocationClicked() {
    if (this.isInput) {
      locationProvider.getCurrentCoords()
        .then((coords) => {
          this.positionSelected(coords)
          this.moveCamera(coords)
        })
    } else {
      this.moveCamera(this.origin)
    }
  }

  public positionSelected(position: Coords) {
    this.selected = position
    this.markers.splice(0, 1)[0].setMap(null)
    this.addMarker(position, '/img/pin.png')
    this.circle.setCenter(position)
  }

  public moveCamera(position) {
    this.map.panTo(position)
    this.map.setZoom(this.zoom || Map.zoom)
  }

  public setOrigin(origin) {
    this.origin = origin
    this.moveCamera(origin)
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
    controlText.innerHTML = '<ion-icon :src="require(\'@/assets/ionicons/locate.svg\')" color="dark"></ion-icon><ion-ripple-effect></ion-ripple-effect>';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function () {
      clicked()
    });

  }

}
