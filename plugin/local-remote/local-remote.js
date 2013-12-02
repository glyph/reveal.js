/**
 * Touch-based remote controller for your presentation which does not require
 * global internet access; just Wi-Fi.
 */

(function(window){
    /**
     * Detects if we are dealing with a touch enabled device (with some false positives)
     * Borrowed from modernizr: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touch.js   
     */
    var hasTouch  = (function(){
        return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
    })();

    /**
     * Detects if notes are enable and the current page is opened inside an /iframe
     * this prevents loading Remotes.io several times
     */
    var isNotesAndIframe = (function(){
        return window.RevealNotes && (self != top);
    })();

    if(!hasTouch && !isNotesAndIframe){
        if(!hasTouch && !isNotesAndIframe){
            var sock = new SockJS('/plugin/local-remote/server.rpy');
            sock.onopen = function () {
                console.log("Opened.");
            };
            sock.onmessage = function (e) {
                switch (e.data.trimRight()) {
                    case "LEFT":
                        Reveal.left();
                        break;
                    case "RIGHT":
                        Reveal.right();
                        break;
                    case "UP":
                        Reveal.up();
                        break;
                    case "DOWN":
                        Reveal.down();
                        break;
                    case "NEXT":
                        Reveal.next();
                        break;
                    case "PAUSE":
                        Reveal.togglePause();
                        break;
                }
            };
        }
    }
})(window);
