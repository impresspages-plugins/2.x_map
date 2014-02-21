function IpWidget_ipMap(widgetObject) {
    "use strict";

    var marker, markerlng, markerlat;

    this.widgetObject = widgetObject;

    //just enable bellow described functions
    this.manageInit = manageInit;
    this.prepareData = prepareData;

    function manageInit() {

        var widget = this.widgetObject;
        var instanceData = widget.data('ipWidget').data;

        widget.find('.ipLocation').val(instanceData.locationEntered);


        var zoomLevel;
        var latitude;
        var longitude;
        var mapView;
        var height;

        if (instanceData.zoom){
            zoomLevel = instanceData.zoom;
            latitude = parseFloat(instanceData.lat);
            longitude = parseFloat(instanceData.lng);
            mapView = instanceData.mapview;
            height =  parseInt(instanceData.height);
        }else{
            // Default coordinates
            // If no coordinates are set, show entire Earth map
            latitude = 17.65766463941689;
            longitude = 30.479036375000085;
            height = 400; // Default height
            zoomLevel = 2; // Default zoom
            mapView = google.maps.MapTypeId.ROADMAP;
        }

        var mapOptions = {
            center: new google.maps.LatLng(latitude,longitude ),
            zoom: parseFloat(zoomLevel),
            mapTypeId: mapView
        };

        map = new google.maps.Map(widget.find('.ipsMap')[0], mapOptions);

        if ((typeof instanceData.markerlat != 'undefined') && (typeof instanceData.markerlng != 'undefined')) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(instanceData.markerlat, instanceData.markerlng),
                map: map
            });
        }

        function placeMarker(location) {
            if ( marker ) {
                marker.setPosition(location);
            } else {
                marker = new google.maps.Marker({
                    position: location,
                    map: map
                });
            }

            var markerPos = marker.getPosition();
            instanceData.markerlat = markerPos.lat();
            instanceData.markerlng = markerPos.lng();
        }

        google.maps.event.addListener(map, 'click', function(event) {
            placeMarker(event.latLng);
        });

        // add slider for map height
        widget.find( '.ipsMapSize').slider();

        $(function() {
            $('.ipsMapSize').slider({
                orientation: "horizontal",
                min: 50, // Min map height
                max: 1200, // Max map height
                value: widget.find( '.ipsMapSize').data('height'),
                slide: ipMapRefreshSwatch,
                change: ipMapRefreshSwatch
            });
        });

        function ipMapRefreshSwatch () {
            var sliderData =  widget.find( '.ipsMapSize').slider( "option", "value" );
            widget.find( '.ipsMap' ).height(sliderData);
            google.maps.event.trigger(map, 'resize'); // Resize on slider move
        }

        ipMapRefreshSwatch();


        var input = widget.find('.ipLocation').get(0);

        var autocomplete = new google.maps.places.Autocomplete(input);

        google.maps.event.addListener(autocomplete, 'place_changed', function() {

            var place = autocomplete.getPlace();

            // Show the map to the current location selected
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
                // Why 17? Because it looks good.
            }

        });

    }

    function prepareData() {


        var widget = this.widgetObject;
        var instanceData = widget.data('ipWidget').data;

        var data = Object();

        var curLatLng = map.getCenter();

        data.lat = curLatLng.lat();
        data.lng = curLatLng.lng();

        if ((typeof(instanceData.markerlat) !== 'undefined') && (typeof(instanceData.markerlng) !== 'undefined')) {
            data.markerlat = instanceData.markerlat;
            data.markerlng = instanceData.markerlng;
        }

        data.zoom = map.getZoom();
        data.mapview = map.mapTypeId;
        data.height = parseInt( $( '.ipsMapSize').slider( "option", "value"));

        $(this.widgetObject).trigger('preparedWidgetData.ipWidget', [ data ]);
    }
}