import type {AtlasSpot,AtlasView} from "./anatomy-atlas-collection-data";
export type StudySection={title:string;text:string};
const integration:Record<string,string>={
 anterior:"O esqueleto axial e o apendicular trabalham em conjunto: sustentam o corpo, protegem órgãos e oferecem pontos de fixação para músculos e ligamentos. Estude as estruturas em relação às articulações vizinhas.",
 posterior:"Na vista posterior, a relação entre coluna, escápulas, pelve e membros auxilia a compreender postura, transmissão de forças e movimentos do tronco.",
 cranio:"O crânio reúne neurocrânio e viscerocrânio. A posição dos ossos determina as paredes das órbitas, a cavidade nasal e as superfícies de articulação da mandíbula.",
 coluna:"As regiões cervical, torácica, lombar, sacral e coccígea têm diferenças estruturais relacionadas a sustentação, mobilidade e proteção neural.",
 torax:"A caixa torácica combina rigidez protetora e elasticidade para permitir os movimentos respiratórios; sua anatomia inclui ossos, cartilagens e articulações.",
 "membro-superior":"O membro superior privilegia mobilidade e precisão. As relações entre cintura escapular, braço, antebraço e mão explicam a grande amplitude de movimentos.",
 pelve:"A pelve integra a coluna vertebral e os membros inferiores. O anel pélvico transmite cargas, sustenta vísceras e forma importantes superfícies articulares.",
 "membro-inferior":"O membro inferior é especializado em suporte de peso, equilíbrio e marcha. Observe a continuidade funcional entre quadril, joelho, tornozelo e pé.",
 pe:"O retropé, o mediopé e o antepé formam um sistema de apoio e propulsão. Os arcos plantares ajudam a distribuir cargas durante a marcha.",
 "musculos-anterior":"Os músculos anteriores podem realizar flexão, adução, estabilização e outras ações conforme suas inserções. Sempre relacione sua localização à articulação que atravessam.",
 "musculos-posterior":"Os músculos posteriores contribuem para extensão, controle da postura e estabilização de cinturas e membros. A ação depende da orientação das fibras e de seus pontos de inserção.",
 "musculos-face":"Os músculos da mímica facial são predominantemente inervados pelo nervo facial; os principais músculos da mastigação recebem inervação motora do trigêmeo. Diferencie as duas funções.",
 "musculos-superiores":"No membro superior, movimentos finos exigem coordenação de músculos proximais e distais. A ação conjunta estabiliza a articulação enquanto a mão realiza tarefas.",
 "musculos-inferiores":"Os grandes grupos musculares de quadril, coxa e perna cooperam para sustentar o corpo, manter o equilíbrio e produzir deslocamento.",
 cerebro:"O sistema nervoso central integra informações sensoriais, motoras, cognitivas e autonômicas. Estruturas próximas podem ter funções distintas, embora trabalhem em rede.",
 "medula-espinal":"Na medula espinal, a substância cinzenta participa da integração de circuitos e a branca conduz vias ascendentes e descendentes. Compare também raízes sensitivas e motoras.",
 "nervos-perifericos":"Os nervos periféricos fazem a ligação funcional entre encéfalo, medula e tecidos. Conhecer trajetos e territórios de inervação facilita a interpretação de déficits localizados.",
 coracao:"O fluxo cardíaco depende da sequência entre câmaras e valvas. O lado direito recebe sangue sistêmico e o direciona aos pulmões; o esquerdo o envia à circulação sistêmica.",
 "vasos-sanguineos":"Artérias, capilares e veias formam um circuito contínuo: distribuição de sangue, trocas teciduais e retorno venoso. Relacione o vaso à sua região de irrigação ou drenagem.",
 pulmoes:"A ventilação desloca o ar pelas vias condutoras até regiões respiratórias. As trocas gasosas acontecem principalmente na interface entre alvéolos e capilares.",
 "sistema-digestorio":"O tubo digestório realiza transporte, transformação e absorção do alimento, em associação com fígado, pâncreas e outros órgãos acessórios.",
 "figado-pancreas":"O sistema hepatobiliar participa da produção, concentração e condução da bile. O pâncreas combina atividades exócrinas digestivas e endócrinas metabólicas.",
 "sistema-urinario":"A formação e eliminação da urina relacionam néfrons, vias coletoras, ureteres, bexiga e uretra. A função renal também participa do controle de volume e eletrólitos.",
 "reprodutor-feminino":"Os órgãos reprodutores femininos se relacionam a gametogênese, transporte de gametas, ciclos hormonais, gestação e parto. Diferencie a função de cada segmento.",
 "reprodutor-masculino":"A produção, maturação, condução e emissão dos espermatozoides dependem da integração entre gônadas, ductos, glândulas acessórias e genitália externa.",
 endocrino:"O sistema endócrino coordena funções por meio de hormônios e mecanismos de retroalimentação. Observe quais glândulas atuam em cada eixo e seus órgãos-alvo.",
 olho:"As estruturas oculares trabalham em sequência: proteção, refração da luz, formação da imagem e transmissão de sinais visuais ao sistema nervoso.",
 ouvido:"O sistema auditivo conduz e transforma vibrações sonoras; o aparelho vestibular detecta movimentos e mudanças de posição da cabeça.",
 pele:"A pele combina barreira protetora, termorregulação, sensibilidade e secreção. Seus anexos se distribuem entre camadas de características histológicas diferentes.",
 linfatico:"O sistema linfático recolhe parte do líquido intersticial e participa da vigilância imune. Linfonodos filtram linfa; o baço está associado à filtragem sanguínea."
};
function sentence(s:string){const t=s.trim();return t.endsWith(".")||t.endsWith("!")?t:t+".";}
export function studySections(spot:AtlasSpot,view:AtlasView):StudySection[]{
 return [
  {title:"O que é e onde se encontra",text:sentence(spot.description)},
  {title:"Função e integração anatômica",text:sentence(spot.function)},
  {title:"Importância clínica",text:sentence(spot.clinical)},
  {title:"Conexões com o sistema",text:integration[view.id]||"A compreensão da região exige relacionar forma, função e estruturas vizinhas, observando sua organização no organismo."},
  {title:"Como fixar o conteúdo",text:"Localize "+spot.name+" na região de "+spot.group.toLowerCase()+". Depois, explique sem consultar o texto sua principal função e a aplicação clínica descrita acima. Compare com as demais estruturas deste atlas para evitar confusões."}
 ];
}
export function reviewPrompt(spot:AtlasSpot):string{
 return "Como você identificaria "+spot.name+" e qual é sua importância funcional e clínica?";
}
export function studySummary(spot:AtlasSpot):string{
 return "Estrutura: "+spot.name+". "+sentence(spot.function)+" "+sentence(spot.clinical);
}
