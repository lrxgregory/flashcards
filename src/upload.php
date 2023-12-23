<?php

require '../vendor/autoload.php';

session_set_cookie_params([
    'lifetime' => 86400,
    'path' => '/',
    'domain' => $_SERVER['HTTP_HOST'],
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Strict',
]);
session_start();
session_regenerate_id(true);

$cardNumber = $_POST['cardNumber'];

$flashcards = [];

if (isset($_FILES['fileToUpload']) && $_FILES['fileToUpload']['error'] === UPLOAD_ERR_OK) {
    $userFolder = session_id();
    $uploadDir = '../uploads/' . $userFolder . '/';

    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $uploadFile = $uploadDir . basename($_FILES['fileToUpload']['name']);

    $newFileName = $userFolder . '.csv';

    $allowedExtensions = ['csv'];
    $fileInfo = pathinfo($_FILES['fileToUpload']['name']);

    if (!in_array(strtolower($fileInfo['extension']), $allowedExtensions)) {
        error_log('Type de fichier non autorisé.');
        exit;
    }

    $newFileName = preg_replace("/[^a-zA-Z0-9_.-]/", "", $newFileName);

    $uploadFile = $uploadDir . $newFileName;

    if (move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $uploadFile)) {
        error_log('Le fichier est valide et a été téléchargé avec succès.');
    } else {
        error_log('Erreur lors du téléchargement du fichier.');
    }
} else {
    error_log('Aucun fichier n\'a été téléchargé.');
    header('Location: ' . $_SERVER['HTTP_HOST']);
    exit;
}

if (($handle = fopen($uploadFile, 'r')) !== false) {
    try {
        while (($data = fgetcsv($handle, 1000, ',')) !== false) {
            if (count($data) === 2) {
                $flashcard = [
                    'question' => $data[0],
                    'answer' => $data[1],
                ];
                $flashcards[] = $flashcard;
            } else {
                error_log('Invalid data in CSV file: ' . implode(', ', $data));
            }
        }
    } catch (Exception $e) {
        error_log('Error reading CSV file: ' . $e->getMessage());
    } finally {
        fclose($handle);
    }
} else {
    error_log('Unable to open CSV file for reading.');
}

$flashcardsNumber = count($flashcards);
$numberOfEmptyArrays = $cardNumber - ($flashcardsNumber % $cardNumber) % $cardNumber;
if ($numberOfEmptyArrays > 0) {
    for ($i = 0; $i < $numberOfEmptyArrays; $i++) {
        $flashcards[] = [
            'question' => '',
            'answer' => '',
        ];
    }
}

$loader = new \Twig\Loader\FilesystemLoader('../view');
$twig = new \Twig\Environment($loader);

echo $twig->render('flashcards.html.twig', ['flashcards' => $flashcards, 'cardNumber' => $cardNumber, 'flashcardsNumber' => $flashcardsNumber]);
