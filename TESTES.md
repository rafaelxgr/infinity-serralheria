# Validação da modernização — 24/10/2026

Base: `ac06b9432400a09a6425f2c302e4832ec88678fe`.
Recuperação disponível em `recovery/pre-modernizacao-20261024`.

## Alterações

- `index.html`: três destaques navegáveis, quatro modelos no catálogo, seções de automatização e manutenção, marcas e faixa animada; rodapé estático com contatos e políticas existentes.
- `styles.css`: identidade escura/azul preservada, contêiner de até 1440 px, cartões e imagens ampliados, layouts responsivos e foco visível.
- `script.js`: interações existentes preservadas; pausa da faixa, Escape no menu e respeito à preferência por movimento reduzido. Os controles dos vídeos permanecem disponíveis.
- `assets/*.webp`: versões otimizadas das fotografias e da logo já utilizada; originais preservados. Logos do cliente em `assets/logos/` sem alteração de cor ou proporção.
- Folhas antigas de sobrescrita retiradas depois de verificar que nenhum HTML ou JavaScript continuava a referenciá-las.
- Contato pelo WhatsApp usa navegação nativa: não depende do retorno do script de medição. Identificador da tag e identificador de conversão existentes foram preservados. Nenhuma configuração de campanha foi alterada.

## Verificação estática

- `node --check script.js`: aprovado.
- `git diff --check`: aprovado.
- Caminhos locais do HTML, fontes de vídeo, arquivos ampliados e imagens do CSS: existentes.
- IDs únicos e destinos das âncoras: conferidos.
- Dados estruturados JSON válidos e preservados, assim como URL canônica, telefone, endereço e Instagram.
- Exatamente três destaques, quatro modelos, nove fotos na galeria e quatro marcas na lista estática.
- Catálogo e galeria usam conjuntos diferentes de fotografias.
- Arquivos WebP verificados com decodificador de imagens.

## Navegador — prévia local

Larguras conferidas em frames de teste de 900 px de altura. A barra de rolagem vertical ocupa 15 px neste ambiente.

| Largura do viewport | Área útil / largura do documento | Destaques | Texto cortado |
| --- | --- | --- | --- |
| 360 px | 345 / 345 px | uma coluna | nenhum |
| 390 px | 375 / 375 px | uma coluna | nenhum |
| 768 px | 753 / 753 px | três colunas | nenhum |
| 1024 px | 1009 / 1009 px | três colunas | nenhum |
| 1440 px | 1425 / 1425 px | três colunas | nenhum |
| 1920 px | 1905 / 1905 px | três colunas | nenhum |

Sem rolagem horizontal da página nas seis larguras.

Interações verificadas:

- Menu mobile abre, atualiza `aria-expanded` e fecha ao selecionar Serviços.
- Destaque Portões sob Medida leva ao catálogo.
- Modelo abre no dialog com a fotografia original; Escape fecha.
- Fotografia da galeria abre no mesmo dialog; botão de fechar funciona.
- Botão da faixa altera `aria-pressed` e `animation-play-state` para `paused`.
- Fotos, enquadramento desktop/mobile e logos revisados visualmente.
- Quatro vídeos válidos carregaram com `readyState = 4`, sem erro de mídia. Fontes H.264/AAC confirmadas por ffprobe. Carregamento ocorre perto da área visível.
- Nenhum erro de JavaScript do site observado. Houve mensagens da extensão de inspeção do navegador, externas ao código do site.

## Desempenho e limites

- Seis folhas CSS antes carregadas (41.524 bytes) consolidadas em uma de aproximadamente 24,5 KB: redução de cerca de 41% em bytes de CSS sem compressão, além da remoção da injeção de estilos do rodapé.
- Fotografias de exibição e logo em WebP, dimensões explícitas e carregamento lazy abaixo do banner. Banner com preload de prioridade alta.
- Nenhuma biblioteca ou dependência adicionada ao site.
- Movimento reduzido implementado no CSS e JavaScript. Não foi feita emulação da preferência do sistema neste ambiente.
- Não foi executado Lighthouse nem simulação de rede móvel. Não se afirma pontuação ou ganho de tempo de carregamento medido.
- Links de WhatsApp foram conferidos sem enviar mensagens nem gerar cliques de conversão de teste. A mensuração fim a fim no Google Ads não integra esta validação.

## Pendências de conteúdo

Fotografia definitiva de manutenção; seleção final de novas fotografias/legendas pelo cliente; mais modelos, se desejar ampliar o catálogo. `mov12.mp4` e `mov15.mp4` ausentes na base: somente os cartões quebrados foram retirados, sem excluir arquivos de mídia existentes.

## Publicação

Usar o GitHub Pages existente. A confirmação do commit publicado, da execução do deploy e da página em produção deve acompanhar a entrega; uma prévia local não comprova publicação.
