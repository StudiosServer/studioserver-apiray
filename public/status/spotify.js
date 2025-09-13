// Función para obtener los datos desde el servidor y actualizar el span
async function checkSpotifyAPI() {
    try {
        const response = await fetch('/search/spotify?query=music&apikey=studioserver');
        const data = await response.json();
        
        const statusSpan = document.getElementById('search-spotify');
        if (data.status === 'error') {
            statusSpan.className = 'circle color-error';
        } else if (data.status === 'off') {
            statusSpan.className = 'circle color-off';
        } else if (data.status === 'on') {
            statusSpan.className = 'circle color-on';
        }
    } catch (error) {
        const statusSpan = document.getElementById('search-spotify');
        statusSpan.className = 'circle color-error';
    }
}
window.onload = () => {
    checkSpotifyAPI();
};