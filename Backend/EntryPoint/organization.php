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
            echo json_encode($organizationRepository->fetchAllOrganizations());
            break;
        case "getOrganizationById":
            echo json_encode($organizationRepository->findOrganizationById($id_organization));
            break;
        case "fetchOrganizationPosts":
            echo json_encode($organizationRepository->fetchOrganizationPosts($id_organization));
            break;
        case "fetchOrganizationActivities":
            echo json_encode($organizationRepository->fetchOrganizationActivities($id_organization));
            break;


    }

}
