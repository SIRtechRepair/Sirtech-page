/* ===== Datos del negocio: edita aquí ===== */
const CONFIG = {
  whatsapp: '573124244589',
  telefono: '312 424 4589',
  direccion: 'Diagonal 1 #0-32, barrio Fundadores',
  ciudad: 'Arauca, Colombia',
  rating: '5,0',
  opiniones: 32,
  mapsLink: 'https://share.google/LV46rzTlUm6OCDbqz',
  resenaLink: '',
  mapaEmbed: 'https://maps.google.com/maps?q=SIRtech%2C%20Diagonal%201%20%230-32%2C%20Fundadores%2C%20Arauca&z=17&output=embed',
  horario: { 0: [], 1: [[9,19]], 2: [[9,19]], 3: [[9,19]], 4: [[9,19]], 5: [[9,19]], 6: [[9,14]] },
  horarioTexto: ['Lun a vie 9:00 a.m. – 7:00 p.m.', 'Sábados 9:00 a.m. – 2:00 p.m.'],
  redes: { instagram: '#', tiktok: '#', facebook: '#' }
};

/*
  SERVICIOS
  Cada servicio va así: ['Nombre', 'Cuándo se necesita']
  Para marcarlo como Avanzado agrega un 1 al final: ['Nombre', 'Cuándo se necesita', 1]
*/
const SERVICIOS = [
  { k:'mob', n:'Celulares', i:'ti-device-mobile', t:'Mismo día', d:'Especialistas en iPhone. Atendemos todas las marcas.', g:[
    { n:'Pantalla y vidrio', i:'ti-device-mobile', s:[
      ['Cambio de pantalla', 'Rota, con manchas, líneas o que no responde al tacto'],
      ['Cambio solo del vidrio (glass)', 'El vidrio está roto pero la imagen se ve bien. Más económico'],
      ['Pegado de pantalla y marco', 'La pantalla está levantada o despegada del marco'],
      ['Remanufactura de pantalla (re-glass)', 'Recuperamos tu pantalla original cambiando solo el vidrio', 1],
      ['Reprogramación de True Tone y serial', 'Para que el iPhone reconozca la pantalla nueva sin avisos', 1] ]},
    { n:'Batería y carga', i:'ti-battery-charging', s:[
      ['Cambio de batería', 'Se descarga rápido, se apaga sola o está inflada'],
      ['Reactivación de batería', 'No enciende porque la batería se descargó por completo'],
      ['Cambio de pin de carga', 'No carga o hay que mover el cable para que cargue'],
      ['Limpieza de puertos', 'El cable entra flojo o la carga se corta'],
      ['Calibración de batería iPhone (BMS)', 'Quita el aviso de batería no original y muestra la salud real', 1] ]},
    { n:'Cámara, audio y botones', i:'ti-camera', s:[
      ['Módulo de cámaras', 'Fotos borrosas, no enfoca o la cámara se ve negra'],
      ['Vidrio de la cámara', 'El vidrio que protege la cámara está roto'],
      ['Vidrio de cámara con láser', 'Para modelos donde el vidrio viene pegado de fábrica', 1],
      ['Audio: auricular, parlante y micrófono', 'No escuchas en llamadas, no te escuchan o suena bajo'],
      ['Botones', 'Encendido, volumen o silencio no responden'],
      ['Reparación de Face ID', 'El reconocimiento facial dejó de funcionar', 1] ]},
    { n:'Carcasa, agua y sistema', i:'ti-tool', s:[
      ['Tapa trasera o carcasa', 'Vidrio trasero roto o marco golpeado'],
      ['Limpieza por humedad (desulfatación)', 'Se mojó, se cayó al agua o tiene corrosión'],
      ['Restauración del sistema (flasheo)', 'Se queda en el logo, se reinicia solo o está muy lento'] ]}
  ]},
  { k:'pc', n:'Computadores', i:'ti-device-laptop', t:'1 a 3 días', d:'Portátiles y PC de escritorio.', g:[
    { n:'Rendimiento y temperatura', i:'ti-gauge', s:[
      ['Mantenimiento y limpieza térmica', 'Se calienta, hace ruido o se apaga solo'],
      ['Mantenimiento laptop gamer (PTM7950 / metal líquido)', 'Menos temperatura y más rendimiento en juegos y edición', 1],
      ['Cambio a disco SSD', 'Enciende y abre programas mucho más rápido'],
      ['Ampliación de memoria RAM', 'Trabaja con varios programas sin que se trabe'],
      ['Optimización y eliminación de virus', 'Lento, con publicidad o programas extraños'] ]},
    { n:'Sistema y programas', i:'ti-brand-windows', s:[
      ['Formateo e instalación de sistema', 'Empezar de cero o corregir errores de Windows'],
      ['Licencias de Windows y Office', 'Instalación y activación'],
      ['Programas especializados', 'Adobe, AutoCAD y software de trabajo'],
      ['Configuración de BIOS', 'No arranca o no reconoce el disco'],
      ['Reprogramación de BIOS (SPI)', 'Enciende pero no da imagen por BIOS dañada', 1] ]},
    { n:'Piezas y daños físicos', i:'ti-device-laptop', s:[
      ['Cambio de pantalla de portátil', 'Rota, con rayas o sin imagen'],
      ['Teclado', 'Teclas que no responden o se mojó'],
      ['Bisagras y carcasa', 'La tapa está floja, partida o no cierra bien'],
      ['Pin de carga (DC jack)', 'No carga o hay que acomodar el cargador'] ]},
    { n:'Armado de PC', i:'ti-device-desktop', s:[
      ['Armado de PC', 'Armamos tu computador con las piezas que elijas'],
      ['Armado personalizado y cableado ordenado', 'Estético, limpio y con mejor ventilación', 1] ]}
  ]},
  { k:'mic', n:'Micro-electrónica', i:'ti-cpu', t:'2 a 5 días', todoAvanzado:true, d:'Reparación a nivel de placa. Todos estos servicios son de nivel avanzado.', g:[
    { n:'Diagnóstico', i:'ti-zoom-scan', s:[
      ['Diagnóstico de placa', 'No enciende, hace corto o se calienta sin razón'],
      ['Diagnóstico térmico', 'Encontramos la falla en equipos que no dan señal de vida'] ]},
    { n:'Reparación de placa', i:'ti-cpu', s:[
      ['Circuito de carga (Tristar, PMIC)', 'No carga aunque ya le cambiaron el pin'],
      ['Chips de WiFi, señal o audio', 'Sin WiFi, sin señal o sin sonido'],
      ['Microsoldadura de conectores (FPC)', 'Conectores de pantalla o batería dañados'],
      ['Reballing de procesador o memoria', 'Se reinicia solo o se congela por fallas de placa'],
      ['Reconstrucción de pistas', 'Placa dañada por golpe, humedad o una mala reparación'] ]},
    { n:'Mejoras', i:'ti-database', s:[
      ['Ampliación de almacenamiento (NAND)', 'Más espacio en tu iPhone sin cambiar de equipo'] ]}
  ]},
  { k:'cns', n:'Consolas', i:'ti-device-gamepad-2', t:'1 a 3 días', d:'Consolas y controles.', g:[
    { n:'Consolas y mandos', i:'ti-device-gamepad-2', s:[
      ['Mantenimiento y limpieza', 'Hace ruido, se calienta o se apaga sola'],
      ['Cambio de puerto HDMI', 'No da imagen en el televisor'],
      ['Reparación de mandos', 'Botones o gatillos fallan, o el control no carga'],
      ['Corrección de drift (sticks Hall Effect)', 'El personaje o la cámara se mueven solos', 1],
      ['Modding y modchips', 'Modificaciones de consola'] ]}
  ]},
  { k:'b2b', n:'Empresas', i:'ti-building', t:'A convenir', d:'Soporte técnico para negocios y oficinas.', g:[
    { n:'Para tu negocio', i:'ti-building', s:[
      ['Póliza de mantenimiento', 'Visitas programadas para que tus equipos no fallen'],
      ['Cableado y WiFi mesh', 'Buen internet en toda la oficina o el local'],
      ['Cámaras de seguridad (CCTV)', 'Instalación y configuración con acceso desde el celular'],
      ['Redes y periféricos', 'Configuración de routers, impresoras y equipos'] ]}
  ]},
  { k:'gen', n:'Datos y más', i:'ti-database', t:'Variable', d:'Tu información a salvo y soporte para todo lo demás.', g:[
    { n:'Tu información', i:'ti-database', s:[
      ['Respaldo y clonación de datos', 'Copia de seguridad o pasar todo a un equipo nuevo'],
      ['Recuperación avanzada de datos', 'El disco no abre, pide formatear o aparece como RAW', 1] ]},
    { n:'Soporte y otros equipos', i:'ti-headset', s:[
      ['Diagnóstico general', 'No sabes qué tiene tu equipo y quieres saberlo'],
      ['Soporte técnico remoto', 'Te ayudamos por internet sin ir al taller'],
      ['Configuración de smartwatch', 'Enlazar y configurar relojes inteligentes'],
      ['Mantenimiento de impresoras', 'Error de almohadillas o reset de la caja de mantenimiento'] ]}
  ]},
  { k:'acc', n:'Accesorios', i:'ti-sparkles', t:'15 min', d:'Protección y cuidado para tu equipo.', g:[
    { n:'Protección y cuidado', i:'ti-shield-check', s:[
      ['Vidrio templado o hidrogel UV', 'Protege la pantalla contra golpes y rayones'],
      ['Limpieza ultrasónica y desinfección', 'Deja tu equipo limpio por dentro y por fuera'],
      ['Tratamiento oleofóbico', 'La pantalla vuelve a sentirse suave y se marca menos'] ]}
  ]}
];

/* Precios de ejemplo. Para usar foto: img:'img/productos/vidrio.jpg' */
const PRODUCTOS = [
  { n:'Vidrio templado 9H', c:'Protección', i:'ti-shield', p:15000, b:'Más vendido' },
  { n:'Hidrogel UV', c:'Protección', i:'ti-shield-check', p:25000 },
  { n:'Cargador 20W USB-C', c:'Carga', i:'ti-plug', p:45000 },
  { n:'Cable USB-C reforzado', c:'Carga', i:'ti-usb', p:18000 },
  { n:'Power bank 10.000 mAh', c:'Carga', i:'ti-battery-charging', p:75000, b:'Nuevo' },
  { n:'Audífonos inalámbricos', c:'Audio', i:'ti-headphones', p:89000 },
  { n:'Memoria microSD 128 GB', c:'Almacenamiento', i:'ti-device-sd-card', p:42000 },
  { n:'SSD 512 GB', c:'Almacenamiento', i:'ti-device-floppy', p:159000 }
];

/* Reseñas reales de Google. fecha = fecha aproximada en que la dejaron (año-mes-día) */
const RESENAS = [
  { nombre:'Miguel Hernandez', fecha:'2026-04-08', texto:'Me gustó mucho el servicio explica muy bien antes de empezar el trabajo, no cobra la asesoria y dice la verdad si vale la pena reparar sus equipos o es mejor invertir en otro además también si la gente desea observa todo el proceso de ensamblaje o reparación puede hacerlo en el mismo taller' },
  { nombre:'Nikolas Herrera', fecha:'2026-08-26', texto:'Los mejores me ayudaron en un problema el cual no me solucionaron otros técnicos y ellos se demoraron muy poco para…' },
  { nombre:'Stiven Florez', fecha:'2026-04-08', texto:'Las mejores reparaciones de Arauca y el servicio es excelente, también cuentan con un ambiente muy cálido en cuanto al lugar' },
  { nombre:'CH1CH4_M0R4D4', fecha:'2026-04-08', texto:'La mejor experiencia para el mantenimiento y reparación de equipos, sin duda uno de los mejores lugares en donde se puede confiar para un buen servicio' },
  { nombre:'Alejandro Pulido Saravia', fecha:'2026-04-08', texto:'Excelente servicio, atención de calidad y resultados muy buenos.' },
  { nombre:'samuel cetina', fecha:'2026-02-18', texto:'Buena calidad en los mantenimientos y buenos precios eh reparado muchos equipos ahí y no ah habido inconvenientes' },
  { nombre:'Alfredo Vargas', fecha:'2026-02-18', texto:'Son exentes en lo que hacen..... Buenas atención.... Sus reparaciones son impecable!' }
];
