var map; //<-- This is now available to both event listeners and the initialize() function

var ipMap = new function () {

    "use strict";

    this.init = function () {
            $( ".ipsMap" ).each(function( ) {

                $( this ).height($( this ).data('height'));

                if ($( this ).data('initialized') == 0){
                    $( this).data('initialized', 1);
                    var mapOptions = {
                        center: new google.maps.LatLng( $( this ).data('lat'), $( this ).data('lng')),

                        zoom: $( this ).data('zoom'),

                        mapTypeId:  $( this ).data('mapview'),

                        height: $( this ).data('height')

                    };

                    map = new google.maps.Map($( this ).get(0), mapOptions);
                }
            });

        }

};

$(document).ready(ipMap.init);
