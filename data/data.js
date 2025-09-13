// Sistema de contador y validación de API key
let counter = 0;

module.exports = {
    // Incrementar el contador de uso
    incrementCounter: function() {
        counter++;
        return counter;
    },
    
    // Obtener el contador actual
    getCounter: function() {
        return counter;
    },
    
    // Resetear el contador
    resetCounter: function() {
        counter = 0;
        return counter;
    },
    
    // Validar API key (básico)
    validateApiKey: function(apiKey) {
        // Aquí puedes implementar tu lógica de validación
        return apiKey && apiKey.length > 10;
    }
};