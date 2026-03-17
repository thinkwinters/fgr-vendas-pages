# fgr-vendas-pages

Landing page premium (mobile-first) do empreendimento **Jardins Berlim | FGR**, construída em HTML + CSS + JS puro.

## Arquivos principais
- `index.html`: estrutura completa da LP, copy e seções de conversão.
- `style.css`: design system visual premium e responsivo.
- `script.js`: interações, formulários, lightbox e popups inteligentes.
- `POPUPS.md`: documentação dos gatilhos, tempos e regras de exibição dos popups.

## Edição rápida
### 1) Textos e copy
Edite as seções diretamente em `index.html` (os blocos estão organizados por seção).

### 2) Link de WhatsApp
Substitua `https://wa.me/5500000000000` por seu número oficial no formato internacional (sem símbolos), em `index.html`.

### 3) Formulários
O comportamento de envio atual é front-end (mensagem de sucesso local).
Para integração real com CRM/webhook, altere o `submit` em `script.js`.

### 4) Imagens (placeholders)
Troque os caminhos abaixo por imagens finais, mantendo nomes ou ajustando no `index.html`:
- `/images/berlim-hero.jpg`
- `/images/berlim-lazer.jpg`
- `/images/berlim-portaria.jpg`
- `/images/berlim-casa.jpg`
- `/images/berlim-piscina.jpg`

### 5) Mapa
Na seção de localização, substitua `.map-placeholder` em `index.html` por embed real de mapa ou imagem final.

### 6) Popups (tempos e gatilhos)
A estratégia e os parâmetros estão descritos em `POPUPS.md`.
