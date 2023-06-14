<?php

$flashcards = [];

if (($handle = fopen('flashcards.csv', 'r')) !== false) {
    while (($data = fgetcsv($handle, 1000, ',')) !== false) {
        $flashcard = [
            'question' => $data[0],
            'answer' => $data[1],
        ];
        $flashcards[] = $flashcard;
    }
    fclose($handle);
}

require 'vendor/autoload.php'; // Chargez les dépendances de Symfony

$loader = new \Twig\Loader\FilesystemLoader(__DIR__);
$twig = new \Twig\Environment($loader);

echo $twig->render('flashcards.html.twig', ['flashcards' => $flashcards]);
