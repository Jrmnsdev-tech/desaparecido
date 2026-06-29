"use strict";

// Inicialización de Supabase
const supabaseClient = window.supabase.createClient(
    "TU_URL_SUPABASE", 
    "TU_KEY_SUPABASE"
);

window.AppAPI = {
    async subirFoto(file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const { error } = await supabaseClient.storage.from('fotos-desaparecidos').upload(fileName, file);
        if (error) throw error;
        
        const { data } = supabaseClient.storage.from('fotos-desaparecidos').getPublicUrl(fileName);
        return data.publicUrl;
    },

    async registrarDesaparecido(datos) {
        const { data, error } = await supabaseClient.from('personas').insert([datos]).select();
        if (error) throw error;
        return data[0];
    }
};

// Evento que avisa a main.js que la API ya existe
window.dispatchEvent(new Event('api-ready'));
