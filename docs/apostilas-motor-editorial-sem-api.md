# Motor editorial de apostilas sem API — Eduverso
Data: 23/11/2026

## Decisão
O criador de apostilas deve funcionar sem solicitações à OpenAI ou a outro serviço pago de geração a cada download. O conteúdo é preparado e revisado no repositório. O PDF combina os capítulos publicados em uma sequência didática e inclui diagramas vetoriais originais quando houver roteiro visual revisado.

## Implementado na primeira etapa
- Módulo universal `app/booklet-offline.ts` usado pelas três áreas da Central: escolas, Medicina e formações profissionais.
- Porta de qualidade: o motor **não** anuncia como aprofundado um assunto cujas lições não atinjam densidade mínima e exemplo/conexão prática.
- O aluno visualiza quantos capítulos foram aprovados e quais dependem de revisão. O resumo do catálogo continua disponível, mas identificado como resumo, nunca como apostila completa.
- Seleção de até 5, 10, 15 ou 20 tópicos, sem completar lacunas com texto inventado. A quantidade real de páginas acompanha o material editorial, não é inflada artificialmente.
- Primeiros módulos específicos, sem IA: Geografia — Biomas e Vegetação (todos os seis biomas brasileiros, organizados em cinco capítulos) e Geografia — Climas (cinco capítulos).
- Diagramação com esquemas vetoriais originais, sem dependência de imagens externas, direitos desconhecidos ou download por usuário.
- A rota de geração por IA existente foi preservada no código, porém a interface atual prioriza a experiência sem IA e não a invoca.

## Estado de cobertura: NÃO universal ainda
O mecanismo atende estruturalmente todos os caminhos de currículo, mas o catálogo existente contém muitas lições curtas. Esses temas **não estão aptos** para entrega como apostilas aprofundadas até revisão editorial. Medidas automáticas de tamanho e presença de exemplo são apenas portas mínimas, não comprovação de precisão factual.

## Próximos lotes editoriais
1. Concluir Geografia: clima, vegetação, cartografia, geopolítica e demais assuntos do catálogo.
2. Matemática e Ciências: passos resolvidos, exercícios de aplicação, diagramas com unidades e revisão de fórmulas.
3. Linguagens e Humanas: exemplos comentados, conceitos contextualizados e fontes claras.
4. Medicina, vestibulares e Revalida: revisão por profissionais, precisão de terminologia e uso educacional não clínico.
5. Formações profissionais: exemplos atualizados, código revisado e fontes de documentação.
6. Cada ampliação deve registrar origem e licenciamento de imagens quando novas fotografias ou mapas forem integrados.

## Protocolo de qualidade
- Selecionar 5, 10, 15 e 20 tópicos em cada área.
- Testar disciplinas com capítulos aprovados e capítulos ainda ausentes.
- Verificar quantidade efetiva de capítulos, conteúdo específico, fontes, legibilidade dos diagramas e ausência de páginas quase vazias.
- Testar PDF no Android e desktop, exportação e armazenamento na biblioteca.
- Não usar estatísticas ou mapas inventados: diagramas atuais são esquemáticos e rotulados como tal.
- Não afirmar que a apostila inteira foi validada pedagogicamente antes da revisão humana.
- Nenhuma implantação em produção até passar na build e nos testes do navegador.

## Fontes editoriais iniciais
- [Biomas do Brasil — IBGE](https://www.ibge.gov.br/geociencias/cartas-e-mapas/informacoes-ambientais/15842-biomas.html)
- [Biomas Brasileiros — IBGE Educa](https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/18307-biomas-brasileiros.html)
- [Climas do Brasil — IBGE Educa](https://educa.ibge.gov.br/professores/educa-atividades/17613-os-tipos-de-clima-no-brasil.html)
- [Normais Climatológicas — INMET](https://portal.inmet.gov.br/servicos/normais-climatol%C3%B3gicas)

## Não modificar
Atlas Clínico Premium (escopo totalmente original reservado em PR independente), atual atlas básico, Laboratório de Redação Premium, checkout e autenticação.
