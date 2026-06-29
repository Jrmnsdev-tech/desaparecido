document.getElementById('report-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    btn.innerText = "Procesando...";

    try {
        const fileInput = document.getElementById('person-photo-file');
        if (!fileInput.files[0]) throw new Error("Selecciona una foto");

        // 1. Subir foto primero
        const fotoUrl = await window.AppAPI.subirFoto(fileInput.files[0]);
        
        // 2. Preparar objeto (ASEGÚRATE QUE ESTOS NOMBRES EXISTAN EN TU TABLA)
        const datos = {
            nombre: document.getElementById('person-name').value,
            telefono: document.getElementById('person-phone').value,
            pais: document.getElementById('person-pais').value,
            ciudad: document.getElementById('person-ciudad').value,
            ubicacion_detallada: document.getElementById('person-ubicacion').value,
            descripcion_fisica: document.getElementById('person-desc').value,
            foto: fotoUrl
        };

        // 3. Registrar en BD
        await window.AppAPI.registrarDesaparecido(datos);
        
        alert("¡Reporte publicado con éxito!");
        location.reload();

    } catch (err) {
        alert("FALLO TOTAL: " + err.message);
        console.error(err);
        btn.disabled = false;
        btn.innerText = "Publicar Reporte";
    }
});
