document.getElementById('generate-button').addEventListener('click', () => {
    const primeros = [
        "Ensalada de canónigos", "Alcachofas con jamón", "Verduras al horno", "Ensalada valenciana",
        "Espárragos con mayonesa", "Ensalada de pasta", "Ensalada César", "Potaje de garbanzos",
        "Crema de Verduras", "Ensalada de patata y langostinos", "Patatas con atún y mayonesa",
        "Salteado Espárragos con gambas"
    ];
    
    const segundos = [
        "Pescado", "Pollo al horno con limón", "Lomo adobado", "Lomo empanado", "Lomo con tomate",
        "Tortilla de patatas", "Hamburguesas", "Albóndigas", "Filetes rusos", "Pollo con salsa de almendras",
        "Pollo a la naranja", "Flamenquines", "Champiñones rellenos", "Sams de pollo"
    ];
    
    const platos_unicos = [
        "Arroz con tomate y huevo", "Arroz negro", "Arroz al horno", "Espaguetis al ajillo",
        "Espaguetis carbonara", "Tallarines asiáticos", "Cocido", "Lentejas", "Macarrones con chorizo"
    ];
    
    const dias_semana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const menu = [];
    const platos_usados = new Set();
    let arroz_o_pasta_previos = false;
    let pescado_incluido = false;
    
    for (const dia of dias_semana) {        
        if (Math.random() < 0.5 && !arroz_o_pasta_previos) {
            let plato_unico;
            do {
                plato_unico = platos_unicos[Math.floor(Math.random() * platos_unicos.length)];
            } while (platos_usados.has(plato_unico));
            
            menu.push(`${dia}\n${plato_unico}`);
            platos_usados.add(plato_unico);
            arroz_o_pasta_previos = /arroz|espaguetis/i.test(plato_unico);
        } else {
            let primer_plato, segundo_plato;
            do {
                primer_plato = primeros[Math.floor(Math.random() * primeros.length)];
            } while (platos_usados.has(primer_plato));
            
            do {
                segundo_plato = segundos[Math.floor(Math.random() * segundos.length)];
            } while (platos_usados.has(segundo_plato) || (segundo_plato === "Pescado" && pescado_incluido));
            
            menu.push(`${dia}\n${primer_plato}\n${segundo_plato}`);
            platos_usados.add(primer_plato);
            platos_usados.add(segundo_plato);
            arroz_o_pasta_previos = false;
            if (segundo_plato === "Pescado") pescado_incluido = true;
        }
    }
    
    document.getElementById('menu-box').value = menu.join('\n\n');
});
