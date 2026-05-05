// ─── Enums ────────────────────────────────────────────────────────────────────

export enum PlantType {
  Polinizadora = 'Polinizadora',
  Medicinal = 'Medicinal',
  Aromatica = 'Aromática',
  Comestible = 'Comestible',
  Ornamental = 'Ornamental',
}

export enum ZoneCategory {
  Polinizador = 'Jardín Polinizador',
  Medicinal = 'Jardín Medicinal',
  Aromatico = 'Jardín Aromático',
  Huerto = 'Huerto Urbano',
  Compostaje = 'Zona de Compostaje',
  CafeJardin = 'Café & Jardín',
}

export enum FaunaType {
  Ave = 'Ave',
  Polinizador = 'Polinizador',
  Reptil = 'Reptil',
  Insecto = 'Insecto',
}

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface Zone {
  id: string
  name: ZoneCategory
  description: string
  color: string
  colorDark: string
  plantIds: string[]
  // SVG path data — hand-drawn organic shapes on a 600x500 viewBox
  svgPathD: string
  labelX: number
  labelY: number
}

export interface Plant {
  id: string
  slug: string
  commonName: string
  scientificName: string
  types: PlantType[]
  description: string
  benefits: string[]
  zoneId: string
  imageUrl: string
  accentColor: string
}

export interface Session {
  id: string
  date: string
  title: string
  description: string
  participants: number
  imageUrl: string
  tags: string[]
}

export interface Fauna {
  id: string
  commonName: string
  scientificName: string
  type: FaunaType
  imageUrl: string
  note: string
}

export interface GardenStats {
  areaM2: number
  tempReduction: number
  totalParticipants: number
  sessionsCount: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const zones: Zone[] = [
  {
    id: 'polinizador',
    name: ZoneCategory.Polinizador,
    description:
      'Refugio para abejas, mariposas y colibríes. Plantas con flores ricas en néctar que sostienen los ciclos de polinización del jardín y del barrio.',
    color: '#E89E3C',
    colorDark: '#F5C45C',
    plantIds: ['lavanda', 'salvia-mexicana', 'cempasuchil'],
    // Organic irregular polygon — upper-left quadrant
    svgPathD:
      'M 60 60 C 90 40, 160 35, 190 55 C 220 75, 235 100, 225 135 C 215 170, 185 185, 155 180 C 125 175, 80 165, 60 140 C 40 115, 35 80, 60 60 Z',
    labelX: 145,
    labelY: 110,
  },
  {
    id: 'medicinal',
    name: ZoneCategory.Medicinal,
    description:
      'Farmacia viva. Plantas que forman parte del conocimiento etnobotánico del norte de México, recuperadas como parte del proyecto de memoria biocultural.',
    color: '#87A878',
    colorDark: '#C3D4B5',
    plantIds: ['manzanilla', 'aloe-vera', 'hierbabuena'],
    // Right-center area — rounded organic shape
    svgPathD:
      'M 320 80 C 360 55, 430 60, 460 90 C 490 120, 495 165, 475 195 C 455 225, 415 240, 375 230 C 335 220, 305 195, 300 160 C 295 125, 280 105, 320 80 Z',
    labelX: 390,
    labelY: 155,
  },
  {
    id: 'aromatico',
    name: ZoneCategory.Aromatico,
    description:
      'El jardín que se huele antes de verse. Hierbas aromáticas que mejoran la calidad del aire local y funcionan como repelentes naturales de plagas.',
    color: '#3A7A99',
    colorDark: '#6BA3C2',
    plantIds: ['romero', 'albahaca', 'lavanda'],
    // Lower-left organic blob
    svgPathD:
      'M 55 280 C 85 255, 150 250, 185 270 C 220 290, 230 330, 215 365 C 200 400, 160 415, 125 410 C 90 405, 55 385, 45 350 C 35 315, 30 305, 55 280 Z',
    labelX: 138,
    labelY: 335,
  },
  {
    id: 'huerto',
    name: ZoneCategory.Huerto,
    description:
      'Producción agroecológica comunitaria. El huerto demuestra que la soberanía alimentaria es posible incluso en espacios urbanos de 20 m².',
    color: '#2D5F3F',
    colorDark: '#87A878',
    plantIds: ['palo-dulce', 'hierbabuena', 'albahaca'],
    // Center-bottom organic shape
    svgPathD:
      'M 240 290 C 275 265, 340 260, 375 285 C 410 310, 420 355, 400 385 C 380 415, 340 425, 300 418 C 260 411, 225 390, 220 355 C 215 320, 210 315, 240 290 Z',
    labelX: 318,
    labelY: 345,
  },
  {
    id: 'compostaje',
    name: ZoneCategory.Compostaje,
    description:
      'El ciclo se cierra aquí. Residuos orgánicos transformados en abono que alimenta cada rincón del jardín, cerrando el ciclo de nutrientes a escala de barrio.',
    color: '#4A5A50',
    colorDark: '#A8B4AC',
    plantIds: [],
    // Small irregular shape — right-bottom
    svgPathD:
      'M 460 300 C 490 285, 535 285, 550 310 C 565 335, 560 375, 540 390 C 520 405, 490 405, 470 390 C 450 375, 440 345, 445 320 C 448 308, 450 308, 460 300 Z',
    labelX: 498,
    labelY: 348,
  },
  {
    id: 'cafe-jardin',
    name: ZoneCategory.CafeJardin,
    description:
      'El corazón social del proyecto. Espacio de encuentro donde ocurren las sesiones Café & Jardín: diálogos ciudadanos, talleres y la construcción de comunidad.',
    color: '#C8956C',
    colorDark: '#E8B07A',
    plantIds: ['mezquite', 'ahuehuete'],
    // Upper-right — slightly larger gathering space feel
    svgPathD:
      'M 370 50 C 410 30, 490 28, 530 55 C 570 82, 578 130, 560 165 C 542 200, 500 215, 455 208 C 410 201, 370 175, 358 140 C 346 105, 335 70, 370 50 Z',
    labelX: 465,
    labelY: 125,
  },
]

export const plants: Plant[] = [
  {
    id: 'lavanda',
    slug: 'lavanda',
    commonName: 'Lavanda',
    scientificName: 'Lavandula angustifolia',
    types: [PlantType.Aromatica, PlantType.Polinizadora, PlantType.Medicinal],
    description:
      'Arbusto mediterráneo perfumado que atrae polinizadores y calma el sistema nervioso. Florece en tonos violáceos entre primavera y verano.',
    benefits: [
      'Reduce el estrés y la ansiedad',
      'Repele mosquitos de forma natural',
      'Atrae abejas y mariposas',
      'Propiedades antifúngicas y antibacterianas',
    ],
    zoneId: 'polinizador',
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80',
    accentColor: '#9B7EC8',
  },
  {
    id: 'romero',
    slug: 'romero',
    commonName: 'Romero',
    scientificName: 'Salvia rosmarinus',
    types: [PlantType.Aromatica, PlantType.Medicinal, PlantType.Comestible],
    description:
      'Arbusto aromático perenne, resistente a la sequía. Esencial en la cocina y en la medicina tradicional del norte de México.',
    benefits: [
      'Mejora la memoria y la concentración',
      'Antioxidante potente',
      'Repele plagas del huerto',
      'Uso culinario amplio',
    ],
    zoneId: 'aromatico',
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80',
    accentColor: '#5B8A5E',
  },
  {
    id: 'salvia-mexicana',
    slug: 'salvia-mexicana',
    commonName: 'Salvia Mexicana',
    scientificName: 'Salvia mexicana',
    types: [PlantType.Polinizadora, PlantType.Ornamental],
    description:
      'Salvia endémica de México con flores azul-violáceo intenso. Imán para colibríes y abejas carpinteras. Crece bien en los climas semiáridos del norte.',
    benefits: [
      'Fuente de néctar para colibríes todo el año',
      'Tolera sequías prolongadas',
      'Crece en suelos pobres sin fertilizantes',
      'Contribuye a la biodiversidad local',
    ],
    zoneId: 'polinizador',
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?auto=format&fit=crop&w=800&q=80',
    accentColor: '#6B5EA8',
  },
  {
    id: 'ahuehuete',
    slug: 'ahuehuete',
    commonName: 'Ahuehuete',
    scientificName: 'Taxodium mucronatum',
    types: [PlantType.Ornamental],
    description:
      'Árbol nacional de México. El "árbol viejo del agua" puede vivir más de 2,000 años. Su presencia en el jardín simboliza la memoria larga de la naturaleza.',
    benefits: [
      'Captura CO₂ a gran escala',
      'Proporciona sombra y reduce el calor urbano',
      'Hogar para aves migratorias y residentes',
      'Símbolo de continuidad y resiliencia',
    ],
    zoneId: 'cafe-jardin',
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    accentColor: '#3D6B3A',
  },
  {
    id: 'mezquite',
    slug: 'mezquite',
    commonName: 'Mezquite',
    scientificName: 'Prosopis laevigata',
    types: [PlantType.Comestible, PlantType.Ornamental],
    description:
      'Árbol icónico del semidesierto norteño. Fija nitrógeno en el suelo y sus vainas son una fuente histórica de alimento para comunidades originarias.',
    benefits: [
      'Fija nitrógeno, mejora el suelo',
      'Vainas comestibles ricas en proteína',
      'Tolera sequías extremas',
      'Refugio y alimento para aves nativas',
    ],
    zoneId: 'cafe-jardin',
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    accentColor: '#8A6A30',
  },
  {
    id: 'cempasuchil',
    slug: 'cempasuchil',
    commonName: 'Cempasúchil',
    scientificName: 'Tagetes erecta',
    types: [PlantType.Polinizadora, PlantType.Medicinal, PlantType.Ornamental],
    description:
      'La flor de los muertos y de la vida. Color naranja intenso que ilumina el jardín y atrae polinizadores. Sus raíces repelen nematodos y mejoran el suelo.',
    benefits: [
      'Control biológico de plagas del suelo',
      'Néctar abundante para mariposas',
      'Propiedades antifúngicas',
      'Luteína: antioxidante natural',
    ],
    zoneId: 'polinizador',
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
    accentColor: '#E88A1C',
  },
  {
    id: 'albahaca',
    slug: 'albahaca',
    commonName: 'Albahaca',
    scientificName: 'Ocimum basilicum',
    types: [PlantType.Aromatica, PlantType.Comestible, PlantType.Medicinal],
    description:
      'Hierba aromática de origen tropical que prospera en el calor de Monterrey. Compañera inseparable del huerto: repele plagas y mejora el sabor de los tomates.',
    benefits: [
      'Compañera de cultivo del tomate',
      'Repele moscas y mosquitos',
      'Antiinflamatoria natural',
      'Fuente de vitaminas A, K y C',
    ],
    zoneId: 'huerto',
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?auto=format&fit=crop&w=800&q=80',
    accentColor: '#4A8A40',
  },
  {
    id: 'manzanilla',
    slug: 'manzanilla',
    commonName: 'Manzanilla',
    scientificName: 'Matricaria chamomilla',
    types: [PlantType.Medicinal, PlantType.Aromatica],
    description:
      'Una de las plantas medicinales más antiguas del mundo. Sus flores blancas y amarillas son el remedio más cotidiano en los hogares del norte de México.',
    benefits: [
      'Sedante suave para el sueño',
      'Antiinflamatoria gastrointestinal',
      'Mejora la salud de plantas vecinas',
      'Té calmante para el estrés',
    ],
    zoneId: 'medicinal',
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    accentColor: '#C8B840',
  },
  {
    id: 'hierbabuena',
    slug: 'hierbabuena',
    commonName: 'Hierbabuena',
    scientificName: 'Mentha spicata',
    types: [PlantType.Medicinal, PlantType.Aromatica, PlantType.Comestible],
    description:
      'Indetenible y generosa. La hierbabuena se expande, comparte y perfuma. Planta introducida que se ha naturalizado completamente en los jardines mexicanos.',
    benefits: [
      'Digestiva y carminativa',
      'Refresca y aromatiza bebidas',
      'Repele hormigas y pulgones',
      'Brotes tiernos comestibles en ensaladas',
    ],
    zoneId: 'huerto',
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=800&q=80',
    accentColor: '#3A9E60',
  },
  {
    id: 'aloe-vera',
    slug: 'aloe-vera',
    commonName: 'Sábila (Aloe Vera)',
    scientificName: 'Aloe barbadensis miller',
    types: [PlantType.Medicinal, PlantType.Ornamental],
    description:
      'La planta "primeros auxilios" por excelencia. Requiere casi nada y da mucho: gel para quemaduras, piel y digestión. Icónica en los jardines norteños.',
    benefits: [
      'Cicatrizante tópico para quemaduras',
      'Uso interno como digestivo',
      'Tolera sequía extrema',
      'Purifica el aire interior',
    ],
    zoneId: 'medicinal',
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=800&q=80',
    accentColor: '#5CAE6A',
  },
  {
    id: 'palo-dulce',
    slug: 'palo-dulce',
    commonName: 'Palo Dulce',
    scientificName: 'Eysenhardtia polystachya',
    types: [PlantType.Medicinal, PlantType.Ornamental],
    description:
      'Árbol endémico del norte de México, sagrado en la medicina tradicional. Su madera fluoresce en el agua. Elemento fundamental del paisaje sonorense y regiomontano.',
    benefits: [
      'Uso tradicional para problemas renales',
      'Madera con propiedades antiinflamatorias',
      'Fijador de nitrógeno en el suelo',
      'Especie endémica que conserva la biodiversidad local',
    ],
    zoneId: 'huerto',
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    accentColor: '#8B6B45',
  },
  {
    id: 'ocotillo',
    slug: 'ocotillo',
    commonName: 'Ocotillo',
    scientificName: 'Fouquieria splendens',
    types: [PlantType.Ornamental, PlantType.Polinizadora],
    description:
      'Escultura viva del desierto. Sus tallos espinosos coronados de flores rojas en la punta son una de las imágenes más icónicas del semidesierto norteño.',
    benefits: [
      'Flores ricas en néctar para colibríes',
      'Tolera calor extremo y sequía',
      'Barrera natural contra intrusión',
      'Especie adaptada al cambio climático futuro',
    ],
    zoneId: 'polinizador',
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=800&q=80',
    accentColor: '#D44B2A',
  },
]

export const sessions: Session[] = [
  {
    id: 'sesion-1',
    date: '2025-02-15',
    title: 'Suelo vivo: compostaje y microvida',
    description:
      'Primera sesión del año. Exploramos la ecología del suelo, construimos la primera cama de compostaje comunitaria y probamos el café preparado con agua de lluvia recolectada en el jardín.',
    participants: 28,
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80',
    tags: ['compostaje', 'suelo', 'microvida'],
  },
  {
    id: 'sesion-2',
    date: '2025-03-22',
    title: 'Plantas que curan: etnobotánica del norte',
    description:
      'Recorrido guiado por la zona medicinal con una especialista en plantas nativas. Identificamos 18 especies y documentamos sus usos en la medicina tradicional regiomontana.',
    participants: 41,
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    tags: ['medicinal', 'etnobotánica', 'tradición'],
  },
  {
    id: 'sesion-3',
    date: '2025-04-19',
    title: 'Agua en el desierto: captación y riego',
    description:
      'Taller práctico de diseño de sistemas de captación de agua de lluvia. Instalamos la primera cisterna de 1,000 litros que ahora irriga el huerto urbano.',
    participants: 38,
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=800&q=80',
    tags: ['agua', 'captación', 'riego'],
  },
  {
    id: 'sesion-4',
    date: '2025-05-17',
    title: 'Polinizadores urbanos: más allá de la abeja',
    description:
      'Exploración fotográfica y científica de los insectos polinizadores del jardín. Identificamos 14 especies, incluyendo tres nunca registradas en la zona metropolitana.',
    participants: 40,
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?auto=format&fit=crop&w=800&q=80',
    tags: ['polinizadores', 'biodiversidad', 'ciencia ciudadana'],
  },
]

export const fauna: Fauna[] = [
  {
    id: 'colibri-magnifico',
    commonName: 'Colibrí Magnífico',
    scientificName: 'Eugenes fulgens',
    type: FaunaType.Ave,
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=600&q=80',
    note: 'Visitante regular. Se alimenta de la salvia mexicana y el ocotillo.',
  },
  {
    id: 'mariposa-monarca',
    commonName: 'Mariposa Monarca',
    scientificName: 'Danaus plexippus',
    type: FaunaType.Polinizador,
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    note: 'Paso migratorio registrado en octubre. El jardín forma parte de su corredor.',
  },
  {
    id: 'abeja-carpintera',
    commonName: 'Abeja Carpintera',
    scientificName: 'Xylocopa mexicanorum',
    type: FaunaType.Polinizador,
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?auto=format&fit=crop&w=600&q=80',
    note: 'Colonizó el tronco de mezquite viejo. Especie nativa vulnerable.',
  },
  {
    id: 'cardenal-piranga',
    commonName: 'Piranga Escarlata',
    scientificName: 'Piranga olivacea',
    type: FaunaType.Ave,
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=600&q=80',
    note: 'Ave migratoria de paso. Avistada en el mezquite durante octubre-noviembre.',
  },
  {
    id: 'lagartija-espinosa',
    commonName: 'Lagartija Espinosa del Norte',
    scientificName: 'Sceloporus cowlesi',
    type: FaunaType.Reptil,
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=600&q=80',
    note: 'Residente permanente. Control natural de insectos. Ama el calor del compostaje.',
  },
  {
    id: 'colibrí-corona-violeta',
    commonName: 'Colibrí Corona Violeta',
    scientificName: 'Amazilia violiceps',
    type: FaunaType.Ave,
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?auto=format&fit=crop&w=600&q=80',
    note: 'El más frecuente. Defiende su territorio en el jardín polinizador.',
  },
  {
    id: 'escarabajo-dung',
    commonName: 'Escarabajo Pelotero',
    scientificName: 'Scarabaeus sacer',
    type: FaunaType.Insecto,
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=600&q=80',
    note: 'Ecosistema de compostaje. Fauna esencial para la mineralización del suelo.',
  },
  {
    id: 'gorríon-mexicano',
    commonName: 'Gorrión Mexicano',
    scientificName: 'Carpodacus mexicanus',
    type: FaunaType.Ave,
    // TODO: replace with SOSAC photo
    imageUrl:
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=600&q=80',
    note: 'Residente. Construyó nido en la zona de Café & Jardín. Especie urbana adaptada.',
  },
]

export const stats: GardenStats = {
  areaM2: 1100,
  tempReduction: 1.2,
  totalParticipants: 147,
  sessionsCount: 4,
}
