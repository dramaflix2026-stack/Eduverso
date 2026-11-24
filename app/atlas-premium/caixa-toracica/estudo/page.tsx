import type {Metadata} from "next";
import ThoraxStudyClient from "./thorax-study-client";
export const metadata:Metadata={title:"Caixa torácica | Atlas Premium Eduverso",description:"Explore as costelas, o esterno, a cartilagem costal e as articulações torácicas em uma prévia interativa de anatomia."};
export default function ThoraxStudyPage(){return <ThoraxStudyClient/>;}
