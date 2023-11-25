<?php

function deleteFolderContents($folderPath)
{
    // Obtenez la liste des fichiers et dossiers dans le dossier
    $files = glob($folderPath . '/*');
    var_dump($folderPath);
    var_dump($files);
    // Supprimez chaque fichier ou dossier
    foreach ($files as $file) {
        is_dir($file) ? deleteFolder($file) : unlink($file);
    }
}

function deleteFolder($folder)
{
    // Appelle la fonction pour supprimer le contenu du dossier
    deleteFolderContents($folder);

    // Supprime le dossier lui-même
    rmdir($folder);
}

// Chemin absolu vers le dossier à vider
$uploadDir = 'uploads';

// Appelle la fonction pour vider le contenu du dossier
deleteFolderContents($uploadDir);
