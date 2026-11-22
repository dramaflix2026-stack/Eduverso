import {technicalDepth} from "./professional-depth-technical";
import {creativeDepth} from "./professional-depth-creative";
import {businessDepth} from "./professional-depth-business";
import type {ProfessionalDepth} from "./professional-depth-types";

export const professionalDepth:Record<string,ProfessionalDepth[]> = {
 ...technicalDepth,
 ...creativeDepth,
 ...businessDepth
};
export function getProfessionalDepth(trackId:string,lessonIndex:number):ProfessionalDepth|undefined {
 return professionalDepth[trackId]?.[lessonIndex];
}
