<?php

class OrganizationDTO
{
    public $id_organization;
    public $name_organization;
    public $avatar;
    public $description;

    public function __construct(
              $id_organization,
              $name_organization,
              $avatar,
              $description)
    {
        $this->id_organization = $id_organization;
        $this->name_organization = $name_organization;
        $this->avatar = $avatar;
        $this->description = $description;
    }
}
