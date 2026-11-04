-- ==============================================================================
-- CONSEJO GLOBAL AMBIENTAL (CGA) — ACTUALIZACIÓN DE PUBLICACIONES CIENTÍFICAS
-- ==============================================================================
-- Este script actualiza e inserta las 5 publicaciones oficiales con información
-- investigada directamente de sus fuentes (The Southwestern Naturalist, Capitel,
-- Therya ixmana / AMMAC), incluyendo datos científicos precisos, autores,
-- enlaces DOI, imágenes oficiales y resúmenes estructurados.
--
-- Puedes ejecutar este código en la pestaña SQL de phpMyAdmin en Hostinger.
-- ==============================================================================

SET NAMES utf8mb4;

-- ─────────────────────────────────────────────────────────────────────────────
-- OPCIÓN A: INSERT CON ACTUALIZACIÓN AUTOMÁTICA (ON DUPLICATE KEY UPDATE)
-- Si la publicación ya existe en la tabla, actualiza todos sus campos.
-- Si no existe, la crea limpia.
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO `cga_articles` (
  `id`, `alias_id`, `slug`, `title_es`, `title_en`,
  `excerpt_es`, `excerpt_en`,
  `content_es`, `content_en`,
  `category`, `author_name`, `author_role`, `author_img`,
  `hero_img`, `hero_png`, `read_time_minutes`, `tags`,
  `status`, `published_at`
) VALUES
(
  'feeding-habits-great-horned-owl-mexico',
  'feeding-habits-great-horned-owl-mexico',
  'https://doi.org/10.1894/0038-4909-69.4.9',
  'Feeding habits of the Great Horned Owl (Bubo virginianus) in a desert region in Mexico',
  'Feeding habits of the Great Horned Owl (Bubo virginianus) in a desert region in Mexico',
  'Investigación sobre la ecología trófica del búho cornudo (Bubo virginianus) en "El Gallo", Municipio de Vanegas, Sierra La Mojonera, San Luis Potosí. El análisis de 57 egagrópilas y restos óseos cuantifica el consumo de pequeños mamíferos (79.2%), artrópodos (15.5%), aves y reptiles, documentando su plasticidad como depredador generalista y registrando a la musaraña Notiosorex crawfordi.',
  'Scientific study on the trophic ecology of the Great Horned Owl (Bubo virginianus) in "El Gallo", Vanegas, Sierra La Mojonera, San Luis Potosí. Analysis of 57 pellets and osteological remains quantifies predation on small mammals (79.2%), arthropods (15.5%), birds, and reptiles, highlighting generalist predator resilience and noting the desert shrew Notiosorex crawfordi.',
  'La comprensión de las redes tróficas en ecosistemas áridos resulta indispensable para evaluar el equilibrio y la salud de las cadenas biológicas. Esta investigación evalúa la dieta del búho cornudo (Bubo virginianus) en la localidad de "El Gallo", Municipio de Vanegas, dentro del Área de Protección de Flora y Fauna Sierra La Mojonera en San Luis Potosí, México.\n\nA través de la recolección y análisis sistemático de 57 egagrópilas y restos esqueléticos en perchas y cavidades rocosas, el equipo de investigación determinó la estructura trófica y la biomasa aportada por cada taxón presa. Los pequeños mamíferos constituyeron la base nutricional predominante (79.2% de los restos), seguidos por artrópodos y coleópteros (15.5%), aves (3.5%) y reptiles (1.7%). Las especies presa más consumidas fueron roedores adaptados a la aridez, destacando la rata canguro (Dipodomys ordii, 11.3%), el ratón de abazones de Nelson (Chaetodipus nelsoni, 10.6%) y la rata algodonera (Sigmodon hispidus, 7.7%).\n\nAsimismo, el estudio arrojó el hallazgo notable de restos de la musaraña desértica (Notiosorex crawfordi), especie bajo categoría de protección, aportando un registro de distribución complementario para San Luis Potosí. Los índices de diversidad de Shannon-Wiener y Simpson confirman que Bubo virginianus opera como un depredador generalista con notable amplitud de nicho ecológico, regulando de manera crucial las poblaciones de herbívoros y granívoros en el Desierto Chihuahuense.',
  'Understanding trophic webs in arid ecosystems is essential to assessing community health and biological chain resilience. This study evaluates the diet of the Great Horned Owl (Bubo virginianus) in "El Gallo", Vanegas Municipality, within the Sierra La Mojonera Flora and Fauna Protection Area in San Luis Potosí, Mexico.\n\nThrough systematic collection and examination of 57 regurgitated pellets and osteological remains retrieved from perches and cliff crevices, the research team quantified dietary composition and biomass contribution. Small mammals formed the primary food source (79.2%), followed by arthropods and beetles (15.5%), birds (3.5%), and reptiles (1.7%). Dominant prey species included arid-adapted rodents such as Ord\'s kangaroo rat (Dipodomys ordii, 11.3%), Nelson\'s pocket mouse (Chaetodipus nelsoni, 10.6%), and the hispid cotton rat (Sigmodon hispidus, 7.7%).\n\nCrucially, the investigation detected remains of Crawford\'s desert shrew (Notiosorex crawfordi), a protected species under Mexican conservation standards, establishing a valuable distribution record for San Luis Potosí. Diversity indices confirm Bubo virginianus as a generalist apex predator with wide trophic breadth that plays a critical role in stabilizing desert ecological food webs.',
  'publicaciones',
  'B. Vargas-Miranda, J.C. López-Vidal, C. Elizalde-Arellano, L.D. García-González',
  'The Southwestern Naturalist · Vol. 69, No. 4, pp. 1-9 (DOI: 10.1894/0038-4909-69.4.9)',
  '',
  'https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?w=1200&q=80&fit=crop&auto=format',
  '/imagenes/Rama 2.png',
  10,
  'búho cornudo,depredadores,Sierra La Mojonera,egagrópilas,ecología trófica,mastozoología',
  'published',
  '2025-10-10 00:00:00'
),
(
  'la-biologia-del-arte-reflexiones-creacion-humana',
  'la-biologia-del-arte-reflexiones-creacion-humana',
  'https://capitel.humanitas.edu.mx/la-biologia-del-arte/',
  'La biología del arte: reflexiones sobre la creación humana',
  'The Biology of Art: Reflections on Human Creation',
  'Ensayo interdisciplinario publicado en Revista Capitel (Universidad Humanitas) que analiza la creación artística desde las bases neurobiológicas y evolutivas. Examina el encéfalo desde los primeros homínidos hasta Homo sapiens, la biomecánica de las manos y el debate entre el arte como adaptación biológica versus construcción cultural.',
  'Interdisciplinary essay published in Capitel Magazine (Humanitas University) examining artistic creation through neurobiological and evolutionary foundations. Explores brain encephalization from early hominids to Homo sapiens, hand biomechanics, and the debate between art as biological adaptation vs. cultural construct.',
  '¿Es el arte una construcción puramente cultural o una manifestación biológicamente condicionada por la evolución de nuestra especie? Este ensayo publicado en la revista cultural Capitel propone un recorrido riguroso por la prehistoria de la creación plástica, analizando los procesos adaptativos que permitieron la emergencia del sentido estético en el linaje humano.\n\nEl autor examina el desarrollo neurobiológico y la progresiva encefalización desde los homínidos primitivos (Australopithecus) hasta el Homo neanderthalensis y Homo sapiens, junto a la extraordinaria biomecánica de la mano, la pinza digital y el pulgar oponible como catalizadores indispensables para materializar ideas abstractas en formas sensibles. A través de este marco, se profundiza en la célebre controversia antropológica: ¿constituye la capacidad creadora un subproducto colateral de la socialización o una auténtica ventaja adaptativa seleccionada para reforzar la cohesión comunitaria, la transmisión de saberes y la selección sexual?\n\nAsimismo, el artículo explora las manifestaciones visuales presentes en otros grupos del reino animal —como las construcciones de las aves de emparrado o la interacción con pigmentos en primates—, argumentando que la pulsión estética forma un continuo biológico que vincula íntimamente al ser humano con las leyes de la naturaleza y el resguardo de la biosfera.',
  'Is art exclusively a cultural invention or an inherent biological manifestation sculpted by human evolution? Published in Capitel Magazine, this essay undertakes a thorough exploration into the prehistory of plastic creation, analyzing the adaptive evolutionary processes that fostered aesthetic consciousness.\n\nThe author tracks neural development and encephalization from early hominids (Australopithecus) to Homo neanderthalensis and Homo sapiens, paired with the sophisticated biomechanics of the hand, digital pinch, and opposable thumb as indispensable instruments to materialize symbolic thought into physical forms. The text delves into the classic evolutionary debate: does artistic behavior represent a cultural byproduct, or an adaptive evolutionary trait selected to strengthen community cohesion, knowledge transmission, and mate choice?\n\nFurthermore, the piece examines proto-aesthetic behaviors observed across non-human species—such as bowerbird structures and primate visual play—asserting that the creative urge is a biological continuum linking human culture directly to the living natural world.',
  'publicaciones',
  'Luis Deyvi García (Ilustraciones: Todd McKie)',
  'Revista Capitel · Universidad Humanitas (Columna Dórica)',
  '',
  'https://capitel-media-test.s3.us-east-1.amazonaws.com/wp-content/uploads/2025/03/The-Tatse-of-Tomorrow.jpg',
  '/imagenes/Rama 1.png',
  8,
  'evolución,neurobiología,arte,antropología,cultura,divulgación científica',
  'published',
  '2025-03-01 00:00:00'
),
(
  'viajero-frecuente-murcielago-magueyero-mayor',
  'viajero-frecuente-murcielago-magueyero-mayor',
  'https://theryaixmana.mastozoologiamexicana.com/index.php/theryaixmana/article/view/478',
  'Viajero frecuente',
  'Frequent Flyer: Ecology and Migration of the Greater Long-nosed Bat',
  'Artículo de divulgación en Therya ixmana (AMMAC) sobre el periplo migratorio del murciélago magueyero mayor (Leptonycteris nivalis). Analiza sus desplazamientos siguiendo floraciones de agaves y cactáceas desde el centro de México hasta el sur de EE. UU., su rol polinizador esencial y la protección de cuevas de maternidad.',
  'Science paper in Therya ixmana (AMMAC) exploring the seasonal migration of the greater long-nosed bat (Leptonycteris nivalis). Examines its flights following flowering corridors of agaves and cacti from central Mexico to the southern US, its keystone pollinator role, and maternity roost conservation.',
  '“Viajar es marcharse de casa, es volar conociendo otras ramas, recorriendo caminos, es intentar cambiar”... Con esta evocación poética, el artículo publicado en Therya ixmana (revista de divulgación de la Asociación Mexicana de Mastozoología A.C.) sumerge al lector en el periplo anual del murciélago magueyero mayor (Leptonycteris nivalis), uno de los mamíferos voladores más fascinantes de Norteamérica.\n\nCada año, esta especie migra miles de kilómetros en busca de refugio y alimento para asegurar el nacimiento y desarrollo de sus crías. Guiados por la fenología vegetal, estos murciélagos trazan auténticos "corredores del néctar", sincronizando su trayecto con la floración escalonada de diversas especies de agaves (magueyes) y cactáceas columnares a lo largo de las serranías y planicies semiáridas de México hasta adentrarse en el suroeste de los Estados Unidos.\n\nEl estudio subraya su condición de especie clave e insustituible: al alimentarse de néctar y polen, aseguran la polinización cruzada y la variabilidad genética de los magueyes silvestres y domesticados que sustentan la industria del mezcal y el tequila. La publicación hace un llamado enfático a salvaguardar las cuevas de maternidad y las poblaciones naturales de agave, advirtiendo sobre las amenazas que representan la deforestación y la fragmentación territorial para este viajero incansable.',
  '"To travel is to leave home, to fly exploring other branches, traversing paths, seeking change"... Through this evocative passage, this article published in Therya ixmana (Asociación Mexicana de Mastozoología A.C.) introduces the extraordinary annual journey of the greater long-nosed bat (Leptonycteris nivalis), one of North America\'s most vital flying mammals.\n\nEach season, these bats navigate thousands of kilometers seeking optimal roosting and foraging environments to rear their pups. Synchronizing their flights with the staggered blooming of wild agaves and columnar cacti, they form essential "nectar corridors" linking arid valleys and mountain ranges from central Mexico into the southwestern United States.\n\nThe authors highlight the species as an ecological keystone: by consuming nectar and pollen, they drive cross-pollination and genetic diversity for agaves foundational to fragile desert ecosystems as well as traditional agave industries. The piece underscores the urgent necessity to protect maternity caves and restore native agave habitats against landscape degradation and climate pressures.',
  'publicaciones',
  'Luis Deyvi García-González & Bárbara Vargas-Miranda',
  'Therya ixmana · AMMAC (Vol. 3, Núm. 3, pp. 104-105)',
  '',
  'https://theryaixmana.mastozoologiamexicana.com/public/journals/4/cover_issue_26_es_ES.jpg',
  '/imagenes/Liana.png',
  6,
  'murciélagos,migración,polinización,agaves,mastozoología,conservación',
  'published',
  '2024-05-01 00:00:00'
),
(
  'espera-un-tlacuache-muerto-en-xochimilco',
  'espera-un-tlacuache-muerto-en-xochimilco',
  'https://theryaixmana.mastozoologiamexicana.com/index.php/theryaixmana/article/view/392',
  '¡Espera!… ¿un tlacuache “muerto” en Xochimilco?',
  'Wait!… A "Dead" Opossum in Xochimilco?',
  'Artículo en Therya ixmana (AMMAC) sobre el tlacuache norteño (Didelphis virginiana) en humedales y chinampas de Xochimilco y San Gregorio Atlapulco. Explica la tanatosis —reflejo involuntario de simular la muerte ante amenazas—, desmitifica prejuicios y destaca su rol crucial en el control biológico de insectos.',
  'Article in Therya ixmana (AMMAC) examining the Virginia opossum (Didelphis virginiana) in Xochimilco and San Gregorio Atlapulco wetland chinampas. Explains thanatosis—an involuntary death-feigning reflex when threatened—, dispels urban myths, and highlights its role in natural pest control.',
  'En medio del vertiginoso crecimiento urbano de la Ciudad de México, los canales y chinampas de Xochimilco y San Gregorio Atlapulco resguardan una biodiversidad milenaria. Entre sus habitantes más emblemáticos y resilientes figura el tlacuache norteño (Didelphis virginiana), el único marsupial endémico de Norteamérica y pariente biológico de los canguros australianos.\n\nEl artículo publicado en Therya ixmana aborda uno de los comportamientos defensivos más intrigantes del reino animal: la tanatosis. Cuando un tlacuache se ve acorralado o percibe una amenaza ineludible, experimenta un estado catatónico reflejo e involuntario; sus ojos se tornan vítreos, el ritmo cardíaco desciende dramáticamente, el cuerpo adopta rigidez cadavérica e incluso secreta sustancias fétidas a través de glándulas especializadas, engañando por completo a sus depredadores.\n\nLos autores advierten a la ciudadanía que, con frecuencia, los ejemplares encontrados inmóviles no han fallecido, sino que se encuentran en este trance de supervivencia. El texto hace un urgente llamado a la empatía y coexistencia con la fauna periurbana, desmitificando estigmas nocivos y recordando que los tlacuaches son aliados imprescindibles de los productores agrícolas al consumir caracoles, roedores menores e insectos perjudiciales para los cultivos chinamperos.',
  'Amid the urban sprawl of Mexico City, the ancient canals and agricultural chinampas of Xochimilco and San Gregorio Atlapulco safeguard vital biodiversity. Among their most resilient wildlife is the Virginia opossum (Didelphis virginiana), North America\'s unique native marsupial cousin to Australian kangaroos.\n\nPublished in Therya ixmana, this article investigates thanatosis—one of the most fascinating defense mechanisms in nature. When confronted with imminent danger, the opossum enters an involuntary physiological catatonic trance: its heart rate plummets, muscles stiffen to mimic rigor mortis, eyes glaze over, and anal glands emit foul deterrent secretions, successfully convincing predators that the animal is long dead.\n\nThe authors emphasize to urban and rural residents that seemingly motionless opossums are often merely waiting out danger in this survival state. The paper advocates for harmonious coexistence with peri-urban fauna, debunking persistent misconceptions and highlighting opossums as invaluable allies for traditional farmers by regulating insect pests, snails, and crop pathogens.',
  'publicaciones',
  'Luis Deyvi García-González, Angélica Antonio Trinidad, Víctor Manuel Macedonio Sánchez',
  'Therya ixmana · AMMAC (Vol. 2, Núm. 3, pp. 105-107)',
  '',
  'https://theryaixmana.mastozoologiamexicana.com/public/journals/4/cover_issue_20_es_ES.jpg',
  '/imagenes/Rama 2.png',
  7,
  'tlacuache,Xochimilco,tanatosis,humedales,fauna urbana,mastozoología',
  'published',
  '2023-08-01 00:00:00'
),
(
  'terrestrial-vertebrates-sierra-la-mojonera-mexico',
  'terrestrial-vertebrates-sierra-la-mojonera-mexico',
  'https://doi.org/10.1894/0038-4909-65.3-4.237',
  'Terrestrial vertebrates in the area of influence of the Sierra La Mojonera in San Luis Potosí and Zacatecas, Mexico',
  'Terrestrial vertebrates in the area of influence of the Sierra La Mojonera in San Luis Potosí and Zacatecas, Mexico',
  'Inventario científico y evaluación ecológica de vertebrados terrestres en 30 localidades (850 km²) de la Sierra La Mojonera entre San Luis Potosí y Zacatecas. Registró 51 especies (25 mamíferos, 14 aves, 9 reptiles, 3 anfibios) con 29 nuevos registros regionales y taxones prioritarios como Cynomys mexicanus, Crotalus molossus y Leptonycteris nivalis.',
  'Scientific inventory and ecological evaluation of terrestrial vertebrates across 30 locations (850 km²) in the Sierra La Mojonera influence zone (San Luis Potosí and Zacatecas). Documented 51 species (25 mammals, 14 birds, 9 reptiles, 3 amphibians) including 29 new regional records and key conservation species like Cynomys mexicanus and Leptonycteris nivalis.',
  'La Sierra La Mojonera y su área de influencia, ubicada en los límites estatales de San Luis Potosí (Municipio de Vanegas) y Zacatecas (Municipio de Concepción del Oro), constituye una región estratégica de alta biodiversidad semiárida en el Desierto Chihuahuense. Pese a su estatus como Área de Protección de Flora y Fauna, el conocimiento sistemático sobre sus comunidades de vertebrados terrestres era históricamente limitado.\n\nEste estudio exhaustivo abarcó 30 localidades de muestreo distribuidas en un polígono de 850 km². Mediante transectos de avistamiento diurno y nocturno, trampeo no letal, fototrampeo y registro de rastros (huellas, excretas, mudas), los investigadores documentaron un total de 51 especies de vertebrados terrestres: 25 mamíferos, 14 aves, 9 reptiles y 3 anfibios. Significativamente, el trabajo aportó 29 especies nunca antes registradas para la región, incluyendo anfibios como el sapo verde (Anaxyrus debilis) y el sapo de puntos rojos (Anaxyrus punctatus), reptiles como la serpiente nocturna (Hypsiglena jani), aves como el caracara quebrantahuesos (Caracara cheriway), y mamíferos como el murciélago de Yuma (Myotis yumanensis).\n\nEl estudio destaca que la zona funciona como un corredor ecológico y zona de confluencia y transición para al menos 7 especies cuyas subespecies convergen en este territorio. Asimismo, confirma la presencia de especies en riesgo prioritario conforme a la NOM-059-SEMARNAT y listas rojas de la UICN, tales como el perrito llanero mexicano (Cynomys mexicanus), la víbora de cascabel cola negra (Crotalus molossus) y el murciélago magueyero (Leptonycteris nivalis), aportando una línea base indispensable para la actualización de planes de manejo y políticas de conservación comunitaria.',
  'The Sierra La Mojonera and its zone of influence across San Luis Potosí (Vanegas) and Zacatecas (Concepción del Oro) represent a strategic enclave of semi-arid biodiversity within the Chihuahuan Desert. Despite its designation as a federal Flora and Fauna Protection Area, baseline data regarding vertebrate wildlife communities had remained remarkably sparse.\n\nThis extensive survey sampled 30 field locations covering an 850 km² landscape. Employing diurnal and nocturnal transects, live trapping, camera trapping, and indirect trace collection (tracks, scat, shed skins), researchers compiled a total of 51 terrestrial vertebrate species: 25 mammals, 14 birds, 9 reptiles, and 3 amphibians. Remarkably, the investigation generated 29 first-time records for the region, including the green toad (Anaxyrus debilis), red-spotted toad (Anaxyrus punctatus), Chihuahuan night snake (Hypsiglena jani), crested caracara (Caracara cheriway), and Yuma myotis bat (Myotis yumanensis).\n\nBiogeographically, the area was found to act as a crucial transition zone where distribution limits for at least 7 recognized vertebrate subspecies converge. Furthermore, the paper documents the critical persistence of federally protected and endangered taxa under NOM-059-SEMARNAT and IUCN criteria, including the Mexican prairie dog (Cynomys mexicanus), black-tailed rattlesnake (Crotalus molossus), and greater long-nosed bat (Leptonycteris nivalis), supplying empirical foundations for protected area governance.',
  'publicaciones',
  'C. Elizalde-Arellano, B. Vargas-Miranda, J.C. López-Vidal, C.Y. Salas Rodríguez, L.D. García González',
  'The Southwestern Naturalist · Vol. 65, Nos. 3-4, pp. 237-248 (DOI: 10.1894/0038-4909-65.3-4.237)',
  '',
  'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&q=80&fit=crop&auto=format',
  '/imagenes/Rama 1.png',
  12,
  'biodiversidad,vertebrados,Sierra La Mojonera,Desierto Chihuahuense,inventario biológico,conservación',
  'published',
  '2022-02-02 00:00:00'
)
ON DUPLICATE KEY UPDATE
  `alias_id`          = VALUES(`alias_id`),
  `slug`              = VALUES(`slug`),
  `title_es`          = VALUES(`title_es`),
  `title_en`          = VALUES(`title_en`),
  `excerpt_es`        = VALUES(`excerpt_es`),
  `excerpt_en`        = VALUES(`excerpt_en`),
  `content_es`        = VALUES(`content_es`),
  `content_en`        = VALUES(`content_en`),
  `category`          = VALUES(`category`),
  `author_name`       = VALUES(`author_name`),
  `author_role`       = VALUES(`author_role`),
  `author_img`        = VALUES(`author_img`),
  `hero_img`          = VALUES(`hero_img`),
  `hero_png`          = VALUES(`hero_png`),
  `read_time_minutes` = VALUES(`read_time_minutes`),
  `tags`              = VALUES(`tags`),
  `status`            = VALUES(`status`),
  `published_at`      = VALUES(`published_at`);

-- ─────────────────────────────────────────────────────────────────────────────
-- OPCIÓN B: SENTENCIAS DIRECTAS "UPDATE" INDIVIDUALES
-- Si ya ejecutaste un insert previo y prefieres correr únicamente UPDATEs:
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Búho cornudo (Bubo virginianus)
UPDATE `cga_articles` SET
  `slug` = 'https://doi.org/10.1894/0038-4909-69.4.9',
  `title_es` = 'Feeding habits of the Great Horned Owl (Bubo virginianus) in a desert region in Mexico',
  `title_en` = 'Feeding habits of the Great Horned Owl (Bubo virginianus) in a desert region in Mexico',
  `excerpt_es` = 'Investigación sobre la ecología trófica del búho cornudo (Bubo virginianus) en \"El Gallo\", Municipio de Vanegas, Sierra La Mojonera, San Luis Potosí. El análisis de 57 egagrópilas y restos óseos cuantifica el consumo de pequeños mamíferos (79.2%), artrópodos (15.5%), aves y reptiles, documentando su plasticidad como depredador generalista y registrando a la musaraña Notiosorex crawfordi.',
  `excerpt_en` = 'Scientific study on the trophic ecology of the Great Horned Owl (Bubo virginianus) in \"El Gallo\", Vanegas, Sierra La Mojonera, San Luis Potosí. Analysis of 57 pellets and osteological remains quantifies predation on small mammals (79.2%), arthropods (15.5%), birds, and reptiles, highlighting generalist predator resilience and noting the desert shrew Notiosorex crawfordi.',
  `author_name` = 'B. Vargas-Miranda, J.C. López-Vidal, C. Elizalde-Arellano, L.D. García-González',
  `author_role` = 'The Southwestern Naturalist · Vol. 69, No. 4, pp. 1-9 (DOI: 10.1894/0038-4909-69.4.9)',
  `hero_img` = 'https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?w=1200&q=80&fit=crop&auto=format',
  `hero_png` = '/imagenes/Rama 2.png',
  `tags` = 'búho cornudo,depredadores,Sierra La Mojonera,egagrópilas,ecología trófica,mastozoología',
  `published_at` = '2025-10-10 00:00:00'
WHERE `id` = 'feeding-habits-great-horned-owl-mexico';

-- 2. La biología del arte
UPDATE `cga_articles` SET
  `slug` = 'https://capitel.humanitas.edu.mx/la-biologia-del-arte/',
  `title_es` = 'La biología del arte: reflexiones sobre la creación humana',
  `title_en` = 'The Biology of Art: Reflections on Human Creation',
  `excerpt_es` = 'Ensayo interdisciplinario publicado en Revista Capitel (Universidad Humanitas) que analiza la creación artística desde las bases neurobiológicas y evolutivas. Examina el encéfalo desde los primeros homínidos hasta Homo sapiens, la biomecánica de las manos y el debate entre el arte como adaptación biológica versus construcción cultural.',
  `excerpt_en` = 'Interdisciplinary essay published in Capitel Magazine (Humanitas University) examining artistic creation through neurobiological and evolutionary foundations. Explores brain encephalization from early hominids to Homo sapiens, hand biomechanics, and the debate between art as biological adaptation vs. cultural construct.',
  `author_name` = 'Luis Deyvi García (Ilustraciones: Todd McKie)',
  `author_role` = 'Revista Capitel · Universidad Humanitas (Columna Dórica)',
  `hero_img` = 'https://capitel-media-test.s3.us-east-1.amazonaws.com/wp-content/uploads/2025/03/The-Tatse-of-Tomorrow.jpg',
  `hero_png` = '/imagenes/Rama 1.png',
  `tags` = 'evolución,neurobiología,arte,antropología,cultura,divulgación científica',
  `published_at` = '2025-03-01 00:00:00'
WHERE `id` = 'la-biologia-del-arte-reflexiones-creacion-humana';

-- 3. Viajero frecuente
UPDATE `cga_articles` SET
  `slug` = 'https://theryaixmana.mastozoologiamexicana.com/index.php/theryaixmana/article/view/478',
  `title_es` = 'Viajero frecuente',
  `title_en` = 'Frequent Flyer: Ecology and Migration of the Greater Long-nosed Bat',
  `excerpt_es` = 'Artículo de divulgación en Therya ixmana (AMMAC) sobre el periplo migratorio del murciélago magueyero mayor (Leptonycteris nivalis). Analiza sus desplazamientos siguiendo floraciones de agaves y cactáceas desde el centro de México hasta el sur de EE. UU., su rol polinizador esencial y la protección de cuevas de maternidad.',
  `excerpt_en` = 'Science paper in Therya ixmana (AMMAC) exploring the seasonal migration of the greater long-nosed bat (Leptonycteris nivalis). Examines its flights following flowering corridors of agaves and cacti from central Mexico to the southern US, its keystone pollinator role, and maternity roost conservation.',
  `author_name` = 'Luis Deyvi García-González & Bárbara Vargas-Miranda',
  `author_role` = 'Therya ixmana · AMMAC (Vol. 3, Núm. 3, pp. 104-105)',
  `hero_img` = 'https://theryaixmana.mastozoologiamexicana.com/public/journals/4/cover_issue_26_es_ES.jpg',
  `hero_png` = '/imagenes/Liana.png',
  `tags` = 'murciélagos,migración,polinización,agaves,mastozoología,conservación',
  `published_at` = '2024-05-01 00:00:00'
WHERE `id` = 'viajero-frecuente-murcielago-magueyero-mayor';

-- 4. ¡Espera!… ¿un tlacuache “muerto” en Xochimilco?
UPDATE `cga_articles` SET
  `slug` = 'https://theryaixmana.mastozoologiamexicana.com/index.php/theryaixmana/article/view/392',
  `title_es` = '¡Espera!… ¿un tlacuache “muerto” en Xochimilco?',
  `title_en` = 'Wait!… A "Dead" Opossum in Xochimilco?',
  `excerpt_es` = 'Artículo en Therya ixmana (AMMAC) sobre el tlacuache norteño (Didelphis virginiana) en humedales y chinampas de Xochimilco y San Gregorio Atlapulco. Explica la tanatosis —reflejo involuntario de simular la muerte ante amenazas—, desmitifica prejuicios y destaca su rol crucial en el control biológico de insectos.',
  `excerpt_en` = 'Article in Therya ixmana (AMMAC) examining the Virginia opossum (Didelphis virginiana) in Xochimilco and San Gregorio Atlapulco wetland chinampas. Explains thanatosis—an involuntary death-feigning reflex when threatened—, dispels urban myths, and highlights its role in natural pest control.',
  `author_name` = 'Luis Deyvi García-González, Angélica Antonio Trinidad, Víctor Manuel Macedonio Sánchez',
  `author_role` = 'Therya ixmana · AMMAC (Vol. 2, Núm. 3, pp. 105-107)',
  `hero_img` = 'https://theryaixmana.mastozoologiamexicana.com/public/journals/4/cover_issue_20_es_ES.jpg',
  `hero_png` = '/imagenes/Rama 2.png',
  `tags` = 'tlacuache,Xochimilco,tanatosis,humedales,fauna urbana,mastozoología',
  `published_at` = '2023-08-01 00:00:00'
WHERE `id` = 'espera-un-tlacuache-muerto-en-xochimilco';

-- 5. Sierra La Mojonera
UPDATE `cga_articles` SET
  `slug` = 'https://doi.org/10.1894/0038-4909-65.3-4.237',
  `title_es` = 'Terrestrial vertebrates in the area of influence of the Sierra La Mojonera in San Luis Potosí and Zacatecas, Mexico',
  `title_en` = 'Terrestrial vertebrates in the area of influence of the Sierra La Mojonera in San Luis Potosí and Zacatecas, Mexico',
  `excerpt_es` = 'Inventario científico y evaluación ecológica de vertebrados terrestres en 30 localidades (850 km²) de la Sierra La Mojonera entre San Luis Potosí y Zacatecas. Registró 51 especies (25 mamíferos, 14 aves, 9 reptiles, 3 anfibios) con 29 nuevos registros regionales y taxones prioritarios como Cynomys mexicanus, Crotalus molossus y Leptonycteris nivalis.',
  `excerpt_en` = 'Scientific inventory and ecological evaluation of terrestrial vertebrates across 30 locations (850 km²) in the Sierra La Mojonera influence zone (San Luis Potosí and Zacatecas). Documented 51 species (25 mammals, 14 birds, 9 reptiles, 3 amphibians) including 29 new regional records and key conservation species like Cynomys mexicanus and Leptonycteris nivalis.',
  `author_name` = 'C. Elizalde-Arellano, B. Vargas-Miranda, J.C. López-Vidal, C.Y. Salas Rodríguez, L.D. García González',
  `author_role` = 'The Southwestern Naturalist · Vol. 65, Nos. 3-4, pp. 237-248 (DOI: 10.1894/0038-4909-65.3-4.237)',
  `hero_img` = 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&q=80&fit=crop&auto=format',
  `hero_png` = '/imagenes/Rama 1.png',
  `tags` = 'biodiversidad,vertebrados,Sierra La Mojonera,Desierto Chihuahuense,inventario biológico,conservación',
  `published_at` = '2022-02-02 00:00:00'
WHERE `id` = 'terrestrial-vertebrates-sierra-la-mojonera-mexico';


-- ─────────────────────────────────────────────────────────────────────────────
-- ACTUALIZACIÓN DE ALIANZA: REEMPLAZO DE EXPO MÉXICO POR ALAS METROPOLITANAS
-- ─────────────────────────────────────────────────────────────────────────────
UPDATE `cga_alliances` 
SET 
  `name` = 'Alas Metropolitanas',
  `short_name` = 'Alas Metropolitanas',
  `acronym` = 'ALAS',
  `type` = 'territorial',
  `scope_es` = 'Territorial · Biodiversidad Urbana',
  `scope_en` = 'Territorial · Urban Biodiversity',
  `role_es` = 'Conservación de fauna aviar, protección de corredores biológicos y biodiversidad metropolitana.',
  `role_en` = 'Avian wildlife conservation, biological corridor protection and metropolitan biodiversity.',
  `tag` = 'Biodiversidad Urbana',
  `logo` = '/imports/Logos/alasmetropolitanas.jpg',
  `website` = 'https://mexicoporelclima.com/'
WHERE `id` = 'fgpb' OR `name` LIKE '%Expo%' OR `short_name` LIKE '%Expo%';
