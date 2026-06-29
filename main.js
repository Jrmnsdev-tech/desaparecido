document.addEventListener('DOMContentLoaded', async () => {
    let listaPersonas = [];
    const searchInput = document.getElementById('search-input');
    const reportForm = document.getElementById('report-form');

    // 1. Cargar personas al iniciar
    async function cargarYMostrar() {
        try {
            listaPersonas = await window.AppAPI.cargarDesaparecidos();
            console.log("Personas cargadas:", listaPersonas);
        } catch (e) {
            console.error("Error al cargar:", e);
        }
    }

    // 2. Lógica del buscador
    searchInput.addEventListener('input', (e) => {
        const texto = e.target.value.toLowerCase();
        const resultados = listaPersonas.filter(p => p.nombre.toLowerCase().includes(texto));
        console.log("Resultados de búsqueda:", resultados);
        // AQUÍ DEBES LLAMAR A TU FUNCIÓN QUE PINTA LAS TARJETAS EN EL HTML
    });

    // 3. Envío del formulario
    reportForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        btn.disabled = true;
        btn.innerText = "Publicando...";

        try {
            const file = document.getElementById('person-photo-file').files[0];
            const fotoUrl = await window.AppAPI.subirFoto(file);
            
            const datos = {
                nombre: document.getElementById('person-name').value,
                telefono: document.getElementById('person-phone').value,
                pais: document.getElementById('person-pais').value,
                ciudad: document.getElementById('person-ciudad').value,
                ubicacion_detallada: document.getElementById('person-ubicacion').value,
                descripcion_fisica: document.getElementById('person-desc').value,
                foto: fotoUrl
            };

            await window.AppAPI.registrarDesaparecido(datos);
            alert("Reporte publicado con éxito");
            location.reload();
        } catch (err) {
            alert("Error al publicar: " + err.message);
            btn.disabled = false;
            btn.innerText = "Publicar Reporte";
        }
    });

    cargarYMostrar();
});
