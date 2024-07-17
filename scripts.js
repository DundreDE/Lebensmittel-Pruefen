document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('check-button');
    button.addEventListener('click', checkProduct);
});

async function checkProduct() {
    const barcode = document.getElementById('barcode').value;
    const intolerance = document.getElementById('intolerance').value;
    const resultText = document.getElementById('result-text');
    const resultDiv = document.getElementById('result');
    const productImage = document.getElementById('product-image');

        if (!barcode || !intolerance) {
            resultText.textContent = "Bitte alle Felder ausfüllen.";
            resultDiv.style.display = 'block';
            productImage.style.display = 'none'; // Bild verstecken
            return;
        }

        try {
            const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
            const data = await response.json();

            if (!data.product) {
                resultText.textContent = "Produkt nicht gefunden.";
                resultDiv.style.display = 'block';
                productImage.style.display = 'none'; // Bild verstecken
                return;
            }

            const ingredients = data.product.ingredients_text || 'Keine Zutaten gefunden';
            const ingredientsList = ingredients.toLowerCase().split(', '); // Zutatenliste in ein Array umwandeln
            const intoleranceLower = intolerance.toLowerCase();
            let allowed = true;
            let reason = '';

            for (const ingredient of ingredientsList) {
                if (ingredient.includes(intoleranceLower)) {
                    allowed = false;
                    reason = ingredient;
                    break;
                }
            }

            if (allowed) {
                resultText.textContent = `Das Produkt kann konsumiert werden. Inhalt: ${ingredients}`;
            } else {
                resultText.textContent = `Dieses Produkt darfst du nicht essen. Grund: ${reason}. Andere Zutaten: ${ingredients}`;
            }

            // Bild anzeigen, wenn vorhanden
            const imageUrl = data.product.image_url;
            if (imageUrl) {
                productImage.src = imageUrl;
                productImage.style.display = 'block'; // Bild anzeigen
            } else {
                productImage.style.display = 'none'; // Kein Bild vorhanden, verstecken
            }

            resultDiv.style.display = 'block';
        } catch (error) {
            resultText.textContent = "Fehler beim Abrufen der Produktinformationen.";
            resultDiv.style.display = 'block';
            productImage.style.display = 'none'; // Bild verstecken
        }
    }

    // Eventlistener für Formular hinzufügen
    const productForm = document.getElementById('product-form');
    productForm.addEventListener('submit', function(event) {
        event.preventDefault();
        checkProduct();
    });




function startScanner() {
    const scannerDiv = document.getElementById('scanner');
    scannerDiv.style.display = 'block';
    //const Quagga = require('quagga').default; 
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner'),
            constraints: {
                width: 400,
                height: 300,
                facingMode: "user"
            },
        },
        decoder: {
            readers: ['ean_reader', 'code_128_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader']
        },
    }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Quagga initialisiert");
        Quagga.start();
    });

    Quagga.onDetected(function (result) {
        alert("Detected barcode: " + result.codeResult.code);
        const code = result.codeResult.code;
        document.getElementById('barcode').value = code;
        scannerDiv.style.display = 'none';
        Quagga.stop();
    });

    Quagga.onProcessed(function (result) {
        //const code = result.codeResult.code;
        //document.getElementById('barcode').value = code;
        //scannerDiv.style.display = 'none';
       // alert("Proc barcode: ")// + result.codeResult.code);
        //Quagga.stop();
    });

}