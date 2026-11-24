import type {Metadata} from "next";
import SkeletalStudy from "../../skeletal-study-client";
export const metadata:Metadata={title:"Tecido ósseo | Atlas Premium Eduverso",description:"Quatro cenas anatômicas interativas e seis questões comentadas."};
export default function StudyPage(){return <SkeletalStudy slug="tecido-osseo"/>;}
