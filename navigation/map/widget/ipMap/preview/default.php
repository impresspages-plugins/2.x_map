<div data-mapview="<?php echo $this->esc($mapview);
?>"  data-zoom="<?php echo $this->esc($zoom);
?>" data-lat="<?php echo $this->esc($lat);
?>"  data-lng="<?php echo $this->esc($lng);

if (isset($markerlat)){
    ?>" data-markerlat="<?php echo $this->esc($markerlat);
}

if (isset($markerlng)){
?>"  data-markerlng="<?php echo $this->esc($markerlng);
}

?>"  data-height="<?php echo $this->esc($height);
?>"  data-initialized="0" id="<?php echo $this->esc($id);
?>"  class="ipsMap">
</div>
<?php if ($site->managementState()) { ?>
<script>
    if (typeof ipMap !== 'undefined'){
        ipMap.init();
    }
</script>
<?php } ?>