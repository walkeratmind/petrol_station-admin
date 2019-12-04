<template>
    <div class="container suggestion">
        <h4>User Suggestions</h4>
        <div v-if="suggestions != null" id="stations">
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

                    <tr v-for="station of suggestions" v-bind:key="station['.key']">
                        <td>{{ station.data().name }}</td>
                        <td>{{ station.data().location }}</td>
                        <td>{{ station.data().latitude }}, {{ station.data().longitude }}</td>
                        <td>{{ station.data().petrolPrice }}</td>
                        <td>{{ station.data().dieselPrice }}</td>


                        <button @click="approveSuggestion(station.id)" class="waves-effect waves-light btn action_btn">
                            Approve
                            <!-- <i class=" material-icons right">circle</i> -->
                        </button>
                        <button data-target="confirm" @click="deleteId = station.id"
                            class="waves-effect waves-light modal-trigger btn action_btn">
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


        <div class="alert blue lighten-2" v-if="suggestions === null">
            <h5 class="center">List is Empty</h5>
        </div>
    </div>

</template>


<script>
    const fb = require('../firebaseConfig.js');
    export default {
        name: "suggestion",

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
                suggestions: null,
                station: [],
                deleteId: '',
                approveId: '',
            }
        },
        firebase() {
            this.suggestions = fb.suggestedStation;
        },
        methods: {
            approveSuggestion(id) {
                this.getFirestoreDocById(id);
                this.addStation();
                this.deleteStation(id);
                this.suggestions = this.fetchSuggestionData();
            },
            addStation() {
                fb.stationsCollection.add({
                    name: this.station.name,
                    location: this.station.location,
                    latitude: this.station.latitude,
                    longitude: this.station.longitude,

                    petrolPrice: this.station.petrolPrice,
                    dieselPrice: this.station.dieselPrice

                }).then(ref => {
                    this.station.name = '';
                    this.station.location = '';
                    this.station.latitude = '';
                    this.station.longitude = '';
                    this.station.petrolPrice = '';
                    this.station.dieselPrice = '';
                }).catch(err => {
                    console.log(err)
                })

            },
            getFirestoreDocById(id) {
                fb.suggestedStation.doc(id).get().then(doc => {
                    this.station = {
                        name: doc.data().name,
                        location: doc.data().location,
                        latitude: doc.data().latitude,
                        longitude: doc.data().longitude,
                        petrolPrice: doc.data().petrolPrice,
                        dieselPrice: doc.data().dieselPrice,

                    };
                    console.log("Doc : Id: " + id + " , " + doc.data().name);
                })
                // .catch(err => {
                //     console.log("Error getting document with ID : " + id + "," + error);
                // })

            },
            fetchSuggestionData() {
                var stations = [];
                fb.suggestedStation.get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        console.log(doc.id, " => ", doc.data());
                        stations.push(doc);
                    })
                }).catch(err => {
                    console.log("Error getting documents: ", error);
                })

                return stations;
            },
            deleteStation(key) {
                fb.suggestedStation.doc(key).delete();
                this.suggestions = this.fetchSuggestionData();
            }

        },
        created() {
            this.suggestions = this.fetchSuggestionData();

        },
        mounted() {
            $('.modal').modal();
        }

    }
</script>