

var sock = new SockJS('/plugin/local-remote/client.rpy');
sock.onopen = function() {
    console.log('open');
};
sock.onmessage = function(e) {
    console.log('message', e.data);
};
sock.onclose = function() {
    console.log('close');
};

window.onload = function () {

var start;
var longTouchTimeout;
var touchWasPause;

document.body.addEventListener('touchstart', function(event) {
    // event.preventDefault();
    var touch = event.targetTouches[0];
    start = {x: touch.pageX, y: touch.pageY};
    touchWasPause = false;
    longTouchTimeout = window.setTimeout(function () {
        sock.send("PAUSE\r\n");
        touchWasPause = true;
    }, 1500);
    sock.send("START X " + start.x + " Y " + start.y + "\r\n");
    return false;
}, false);

document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
  return false;
}, false);

document.body.addEventListener('touchend', function(event) {
    // event.preventDefault();
    if (touchWasPause) {
        return;
    }
    window.clearTimeout(longTouchTimeout);
    var touch = event.changedTouches[0];
    var xmoved = start.x - touch.pageX;
    var absx = Math.abs(xmoved);
    var ymoved = start.y - touch.pageY;
    var absy = Math.abs(ymoved);
    var MOVE_THRESHOLD = 10;
    sock.send("END X " + xmoved + " Y " + ymoved + " - start X " + start.x + " Y " + start.y + "\r\n");
    if ((absx < MOVE_THRESHOLD) && (absy < MOVE_THRESHOLD)) {
        sock.send("NEXT\r\n");
    } else {
        if (absx > absy) {
            if (xmoved > 0) {
                sock.send("RIGHT\r\n");
            } else {
                sock.send("LEFT\r\n");
            }
        } else {
            if (ymoved > 0) {
                sock.send("DOWN\r\n");
            } else {
                sock.send("UP\r\n");
            }
        }
    }
    return false;
}, false);

};