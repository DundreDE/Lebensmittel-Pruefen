

document.addEventListener('DOMContentLoaded', () => {
    // Die Liste der Unverträglichkeiten bleibt am Anfang leer
});

async function checkProduct() {
    const barcode = document.getElementById('barcode').value;
    const intolerance = document.getElementById('intolerance').value;
    const resultDiv = document.getElementById('result');
    const ingredientsDiv = document.getElementById('ingredients');
    const productImage = document.getElementById('product-image');

    // Bild ausblenden, falls es angezeigt wird
    productImage.style.display = 'none';

    if (!barcode || !intolerance) {
        resultDiv.textContent = "Bitte alle Felder ausfüllen.";
        resultDiv.style.display = 'block';
        return;
    }

    try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json?lang=de`);
        const data = await response.json();

        if (!data.product) {
            resultDiv.textContent = "Produkt nicht gefunden.";
            resultDiv.style.display = 'block';
            return;
        }

<<<<<<< HEAD
        // Zutaten auf Deutsch oder Englisch
        let ingredients = data.product.ingredients_text_de || data.product.ingredients_text || 'Keine Zutaten gefunden';
=======
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
>>>>>>> fbedbde717f09f97f92a2a6c3198ab5edde0e5b9

        // Wenn keine deutschen oder englischen Zutaten gefunden werden, wird 'Keine Zutaten gefunden' angezeigt
        if (ingredients === 'Keine Zutaten gefunden') {
            resultDiv.textContent = `Für dieses Produkt sind keine Zutaten verfügbar.`;
        } else {
<<<<<<< HEAD
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
                resultDiv.textContent = `Das Produkt kann konsumiert werden. Inhalt: ${ingredients}`;
            } else {
                resultDiv.textContent = `Dieses Produkt darfst du nicht essen. Grund: ${reason}. Andere Zutaten: ${ingredients}`;
            }
        }
        resultDiv.style.display = 'block';

       

        // Laden des Verpackungsbilds
        const imageUrl = data.product.image_url;
        if (imageUrl) {
            productImage.src = imageUrl;
            productImage.style.display = 'block'; // Zeige das Bild an, wenn verfügbar
        } else {
            productImage.style.display = 'none'; // Verstecke das Bild, falls kein Bild verfügbar ist
        }

=======
            resultDiv.textContent = `Dieses Produkt darfst du nicht essen. Grund: ${reason}. Andere Zutaten: ${ingredients}`;
        }
        resultDiv.style.display = 'block';
>>>>>>> fbedbde717f09f97f92a2a6c3198ab5edde0e5b9
    } catch (error) {
        resultDiv.textContent = "Fehler beim Abrufen der Produktinformationen.";
        resultDiv.style.display = 'block';
    }
}

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

<<<<<<< HEAD
function startScanner() {
    const scannerDiv = document.getElementById('scanner');
    scannerDiv.style.display = 'block';

    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner'),
            constraints: {
                width: 400,
                height: 300,
                facingMode: "environment"
            },
        },
        decoder: {
            readers: ["ean_reader"]
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
        const code = result.codeResult.code;
        document.getElementById('barcode').value = code;
        scannerDiv.style.display = 'none';
        Quagga.stop();
    });
}
=======
    Quagga.onProcessed(function (result) {
        //const code = result.codeResult.code;
        //document.getElementById('barcode').value = code;
        //scannerDiv.style.display = 'none';
       // alert("Proc barcode: ")// + result.codeResult.code);
        //Quagga.stop();
    });

}
>>>>>>> fbedbde717f09f97f92a2a6c3198ab5edde0e5b9
