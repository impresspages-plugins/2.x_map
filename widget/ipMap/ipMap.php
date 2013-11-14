<?php
namespace Modules\navigation\map\widget;

if (!defined('CMS')) exit;


class ipMap extends \Modules\standard\content_management\Widget {

    public function managementHtml($instanceId, $data, $layout) {

        $this->fixValues($data);

        return parent::managementHtml($instanceId, $data, $layout);
    }

    public function previewHtml($instanceId, $data, $layout) {

        global $site;

        $data['id'] = 'ipMap_'.$instanceId;

        $this->fixValues($data);

        return parent::previewHtml($instanceId, $data, $layout);
    }

    public function getTitle() {
        return 'Map';
    }
/*
 * Sets default values if something is missing
 *
 * $data - data array
 */
    private function fixValues(&$data){

        if (!isset($data['zoom'])){
            $data['zoom'] = 2;
        }

        if (!isset($data['lat'])){
            $data['lat'] = 17.65766463941689;
        }

        if (!isset($data['lng'])){
            $data['lng'] = 30.479036375000085;
        }

        if (!isset($data['mapview'])){
            $data['mapview'] = 'roadmap';
        }

        if (!isset($data['height'])){
            $data['height'] = 400;
        }

        return $data;
    }


}