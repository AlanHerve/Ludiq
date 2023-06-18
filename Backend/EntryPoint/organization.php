<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, PUT');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../DTOs/OrganizationDTO.php");
include("../Repositories/OrganizationRepository.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {

  $function_to_call = $_GET['function_to_call'];
  // If the id_organization parameter is set its value is assigned to the $id_organization variable.
  if (isset($_GET['id_organization'])) $id_organization = $_GET['id_organization'];

  $organizationRepository = OrganizationRepository::getInstance();

  switch ($function_to_call) {
    // we want to fetch all existing organizations
    case "fetchAllOrganization":
      $organizationRepository->fetchAllOrganizations();
      break;
    // We want to fetch a specific organization with its ID
    case "getOrganizationById":
      $organizationRepository->getOrganzationById($id_organization);
      break;
    // Checks if a particular user is being currently invited to join an organization
    case "isAlreadyInvited":
      echo json_encode($organizationRepository->isUserAlreadyInvited($id_organization, $_GET['userId']));
      break;
    // Fetch all the activities created by members of an organization
    case "fetchOrganizationActivities":
      echo json_encode($organizationRepository->fetchOrganizationActivities($id_organization));
      break;
    // Fetch all posts created by the members of a same organization
    case "fetchOrganizationPosts":
      echo json_encode($organizationRepository->fetchOrganizationPosts($id_organization));
      break;
    // checks if a user is in a precise organization
    case "is_on_this_organization":
      echo json_encode($organizationRepository->isOnThisOrganization($id_organization, $_GET['userId']));
      break;
    // Fetch all users of an organization
    case "organization_users":
      echo json_encode($organizationRepository->getOrganizationUsers($id_organization));
      break;

  }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  $body = file_get_contents('php://input');
  $data = json_decode($body, true);

  // Create a new instance for the OrganizationRepository
  $organizationRepository = OrganizationRepository::getInstance();

  if (isset($data['type'])) {
    switch ($data['type']) {
      // To send an invitation to a user who isn't in the organization yet
      case "add_invitation":
        echo json_encode($organizationRepository->sendInvitation($data['organizationId'], $data['userId']));
        return;
      // To cancel said invitation
      case "remove_invitation":
        echo json_encode($organizationRepository->removeInvitation($data['organizationId'], $data['userId']));
        return;
      // For the concerned user to accept the invitation in the organization
      case "accept_invitation":
        echo json_encode($organizationRepository->acceptInvitation($data['organizationId'], $data['userId']));
        return;
      // A user can quit the organization if he decides to
      case "quit_organization":
        echo json_encode($organizationRepository->quitOrganization($data['organizationId'], $data['userId']));
        return;
    }
  }


  echo json_encode($organizationRepository->addOrganization($data['userId'], $data['jsonOrganizationDTO']));
}
