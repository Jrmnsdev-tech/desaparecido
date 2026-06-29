"use strict";

// Usamos variables de entorno (ejemplo para Vite/Frontend moderno)
const SUPABASE_URL = "https://womcssyeohjuebyzgakh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvbWNzc3llb2hqdWVieXpnYWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1OTAwOTEsImV4cCI6MjA5ODE2NjA5MX0.9UKdbCpxsCUqec3lyU-L_LUPv6Q_HHQJ5O_v60ry-J0";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.AppAPI = {
    async subirFoto(file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`; // Mejor usar randomUUID
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