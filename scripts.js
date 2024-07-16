document.addEventListener('DOMContentLoaded', () => {
    // Die Liste der Unverträglichkeiten bleibt am Anfang leer
});

async function checkProduct() {
    const barcode = document.getElementById('barcode').value;
    const intolerance = document.getElementById('intolerance').value;
    const resultDiv = document.getElementById('result');

    if (!barcode || !intolerance) {
        resultDiv.textContent = "Bitte alle Felder ausfüllen.";
        resultDiv.style.display = 'block';
        return;
    }

    try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
        const data = await response.json();

        if (!data.product) {
            resultDiv.textContent = "Produkt nicht gefunden.";
            resultDiv.style.display = 'block';
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
            resultDiv.textContent = `Das Produkt kann konsumiert werden. Inhalt: ${ingredients}`;
        } else {
            resultDiv.textContent = `Dieses Produkt darfst du nicht essen. Grund: ${reason}. Andere Zutaten: ${ingredients}`;
        }
        resultDiv.style.display = 'block';
    } catch (error) {
        resultDiv.textContent = "Fehler beim Abrufen der Produktinformationen.";
        resultDiv.style.display = 'block';
    }
}

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