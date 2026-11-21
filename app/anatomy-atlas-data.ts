export type Bone={id:string;name:string;group:string;x:number;y:number;description:string};
export const imageUrl="https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Human_skeleton_front_no-text_no-color.svg/500px-Human_skeleton_front_no-text_no-color.svg.png";
export const sourceUrl="https://commons.wikimedia.org/wiki/File:Human_skeleton_front_no-text_no-color.svg";
export const bones:Bone[]=[
{id:"cranio",name:"Crânio",group:"Cabeça",x:45,y:6.5,description:"O neurocrânio envolve e protege o encéfalo; o crânio também inclui ossos da face."},
{id:"mandibula",name:"Mandíbula",group:"Face",x:45,y:12,description:"Osso móvel da face que sustenta a arcada dentária inferior."},
{id:"clavicula",name:"Clavícula",group:"Cintura escapular",x:33.5,y:19.4,description:"Conecta o esterno à escápula e auxilia a mobilidade do ombro."},
{id:"esterno",name:"Esterno",group:"Tórax",x:47.4,y:25.5,description:"Osso plano central do tórax conectado às cartilagens costais."},
{id:"costelas",name:"Costelas",group:"Tórax",x:34,y:29,description:"Arcos ósseos que compõem a caixa torácica com esterno e vértebras."},
{id:"umero",name:"Úmero",group:"Braço",x:25.7,y:29.7,description:"Osso longo entre ombro e cotovelo."},
{id:"coluna",name:"Coluna vertebral",group:"Tronco",x:45.4,y:37.1,description:"Conjunto de vértebras que sustenta o tronco e protege a medula espinal."},
{id:"pelve",name:"Osso do quadril",group:"Bacia",x:34.8,y:44.9,description:"Osso formado por ílio, ísquio e púbis, integrando a cintura pélvica."},
{id:"radio",name:"Rádio",group:"Antebraço",x:78.9,y:45.2,description:"Osso lateral do antebraço, do lado do polegar em posição anatômica."},
{id:"femur",name:"Fêmur",group:"Coxa",x:35.1,y:59,description:"Osso longo da coxa, articulado ao quadril e ao joelho."},
{id:"patela",name:"Patela",group:"Joelho",x:37.5,y:71,description:"Osso sesamoide anterior ao joelho, associado ao mecanismo extensor."},
{id:"tibia",name:"Tíbia",group:"Perna",x:41,y:81.7,description:"Principal osso de sustentação da perna, medial à fíbula."}
];
