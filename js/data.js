/* ===== Datos del negocio: edita aquí ===== */
const CONFIG = {
  whatsapp: '573124244589',          // 57 + número, sin espacios
  telefono: '312 424 4589',
  direccion: 'Diagonal 1 #0-32, barrio Fundadores',
  ciudad: 'Arauca, Colombia',
  rating: '5,0',
  opiniones: 32,
  mapsLink: 'https://share.google/LV46rzTlUm6OCDbqz',
  mapaEmbed: 'https://maps.google.com/maps?q=SIRtech%2C%20Diagonal%201%20%230-32%2C%20Fundadores%2C%20Arauca&z=17&output=embed',
  // Horario en formato 24 h. 0 = domingo, 1 = lunes ... 6 = sábado. Para jornada partida: [[8,12],[14,18]]
  horario: { 0: [], 1: [[9,19]], 2: [[9,19]], 3: [[9,19]], 4: [[9,19]], 5: [[9,19]], 6: [[9,14]] },
  horarioTexto: ['Lun a vie 9:00 a.m. – 7:00 p.m.', 'Sábados 9:00 a.m. – 2:00 p.m.'],
  redes: { instagram: '#', tiktok: '#', facebook: '#' }
};

/* Un * al inicio marca el servicio como PRO */
const SERVICIOS = [
  { k:'mob', n:'Celulares', i:'ti-device-mobile', t:'Mismo día', d:'Pantallas, baterías, cámaras, audio y más, para todas las marcas.', s:[
    'Cambio de pantalla / display','Pegado e instalación de pantalla y marco','Cambio de batería','Reactivación de batería','Cambio de pin de carga','Limpieza de puertos','Cambio de tapa trasera / carcasa','Botones y pulsadores','Cambio de visor de cámara','Módulo de cámaras','Audio: auricular, parlante y micrófono','Desulfatación / control de humedad','Cambio de cristal táctil (glass)','*Trasplante de BMS / calibración batería iPhone','*Reprogramación True Tone y serial de pantalla','*Cristal de lente de cámara con láser','*Remanufactura de pantalla / re-glass OCA','*Reparación de Face ID','Flasheo y restauración del sistema']},
  { k:'pc', n:'Computadores', i:'ti-device-laptop', t:'1 a 3 días', d:'Portátiles y PC de escritorio: hardware, software y ensamble.', s:[
    'Mantenimiento preventivo y limpieza térmica','Reparación de bisagras y carcasa','Formateo e instalación de sistema operativo','Instalación y activación de licencias (Windows, Office)','Optimización y eliminación de virus','Instalación de disco SSD','Ampliación de memoria RAM','Cambio o reparación de teclado','Cambio de pantalla de laptop','Software especializado (Adobe, CAD)','Reparación y configuración de BIOS','Ensamble y montaje de equipos','*Térmico laptop gamer (metal líquido / PTM7950)','Cambio de DC jack de carga','*Reprogramación física de BIOS SPI','*Ensamble personalizado y cable management']},
  { k:'mic', n:'Micro-electrónica', i:'ti-cpu', t:'2 a 5 días', d:'Reparación a nivel de placa, donde otros talleres se rinden.', s:[
    '*Diagnóstico de placa base (cortos y líneas)','*Microsoldadura y conectores FPC','*Circuito de carga (Tristar, PMIC, IC)','*Chips integrados (audio, WiFi, señal)','*Reballing de CPU / RAM','*Expansión de almacenamiento NAND','*Diagnóstico térmico y línea principal','*Reconstrucción de pistas y jumpers']},
  { k:'cns', n:'Consolas', i:'ti-device-gamepad-2', t:'1 a 3 días', d:'Consolas y mandos listos para volver a jugar.', s:[
    'Mantenimiento y limpieza de consolas','*Drift: sticks Hall Effect','Cambio de puerto HDMI','Reparación de mandos','Modding / instalación de modchips']},
  { k:'b2b', n:'Empresas', i:'ti-building', t:'A convenir', d:'Soporte técnico para negocios y oficinas.', s:[
    'Póliza de mantenimiento periódico','Cableado estructurado y WiFi mesh','Instalación de cámaras CCTV','Configuración de redes y periféricos']},
  { k:'gen', n:'Datos y más', i:'ti-database', t:'Variable', d:'Tu información a salvo y soporte para todo lo demás.', s:[
    'Diagnóstico y revisión técnica general','Respaldo, recuperación y clonación de datos','*Recuperación avanzada (partición RAW / disco caído)','Soporte técnico remoto','Configuración de wearables y smartwatch','Impresoras: reset de almohadillas']},
  { k:'acc', n:'Accesorios', i:'ti-sparkles', t:'15 min', d:'Protección y cuidado para que tu equipo dure más.', s:[
    'Vidrio templado / hidrogel UV','Limpieza ultrasónica y desinfección','Tratamiento oleofóbico de pantalla']}
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

/* Cambia estas por reseñas reales de Google */
const RESENAS = [
  { nombre:'Cliente de ejemplo', texto:'En otro taller me dijeron que la placa no tenía arreglo. Aquí lo revivieron.' },
  { nombre:'Cliente de ejemplo', texto:'Le pusieron PTM7950 a mi laptop gamer y bajó 15 grados.' },
  { nombre:'Cliente de ejemplo', texto:'Mi control tenía drift, ahora con sticks Hall Effect va perfecto.' }
];
