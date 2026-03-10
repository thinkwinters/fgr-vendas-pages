# Estratégia de Popups — Jardins Berlim LP

Este documento descreve os popups implementados para aumentar conversão sem poluir a experiência.

## Resumo dos gatilhos ativos

### 1) Popup por intenção de saída (`exit_intent`)
- **Trigger:** quando o cursor do mouse sai pela parte superior da janela (`clientY <= 0`).
- **Objetivo:** recuperar usuários prestes a abandonar a página.
- **Mensagem:** foco em “antes de sair” + convite para receber opções no WhatsApp.

### 2) Popup por inatividade (`inactivity`)
- **Trigger:** 35 segundos sem interação detectada.
- **Eventos monitorados para resetar o timer:** `mousemove`, `scroll`, `keydown`, `touchstart`.
- **Objetivo:** reengajar visitantes indecisos parados na página.
- **Mensagem:** tom consultivo e apoio na tomada de decisão.

### 3) Popup por tempo de página (`time_on_page`)
- **Trigger temporal:** 45 segundos após carregamento da página.
- **Trigger complementar de profundidade:** ao atingir a seção `#condicoes` com pelo menos 60% de interseção em viewport.
- **Objetivo:** converter visitantes com interesse real (maior tempo/scroll).
- **Mensagem:** convite para próximo passo com especialista.

## Regras de frequência
- **Cooldown por sessão:** 30 minutos (`sessionStorage`) após exibição de qualquer popup.
- **Exibição única por carregamento:** após abrir uma vez, os demais gatilhos são bloqueados nesta sessão de página.

## Onde ajustar os tempos e gatilhos
No arquivo `script.js`, objeto `popupConfig`:

```js
const popupConfig = {
  inactivityMs: 35000,
  timeOnPageMs: 45000,
  scrollPercent: 60,
  sessionCooldownMs: 1800000,
};
```

### Recomendação de testes A/B
- **Inatividade:** testar 25s vs 35s.
- **Tempo de página:** testar 30s vs 45s.
- **Cooldown:** testar 30 min vs 12h (para tráfego recorrente).
- **Copy popup:** comparar “urgência elegante” vs “consultoria objetiva”.
