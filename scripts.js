document.addEventListener('DOMContentLoaded', () => {
    // Die Liste der Unverträglichkeiten bleibt am Anfang leer
});

async function checkProduct() {
    const barcode = document.getElementById('barcode').value;
    const intolerance = document.getElementById('intolerance').value;
    const resultDiv = document.getElementById('result');

    if (!barcode || !intolerance) {
        resultDiv.textContent = "Bitte alle Felder ausfüllen.";
        return;
    }

    try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
        const data = await response.json();

        if (!data.product) {
            resultDiv.textContent = "Produkt nicht gefunden.";
            return;
        }

        const ingredients = data.product.ingredients_text || 'Keine Zutaten gefunden';
        const allowed = !ingredients.toLowerCase().includes(intolerance.toLowerCase());

        if (allowed) {
            resultDiv.textContent = `Das Produkt kann konsumiert werden. Inhalt: ${ingredients}`;
        } else {
            resultDiv.textContent = `Das Produkt darf nicht konsumiert werden. Inhalt: ${ingredients}`;
        }
    } catch (error) {
        resultDiv.textContent = "Fehler beim Abrufen der Produktinformationen.";
    }
}



