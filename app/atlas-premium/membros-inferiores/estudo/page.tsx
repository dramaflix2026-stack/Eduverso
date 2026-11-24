import type {Metadata} from "next";
import LowerLimbsClient from "./lower-limbs-client";
export const metadata:Metadata={title:"Membros Inferiores | Atlas Premium Eduverso",description:"Estudo interativo introdutório da pelve, fêmur, patela, tíbia, fíbula e ossos do pé."};
export default function LowerLimbsStudyPage(){return <LowerLimbsClient/>;}
