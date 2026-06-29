"use strict";

// Recuerda configurar esto en Netlify como variable de entorno o poner tus claves aquí
const SUPABASE_URL = "TU_URL_AQUI"; 
const SUPABASE_ANON_KEY = "TU_KEY_AQUI";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.AppAPI = {
    async subirFoto(file) {
        console.log("Iniciando subida de foto...");
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error } = await supabase.storage.from('fotos-desaparecidos').upload(fileName, file);
        if (error) {
            console.error("Error al subir foto:", error);
            throw error;
        }
        
        const { data } = supabase.storage.from('fotos-desaparecidos').getPublicUrl(fileName);
        console.log("Foto subida. URL:", data.publicUrl);
        return data.publicUrl;
    },

    async registrarDesaparecido(datos) {
        console.log("Intentando guardar en tabla personas:", datos);
        const { data, error } = await supabase.from('personas').insert([datos]).select();
        
        if (error) {
            console.error("Error al insertar en DB:", error);
            throw error;
        }
        console.log("Guardado con éxito en DB:", data);
        return data[0];
    }
};
