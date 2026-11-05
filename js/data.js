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
      ['Cambio de pantalla', 'Recupera la imagen y el tacto como el primer día'],
      ['Cambio de vidrio (glass / re-glass)', 'Conserva tu pantalla original y paga solo por el vidrio'],
      ['Pegado de pantalla y marco', 'Dejamos la pantalla firme, sin levantamientos ni filtraciones'],
      ['Reprogramación de True Tone y número de serie', 'Instalamos la pantalla sin avisos y con brillo automático', 1] ]},
    { n:'Batería y carga', i:'ti-battery-charging', s:[
      ['Cambio de batería', 'Vuelve a rendir todo el día y olvídate de los apagones'],
      ['Reactivación de batería', 'Despertamos la batería y tu equipo vuelve a encender'],
      ['Cambio de pin de carga', 'Carga estable sin mover el cable ni hacer malabares'],
      ['Limpieza de puertos', 'Eliminamos polvo y suciedad para una conexión firme'],
      ['Calibración de batería iPhone (BMS)', 'Muestra la salud real y quita el aviso de batería no original', 1] ]},
    { n:'Cámara, audio y botones', i:'ti-camera', s:[
      ['Cambio de módulo de cámaras', 'Fotos nítidas y enfoque preciso otra vez'],
      ['Cambio de vidrio de cámara', 'Protege el lente y evita fotos borrosas'],
      ['Reparación de audio (auricular, parlante y micrófono)', 'Escucha y habla claro en cada llamada'],
      ['Reparación de botones', 'Encendido, volumen y silencio responden al primer toque'],
      ['Reparación de Face ID', 'Recupera el desbloqueo facial y la seguridad de tu iPhone', 1] ]},
    { n:'Carcasa, agua y sistema', i:'ti-tool', s:[
      ['Cambio de tapa trasera o carcasa', 'Devuelve el aspecto original y protege los componentes'],
      ['Limpieza por humedad y desulfatación', 'Detenemos la corrosión antes de que dañe la placa'],
      ['Restauración del sistema (flasheo)', 'Arranca normal otra vez, sin reinicios ni pantallas trabadas'] ]}
  ]},
  { k:'pc', n:'Computadores', i:'ti-device-laptop', t:'1 a 3 días', d:'Portátiles y PC de escritorio.', g:[
    { n:'Software y programas', i:'ti-brand-windows', s:[
      ['Formateo e instalación de Windows', 'Deja tu equipo limpio, rápido y sin errores'],
      ['Windows y Office originales', 'Instalación y activación con licencia válida'],
      ['Instalación de software especializado', 'Adobe, AutoCAD y las herramientas de tu trabajo'],
      ['Optimización y eliminación de virus', 'Elimina publicidad y programas desconocidos'],
      ['Configuración de BIOS', 'Arranca bien y reconoce todos tus discos'] ]},
    { n:'Cambio de piezas', i:'ti-device-laptop', s:[
      ['Cambio de pantalla de portátil', 'Imagen limpia y sin rayas para seguir trabajando'],
      ['Cambio de teclado', 'Todas las teclas responden, incluso después de un derrame'],
      ['Cambio de bisagras y carcasa', 'La tapa vuelve a abrir y cerrar firme'],
      ['Cambio de pin de carga (DC jack)', 'Carga sin mover el cargador ni perder conexión'],
      ['Actualización a disco SSD', 'Enciende y abre programas en segundos'],
      ['Ampliación de memoria RAM', 'Trabaja con varios programas sin que se congele'] ]},
    { n:'Reparación y mantenimiento', i:'ti-tool', s:[
      ['Mantenimiento y limpieza térmica', 'Baja la temperatura, reduce el ruido y evita apagones'],
      ['Mantenimiento gamer (PTM7950 o metal líquido)', 'Más rendimiento en juegos y edición sin sobrecalentamiento', 1],
      ['Reparación de BIOS (SPI)', 'Devuelve la imagen a equipos que encienden pero no muestran nada', 1] ]},
    { n:'Ensamble y gestión de cables', i:'ti-device-desktop', s:[
      ['Armado de PC', 'Armamos tu computador con las piezas que elijas'],
      ['Armado premium con cableado ordenado', 'Cableado limpio, mejor ventilación y estética profesional', 1] ]}
  ]},
  { k:'mic', n:'Microelectrónica', i:'ti-cpu', t:'2 a 5 días', todoAvanzado:true, d:'Reparación a nivel de placa. Todos estos servicios son de nivel avanzado.', g:[
    { n:'Diagnóstico', i:'ti-zoom-scan', s:[
      ['Diagnóstico de placa y térmico', 'Encontramos la falla aunque el equipo no encienda'] ]},
    { n:'Reparación de placa', i:'ti-cpu', s:[
      ['Circuito de carga (Tristar, PMIC)', 'Carga de nuevo aunque ya le hayan cambiado el pin'],
      ['Reparación de chips de WiFi, señal o audio', 'Recupera WiFi, señal y sonido de fábrica'],
      ['Microsoldadura de conectores (FPC)', 'Reparamos conectores de pantalla o batería dañados'],
      ['Reballing de procesador o memoria', 'Elimina reinicios y congelamientos por falla de placa'],
      ['Reconstrucción de pistas', 'Salvamos placas dañadas por golpe, humedad o mala reparación'] ]}
  ]},
  { k:'cns', n:'Consolas', i:'ti-device-gamepad-2', t:'1 a 3 días', d:'Consolas y controles.', g:[
    { n:'Consolas', i:'ti-device-gamepad-2', s:[
      ['Mantenimiento de consolas', 'Limpieza, pasta térmica y revisión para evitar sobrecalentamiento'] ]},
    { n:'Controles', i:'ti-device-gamepad', s:[
      ['Mantenimiento de controles', 'Limpieza interna y ajuste de sticks y botones'],
      ['Reparación de controles', 'Botones, gatillos, drift y carga funcionando como nuevos'] ]}
  ]},
  { k:'b2b', n:'Empresas', i:'ti-building', t:'A convenir', d:'Soporte técnico para negocios y oficinas.', g:[
    { n:'Computadores', i:'ti-device-laptop', s:[
      ['Mantenimiento preventivo de computadores', 'Limpieza, revisión y ajustes para evitar fallas en escritorio y portátiles'],
      ['Mantenimiento general de computadores', 'Servicio correctivo y profundo para computadores de cualquier tipo y marca'] ]},
    { n:'Planes y paquetes', i:'ti-package', s:[
      ['Póliza de mantenimiento', 'Plan recurrente con visitas programadas para mantener tus equipos funcionando'],
      ['Mantenimiento completo de oficina', 'Computadores, celulares, cámaras, impresoras y aires acondicionados en un solo paquete'] ]},
    { n:'Redes y seguridad', i:'ti-wifi', s:[
      ['Redes y WiFi', 'Cableado, routers, WiFi mesh e impresoras conectadas'],
      ['Cámaras de seguridad (CCTV)', 'Instalación y acceso desde el celular, estés donde estés'] ]}
  ]},
  { k:'gen', n:'Datos y soporte', i:'ti-database', t:'Variable', d:'Datos, soporte y otros equipos.', g:[
    { n:'Datos', i:'ti-database', s:[
      ['Respaldo y clonación de datos', 'Guarda todo o migra a tu equipo nuevo sin perder nada'],
      ['Recuperación de datos', 'Rescatamos archivos de discos que no abren o piden formatear', 1] ]},
    { n:'Soporte y otros equipos', i:'ti-headset', s:[
      ['Soporte técnico remoto', 'Te ayudamos por internet sin salir de casa'],
      ['Configuración de smartwatch', 'Enlaza y configura tu reloj inteligente en minutos'],
      ['Mantenimiento de impresoras', 'Evitamos el error de mantenimiento y alargamos su vida útil'] ]}
  ]}
];

/* Catálogo basado en las ventas reales (hoja 2026).
   Los precios de protección son "desde": varían según el modelo.
   Las fotos están en img/productos/ (ver FUENTES.txt). */
const PRODUCTOS = [
  /* Cables */
  { n:'Cable Tipo C a Lightning', c:'Cables', i:'ti-usb', p:20000, img:'img/productos/cable-tc-lightning.jpg', b:'Más vendido' },
  { n:'Cable Tipo C a Tipo C (iPhone)', c:'Cables', i:'ti-usb', p:25000, img:'img/productos/cable-tc-tc-iphone.jpg' },
  { n:'Cable Tipo C a Tipo C (Android)', c:'Cables', i:'ti-usb', p:15000, img:'img/productos/cable-tc-tc-android.jpg' },
  { n:'Cable USB-A a Lightning', c:'Cables', i:'ti-usb', p:15000, img:'img/productos/cable-usb-lightning.jpg' },
  { n:'Cable USB-A a Tipo C', c:'Cables', i:'ti-usb', p:15000, img:'img/productos/cable-usb-tc.jpg' },
  { n:'Cable USB-A a Micro USB (V8)', c:'Cables', i:'ti-usb', p:12000, img:'img/productos/cable-v8.jpg' },

  /* Carga */
  { n:'Cabezote 25W iPhone', c:'Carga', i:'ti-plug', p:30000, img:'img/productos/cabezote-25w.jpg', b:'Más vendido' },
  { n:'Cargador completo 25W iPhone', c:'Carga', i:'ti-battery-charging', p:55000, img:'img/productos/cargador-25w.jpg', b:'Más vendido' },
  { n:'Cargador completo 20W iPhone', c:'Carga', i:'ti-battery-charging', p:42000, img:'img/productos/cargador-20w.jpg' },
  { n:'Cargador completo 67W Tipo C', c:'Carga', i:'ti-battery-charging', p:50000, img:'img/productos/cargador-67w.jpg' },
  { n:'Cargador completo 45W Tipo C', c:'Carga', i:'ti-battery-charging', p:55000, img:'img/productos/cargador-45w.jpg' },
  { n:'Cargador completo 20W Tipo C', c:'Carga', i:'ti-battery-charging', p:22000, img:'img/productos/cargador-20w-tc.jpg' },

  /* Protección (precios "desde", varían por modelo) */
  { n:'Vidrio templado', c:'Protección', i:'ti-shield', p:20000, desde:true, img:'img/productos/vidrio-templado.jpg', b:'Más vendido' },
  { n:'Vidrio blindado', c:'Protección', i:'ti-shield-check', p:30000, desde:true, img:'img/productos/vidrio-blindado.jpg' },
  { n:'Vidrio antiespía', c:'Protección', i:'ti-eye-off', p:40000, desde:true, img:'img/productos/vidrio-antiespia.jpg' },
  { n:'Protector de cámara', c:'Protección', i:'ti-camera', p:25000, desde:true, img:'img/productos/protector-camara.jpg' },
  { n:'Forro / case', c:'Protección', i:'ti-device-mobile', p:30000, desde:true, img:'img/productos/forro.jpg' },

  /* Audio */
  { n:'Audífonos réplica AirPods', c:'Audio', i:'ti-headphones', p:80000, img:'img/productos/audifonos-airpods.jpg' },
  { n:'Audífonos réplica Samsung', c:'Audio', i:'ti-headphones', p:55000, img:'img/productos/audifonos-samsung.jpg' },
  { n:'Audífonos réplica Xiaomi', c:'Audio', i:'ti-headphones', p:55000, img:'img/productos/audifonos-xiaomi.jpg' },
  { n:'Audífonos réplica Redmi', c:'Audio', i:'ti-headphones', p:50000, img:'img/productos/audifonos-redmi.jpg' },

  /* Almacenamiento */
  { n:'Memoria USB 16 GB', c:'Almacenamiento', i:'ti-usb', p:40000, img:'img/productos/memoria-usb.jpg' },
  { n:'Memoria microSD 64 GB', c:'Almacenamiento', i:'ti-device-sd-card', p:40000, img:'img/productos/microsd.jpg' },

  /* Periféricos */
  { n:'Mouse', c:'Periféricos', i:'ti-mouse', p:30000, img:'img/productos/mouse.jpg' },
  { n:'Teclado', c:'Periféricos', i:'ti-keyboard', p:50000, img:'img/productos/teclado.jpg' },
  { n:'Combo teclado y mouse', c:'Periféricos', i:'ti-keyboard', p:100000, img:'img/productos/combo.jpg' }
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
