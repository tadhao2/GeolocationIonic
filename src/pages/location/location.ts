import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 


declare var google: any;
/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  anyAdress:any;

	  options : GeolocationOptions;
  currentPos : Geoposition;

  latitude: number = 0;
  longitude: number = 0;
  geo: any;

	loading:any;
 // service = new google.maps.places.AutocompleteService(); 
  constructor(public navCtrl: NavController, public navParams: NavParams,
   private geolocation : Geolocation, public loadingCtrl: LoadingController, 
   public toastCtrl : ToastController) {
   	  
      // this.loading.present();
      // this.getUserPosition();
 		}

  getLocation(){
       this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
      });
       this.getUserPosition();
  }

 // /*code for address searchbar*/
 //  chooseItem(item: any) {
 //    this.geo = item;
 //    this.autocomplete.query = item;
 //    this.geoCode(this.geo);//convert Address to lat and long
 //    this.autocompleteItems = [];
 //  }

 // geoCode(address:any) {
 //    /*this.address_new.formatted_address = address;*/
 //    let geocoder = new google.maps.Geocoder();
 //    geocoder.geocode({ 'address': address }, (results, status) => {

 //      this.latitude = results[0].geometry.location.lat();
 //      this.longitude = results[0].geometry.location.lng();
 //      /*var lat_log =  { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}*/
 //      this.getAddress(this.latitude,this.longitude);
 //   });
 // }

    getUserPosition(){

    this.options = {
      enableHighAccuracy : false,
      timeout: 10000

    };
    this.loading.present();
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
      this.currentPos = pos;     
      console.log(pos);
     this.loading.dismiss();
      this.getAddress(pos.coords.latitude,pos.coords.longitude);
    },(err : PositionError)=>{
        console.log("error : " + err.message);
        this.loading.dismiss();
        this.toastCtrl.create({
          message: "Error",
          duration: 3000
        }).present();
       // return this.options;

    })
  }
   
  getAddress(lat,long){
    let latLng = new google.maps.LatLng(lat, long);
    let geocoder = new google.maps.Geocoder;
    var request = {
      latLng: latLng,
    };
    geocoder.geocode(request, (results, status)=>{
   	//console.log(JSON.parse(results));
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
        	console.log(results[1]);
          this.anyAdress= results[1].formatted_address;;
        }
          if (results[0]) {
        	console.log(results[0]);


          // this.autocomplete.query = results[1].formatted_address;
          //   for (let i = 0; i < results[0].address_components.length; i++) {
          //     for (let b = 0; b < results[0].address_components[i].types.length; b++) {
          //       if (results[0].address_components[i].types[b] == "locality") {
          //           //this is the object you are looking for
          //         this.address_data.city = results[0].address_components[i].long_name;
          //         break;
          //           }
          //       else if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
          //               //this is the object you are looking for
          //         this.address_data.state = results[0].address_components[i].long_name;
          //         break;
          //           }

          //       else if (results[0].address_components[i].types[b] == "postal_code") {
          //           //this is the object you are looking for
          //           this.address_data.zip_code = results[0].address_components[i].long_name;
          //           break;
          //       }
                    
          //     }
          //   }
            } else {
              console.log("Results not available");
            }
          }
          else {
            console.log("Geocoder failed due to: ", status);
          }
        });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }

}
