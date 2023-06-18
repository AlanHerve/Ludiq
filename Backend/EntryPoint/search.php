<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Origin,Content-Type');

require_once("../DTOs/HobbyDTO.php");
require_once("../Repositories/SearchRepository.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $searchType = $_GET['searchType'];
    $searchTerm = $_GET['searchTerm'];
    $output = json_encode([]);
    if($searchType === 'hobby') {
        $searchRepository = SearchRepository::getInstance();
        $output = $searchRepository->searchHobbies($searchTerm);
    }
    else if($searchType === 'user') {
        $searchRepository = SearchRepository::getInstance();
        $output = $searchRepository->searchUsers($searchTerm);
    }
    else if($searchType === 'post') {
        $searchRepository = SearchRepository::getInstance();
        $output = $searchRepository->searchPost($searchTerm);
    }
    else if($searchType === 'activity') {
        $searchRepository = SearchRepository::getInstance();
        $output = json_encode($searchRepository->searchActivity($searchTerm));
    }

    echo $output;
}
