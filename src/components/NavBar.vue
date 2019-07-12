<template>
    <div class="navBar">
        <nav>
            <div class="nav-wrapper">
                <router-link class="nav-link" to="/">Petrol Station Admin</router-link>

                <ul id="nav-mobile" class="right">
                    <li>
                        <router-link class="nav-link" to="/suggestions">Suggestions</router-link>
                    </li>
                    <li><a href="collapsible.html">About</a></li>

                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "NavBar",

        methods: {

        }
    }
</script>