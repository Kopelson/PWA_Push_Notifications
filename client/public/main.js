
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
        .then(reg => {
            console.log('Registered!', reg);
        }) .catch(err => {
            console.log('Registration failed: ', err);
        });
    });
}

//Installing the app

//1. Listen for the beforeinstallprompt event
let deferredPrompt;
const btnAdd = window.document.getElementById('btnAdd');
console.log(btnAdd);
window.addEventListener('beforeinstallprompt', (e) => {
    //Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    //Stash the event so it can be triggered later.
    deferredPrompt = e;
    //2. Notify the user that your app can be installed
    //Update the UI to notify the user so they can add to home screen
    btnAdd.style.display = 'block';
});


//3. Show the prompt by calling prompt()
btnAdd.addEventListener('click', (e) => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        }
        deferredPrompt = null;
    });
})

//Optional analytics 
//Confirming installations
window.addEventListener('appinstalled', (evt) => {
    app.logEvent('a2hs', 'installed');
});