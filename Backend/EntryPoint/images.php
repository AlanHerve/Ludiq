<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../Repositories/HobbyRepository.php");
include("../DTOs/HobbyPostDTO.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $imageFolder = '../assets/images/';
    $imageName = $_GET['imageName'];
    $imagePath = $imageFolder . $imageName;


// Vérifier si le fichier existe
    if (file_exists($imagePath)) {
        // Récupérer le type MIME de l'image
        $mimeType = mime_content_type($imagePath);
        // Envoyer le contenu de l'image
        readfile($imagePath);
    } else {
        // Gérer le cas où l'image n'existe pas
        // par exemple, renvoyer une image de remplacement ou une erreur appropriée
        // ...
    }

}