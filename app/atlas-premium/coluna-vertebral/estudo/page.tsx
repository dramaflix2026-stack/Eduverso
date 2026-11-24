import type {Metadata} from "next";
import SpineStudyClient from "./spine-study-client";
export const metadata:Metadata={title:"Coluna vertebral | Atlas Premium Eduverso",description:"Explore quatro vistas da coluna vertebral, suas regiões, funções e um desafio anatômico no Atlas Premium."};
export default function SpineStudyPage(){return <SpineStudyClient/>;}
