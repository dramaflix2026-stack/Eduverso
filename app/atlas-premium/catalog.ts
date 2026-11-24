export type AtlasArea={id:string;name:string;icon:string;description:string;topics:string[];available:boolean};
export const atlasAreas:AtlasArea[]=[
 {id:"esqueletico",name:"Sistema Esquelético",icon:"🦴",description:"Ossos, articulações e anatomia do esqueleto.",topics:["Crânio e face","Coluna vertebral","Caixa torácica","Membros superiores","Membros inferiores","Articulações","Tecido ósseo","Anatomia aplicada"],available:true},
 {id:"muscular",name:"Sistema Muscular",icon:"💪",description:"Músculos, tendões e biomecânica.",topics:["Cabeça e pescoço","Tórax e abdômen","Costas","Membros superiores","Membros inferiores","Tendões e fáscias","Contração","Biomecânica"],available:false},
 {id:"nervoso",name:"Sistema Nervoso",icon:"🧠",description:"Encéfalo, medula e nervos.",topics:["Cérebro","Cerebelo","Tronco encefálico","Medula","Nervos cranianos","Nervos periféricos","Sinapses","Reflexos"],available:false},
 {id:"cardiovascular",name:"Sistema Cardiovascular",icon:"❤️",description:"Coração, vasos e circulação.",topics:["Anatomia cardíaca","Câmaras","Válvulas","Artérias","Veias","Circulação pulmonar","Circulação sistêmica","Condução cardíaca"],available:false},
 {id:"respiratorio",name:"Sistema Respiratório",icon:"🫁",description:"Vias aéreas, pulmões e ventilação.",topics:["Nariz","Faringe","Laringe","Traqueia","Brônquios","Pulmões","Alvéolos","Diafragma"],available:false},
 {id:"digestorio",name:"Sistema Digestório",icon:"🍎",description:"Trato digestivo e órgãos associados.",topics:["Cavidade oral","Esôfago","Estômago","Fígado","Vesícula","Pâncreas","Intestino delgado","Intestino grosso"],available:false},
 {id:"urinario",name:"Sistema Urinário",icon:"💧",description:"Rins e vias urinárias.",topics:["Rins","Néfrons","Ureteres","Bexiga","Uretra","Filtração","Reabsorção","Equilíbrio hídrico"],available:false},
 {id:"endocrino",name:"Sistema Endócrino",icon:"⚗️",description:"Glândulas, hormônios e seus eixos.",topics:["Hipotálamo","Hipófise","Tireoide","Paratireoides","Suprarrenais","Pâncreas","Pineal","Gônadas"],available:false},
 {id:"linfatico",name:"Linfático e Imunológico",icon:"🛡️",description:"Linfáticos e órgãos de defesa.",topics:["Vasos linfáticos","Linfonodos","Baço","Timo","Medula óssea","Células imunes","Circulação linfática","Resposta imune"],available:false},
 {id:"reprodutor",name:"Sistema Reprodutor",icon:"🧬",description:"Estruturas reprodutoras.",topics:["Anatomia feminina","Útero","Tubas uterinas","Ovários","Anatomia masculina","Testículos","Próstata","Desenvolvimento inicial"],available:false},
 {id:"tegumentar",name:"Sistema Tegumentar",icon:"✋",description:"Pele e anexos.",topics:["Epiderme","Derme","Hipoderme","Pelos","Unhas","Glândulas","Receptores","Cicatrização"],available:false},
 {id:"sentidos",name:"Órgãos dos Sentidos",icon:"👁️",description:"Visão, audição e percepção.",topics:["Olho","Retina","Nervo óptico","Visão","Ouvido","Cóclea","Vestibular","Olfato e paladar"],available:false}
];
export type Landmark={id:string;name:string;view:"frontal"|"lateral"|"posterior"|"inferior";x:number;y:number;description:string};
export const skullLandmarks:Landmark[]=[
 {id:"frontal",name:"Osso frontal",view:"frontal",x:50,y:32,description:"Forma a testa e contribui para o teto das órbitas. Articula-se com os ossos parietais pela sutura coronal."},
 {id:"nasal",name:"Ossos nasais",view:"frontal",x:50,y:49,description:"Pequenos ossos pares que formam parte da ponte óssea do nariz."},
 {id:"zigomatico",name:"Osso zigomático",view:"frontal",x:29,y:55,description:"Participa da proeminência da bochecha e da parede lateral da órbita."},
 {id:"maxila",name:"Maxila",view:"frontal",x:59,y:64,description:"Osso par que participa do palato duro, da região infraorbital e da sustentação dos dentes superiores."},
 {id:"mandibula",name:"Mandíbula",view:"frontal",x:50,y:74,description:"Osso móvel da face; participa da articulação temporomandibular e sustenta os dentes inferiores."},
 {id:"parietal",name:"Osso parietal",view:"lateral",x:39,y:33,description:"Osso par da calvária, conectado aos ossos frontal, temporal e occipital por suturas."},
 {id:"temporal",name:"Osso temporal",view:"lateral",x:40,y:53,description:"Integra a base e a parede lateral do crânio; abriga estruturas do ouvido interno."},
 {id:"occipital",name:"Osso occipital",view:"posterior",x:50,y:57,description:"Forma grande parte da região posterior e inferior do neurocrânio; contém o forame magno."},
 {id:"sutura-lambdoide",name:"Sutura lambdoide",view:"posterior",x:51,y:39,description:"Articulação fibrosa entre os ossos parietais e o occipital."},
 {id:"forame",name:"Forame magno",view:"inferior",x:50,y:61,description:"Grande abertura do occipital pela qual o bulbo se continua com a medula espinhal."}
];
export const atlasViews=[{id:"frontal",label:"Vista frontal"},{id:"lateral",label:"Vista lateral"},{id:"posterior",label:"Vista posterior"},{id:"inferior",label:"Vista inferior"},{id:"3d",label:"Modelo 3D"}] as const;
