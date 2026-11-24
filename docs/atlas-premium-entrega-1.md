# Atlas Premium — Entrega 1 de 8

## Objetivo e separação
Fundação independente em `/atlas-premium`, sem reaproveitar arquivos, componentes ou conteúdo visual do Atlas gratuito e sem tocar nas assinaturas Estudante/Professor.

## Implementado nesta entrega
- 12 sistemas com 8 subitens cada; só o protótipo do crânio é demonstrável; os demais são honestamente marcados como em preparação.
- Busca local por sistemas/subitens, seleção de categorias, layout responsivo e novo item de navegação.
- Um diagrama vetorial autoral **ilustrativo** do crânio com 4 vistas, pontos selecionáveis, explicações e um desafio. Isto **não é** imagem anatômica HD validada e não substitui um atlas médico.
- Aba para modelo 3D explicitamente identificada como **em preparação**. Não fingir rotação em 3D.
- Endpoint separado `/api/atlas-premium/status` que verifica direito do complemento **no servidor**, por meio de `eduverso_addon_entitlements`; não herda acesso dos planos Estudante/Professor.
- Sem cobrança no botão: Kiwify Atlas Premium ainda não conectado. Não inventar checkout.
- Controle de acesso inicial no frontend para a prévia. Qualquer futuro conteúdo premium deverá ser fornecido por **API autenticada e autorizada**, não embarcado no bundle público.

## Etapas pendentes para produto vendável
1. Criar imagens HD originais para cada vista, revisar marcos anatômicos e terminologia com responsável capacitado.
2. Criar/importar modelo GLB do crânio com licenciamento correto, validar anatomia e integrar visualizador 3D real e otimizado para mobile.
3. Implementar animações de camadas com interface acessível e ajuste de movimento reduzido.
4. Integrar produto real na Kiwify, criar webhook assinado isolado por produto com idempotência e revogação por reembolso/chargeback; conceder direito `atlas-premium` na tabela isolada.
5. Transferir as lições completas para armazenamento privado e servir apenas após autorização no backend.
6. Progresso persistente por usuário, desafios progressivos e flashcards.
7. Testar toque, zoom, cores, mobile, Safari, Chrome, 3D com degradação adequada, carga e segurança.
8. Validar todas as 12 áreas antes de anunciar disponibilidade plena.

## Critérios de aceite
- O menu do Atlas gratuito segue igual; este Atlas aparece como opção premium separada.
- A compra do Eduverso Estudante/Professor, sozinha, nunca libera o Atlas Premium.
- A prévia pública não traz material exclusivo completo e nunca informa recursos pendentes como disponíveis.
- Todas as páginas fecham sem erros de build; nenhum checkout ou autorização anterior é alterado.
