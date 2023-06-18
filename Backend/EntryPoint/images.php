<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

require_once '../Repositories/ImageRepository.php';


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $imageName = $_GET['image_name'];
    // Create a new ImageRepository instance
    $imageRepository = ImageRepository::getInstance();
    // Used to create a new image file
    return $imageRepository->createFile($imageName);
}
