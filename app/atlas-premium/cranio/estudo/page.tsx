import type {Metadata} from "next";
import PremiumAtlasClient from "../../atlas-client";
export const metadata:Metadata={title:"Crânio e Face | Laboratório Atlas Premium Eduverso",description:"Visualize o crânio humano em diferentes vistas, com zoom e pontos interativos no Atlas Premium."};
export default function SkullStudyPage(){return <PremiumAtlasClient mode="lab"/>;}
