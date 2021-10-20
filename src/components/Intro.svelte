<script>
    import config from '../../public/config.json';
    import { onMount } from 'svelte';

    onMount( async () => {
      const words = config.introDynamicWords;
      const targetElement = document.getElementById( 'type' );
      let i = 0;
      let counter;

      function type() {
        let word = words[i].split( '' );

        const loopTyping = function () {
          if ( word.length > 0 ) {
            targetElement.innerHTML += word.shift();
          } else {
            erase();
            return false;
          }
          counter = setTimeout( loopTyping, 300 );
        };

        loopTyping();
      }

      function erase() {
        let word = words[i].split( '' );

        const loopErasing = function () {
          if ( word.length > 0 ) {
            word.pop();
            targetElement.innerHTML = word.join( '' );
          } else {
            if ( words.length > ( i + 1 ) ) {
              i ++;
            } else {
              i = 0;
            }
            type();
            return false;
          }
          counter = setTimeout( loopErasing, 50 );
        };

        loopErasing();
      }

      type();
    } );

</script>

<style>
    #type {
        color: darkred;
        font-weight: bold;
    }

    #cursor {
        font-size: 1.5em;
        color: darkred;
        animation: 1s blink step-end infinite;
    }

    @keyframes blink {
        from, to {
            color: transparent;
        }
        50% {
            color: black;
        }
    }

</style>

<div id="intro">
    {config.introduction} <span id="type"></span><span id="cursor">|</span> :)
</div>
