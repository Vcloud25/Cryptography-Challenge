function hashPassword(password) {
    // Use the SubtleCrypto API if available, otherwise fallback to a library like CryptoJS
    if (window.crypto && window.crypto.subtle) {
        return window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
            .then(hashBuffer => {
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
            });
    } else {
        
        const hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
        return Promise.resolve(hash);
    }
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const correctUsername = 'James Phillips';
    const correctPasswordHash = '7c04fa0bb696c86c5e57b877717471a7b739d1f80e5a89d04b41adb3f42ad6fd';
    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;


    hashPassword(enteredPassword)
        .then(enteredPasswordHash => {
            if (enteredUsername === correctUsername && enteredPasswordHash === correctPasswordHash) {
                window.location.href = 'node_modules/bcryptjs/bin/image/image.html';
            } else {
                document.getElementById('feedback').textContent = 'Incorrect username or password. Please try again.';
                document.getElementById('password').value = '';
               document.getElementById('username').value = '';
            }
        });
});
