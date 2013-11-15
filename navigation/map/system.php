<?php

namespace Modules\navigation\map; //namespace should be changed accordingly to your plugin module name and group


class System{ //class name can't be changed. 

    function init(){
        $site = \Ip\ServiceLocator::getSite();

        $site->addJavascript('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places');

        $site->addJavascript(BASE_URL.LIBRARY_DIR.'js/jquery/jquery.js');
        $site->addJavascript(BASE_URL.PLUGIN_DIR.'navigation/map/public/googleMaps.js');
        $site->addCss(BASE_URL.PLUGIN_DIR.'navigation/map/public/googleMaps.css');
    }

}