import { createClient } from '@supabase/supabase-js';

// Usamos variables de entorno para seguridad. 
// En Netlify, estas se reemplazan automáticamente al desplegar.
const supabaseUrl = process.env.SUPABASE_URL; 
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

window.AppAPI = {
    subirFoto: async function(file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data, error } = await supabase.storage
            .from('fotos-desaparecidos') // Asegúrate que este sea tu bucket
            .upload(fileName, file);

        if (error) throw error;
        
        const { data: publicUrlData } = supabase.storage
            .from('fotos-desaparecidos')
            .getPublicUrl(fileName);
            
        return publicUrlData.publicUrl;
    },

    registrarDesaparecido: async function(datos) {
        const { data, error } = await supabase
            .from('desaparecidos') // Asegúrate que este sea tu nombre de tabla
            .insert([datos]);

        if (error) throw error;
        return data;
    }
};
