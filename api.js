export async function fetchQuitoWeather() {
    const lat = -0.217;
    const lon = -78.509;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Fallo en la respuesta del clima.");
        const data = await response.json();
        return data.current_weather;
    } catch (error) {
        console.error("Error cargando Open-Meteo:", error);
        return null;
    }
}

export async function fetchEuroRate() {
    const url = "https://open.er-api.com/v6/latest/USD";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Fallo al consultar tasas de cambio.");
        const data = await response.json();
        return data.rates.EUR || 0.92;
    } catch (error) {
        console.error("Error cargando ExchangeRate:", error);
        return 0.92; 
    }
}