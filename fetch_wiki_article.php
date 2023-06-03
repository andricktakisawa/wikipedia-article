<?php
$lang = isset($_GET['lang']) ? $_GET['lang'] : 'es';
$url = "https://" . $lang . ".wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=extracts|pageimages|info&pithumbsize=500&inprop=url&exintro&explaintext";

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
$result = curl_exec($ch);
curl_close($ch);

echo $result;
