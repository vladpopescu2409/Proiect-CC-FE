#!/bin/bash

# Variabile simulate (hardcoded)
AUTH_ADDRESS="http://localhost:8080"
BACKEND_ADDRESS="http://localhost:8082"
FRONTEND_ADDRESS="http://localhost:4200"

# Creează fișierul env.js cu variabilele
cat <<EOT > ./src/assets/env.js
(function (window) {
    window.__env = window.__env || {};
    window.__env.authAddress = "$AUTH_ADDRESS";
    window.__env.backendAddress = "$BACKEND_ADDRESS";
    window.__env.frontendAddress = "$FRONTEND_ADDRESS";

})(this);
EOT

echo "Fișierul env.js a fost generat cu următorul conținut:"
cat ./src/assets/env.js
