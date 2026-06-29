"use strict";

function iniciarLogica() {
    const form = document.getElementById('report-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!window.AppAPI) {
            alert("El sistema aún está cargando, intenta en un segundo.");
            return;
        }

        const btn = e.target.querySelector('button');
        btn.disabled = true;
        btn.innerText = "Publicando...";

        try {
            const file = document.getElementById('person-photo-file').files[0];
            const fotoUrl = await window.AppAPI.subirFoto(file);
            
            const datos = {
                nombre: document.getElementById('person-name').value.trim(),
                telefono: document.getElementById('person-phone').value.trim(),
                pais: document.getElementById('person-pais').value.trim(),
                ciudad: document.getElementById('person-ciudad').value.trim(),
                ubicacion_detallada: document.getElementById('person-ubicacion').value.trim(),
                descripcion_fisica: document.getElementById('person-desc').value.trim(),
                foto: fotoUrl
            };

            await window.AppAPI.registrarDesaparecido(datos);
            alert("¡Reporte publicado con éxito!");
            location.reload();
        } catch (err) {
            console.error(err);
            alert("Error al publicar: " + err.message);
            btn.disabled = false;
            btn.innerText = "Publicar Reporte";
        }
    });
}

// Espera a que api.js avise que está listo
window.addEventListener('api-ready', iniciarLogica);

// Por si acaso, ejecuta la lógica si el evento ya pasó
if (window.AppAPI) iniciarLogica();
