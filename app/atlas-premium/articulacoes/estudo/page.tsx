import type {Metadata} from "next";
import JointStudyClient from "./joint-study-client";
export const metadata:Metadata={title:"Articulações | Atlas Premium Eduverso",description:"Explore seis articulações importantes, com quatro vistas, pontos interativos e exercícios anatômicos comentados."};
export default function JointsStudyPage(){return <JointStudyClient/>;}
