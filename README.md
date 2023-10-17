
# Cheat Sheep : Phishing detection extension for Chromium-based browsers using Deep Learning

## Introduction

Cheat Sheep is a browser extension that detects phishing websites using deep learning. We made this extension for the Bell Geekfest Montreal 2023 hackathon. The extension is available for Chromium-based browsers such as Google Chrome, Microsoft Edge, Brave, Opera, etc.

## Demo

<video src="https://github.com/Cheat-Sheeps-Bell-Hackaton/extension-page/assets/90425800/3220928b-57c5-492c-8e6c-f86a284c5c82" controls preload></video>

## Authors

- [Christophe Simard](https://github.com/Binimow)
- [Maxime Gagnon](https://github.com/Thurinum)
- [Mégane Normand](https://github.com/RamenWhite)
- [Théodore L'Heureux](https://github.com/theodore-lheureux)

## Details

We are using a custom deep learning model that we trained on a dataset of phishing websites. The model analyses the contents of the current page and gives a prediction of the probability that the page is a phishing website. The model is trained on a dataset of phishing and legitimate data. The model has an accuracy of 98.5% on the test set. The model is trained using the [Keras](https://keras.io/) library with the [TensorFlow](https://www.tensorflow.org/) backend.

The model runs on a FastApi server, with a PocketBase database. The extension sends the current page's content to the server, which then sends back the prediction. The extension then displays the prediction to the user. The backend does not store any user data. We only store the list urls that we receive, but this is entirely anonymous, and no info on who sent the url is stored.

We also made a Grafana dashboard to monitor the number of requests and the number of phishing websites detected.
