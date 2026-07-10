import { router } from "./builder.js";

const retrieveTrack = (e) => {
    const track = e.currentTarget.dataset.track
    router(track)

}

const loginButton = document.getElementById('login-button');
loginButton.addEventListener("click", retrieveTrack )