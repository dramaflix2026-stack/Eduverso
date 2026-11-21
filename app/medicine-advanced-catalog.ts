// Registro das disciplinas com aulas aprofundadas. Novo curso exige apenas registrar
// capítulos e métricas aqui; os cards, simulado e aula usam o mesmo catálogo.
import {anatomyChapters,anatomyByTopic,anatomyMetrics} from "./medicine-anatomy-deep";
import {histologyChapters,histologyByTopic,histologyMetrics} from "./medicine-histology-deep";
import {embryologyChapters,embryologyByTopic,embryologyMetrics} from "./medicine-embryology-deep";
import {biochemistryChapters,biochemistryByTopic,biochemistryMetrics} from "./medicine-biochemistry-deep";
import {physiologyChapters,physiologyByTopic,physiologyMetrics} from "./medicine-physiology-deep";
import {basicAdvancedCourses} from "./medicine-advanced-basic";
import {clinicalAdvancedCourses} from "./medicine-advanced-clinical";
import {integratedAdvancedCourses} from "./medicine-advanced-integrated";
import type {DeepChapter} from "./medicine-anatomy-deep";
type Metrics={modules:number;lessons:number;extraQuestions:number};
type AdvancedCourse={title:string;chapters:DeepChapter[];byTopic:Record<string,DeepChapter>;metrics:Metrics};
export const advancedMedCourses:Record<string,AdvancedCourse>={
 "anatomia-humana":{title:"Anatomia Humana",chapters:anatomyChapters,byTopic:anatomyByTopic,metrics:anatomyMetrics},
 "histologia":{title:"Histologia",chapters:histologyChapters,byTopic:histologyByTopic,metrics:histologyMetrics},
 "embriologia":{title:"Embriologia",chapters:embryologyChapters,byTopic:embryologyByTopic,metrics:embryologyMetrics},
 "bioquimica":{title:"Bioquímica",chapters:biochemistryChapters,byTopic:biochemistryByTopic,metrics:biochemistryMetrics},
 "fisiologia":{title:"Fisiologia",chapters:physiologyChapters,byTopic:physiologyByTopic,metrics:physiologyMetrics},
 ...basicAdvancedCourses,
 ...clinicalAdvancedCourses,
 ...integratedAdvancedCourses
};
