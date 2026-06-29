"use strict";

// Inicializamos Supabase globalmente
// IMPORTANTE: Asegúrate de reemplazar estos valores por los tuyos 
// o usar las variables de entorno de Netlify
const supabase = window.supabase.createClient(
    "TU_URL_SUPABASE_AQUI", 
    "TU_KEY_SUPABASE_AQUI"
);

window.AppAPI = {
    async subirFoto(file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const { error } = await supabase.storage.from('fotos-desaparecidos').upload(fileName, file);
        if (error) throw error;
        
        const { data } = supabase.storage.from('fotos-desaparecidos').getPublicUrl(fileName);
        return data.publicUrl;
    },

    async registrarDesaparecido(datos) {
        const { data, error } = await supabase.from('personas').insert([datos]).select();
        if (error) throw error;
        return data[0];
    },

    async cargarDesaparecidos() {
        const { data, error } = await supabase.from('personas').select('*').order('id', { ascending: false });
        if (error) throw error;
        return data;
    }
};
