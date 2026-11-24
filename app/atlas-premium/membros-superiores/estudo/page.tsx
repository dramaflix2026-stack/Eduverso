import type {Metadata} from "next";
import UpperLimbsClient from "./upper-limbs-client";
export const metadata:Metadata={title:"Membros Superiores | Atlas Premium Eduverso",description:"Prévia interativa dos ossos do ombro, braço, antebraço e mão."};
export default function UpperLimbsStudyPage(){return <UpperLimbsClient/>;}
