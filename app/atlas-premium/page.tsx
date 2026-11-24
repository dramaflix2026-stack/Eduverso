import type {Metadata} from "next";
import PremiumAtlasClient from "./atlas-client";
export const metadata:Metadata={title:"Atlas Premium de Anatomia | Eduverso",description:"Conheça a nova biblioteca anatômica premium do Eduverso. Prévia interativa do laboratório do crânio."};
export default function AtlasPremiumPage(){return <PremiumAtlasClient/>;}
