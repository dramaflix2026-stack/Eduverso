export type ProfessionalDepth={
 objective:string;
 explanation:string;
 steps:[string,string,string];
 practice:string;
 solution:string;
 quiz:{question:string;options:[string,string,string];correct:0;explanation:string};
};
export type DepthRow=[
 string,string,[string,string,string],string,string,string,string,string,string,string
];
export function toDepth(rows:DepthRow[]):ProfessionalDepth[]{
 return rows.map(([objective,explanation,steps,practice,solution,question,answer,wrongOne,wrongTwo,rationale])=>({
  objective,explanation,steps,practice,solution,quiz:{question,options:[answer,wrongOne,wrongTwo],correct:0,explanation:rationale}
 }));
}
