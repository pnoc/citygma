import React from "react";

export default function LocationCompass() {

    if (window.DeviceOrientationEvent) {
        document.getElementById("notice").innerHTML = "super ça marche.";
        window.addEventListener('deviceorientation', function(eventData) {
            // gamma: Tilting the device from left to right. Tilting the device to the right will result in a positive value.
            var tiltLR = eventData.gamma;

            // beta: Tilting the device from the front to the back. Tilting the device to the front will result in a positive value.
            var tiltFB = eventData.beta;

            // alpha: The direction the compass of the device aims to in degrees.
            var dir = eventData.alpha;

            navigator.geolocation.getCurrentPosition(position => {
                const bearedDir = dir + getBearing(position.coords.latitude, position.coords.longitude, 48.111, -1.6794);

                // Call the function to use the data on the page.
                deviceOrientationHandler(tiltLR, tiltFB, bearedDir);
            });

        }, false);
    } else {
        document.getElementById("notice").innerHTML = "Helaas. De DeviceOrientationEvent API word niet door dit toestel ondersteund.";
    }

    function deviceOrientationHandler(tiltLR, tiltFB, dir) {
        document.getElementById("tiltLR").innerHTML = Math.ceil(tiltLR);
        document.getElementById("tiltFB").innerHTML = Math.ceil(tiltFB);
        document.getElementById("direction").innerHTML = Math.ceil(dir);

        // Rotate the disc of the compass.
        var compassDisc = document.querySelector('#arrow>img');
        compassDisc.style.webkitTransform = "rotate("+ dir +"deg)";
        compassDisc.style.MozTransform = "rotate("+ dir +"deg)";
        compassDisc.style.transform = "rotate("+ dir +"deg)";
    }

    function toRadians(degrees) {
        const pi = Math.PI;
        return degrees * (pi/180);
    }

    function toDegrees(radians) {
        const pi = Math.PI;
        return radians * (180/pi);
    }

    function getBearing(lat1, long1, lat2, long2) {
        const lat1Rad = toRadians(lat1);
        const lat2Rad = toRadians(lat2);
        const deltaLng = toRadians(long2 - long1);

        const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(deltaLng);
        const y = Math.sin(deltaLng) * Math.cos(lat2Rad);
        const bearingRad = Math.atan2(y, x);

        const bearingDeg = toDegrees(bearingRad);

        return bearingDeg;
    }

    // test boussole 2
    /*const arrow = document.querySelector('#arrow>img');

    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    const options = {
        enableHighAccuracy: true,
        timeout: Infinity,
        maximumAge: 0
    };

    navigator.geolocation.watchPosition((data) => {
        console.log(data);
        arrow.style.transform = `rotate(${data.coords.heading}deg)`;
        document.getElementById("direction").innerHTML = data.coords.heading;
    }, error, options);*/
}