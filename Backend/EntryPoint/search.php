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
    // Search for hobbies
    if($searchType === 'hobby') {
        $searchRepository = SearchRepository::getInstance();
        $output = $searchRepository->searchHobbies($searchTerm);
    }
    // Search for users
    else if($searchType === 'user') {
        $searchRepository = SearchRepository::getInstance();
        $output = $searchRepository->searchUsers($searchTerm);
    }
    // Searches for posts
    else if($searchType === 'post') {
        $searchRepository = SearchRepository::getInstance();
        $output = $searchRepository->searchPost($searchTerm);
    }
    // Searches for activities
    else if($searchType === 'activity') {
        $searchRepository = SearchRepository::getInstance();
        $output = json_encode($searchRepository->searchActivity($searchTerm));
    }

    echo $output;
}
