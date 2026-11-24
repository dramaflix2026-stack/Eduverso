import type {Metadata} from "next";
import ThoracicStudyClient from "./thoracic-study-client";
export const metadata:Metadata={title:"Caixa torácica | Atlas Premium Eduverso",description:"Estude costelas, esterno, cartilagens costais e vértebras torácicas com imagens e marcadores interativos."};
export default function ThoracicStudyPage(){return <ThoracicStudyClient/>;}
