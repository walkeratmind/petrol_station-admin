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


                        <button data-target="editStationModal"
                            class="waves-effect waves-light  modal-trigger btn action_btn"
                            @click="editStationId = station.id; getFirestoreDocById(station.id);">
                            Edit
                            <i class=" material-icons right">edit</i>
                        </button>
                        <button data-target="confirm" @click="deleteId = station.id"
                            class="waves-effect waves-light btn modal-trigger action_btn">
                            Delete
                            <i class="material-icons right outlined">delete_outline</i>
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
        <div id="formModal" class="modal modal-fixed-footer" style="height: 90%;max-height: 100%;">
            <div class="modal-content">
                <h4>Add Gas Station</h4>
                <div class="row">
                    <form v-on:submit.prevent="addStation" class="form col s12">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">local_gas_station</i>
                            <input id="station_name" type="text" name="name" class="validate" v-model="newStation.name"
                                required />
                            <label for="station_name">Gas Station Name</label>
                        </div>
                        <div class="input-field col s12">
                            <i class="material-icons prefix">place</i>
                            <input id="location" type="text" name="location" class="validate"
                                v-model="newStation.location" required />
                            <label for="location">Location</label>
                        </div>
                        <!-- <div class="col s12">
                            <div id="google_map" class="col s12"></div>
                            <Label for="map">Select Locatation on Map</Label>
                        </div> -->
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="latitude" name="latitude" type="text" class="validate"
                                    v-model="newStation.latitude" required />
                                <label for="latitude">Latitude</label>
                            </div>
                            <div class="input-field col s6">
                                <input id="longitude" name="longitude" type="text" class="validate"
                                    v-model="newStation.longitude" required />
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

                            <button type="submit" class="modal-close waves-effect waves-green btn right">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
            </div>
        </div>

        <!--Edit Station Modal Structure -->
        <div id="editStationModal" class="modal modal-fixed-footer" style="height: 90%;max-height: 100%;">
            <div class="modal-content">
                <h4>Edit Gas Station</h4>
                <div class="row">
                    <form v-on:submit.prevent="editStation(editStationId)" class="form col s12" novalidate="novalidate">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">local_gas_station</i>
                            <input id="station_name" name="name" type="text" class="validate"
                                v-model="editingStation.name" required />
                            <label class="active" for="station_name">Gas Station Name</label>
                        </div>
                        <div class="input-field col s12">
                            <i class="material-icons prefix">place</i>
                            <input id="location" name="location" type="text" class="validate"
                                v-model="editingStation.location" required />
                            <label for="location">Location</label>
                        </div>
                        <!-- <div class="col s12">
                            <div id="google_map" class="col s12"></div>
                            <Label for="map">Select Locatation on Map</Label>
                        </div> -->
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="latitude" name="latitude" type="text" class="validate"
                                    v-model="editingStation.latitude" required />
                                <label class="active" for="latitude">Latitude</label>
                            </div>
                            <div class="input-field col s6">
                                <input id="longitude" name="longitude" type="text" class="validate"
                                    v-model="editingStation.longitude" required />
                                <label class="active" for="Longitude">Longitude</label>
                            </div>
                        </div>
                        <div class="row">
                            <h6>Fuel Price</h6>
                            <p>Note: You can leave this field empty and fill it later</p>
                            <div class="input-field col s6">
                                <i class="material-icons prefix">money</i>
                                <input id="petrol_price" type="text" class="validate"
                                    v-model="editingStation.petrolPrice" />
                                <label for="petrol_price">Petrol Price</label>
                            </div>
                            <div class="input-field col s6">
                                <i class="material-icons prefix">money</i>
                                <input id="diesel_price" type="text" class="validate"
                                    v-model="editingStation.dieselPrice" />
                                <label for="diesel_price">Diesel Price</label>
                            </div>

                            <button type="submit" class="modal-close waves-effect waves-green btn right">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
            </div>
        </div>
    </div>
</template>

<style type="text/css">
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

    .action_btn {
        margin-left: 4px;
    }
</style>

<script>
    import {
        stat
    } from 'fs';
    import {
        functions
    } from 'firebase';

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
                editStationId: '',
                errors: []
            }

        },

        mounted() {

            $('.modal').modal();

           

            var isModalOpen = M.Modal.getInstance(isOpen);

            if (isModalOpen) {
                console.log("Model is opended, " + isModalOpen);
                M.updateTextFields();
            }

            // var stations = [];
            //     fb.stationsCollection.get().then(querySnapshot => {
            //         querySnapshot.forEach(doc => {
            //             console.log(doc.id, " => ", doc.data());
            //             stations.push(doc);
            //         })
            //     }).catch(err => {
            //         console.log("Error getting documents: ", error);
            //     })

            //     this.savedStations = stations;

        },
        ready() {
             
            M.updateTextFields();


        },
        methods: {
            addStation() {
                this.checkForm();
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

                this.savedStations = this.fetchStationsData();

            },
            checkForm: function (e) {
                if (this.name && this.location && this.latitude && this.longitude) {
                    return true;
                } else {
                    this.errors = [];
                    this.errors.push("Please fill the required data");
                }

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
            getFirestoreDocById(id) {
                fb.stationsCollection.doc(id).get().then(doc => {
                        this.editingStation = {
                            name: doc.data().name,
                            location: doc.data().location,
                            latitude: doc.data().latitude,
                            longitude: doc.data().longitude,
                            petrolPrice: doc.data().petrolPrice,
                            dieselPrice: doc.data().dieselPrice,

                        };
                        console.log("Doc : Id: " + id + " , " + doc.data().name);
                    })
                    .catch(err => {
                        console.log("Error getting document with ID : " + id + "," + error);
                    })

            },
            editStation(id) {

                // Add a new document in collection "cities"
                fb.stationsCollection.doc(id).set({
                        name: this.editingStation.name,
                        location: this.editingStation.location,
                        latitude: this.editingStation.latitude,
                        longitude: this.editingStation.longitude,
                        petrolPrice: this.editingStation.petrolPrice,
                        dieselPrice: this.editingStation.dieselPrice
                    }, {
                        merge: true
                    })
                    .then(function () {
                        console.log("Document successfully written!");
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });

                // fb.stationsCollection
                //     .doc(id)
                //     .get()
                //     .then(snap => {
                //         return snap.docs[0].ref.update({
                //             name: this.editingStation.name,
                //             location: this.editingStation.location,
                //             latitude: this.editingStation.latitude,
                //             longitude: this.editingStation.longitude,
                //             petrolPrice: this.editingStation.petrolPrice,
                //             dieselPrice: this.editingStation.dieselPrice
                //         });
                //     })
                //     .then(() => {
                //         console.log('Successfully updated the record')
                //     })
                //     .catch(error => {
                //         console.error('There was an error editing the record: ' + error)
                //     })
                this.savedStations = this.fetchStationsData();

            },
            deleteStation(key) {
                fb.stationsCollection.doc(key).delete();
                this.savedStations = this.fetchStationsData();

            }
        },
        created() {
            this.savedStations = this.fetchStationsData();
            console.log("List:" + JSON.stringify(this.savedStations));
        }
    };
</script>