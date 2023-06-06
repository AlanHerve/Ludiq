<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../DTOs/OrganizationDTO.php");
include("../Repositories/OrganizationRepository.php");



if ($_SERVER['REQUEST_METHOD'] === 'POST') {

}elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $function_to_call = $_GET['function_to_call'];

    if(isset($_GET['id_organization'])) $id_organization = $_GET['id_organization'];

    $organizationRepository = OrganizationRepository::getInstance();

    switch ($function_to_call) {
        case "fetchAllOrganization":
            $organizationRepository->fetchAllOrganizations();
            break;
        case "getOrganzationById":
            $organizationRepository->getOrganzationById($id_organization);
            break;

    }

}