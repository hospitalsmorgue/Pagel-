# Laboratório Pagel — site 2.0

Protótipo estático, em HTML, CSS e JavaScript (sem etapa de build obrigatória para publicar). As páginas já geradas estão na raiz desta pasta. O script `_build/build.py` só é necessário se você for regenerá-las.

## Como visualizar

Na pasta `site-2.0`:

```bash
python3 -m http.server 8080
```

Abra `http://localhost:8080/`. Não é necessário instalar dependências para o site em si. As fontes Montserrat e as imagens do site atual já estão em `assets/`.

## Origem das imagens e do texto

- Logotipo, favicon, banners de check-up, fotos institucionais e logomarcas de convênios foram copiados do site público [laboratoriopagel.com.br](https://www.laboratoriopagel.com.br/). Nenhuma imagem foi gerada por inteligência artificial.
- Textos de história, missão, visão, valores, dúvidas frequentes, política de privacidade, listas de exames, preços dos check-ups, horários, telefones, e-mails e nomes de convênios vêm do site atual ou de publicações oficiais do laboratório (Facebook/Instagram).
- Onde a informação ainda não estava documentada, o site traz o marcador **[a confirmar com a Pagel]**.

## O que este site acrescenta em relação ao site atual

- Agendamento on-line (unidade ou coleta domiciliar) com mensagem pronta no WhatsApp (protótipo, sem backend).
- Uma única entrada de resultados, no portal UniExames em HTTPS (`laboratoriopagel.uniexames.com.br`). Não há link para o antigo host HTTP de laudos.
- Guia de preparo pesquisável e com filtros.
- Página Qualidade e cuidado (participação no PNCQ desde 2007, com nota de que o site atual ainda cita 2008). Acreditação SNA-DICQ é explicada de forma visível, sem selo oficial e sem afirmar “Laboratório Acreditado” antes do recebimento do certificado e da aprovação da arte pelo SNA-DICQ. Há um espaço reservado rotulado “Selo DICQ — inserir arte oficial após recebimento”.
- Área do médico.
- Canal de avaliação (NPS curto) e convite para o Google, além do formulário de satisfação já usado.
- Unidades com mapas (Google Maps por endereço) e fallback em link.
- Rodapé atualizado para © 2026, com aviso de privacidade/LGPD, botão flutuante de WhatsApp, meta de SEO e cuidados de acessibilidade (skip link, rótulos, foco visível, contraste de texto).

## Formulários (protótipo)

Os formulários de agendamento, contato e avaliação rodam só no navegador:

- Agendamento e contato abrem o WhatsApp (`https://wa.me/5551999098303`) com o texto montado no cliente. Não há envio a um servidor da Pagel neste pacote.
- A avaliação NPS apenas exibe uma mensagem de agradecimento no próprio navegador. Não armazena a nota em um backend.
- Por privacidade, o agendamento pede para não incluir o nome do exame na mensagem.

Para produção, será preciso um backend ou a API oficial do WhatsApp Business, além da revisão da Política de Privacidade para esses canais.

## Paleta e tipografia

- Teal da marca: `#44aba8` (logo). Texto e botões usam `#1f6462`, mais escuro, para contraste WCAG AA sobre fundo branco.
- Cinza da logo: `#5c5d60`. Coral dos resultados: `#c45a38` (o laranja original `#FF6B4D` foi escurecido pelo mesmo motivo).
- Fonte: Montserrat (a mesma família do site atual), hospedada localmente em `assets/fonts/`.

## Placeholders que pedem confirmação da Pagel

- CNPJ 88.886.775/0001-57 e RT Fernanda Wolf Pagel, CRF 16589 (constam de apurações do projeto; não estavam no rodapé do site atual).
- Certificados e o “conceito excelente” do PNCQ para uso em campanha.
- Como consultar resultados anteriores a 05/05/2025.
- Passo a passo do primeiro acesso e o login de médico no UniExames.
- Se o atendimento é por horário marcado ou por ordem de chegada.
- Detalhes operacionais de DNA, teste do pezinho, água, toxicológico, sexagem fetal e coleta empresarial (as páginas atuais desses serviços estavam vazias).
- Nome exato do “Sindicato dos Trabalhadores da Indústria” (no site atual: “Sindicado…”).
- Link oficial da ficha de avaliações no Google.
- Atualização da Política de Privacidade para WhatsApp e canais digitais.
- Revisão da Visão (“Ser a melhor opção…”) à luz da Res. CFF 658/2018.

A unidade de Dois Irmãos aparece só na história, não na lista de unidades em funcionamento.

## Publicação

Ajustar as URLs canônicas e `og:image` em cada página se o site for ao ar em outro caminho que não a raiz de `https://www.laboratoriopagel.com.br/`. O aviso de cookies não instala métrica de terceiros neste protótipo; o site atual ainda cita o UA-50611123-1 (Universal Analytics, já desativado), que não foi reproduzido.

Capturas de tela de conferência estão em `screenshots/`.

## Atualização: 50 anos, PNCQ 2007 e SNA-DICQ

- A abertura da home celebra os **50 anos do Laboratório Pagel**, com a data de fundação (5 de setembro de 1977) visível. Como 1977 + 50 anos cai em 5 de setembro de 2027, o recorte da campanha (2026 ou 2027) está marcado para confirmação.
- A participação no PNCQ passou a ser citada como **desde 2007**, conforme a direção. O site atual ainda diz 2008; a divergência está marcada.
- A acreditação SNA-DICQ ganhou faixa na home, seção na página Qualidade e menção no rodapé. O selo oficial **não** é reproduzido: há um espaço com o rótulo "Selo DICQ — inserir arte oficial após recebimento". Até o certificado chegar e a arte/modelo serem aprovados pelo SNA-DICQ, o site **não** afirma "Laboratório Acreditado".
- A frase do tipo "o único laboratório em Sapiranga com certificação" **não foi publicada** como afirmação. Está só como variante marcada, com os motivos (lista oficial de 11/11/2026, laboratórios vizinhos já acreditados, Res. CFF 658/2018). Ver `qualidade.html#variante-unico`.
- Há um destaque de palestra no **SP Summit** (home e Área do médico). Data, local e nome oficial do evento: a confirmar.
