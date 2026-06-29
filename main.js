"use strict";

(function() {
    const DOM = {
        grid: document.getElementById('persons-grid'),
        reportForm: document.getElementById('report-form')
    };

    async function handleReporteSubmit(e) {
        e.preventDefault();
        const file = document.getElementById('person-photo-file').files[0];
        
        try {
            const fotoUrl = await window.AppAPI.subirFoto(file);
            const nuevosDatos = {
                nombre: document.getElementById('person-name').value.trim(),
                telefono: document.getElementById('person-phone').value.trim(),
                pais: document.getElementById('person-pais').value.trim(),
                ciudad: document.getElementById('person-ciudad').value.trim(),
                ubicacion_detallada: document.getElementById('person-ubicacion').value.trim(),
                descripcion_fisica: document.getElementById('person-desc').value.trim(),
                foto: fotoUrl
            };
            
            await window.AppAPI.registrarDesaparecido(nuevosDatos);
            alert("Caso reportado con éxito.");
            location.reload();
        } catch (err) {
            console.error(err);
            alert("Error: Asegúrate de tener permisos en Storage y RLS.");
        }
    }

    DOM.reportForm.addEventListener('submit', handleReporteSubmit);
})();