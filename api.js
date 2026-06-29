"use strict";

// Aquí Netlify inyectará las claves que definas en su panel de configuración
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Inicialización de la instancia de Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
