/* -------------------------------------------------------------------------- */
/* VARIABLES                                                                  */
/* -------------------------------------------------------------------------- */
var level_min_config = 1;
var level_max_config = 36;
var origin_config = [];
var race_config = 0;

var attribs = ["Fuerza", "Destreza", "Constitución", "Inteligencia", "Sabiduría", "Carisma"];
var aligns =  ["Legal", "Neutral", "Caótico"];
var origins = ["Dungeon Hack", "Guía del jugador de Ylat", "El Naufragio", "Bestiario de Ylat"];

var rooms = {
  tile : [75, "tile"],
  col  : [10, "col"],
  trap : [5, "trap"],
  furn : [10, "furn"]
};

/* -------------------------------------------------------------------------- */
/* CLASES DE PERSONAJE                                                        */
/* -------------------------------------------------------------------------- */
var class_list = [];
var class_basic_list = [];
var classes = {
    cleric : {
      name:   "Clérigo",
      names:  ["Arlia", "Beulah", "Elise", "Erlyna", "Ikta", "Iudith", "Leah", "Aran", "Baltaros", "Brinas", "Derridan", "Goran", "Teoddal", "Wesner"],
      attr:   [4], // SAB
      hp:     6,
      en:     3,
      prof:   "Cualquier arma roma y cualquier escudo. Armaduras hasta las protecciones parciales de placas.",
      adv:    ["CON: Evitar parálisis o daño por veneno"],
      skills: ["Expulsar a los muertos vivientes", "Lanzamiento de conjuros (clérigo)"],
      tools:  [0, 3],
      equip:  [1, 5, 10],
      origin: 0,
      is_race: 0
    },
    fighter : {
      name:   "Guerrero",
      names:  ["Alice", "Berenice", "Briyra", "Everaine", "Kara", "Pelagia", "Yala", "Adamar", "Darien", "Galthin", "Haldir", "Lysander", "Zale"],
      attr:   [0, 1, 2], // FUE, DES o CON
      hp:     8,
      en:     4,
      prof:   "Cualquier arma, armadura o escudo.",
      adv:    ["FUE: Derribar puertas", "CON: Recuperar energía", "Caza: En las Tierras Salvajes"],
      skills: ["Sacrificar escudo", "Recuperación", "Rajar"],
      tools:  [0, 1],
      equip:  [0, 2, 3, 4, 5, 6, 8, 10, 12, 13, 17],
      origin: 0,
      is_race: 0
    },
    thief : {
      name:   "Ladrón",
      names:  ["Cora", "Imra", "Keyara", "Liana", "Marila", "Rinya", "Tressa", "Bal", "Daarenno", "Delbin", "Dymas", "Egrad", "Haladavar", "Merreth"],
      attr:   [1], // DES
      hp:     4,
      en:     4,
      prof:   "Cualquier arma cuerpo a cuerpo de una mano, cualquier arma de proyectiles. Armaduras hasta el cuero tachonado.",
      adv:    ["DES: Trepar, abrir cerraduras con ganzúa y desactivar trampas", "Iniciativa: En combates en los que participe activamente", "Orientación: En las Tierras Salvajes"],
      skills: ["Combate con dos armas", "Ataque sorpresa"],
      tools:  [0, 1, 4],
      equip:  [2, 6, 9, 17],
      origin: 0,
      is_race: 0
    },
    wizard : {
      name:   "Mago",
      names:  ["Ahrorlah", "Dhai", "Edea", "Megara", "Moyra", "Taeryna", "Thera", "Cleophas", "Dyn", "Herafos", "Jehoash", "Karpos", "Silas", "Zaltaros"],
      attr:   [3], // INT
      hp:     4,
      en:     2,
      prof:   "Bastones, dagas, hondas y varitas.",
      adv:    ["INT: Conocer un idioma y/o recordar información sobre una criatura o monstruo"],
      skills: ["Lanzamiento de conjuros (mago)", "Meditación"],
      tools:  [0, 2],
      equip:  [7],
      origin: 0,
      is_race: 0
    },
    elf_class : {
      name:   "Elfo",
      names:  ["Ariawyn", "Dymphna", "Lierin", "Neasa", "Salanna", "Shearah", "Viessa", "Aidan", "Elduin", "Felaern", "Iefyr", "Gaeleath", "Mhaenil", "Virion"],
      attr:   [1,3,5], // DES, INT, CAR
      hp:     6,
      en:     2,
      prof:   "Cualquier arma, armadura y escudo.",
      adv:    ["INT: Detectar puertas secretas", "CAR: Resistir el encantamiento", "Forrajeo: En las Tierras Salvajes"],
      skills: ["Linaje feérico", "Lanzamiento de conjuros (elfo)", "Magia apresurada"],
      tools:  [0, 1, 2],
      equip:  [0, 2, 3, 4, 5, 6, 7, 8, 9],
      origin: 0,
      is_race: 1
    },
    dwarf_class : {
      name:   "Enano",
      names:  ["Anniken", "Burmaline", "Erna", "Gina", "Sif", "Tanja", "Udwada", "Dumli", "Godrig", "Helgig", "Joldurn", "Karnun", "Orrin", "Thedel"],
      attr:   [0,2], // FUE, CON
      hp:     10,
      en:     3,
      prof:   "Cualquier arma, armadura y escudo.",
      adv:    ["CON: Evitar daño causado por el veneno", "INT: Encontrar trampas y evitar daño de conjuros o efectos mágicos"],
      skills: ["Visión en la oscuridad", "Nacidos de la piedra", "Determinación"],
      tools:  [0, 1],
      equip:  [0, 1, 3, 4, 5, 8, 9, 10, 12, 13],
      origin: 0,
      is_race: 1
    },
    halfling_class : {
      name:   "Mediano",
      names:  ["Celesta", "Cercis", "Lavenda", "Lubelia", "Pimpernel", "Rosa", "Zinnia", "Abbo", "Buengo", "Drogo", "Poppo", "Remi", "Sago", "Turbin"],
      attr:   [0,1,5], // FUE, DES, CAR
      hp:     6,
      en:     3,
      prof:   "Cualquier arma no más grande que una espada corta, escudos pequeños y cualquier armadura creada para tu tamaño",
      adv:    ["DES: Esconderse, ocultarse en la oscuridad, escaparse y evitar un ataque cuerpo a cuerpo de un enemigo igual o mayor que un humano ordinario", "Pesca: En las Tierras Salvajes"],
      skills: ["Buena fortuna", "En el último momento"],
      tools:  [0, 1, 4, 5],
      equip:  [9, 14, 15, 16, 17],
      origin: 0,
      is_race: 1
    },
    orc_class : {
      name:   "Orco",
      names:  ["Aggra", "Bathsheba", "Ekra", "Gorganda", "Stuka", "Uloth", "Durog", "Fauth", "Kurst", "Murnof", "Ostam", "Worver"],
      attr:   [0, 1, 2], // FUE, DES, CON
      hp:     8,
      en:     3,
      prof:   "Cualquier arma, armadura y escudo.",
      adv:    ["FUE: Derribar puertas, mover objetos pesados o levantar grandes pesos", "Caza: En las Tierras Salvajes"],
      skills: ["Grito de guerra", "Sed de sangre", "Ira interna"],
      tools:  [0, 1],
      equip:  [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 13],
      origin: 2,
      is_race: 1
    },
    gnome_class : {
      name:   "Gnomo",
      names:  ["Clothos", "Deina", "Lakhesis", "Nortalis", "Trix", "Wilga", "Aldorian", "Blanbanter", "Coridhrius", "Excelsus", "Morix", "Zander"],
      attr:   [2,3], // CON, INT
      hp:     6,
      en:     2,
      prof:   "Cualquier arma a una mano (adaptada a tu tamaño), arcos cortos, ballestas ligeras, cerbatanas y hondas. Puedes usar armaduras hasta el cuero tachonado y escudos pequeños.",
      adv:    ["DES: Activar o reparar aparatos y mecanismos complejos", "INT: Descifrar enigmas o comprender el funcionamiento de máquinas"],
      skills: ["Visión en la oscuridad", "Lanzamiento de conjuros (gnomo)", "Fuente de maná"],
      tools:  [0, 1, 2, 4],
      equip:  [9, 14, 15, 16, 17],
      origin: 2,
      is_race: 1
    },
    forsaken_class : {
      name:   "Redivivo",
      names:  ["Alma", "Berta", "Criselda", "Diane", "Isabelle", "Marianne", "Arthur", "Derek", "Ignatius", "Michael", "Norbert", "Oswald"],
      attr:   [2,3,4], // CON, INT, SAB
      hp:     4,
      en:     3,
      prof:   "Cualquier arma ligera, bastones, espadas largas, hachas de batalla, luceros del alba, mazas, grandes clavas y guadañas. Armaduras hasta la cota de anillas y cualquier escudo.",
      adv:    ["CON: Resistir la parálisis y aguantar la respiración", "CAR: Resistir el encantamiento"],
      skills: ["Cuerpo blasfemo", "Maldición de los condenados", "Lanzamiento de conjuros (redivivo)"],
      tools:  [0, 1, 2, 3],
      equip:  [10, 13, 17],
      origin: 2,
      is_race: 1
    },
    kamael_class_1 : {
      name:   "Serafente (Viento)",
      names:  ["Bataiva", "Diari", "Eleleth", "Htmorda", "Navaa", "Ziza", "Azrael", "Bubledark", "Camael", "Harut", "Israfil", "Uriel"],
      attr:   [0,3], // FUE, INT
      hp:     8,
      en:     3,
      prof:   "Cualquier arma ligera y cualquier arma a distancia. Armaduras hasta el camisote de mallas.",
      adv:    ["CON: Resistir enfermedades", "CAR: Intimidar o fascinar a otros"],
      skills: ["Ala de ignominia", "Camino del Viento"],
      tools:  [0, 1],
      equip:  [2, 6, 9, 11, 16, 17],
      origin: 2,
      is_race: 1
    },
    kamael_class_2 : {
      name:   "Serafente (Tierra)",
      names:  ["Bataiva", "Diari", "Eleleth", "Htmorda", "Navaa", "Ziza", "Azrael", "Bubledark", "Camael", "Harut", "Israfil", "Uriel"],
      attr:   [0,3], // FUE, INT
      hp:     8,
      en:     3,
      prof:   "Cualquier arma cuerpo a cuerpo, arcos cortos y ballestas ligeras. Cualquier armadura, pero ningún escudo.",
      adv:    ["CON: Resistir enfermedades", "CAR: Intimidar o fascinar a otros"],
      skills: ["Ala de ignominia", "Camino de la Tierra"],
      tools:  [0, 1],
      equip:  [3, 8, 9, 10, 12, 14, 17],
      origin: 2,
      is_race: 1
    },
    kamael_class_3 : {
      name:   "Serafente (Urdimbre)",
      names:  ["Bataiva", "Diari", "Eleleth", "Htmorda", "Navaa", "Ziza", "Azrael", "Bubledark", "Camael", "Harut", "Israfil", "Uriel"],
      attr:   [0,3], // FUE, INT
      hp:     8,
      en:     3,
      prof:   "Cualquier arma ligera, arcos cortos y ballestas ligeras. Armaduras hasta el camisote de mallas.",
      adv:    ["CON: Resistir enfermedades", "CAR: Intimidar o fascinar a otros"],
      skills: ["Ala de ignominia", "Camino de la Urdimbre"],
      tools:  [0, 1],
      equip:  [9, 11, 16, 17],
      origin: 2,
      is_race: 1
    },
    barbarian : {
      name:   "Bárbaro",
      names:  ["Anya", "Bertha", "Helga", "Sashka", "Valeria", "Zuri", "Aethe", "Frothak", "Morgulf", "Vavfir", "Skörn", "Thaddeus"],
      attr:   [0, 1, 2], // FUE, DES, CON
      hp:     12,
      en:     4,
      prof:   "Cualquier arma cuerpo a cuerpo, arcos cortos, cerbatanas y hondas. Escudos pequeños y medianos, y armaduras hasta el cuero tachonado.",
      adv:    ["FUE: Romper objetos", "SAB: Detectar trampas o peligros", "Caza: En las Tierras Salvajes"],
      skills: ["Brutalidad", "Poderío salvaje", "Rabia primigenia"],
      tools:  [0, 1],
      equip:  [10, 12, 13, 17],
      origin: 1,
      is_race: 0
    },
    bard : {
      name:   "Bardo",
      names:  ["Ariana", "Bimba", "Fiorella", "Germanotta", "Modestia", "Soshana", "Alhigas", "Dreyfus", "Jaafan", "Marius", "Nerón", "Uriel"],
      attr:   [5], // CAR
      hp:     6,
      en:     4,
      prof:   "Cualquier arma ligera, bastones, espadas largas, espadas roperas, jabalinas, látigos y cualquier arma a distancia. Armaduras hasta la cota de anillas.",
      adv:    ["DES: Evitar el daño por trampas", "CAR: Resistir el encantamiento"],
      skills: ["Argucias de bardo", "Cultura del viajero", "Entusiasmo", "Melodías mágicas"],
      tools:  [0, 1, 5],
      equip:  [2, 6, 9, 10, 14, 17],
      origin: 1,
      is_race: 0
    },
    warlord : {
      name:   "Belisario",
      names:  ["Brienne", "Ceres", "Terra", "Martina", "Nêrra", "Xenobia", "Arcturus", "Cócito", "Ebenezer", "Locke", "Ichabod", "Tormund"],
      attr:   [0, 3, 5], // FUE, INT, CAR
      hp:     8,
      en:     4,
      prof:   "Cualquier arma existente y armadura hasta la cota de mallas. También escudos pequeños y medios.",
      adv:    ["INT: Reconocer puntos débiles en los enemigos", "CAR: Asegurar y/o reforzar la lealtad de los seguidores", "Iniciativa: En combates en los que participe activamente como líder."],
      skills: ["Presencia intimidante", "Órdenes de batalla"],
      tools:  [0, 1],
      equip:  [0, 1, 2, 3, 4, 5, 6, 8],
      origin: 1,
      is_race: 0
    },
    warlock : {
      name:   "Brujo",
      names:  ["Angélica", "Circe", "Jalis", "Locasta", "Morgana", "Rita", "Alastor", "Belegur", "Fabián", "Gwyon", "Raymond", "Teseo"],
      attr:   [2, 5], // CON, CAR
      hp:     6,
      en:     2,
      prof:   "Cualquier arma ligera, bastones, espadas largas, espadas roperas, látigos, guadañas, cerbatanas y hondas; y te puedes equipar armaduras acolchadas y armaduras de cuero.",
      adv:    ["CON: Resistir enfermedades", "INT: Descifrar conjuros o rituales mágicos"],
      skills: ["Lanzamiento de conjuros (brujo)", "Esbirro familiar", "Rebote arcano"],
      tools:  [0, 1, 2],
      equip:  [7, 11, 14, 19],
      origin: 1,
      is_race: 0
    },
    hunter : {
      name:   "Cazador",
      names:  ["Avana", "Dora", "Isarrel", "Saria", "Valindrys", "Yralisia", "Anfalen", "Corym", "Haldir", "Ruan", "Torlus", "Wilfred"],
      attr:   [1, 4], // DES, SAB
      hp:     6,
      en:     3,
      prof:   "Puedes llevar todas las armas ligeras, armas cuerpo a cuerpo de una mano, guadañas, gujas, tridentes y armas a distancia. Te puedes poner armaduras acolchadas, de cuero, de pieles y de cuero tachonado, además de escudos pequeños.",
      adv:    ["SAB: Seguir rastros", "Caza: En las Tierras Salvajes", "Orientación: En cualquier lugar salvo subterráneos"],
      skills: ["Compañero animal", "Marca del cazador"],
      tools:  [0, 1, 4],
      equip:  [2, 6, 9, 11, 17],
      origin: 1,
      is_race: 0
    },
    warden : {
      name:   "Celador",
      names:  ["Ayla", "Dihnunah", "Fern", "Nimara", "Sevsda", "Yun", "Elerion", "Findorian", "Stavos", "Theon", "Vaelar", "Zatch"],
      attr:   [1, 2, 4], // DES, CON, SAB
      hp:     4,
      en:     2,
      prof:   "Puedes utilizar cualquier arma arrojadiza, cualquier arma a distancia y armas cuerpo a cuerpo ligeras. Te puedes equipar armaduras acolchadas y de cuero, pero ningún escudo.",
      adv:    ["CON: Recuperar energía", "SAB: Para detectar la presencia de corrupción mágica"],
      skills: ["Arma de celador", "Flechería arcana"],
      tools:  [0, 1],
      equip:  [2, 6, 9, 17],
      origin: 1,
      is_race: 0
    },
    shaman : {
      name:   "Chamán",
      names:  ["Awilix", "Chac", "Itzmaná", "Kantunil", "Jo", "Zulia", "Babajide", "Chimalmat", "Jotok", "Mactzil", "Nicteel", "Yaxcol"],
      attr:   [2, 4], // CON, SAB
      hp:     6,
      en:     3,
      prof:   "Puedes llevar cualquier arma hecha de madera, armaduras hasta las de pieles y escudos pequeños o medianos hechos de madera.",
      adv:    ["INT: Identificar criaturas venenosas o peligrosas", "SAB: Reconocer el entorno en zonas salvajes", "Forrajeo: En las Tierras Salvajes"],
      skills: ["Avatar ancestral", "Lanzamiento de conjuros (chamán)", "Resonancia salvaje"],
      tools:  [0, 1, 3],
      equip:  [7, 10, 20],
      origin: 1,
      is_race: 0
    }
};

/* -------------------------------------------------------------------------- */
/* ESPECIES DE PERSONAJE                                                      */
/* -------------------------------------------------------------------------- */
var race_list = [];
var races = {
  dragonborn : {
    name: "Dracónido",
    req: [[0, 13], [2, 13]], /* Fuerza y Constitución */
    old: "desde los 50 años",
    skills: ["Hálito dracónico", "Vigoroso"],
    origin: 1
  },
  elf_wood : {
    name: "Elfo agreste",
    req: [[1, 13]], /* Destreza */
    old: "nunca envejecen",
    skills: ["Linaje feérico", "Rapidez"],
    origin: 1
  },
  dwarf_mountain : {
    name: "Enano alpino",
    req: [[2, 13]], /* Constitución */
    old: "desde los 280 años",
    skills: ["Visión en la oscuridad", "Corpulencia"],
    origin: 1
  },
  catfolk : {
    name: "Gatónido",
    req: [[1, 13]], /* Destreza */
    old: "desde los 40 años",
    skills: ["Baja estatura", "Rapidez", "Visión en la oscuridad", "Agilidad felina"],
    origin: 1
  },
  gnome_faerie : {
    name: "Gnomo sylestri",
    req: [[3, 13]], // Inteligencia
    old: "desde los 350 años",
    skills: ["Baja estatura", "Visión en la oscuridad", "Fuente de maná"],
    origin: 1
  },
  human_normal : {
    name: "Humano",
    req: [], // Ninguna
    old: "desde los 45 años",
    skills: ["Buen desarrollo"],
    origin: 1
  },
  iblisian : {
    name: "Iblisio",
    req: [[5, 13]], // Carisma
    old: "desde los 45 años",
    skills: ["Labia infernal", "Resistencia ígnea"],
    origin: 1
  },
  halfling : {
    name: "Mediano",
    req: [], // Ninguna
    old: "desde los 90 años",
    skills: ["Baja estatura", "Buena suerte"],
    origin: 1
  },
  orc : {
    name: "Orco",
    req: [[0, 13]], // Fuerza
    old: "desde los 35 años",
    skills: ["Ira interna", "Furia orca"],
    origin: 1
  },
  revenant : {
    name: "Regresado",
    req: [[3, 13], [4, 13]], // Inteligencia y Sabiduría
    old: "ya no envejecen",
    skills: ["Cuerpo blasfemo"],
    origin: 1
  },
  rusalka : {
    name: "Rusalka",
    req: [[1, 13], [4, 13]], // Destreza y Sabiduría
    old: "desde los 80 años",
    skills: ["Legado marino", "Visión en la oscuridad"],
    origin: 1
  },
  hybrid_halfelf : {
    name: "Semielfo",
    req: [[5, 13]], // Carisma
    old: "desde los 100 años",
    skills: ["Ánimo", "Herencia dual"],
    origin: 1
  },
  hybrid_halforc : {
    name: "Semiorco",
    req: [[0, 13], [1, 13]], // Fuerza y Destreza
    old: "desde los 40 años",
    skills: ["Sed de sangre", "Herencia dual"],
    origin: 1
  },
  hybrid_halftroll : {
    name: "Semitrol",
    req: [[0, 13], [2, 13]], // Fuerza y Constitución
    old: "desde los 150 años",
    skills: ["Sed de sangre", "Regeneración de trol"],
    origin: 1
  },
  elf_sky : {
    name: "Elfo celestial",
    req: [[1, 13], [3, 13]], // Destreza e Inteligencia
    old: "nunca envejecen",
    skills: ["Linaje feérico", "Fuente de maná"],
    origin: 1
  },
  elf_white : {
    name: "Elfo blanco",
    req: [[3, 13], [5, 13]], // Inteligencia y Carisma
    old: "nunca envejecen",
    skills: ["Linaje feérico", "Visión en la oscuridad"],
    origin: 1
  },
  dwarf_jungle : {
    name: "Enano de la jungla",
    req: [[0, 13], [2, 13]], // Fuerza y Constitución
    old: "desde los 280 años",
    skills: ["Sed de sangre", "Corpulencia"],
    origin: 1
  },
  halfling_kender : {
    name: "Mediano amable",
    req: [[5, 13]], // Carisma
    old: "desde los 90 años",
    skills: ["Baja estatura", "Valentía"],
    origin: 1
  },
  human_diplomatic : {
    name: "Humano ujibo",
    req: [], // Ninguna
    old: "desde los 45 años",
    skills: ["Diplomático"],
    origin: 1
  },
  catfolk_wild : {
    name: "Gatónido salvaje",
    req: [[1, 13]], // Destreza
    old: "desde los 40 años",
    skills: ["Baja estatura", "Rapidez", "Visión en la oscuridad", "Camuflaje"],
    origin: 1
  },
  gnome_tinker : {
    name: "Gnomo ytumita",
    req: [[3, 13]], // Inteligencia
    old: "desde los 350 años",
    skills: ["Baja estatura", "Visión en la oscuridad", "Aptitud para los cachivaches"],
    origin: 1
  },
  halfling_hobbit : {
    name: "Mediano jóbito",
    req: [], // Ninguna
    old: "desde los 90 años",
    skills: ["Baja estatura", "Sálvese quien pueda"],
    origin: 1
  },
  kamael : {
    name: "Serafente",
    req: [[1, 13], [3, 13]], // Destreza e Inteligencia
    old: "no envejecen",
    skills: ["Ala de infamia", "Huesos místicos"],
    origin: 2
  }
};

/* -------------------------------------------------------------------------- */
/* PAQUETES DE EQUIPAMIENTO                                                   */
/* -------------------------------------------------------------------------- */
var equip_packs = [
  [90,  "Paquete del héroe clásico",   ["Cota de escamas (d8 / d10)", "Escudo mediano (+1 / d8)", "Espada larga (d8)", "Daga (d4)"]],                // 0
  [120, "Paquete del clérigo",         ["Coraza (d8 / d12)", "Escudo mediano (+1 / d8)", "Martillo de guerra (d8)"]],                                // 1
  [70,  "Paquete del arquero",         ["Armadura de cuero (d6 / d6)", "Espada corta (d6)", "Arco largo (d8 / d8)", "Carcaj"]],                      // 2
  [120, "Paquete del cruzado",         ["Cota de mallas (d10 / d8)", "Espadón (d12)"]],                                                              // 3
  [35,  "Paquete del lancero",         ["Cota de anillas (d8 / d6)", "Escudo pequeño (+1 / d6)", "Lanza (d6)", "Daga (d4)"]],                        // 4
  [220, "Paquete del caballero",       ["Armadura de bandas (d10 / d10)", "Escudo grande (+1 / d10)", "Mayal (d8)", "Maza (d6)"]],                   // 5
  [140, "Paquete del ballestero",      ["Armadura de cuero tachonado (d6 / d8)", "Martillo ligero (d4)", "Ballesta pesada (d10 / d8)", "Estuche"]],  // 6
  [2,   "Paquete del mágico",          ["Daga (d4)", "Bastón (d6)", "Honda (d4 / d10)", "Portabalines", "Balines (d10)"]],                           // 7
  [70,  "Paquete del alabardero",      ["Camisote de mallas (d8 / d8)", "Alabarda (d10)", "Espada corta (d6)"]],                                     // 8
  [55,  "Paquete del bandido",         ["Armadura de cuero (d6 / d6)", "Espada corta (d6)", "Ballesta ligera (d8 / d8)", "Estuche"]],                // 9
  [5,   "Paquete del cavernícola",     ["Armadura de pieles (d6 / d6)", "Clava (d4)", "Clava (d4)", "Gran clava (d8)"]],                             // 10
  [1,   "Paquete del aprendiz",        ["Armadura acolchada (d4 / d4)", "Daga o Clava (d4)"]],                                                       // 11
  [45,  "Paquete del bárbaro",         ["Armadura de pieles (d6 / d6)", "Hacha de mano (d6)", "Hacha de mano (d6)", "Gran hacha (d12)"]],            // 12
  [25,  "Paquete del incursor",        ["Armadura de cuero (d6 / d6)", "Escudo mediano (+1 / d8)", "Daga (d4)", "Hacha de batalla (d8)"]],           // 13
  [30,  "Paquete del trovador",        ["Armadura de cuero (d6 / d6)", "Sombrero", "Espada ropera (d8)", "Daga (d4)"]],                              // 14
  [20,  "Paquete del jóbito valiente", ["Armadura de cuero (d6 / d6)", "Escudo pequeño (+1 / d6)", "Espada corta (d6)", "Daga (d4)"]],               // 15
  [5,   "Paquete del jóbito hondero",  ["Armadura acolchada (d4 / d4)", "Honda (d4 / d10)", "Portabalines", "Balines (d10)"]],     			             // 16
  [30,  "Paquete del rufián",          ["Armadura de cuero (d6 / d6)", "Espada corta (d6)", "Espada corta (d6)", "Arco corto (d6 / d8)", "Carcaj"]], // 17
  [95,  "Paquete del belisario",       ["Cota de mallas (d10 / d8)", "Escudo mediano (+1 / d8)", "Morrión (+1 / d6)", "Hacha de batalla (d8)"]],     // 18
  [15,  "Paquete del brujo",           ["Armadura de cuero (d6 / d6)", "Daga (d4)", "Guadaña (d10)"]],                                               // 19
  [20,  "Paquete del capellán",        ["Escudo pequeño (+1 / d6)", "Maza (d6)", "Mitra (Sombrero)"]]                                                // 20
];

/* -------------------------------------------------------------------------- */
/* PAQUETES DE HERRAMIENTAS                                                   */
/* -------------------------------------------------------------------------- */
var tool_packs = [
  [5,  "Paquete de mazmorras", ["Mochila", "Odre", "Antorcha (d8)", "Pértiga", "3x Raciones (d6)", "Trozo de tiza", "Ropa de viaje", "Manta", "Yesquero"]], // 0
  [8,  "Paquete de exploración", ["Mochila", "Odre", "Antorcha (d8)", "Pértiga", "7x Raciones (d6)", "Kit de cocina", "Ropa de viaje", "Tienda de campaña", "Yesquero"]], // 1
  [20, "Paquete de hechicería", ["Mochila", "Odre", "Antorcha (d8)", "3x Raciones (d6)", "Túnica", "Saco de dormir", "Yesquero", "Libro de conjuros"]], // 2
  [8,  "Paquete del pío", ["Mochila", "Odre", "Antorcha (d8)", "7x Raciones (d6)", "Túnica", "Saco de dormir", "Yesquero", "Símbolo sagrado"]], // 3
  [20, "Paquete de ladrón", ["Mochila", "Odre", "Bolsa de abrojos (d6)", "Antorcha (d6)", "3x Raciones (d6)", "Ropas comunes", "Saco de dormir", "Yesquero", "Herramientas de ladrón"]], // 4
  [20, "Paquete del músico", ["Mochila", "Odre", "Antorcha (d8)", "3x Raciones (d6)", "Ropa elegante", "Saco de dormir", "Yesquero", "Laúd"]] // 5
];
