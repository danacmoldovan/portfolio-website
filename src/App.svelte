<script>
import { Router, Route } from 'svelte-routing';
import { Icon } from 'svelte-awesome';
import { heart } from 'svelte-awesome/icons';
import Home from './components/Home.svelte';
import Projects from './components/Projects.svelte';
import Contact from './components/Contact.svelte';
import Intro from './components/Intro.svelte';

export let url = '';

</script>

<style>
    #heart {
        color: darkred;
    }
</style>

<main class="main">
    <Router {url}>
        {#if location.pathname !== '/' }
        <div class="header">
            <Intro/>
        </div>
        {/if}
        <div>
            <Route path="projects" component={Projects} />
            <Route path="contact" component={Contact} />
            <Route path="/" component={Home} />
        </div>
        <div class="footer">
            <small id="made-by">made with <span id="heart"><Icon data={heart}/></span> by <a href="https://github.com/adimoldovan" target="_blank">adi</a></small>
        </div>
    </Router>
</main>
