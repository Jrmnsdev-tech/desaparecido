"use strict";

// Definimos la inicialización de forma que espere las claves
let supabase;

window.initSupabase = (url, key) => {
    supabase = window.supabase.createClient(url, key);
};

window.AppAPI = {
    async subirFoto(file) {
        if (!supabase) throw new Error("Supabase no inicializado");
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const { error } = await supabase.storage.from('fotos-desaparecidos').upload(fileName, file);
        if (error) throw error;
        
        const { data } = supabase.storage.from('fotos-desaparecidos').getPublicUrl(fileName);
        return data.publicUrl;
    },

    async registrarDesaparecido(datos) {
        if (!supabase) throw new Error("Supabase no inicializado");
        const { data, error } = await supabase.from('personas').insert([datos]).select();
        if (error) throw error;
        return data[0];
    },

    async cargarDesaparecidos() {
        if (!supabase) throw new Error("Supabase no inicializado");
        const { data, error } = await supabase.from('personas').select('*').order('id', { ascending: false });
        if (error) throw error;
        return data;
    }
};
