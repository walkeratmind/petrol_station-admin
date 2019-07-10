<template>
    <div class="container" id="dashboard">
        <h4>Dashboard</h4>
        <!-- <button class="btn btn-primary">Add Gas Station <i class="fas fa-plus"></i></button> -->
        <button data-target="formModal" class="waves-effect waves-light btn modal-trigger">
            Add Gas Station
            <i class="material-icons right">add</i>
        </button>

        <div v-if="savedStations != null" id="stations">
            <table class=" striped centered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>LatLng</th>
                        <th>Petrol Price</th>
                        <th>Diesel Price</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    <tr v-for="station of savedStations" v-bind:key="station['.key']">
                        <td>{{ station.data().name }}</td>
                        <td>{{ station.data().location }}</td>
                        <td>{{ station.data().latitude }}, {{ station.data().longitude }}</td>
                        <td>{{ station.data().petrolPrice }}</td>
                        <td>{{ station.data().dieselPrice }}</td>

                        <button data-target="editStationModal" class="waves-effect waves-light  modal-trigger btn left"
                            @click="editStationId = station.id;">
                            Edit
                            <i class=" material-icons right">edit</i>
                        </button>
                        <button data-target="confirm" @click="deleteId = station.id"
                            class="waves-effect waves-light btn right modal-trigger">
                            Delete
                            <i class="material-icons right outlined">delete</i>
                        </button>

                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal Structure -->
        <div id="confirm" class="modal">
            <div class="modal-content">
                <h4>Confirm Delete ?</h4>
                <p>Note: This can't be undone if you proceed ...</p>
            </div>
            <div class="modal-footer">
                <button @click="deleteStation(deleteId)"
                    class="modal-close waves-effect waves-green btn-flat">Agree</button>
            </div>
        </div>


        <div class="alert blue lighten-2" v-if="savedStations === null">
            <h5 class="center">List is Empty</h5>
        </div>

        <!--Add Station Modal Structure -->
        <div id="formModal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4>Add Gas Station</h4>
                <div class="row">
                    <form action class="col s12">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">local_gas_station</i>
                            <input id="station_name" type="text" class="validate" v-model="newStation.name" />
                            <label for="station_name">Gas Station Name</label>
                        </div>
                        <div class="input-field col s12">
                            <i class="material-icons prefix">place</i>
                            <input id="location" type="text" class="validate" v-model="newStation.location" />
                            <label for="location">Location</label>
                        </div>
                        <!-- <div class="col s12">
                            <div id="google_map" class="col s12"></div>
                            <Label for="map">Select Locatation on Map</Label>
                        </div> -->
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="latitude" type="text" class="validate" v-model="newStation.latitude" />
                                <label for="latitude">Latitude</label>
                            </div>
                            <div class="input-field col s6">
                                <input id="longitude" type="text" class="validate" v-model="newStation.longitude" />
                                <label for="Longitude">Longitude</label>
                            </div>
                        </div>
                        <div class="row">
                            <h6>Fuel Price</h6>
                            <p>Note: You can leave this field empty and fill it later</p>
                            <div class="input-field col s6">
                                <i class="material-icons prefix">money</i>
                                <input id="petrol_price" type="text" class="validate"
                                    v-model="newStation.petrolPrice" />
                                <label for="petrol_price">Petrol Price</label>
                            </div>
                            <div class="input-field col s6">
                                <i class="material-icons prefix">money</i>
                                <input id="diesel_price" type="text" class="validate"
                                    v-model="newStation.dieselPrice" />
                                <label for="diesel_price">Diesel Price</label>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
                <button @click="addStation" class="modal-close waves-effect waves-green btn-flat">Submit</button>
            </div>
        </div>

        <!--Edit Station Modal Structure -->
        <div id="editStationModal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4>Edit Gas Station</h4>
                <div class="row">
                    <form action class="col s12">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">local_gas_station</i>
                            <input id="station_name" type="text" class="validate" v-model="savedStations.name" />
                            <label for="station_name">Gas Station Name</label>
                        </div>
                        <div class="input-field col s12">
                            <i class="material-icons prefix">place</i>
                            <input id="location" type="text" class="validate" v-model="newStation.location" />
                            <label for="location">Location</label>
                        </div>
                        <!-- <div class="col s12">
                            <div id="google_map" class="col s12"></div>
                            <Label for="map">Select Locatation on Map</Label>
                        </div> -->
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="latitude" type="text" class="validate" v-model="newStation.latitude" />
                                <label for="latitude">Latitude</label>
                            </div>
                            <div class="input-field col s6">
                                <input id="longitude" type="text" class="validate" v-model="newStation.longitude" />
                                <label for="Longitude">Longitude</label>
                            </div>
                        </div>
                        <div class="row">
                            <h6>Fuel Price</h6>
                            <p>Note: You can leave this field empty and fill it later</p>
                            <div class="input-field col s6">
                                <i class="material-icons prefix">money</i>
                                <input id="petrol_price" type="text" class="validate"
                                    v-model="newStation.petrolPrice" />
                                <label for="petrol_price">Petrol Price</label>
                            </div>
                            <div class="input-field col s6">
                                <i class="material-icons prefix">money</i>
                                <input id="diesel_price" type="text" class="validate"
                                    v-model="newStation.dieselPrice" />
                                <label for="diesel_price">Diesel Price</label>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
                <button @click="addStation" class="modal-close waves-effect waves-green btn-flat">Submit</button>
            </div>
        </div>
    </div>
</template>

<style type="text/css" scoped>
    #google_map {
        width: 100%;
        height: 320px;
    }

    .alert {
        padding: 10px;
        margin: 8px;
        border-radius: 4px;
        color: white;
    }
</style>

<script>
    import LocationPicker from 'location-picker';
    import * as VueGoogleMaps from 'vue2-google-maps'
    import {
        stat
    } from 'fs';

    // import { database } from '../main';
    const fb = require('../firebaseConfig.js');

    export default {
        name: "Dashboard",
        // firebase: {
        //     stations: firebase.database().ref('stations')
        // },
        data() {
            return {
                newStation: {
                    name: '',
                    location: '',
                    latitude: '',
                    longitude: '',
                    petrolPrice: '',
                    dieselPrice: ''
                },
                savedStations: null,
                editFormMode: [],
                editingStation: [],
                deleteId: '',
                editStationId: ''
            }

        },
        mounted() {
            // let locationPickerScript = document.createElement('script')
            // locationPickerScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyChpMLhvOEaXGF4wb0LkGCBKUuw4QS7Ng4')
            // document.head.appendChild(locationPickerScript)
            // // let locationPickerScript = document.createElement('script')
            // // locationPickerScript.setAttribute('src', 'https://unpkg.com/location-picker/dist/location-picker.min.js')
            // // document.head.appendChild(locationPickerScript)
            // this.initMap();
        },
        methods: {
            addStation() {
                fb.stationsCollection.add({
                    name: this.newStation.name,
                    location: this.newStation.location,
                    latitude: this.newStation.latitude,
                    longitude: this.newStation.longitude,

                    petrolPrice: this.newStation.petrolPrice,
                    dieselPrice: this.newStation.dieselPrice

                }).then(ref => {
                    this.newStation.name = '';
                    this.newStation.location = '';
                    this.newStation.latitude = '';
                    this.newStation.longitude = '';
                    this.newStation.petrolPrice = '';
                    this.newStation.dieselPrice = '';
                }).catch(err => {
                    console.log(err)
                })

            },
            fetchStationsData() {
                var stations = [];
                fb.stationsCollection.get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        console.log(doc.id, " => ", doc.data());
                        stations.push(doc);
                    })
                }).catch(err => {
                    console.log("Error getting documents: ", error);
                })

                return stations;
            },
            // async fetchStationsData() {
            //     const stations = [];
            //     await fb.stationsCollection.get()
            //         .then(querySnapshot => {
            //             querySnapshot.docs.forEach(doc => {
            //                 stations.push(doc.data());
            //             });
            //         });
            //     return stations;
            //     // const snapshot = await fb.stationsCollection.get();
            //     // return snapshot.docs.map(doc => doc.data());
            // }
            editStation(key) {

            },
            deleteStation(key) {
                fb.stationsCollection.doc(key).delete();
            }


            // src() {
            //     return this.url;
            // },
            // initMap() {

            //     // Initialize locationPicker plugin
            //     var lp = new LocationPicker('google_map', {
            //         setCurrentPosition: true, // You can omit this, defaults to true
            //     }, {
            //         zoom: 15 // You can set any google map options here, zoom defaults to 15
            //     });

            //     // Listen to map idle event, listening to idle event more accurate than listening to ondrag event
            //     google.maps.event.addListener(lp.map, 'idle', function (event) {
            //         // Get current location and show it in HTML
            //         var location = lp.getMarkerPosition();
            //         console.log("Location: " + location.lat + ',' + location
            //             .lng);
            //     });
            // }
        },
        created() {
            this.savedStations = this.fetchStationsData();
            console.log("List:" + JSON.stringify(this.savedStations));
        }
    };
</script>