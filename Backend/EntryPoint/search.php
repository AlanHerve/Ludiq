<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../DTOs/HobbyDTO.php");
include("../Repositories/SearchRepository.php");

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

    echo $output;
}
