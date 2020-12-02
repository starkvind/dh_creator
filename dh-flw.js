/* -------------------------------------------------------------------------- */
/* VARIABLES                                                                  */
/* -------------------------------------------------------------------------- */
var flw_attribs = ["Ataque", "Defensa"];

var flw_names = [
  "Basdyn","Besshy","Bigq","Birn","Bissttur","Blam","Bleturn","Blilt","Blustia",
  "Bralphmor","Bram","Burt","Chir","Chrardq","Chrenrrod","Chronner","Chyh","Chyld",
  "Cirir","Clackaw","Clavph","Cled","Clity","Clylnt","Clyrznal","Cort","Craq","Cren",
  "Crezz","Crodz","Cryrelm","Custgha","Daghqper","Dakroth","Daldsver","Decr","Delt",
  "Deth","Dih","Diwck","Dop","Dossllban","Dresr","Druntsh","Druschdel","Dythn","Dyzat",
  "Ferc","Fokllper","Fugv","Fut","Fuwz","Gagban","Gagh","Gartw","Genld","Gimest","Hargh",
  "Haz","Hephlas","Hesund","Hidsom","Jalton","Jamdra","Jill","Jorina","Jykpild","Keckphar",
  "Kentsad","Ker","Kilat","Kocelm","Kosrrage","Kothech","Kotvhin","Lasy","Leck","Lecks",
  "Leltnthin","Lictas","Lighdshy","Liss","Lisstai","Llisves","Llun","Llushlir","Locver",
  "Lord","Lotm","Luch","Lulv","Lutb","Lyhndhon","Lyl","Macr","Midlhat","Mirrler","Modden",
  "Mov","Murdch","Nabves","Nameld","Narting","Nav","Nel","Nesltur","Nitaugh","Niter",
  "Nockden","Nosund","Nosv","Novs","Nuntb","Nyldum","Palt","Pel","Phabtur","Phitchath",
  "Phost","Pol","Pom","Posold","Pucbur","Quantget","Quiv","Rad","Ral","Ranm","Rannrtler",
  "Rastckler","Rathr","Remale","Rertslye","Retcha","Rhivchler","Rhivque","Rib","Riphtia",
  "Riqck","Ros","Rot","Rotina","Rovund","Roz","Ruckang","Runn","Rush","Rymt","Ryrr","Ryspcer",
  "Schem","Schenllor","Schinng","Schomsves","Schurd","Sendc","Sending","Shaldnia","Shengar",
  "Shuqscha","Sifrryn","Sikaw","Sissl","Sivnund","Slal","Slishald","Smashess","Smast","Smechin",
  "Smem","Smendhon","Smephina","Smesnkin","Smistkin","Smucqorm","Smyqtia","Snarrz","Snazath",
  "Snekest","Snertphaugh","Sodnnach","Somlyer","Sossdyn","Stals","Stannk","Stef","Stonnk",
  "Suckl","Swatph","Swenntur","Swullrr","Swuntphwar","Symztas","Systban","Tald","Tandsam",
  "Thedl","Thodine","Thoq","Thotq","Thrak","Thraz","Thrim","Throg","Throtrad","Thutwor",
  "Thuwch","Thycd","Tidtorm","Tithsul","Traren","Trensul","Trochckryn","Trollt","Trorr",
  "Trurtia","Trustkskel","Tuhklor","Tumrat","Tyrtll","Vawrgha","Vodd","Vulgh","Whonghos",
  "Willt","Wodchat","Yann","Yeyth","Yidllack","Yoch","Yumnd","Zaghvor","Zhat","Zhedech",
  "Zhemlild","Zhithem","Zhoz","Zic"
];

var flw_class_list = [];
var flw_classes = {
  lawyer : {
    name:   "Abogado",
    attr:   [3, 2],
    hp:     6,
    mo:     8,
    skills: [],
    equip:  ["Tinta y pluma", "Tomo de leyes", "Anteojos"],
    outs:   0,
    origin: 2,
    cost:   1000
  },
  arcanist : {
    name:   "Arcanista",
    attr:   [3, 1],
    hp:     4,
    mo:     6,
    skills: ["Lanzamiento de conjuros (Seguidor)"],
    equip:  ["Saquillo de ingredientes", "Tomo de conjuros", "Bastón (d6)"],
    outs:   1,
    origin: 2,
    cost:   2000
  },
  architect : {
    name:   "Arquitecto",
    attr:   [3, 3],
    hp:     4,
    mo:     7,
    skills: [],
    equip:  ["Tinta y pluma", "Pergaminos y mapas", "Regla de metal (d3)"],
    outs:   0,
    origin: 2,
    cost:   400
  },
  artisan : {
    name:   "Artesano",
    attr:   [3, 2],
    hp:     4,
    mo:     6,
    skills: [],
    equip:  ["Herramientas de trabajo", "Mandil", "Navaja (d3)"],
    outs:   0,
    origin: 2,
    cost:   100
  },
  hunter : {
    name:   "Cazador",
    attr:   [-1, 2],
    hp:     8,
    mo:     9,
    skills: ["Talento para la caza"],
    equip:  ["Arco largo (d8)", "Carcaj (d8)", "Armadura acolchada (d4)"],
    outs:   1,
    origin: 2,
    cost:   200
  },
  cook : {
    name:   "Cocinero",
    attr:   [4, 3],
    hp:     4,
    mo:     6,
    skills: [],
    equip:  ["Rodillo de cocina", "Gorro de cocinero", "Delantal"],
    outs:   0,
    origin: 2,
    cost:   6
  },
  undertaker : {
    name:   "Enterrador",
    attr:   [2, 3],
    hp:     6,
    mo:     9,
    skills: [],
    equip:  ["Pala (d4)", "Sombrero de ala ancha", "Ropa de cuero (+1)"],
    outs:   0,
    origin: 2,
    cost:   90
  },
  squire : {
    name:   "Escudero",
    attr:   [2, 2],
    hp:     6,
    mo:     7,
    skills: ["Defensor"],
    equip:  ["Espada corta (d6)", "Rodela de madera (+1)", "Armadura acolchada (d4)"],
    outs:   1,
    origin: 2,
    cost:   10
  },
  scribe : {
    name:   "Escriba",
    attr:   [3, 3],
    hp:     4,
    mo:     6,
    skills: [],
    equip:  ["Tinta y pluma", "Rollos de pergamino"],
    outs:   1,
    origin: 2,
    cost:   10
  },
  journeyman : {
    name:   "Jornalero",
    attr:   [2, 3],
    hp:     4,
    mo:     6,
    skills: [],
    equip:  ["Ropa de trabajo"],
    outs:   0,
    origin: 2,
    cost:   50
  },
  thief : {
    name:   "Ladrón",
    attr:   [-1, 0],
    hp:     4,
    mo:     7,
    skills: [],
    equip:  ["Daga (d4)", "Cuchillo arrojadizo × 3 (d4)", "Armadura acolchada (d4)", "Ganzúas"],
    outs:   1,
    origin: 2,
    cost:   100
  },
  guard : {
    name:   "Guardia",
    attr:   [0, -2],
    hp:     8,
    mo:     9,
    skills: ["Aura de defensa", "Defensor"],
    equip:  ["Espada larga (d8)", "Cota de anillas (d8)", "Escudo de acero (+1)"],
    outs:   1,
    origin: 2,
    cost:   200
  },
  messenger : {
    name:   "Mensajero",
    attr:   [2, 2],
    hp:     4,
    mo:     8,
    skills: [],
    equip:  ["Zurrón", "Banda de tela"],
    outs:   1,
    origin: 2,
    cost:   500
  },
  mercenary : {
    name:   "Mercenario",
    attr:   [-2, 0],
    hp:     8,
    mo:     9,
    skills: ["Aura de ataque", "Hendedura"],
    equip:  ["Hacha de batalla (d8)", "Camisote de mallas (d8)", "Ballesta de mano (d6)", "Estuche (d8)"],
    outs:   1,
    origin: 2,
    cost:   500
  },
  torchbearer : {
    name:   "Portantorchas",
    attr:   [3, 3],
    hp:     4,
    mo:     6,
    skills: [],
    equip:  ["Palo (d2)"],
    outs:   1,
    origin: 2,
    cost:   8
  },
  carrier : {
    name:   "Porteador",
    attr:   [3, 3],
    hp:     6,
    mo:     7,
    skills: ["Mula de carga"],
    equip:  ["Guantes de cuero"],
    outs:   1,
    origin: 2,
    cost:   70
  },
  teacher : {
    name:   "Profesor",
    attr:   [3, 2],
    hp:     4,
    mo:     8,
    skills: [],
    equip:  ["Enciclopedia", "Tinta y pluma", "Tomo en blanco"],
    outs:   0,
    origin: 2,
    cost:   100
  },
  priest : {
    name:   "Sacerdote",
    attr:   [3, 3],
    hp:     4,
    mo:     10,
    skills: ["Lanzamiento de conjuros (Seguidor)"],
    equip:  ["Símbolo sagrado", "Rosario"],
    outs:   0,
    origin: 2,
    cost:   300
  },
  healer : {
    name:   "Sanador",
    attr:   [2, -1],
    hp:     4,
    mo:     9,
    skills: ["Cuidados médicos"],
    equip:  ["Botiquín de primeros auxilios", "Instrumentos quirúrgicos"],
    outs:   1,
    origin: 2,
    cost:   1000
  },
  cartographer : {
    name:   "Cartógrafo",
    attr:   [2, 3],
    hp:     4,
    mo:     7,
    skills: [],
    equip:  ["Sextante", "Rollo de pergamino", "Mapa × 2"],
    outs:   1,
    origin: 2,
    cost:   500
  }
}
