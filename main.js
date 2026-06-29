"use strict";

(function() {
    const DOM = {
        grid: document.getElementById('persons-grid'),
        reportForm: document.getElementById('report-form'),
        fileInput: document.getElementById('person-photo-file'),
        nameInput: document.getElementById('person-name'),
        phoneInput: document.getElementById('person-phone'),
        paisInput: document.getElementById('person-pais'),
        ciudadInput: document.getElementById('person-ciudad'),
        ubicacionInput: document.getElementById('person-ubicacion'),
        descInput: document.getElementById('person-desc')
    };

    /**
     * Maneja el envío del formulario de reporte
     */
    async function handleReporteSubmit(e) {
        e.preventDefault();
        
        const file = DOM.fileInput.files[0];
        if (!file) {
            alert("Por favor, selecciona una fotografía.");
            return;
        }

        try {
            // Deshabilitar botón durante el proceso si es necesario
            const submitBtn = e.target.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerText = "Publicando...";

            const fotoUrl = await window.AppAPI.subirFoto(file);
            
            const nuevosDatos = {
                nombre: DOM.nameInput.value.trim(),
                telefono: DOM.phoneInput.value.trim(),
                pais: DOM.paisInput.value.trim(),
                ciudad: DOM.ciudadInput.value.trim(),
                ubicacion_detallada: DOM.ubicacionInput.value.trim(),
                descripcion_fisica: DOM.descInput.value.trim(),
                foto: fotoUrl
            };
            
            await window.AppAPI.registrarDesaparecido(nuevosDatos);
            
            alert("Caso reportado con éxito.");
            location.reload();
        } catch (err) {
            console.error("Error al registrar el reporte:", err);
            alert("Error al procesar el reporte. Por favor, verifica tu conexión o permisos.");
            
            // Re-habilitar botón en caso de error
            const submitBtn = e.target.querySelector('button[type="submit"]');
            submitBtn.disabled = false;
            submitBtn.innerText = "Publicar Reporte";
        }
    }

    // Inicialización de eventos
    if (DOM.reportForm) {
        DOM.reportForm.addEventListener('submit', handleReporteSubmit);
    }
})();
