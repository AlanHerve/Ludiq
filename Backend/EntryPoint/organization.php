<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, PUT');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../DTOs/OrganizationDTO.php");
include("../Repositories/OrganizationRepository.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {

  $function_to_call = $_GET['function_to_call'];

  if (isset($_GET['id_organization'])) $id_organization = $_GET['id_organization'];

  $organizationRepository = OrganizationRepository::getInstance();

  switch ($function_to_call) {
    case "fetchAllOrganization":
      $organizationRepository->fetchAllOrganizations();
      break;
    case "getOrganizationById":
      $organizationRepository->getOrganzationById($id_organization);
      break;
    case "isAlreadyInvited":
      echo json_encode($organizationRepository->isUserAlreadyInvited($id_organization, $_GET['userId']));
      break;
    case "fetchOrganizationActivities":
      echo json_encode($organizationRepository->fetchOrganizationActivities($id_organization));
      break;
    case "fetchOrganizationPosts":
      echo json_encode($organizationRepository->fetchOrganizationPosts($id_organization));
      break;

  }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  $body = file_get_contents('php://input');
  $data = json_decode($body, true);

  $organizationRepository = OrganizationRepository::getInstance();

  if (isset($data['type'])) {
    switch ($data['type']) {
      case "add_invitation":
        echo json_encode($organizationRepository->sendInvitation($data['organizationId'], $data['userId']));
        return;
      case "remove_invitation":
        echo json_encode($organizationRepository->removeInvitation($data['organizationId'], $data['userId']));
        return;
    }
  }


  echo json_encode($organizationRepository->addOrganization($data['userId'], $data['jsonOrganizationDTO']));
}
