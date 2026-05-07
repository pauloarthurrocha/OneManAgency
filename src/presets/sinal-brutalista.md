# Preset: Sinal Brutalista

> **Identidade:** Direto, sem filtros. Força bruta digital. Honestidade visual.
> **Uso ideal:** Agências criativas, portfolios, marcas de streetwear, startups disruptivas
> **Mood:** Bold, cru, impactante

---

## Paleta de Cores

### Cores Primárias
| Token | Hex | Uso |
|---|---|---|
| `--primary-50` | `#fef2f2` | Backgrounds sutis |
| `--primary-500` | `#ef4444` | CTAs, acentos, alertas |
| `--primary-600` | `#dc2626` | Hover em CTAs |
| `--primary-900` | `#7f1d1d` | Textos em fundos claros |

### Cores de Destaque (Alto Contraste)
| Token | Hex | Uso |
|---|---|---|
| `--accent-black` | `#000000` | Backgrounds, textos |
| `--accent-white` | `#ffffff` | Backgrounds, textos |
| `--accent-yellow` | `#facc15` | Destaques, badges, warnings |

### Neutros
| Token | Hex | Uso |
|---|---|---|
| `--neutral-50` | `#fafafa` | Background alternativo |
| `--neutral-100` | `#f5f5f5` | Seções |
| `--neutral-500` | `#737373` | Texto secundário |
| `--neutral-900` | `#171717` | Texto principal |

### Gradientes
```css
--gradient-brutal: linear-gradient(90deg, #000 0%, #000 50%, #ef4444 50%, #ef4444 100%);
--gradient-yellow: linear-gradient(90deg, #facc15 0%, #facc15 100%);
```

---

## Tipografia

### Fonte Display
- **Fonte:** Space Grotesk (ou similar geometric sans)
- **Peso:** 700
- **Tracking:** -0.04em (very tight)
- **Transform:** UPPERCASE para headlines
- **Uso:** Headlines H1-H2

### Fonte Body
- **Fonte:** Inter ou Space Grotesk
- **Peso:** 400-500
- **Line-height:** 1.4 (compacto)
- **Uso:** Parágrafos

### Escala
```
H1: 5rem (80px) / line-height 0.9 / weight 700 / uppercase
H2: 3rem (48px) / line-height 1.0 / weight 700 / uppercase
H3: 1.5rem (24px) / line-height 1.2 / weight 600
Body: 1rem (16px) / line-height 1.4 / weight 400
Small: 0.875rem (14px) / line-height 1.4 / weight 500 / uppercase
```

---

## Component Behaviors

### Cards
- Border-radius: 0px (SEM border-radius)
- Background: white ou `--accent-black`
- Border: 2px solid `--neutral-900` (ou white em fundo escuro)
- Shadow: NENHUM (flat design)
- Hover: Inversão de cores (bg vira texto, texto vira bg)

### Botões
- **Primary:** Background `--accent-black`, text white, radius 0px, border 2px solid black
- **Secondary:** Background white, text black, radius 0px, border 2px solid black
- **Alert:** Background `--primary-500`, text white, radius 0px
- Hover: Inversão total de cores

### Inputs
- Border: 2px solid `--neutral-900`
- Focus: border `--primary-500`
- Radius: 0px
- Background: white

---

## Animações

### Hero
- **Entrada:** Slide-in da esquerda com snap
- **Duração:** 400ms (rápido, agressivo)
- **Easing:** `cubic-bezier(0.87, 0, 0.13, 1)` (expo in-out)
- **Efeito:** Elementos "batendo" no lugar

### Scroll
- **Reveal:** Slide-up rápido
- **Duração:** 300ms
- **Easing:** `cubic-bezier(0.87, 0, 0.13, 1)`

### Hover
- **Botões:** Inversão instantânea de cores (100ms)
- **Cards:** Inversão de cores + translateX(4px) (direção)
- **Links:** Underline grosso (3px) animado

### Background
- **Hero:** Pattern geométrico (grid, linhas, ou noise)
- **Efeito:** CSS pattern com repeat
- **Opcional:** Marquee/scroll infinito de texto

---

## Padrão de Hero

```
┌─────────────────────────────────────────────┐
│  [Navbar: logo bold + links uppercase]      │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │  Headline (H1, 80px, uppercase):   │   │
│  │  "SEM DESCULPAS                    │   │
│  │   SEM FILTROS                      │   │
│  │   RESULTADOS REAIS"                │   │
│  │                                     │   │
│  │  Subheadline:                      │   │
│  │  "A gente não te vende sonho.      │   │
│  │   Te entrega código."              │   │
│  │                                     │   │
│  │  [CTA BLACK] [CTA WHITE]           │   │
│  │                                     │   │
│  │  [Marquee: "DESIGN • CODE • SHIP • │   │
│  │   REPEAT • DESIGN • CODE • SHIP"]  │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [Visual: Grid brutalista, linhas grossas, │
│   elementos com bordas 2px, zero radius]   │
└─────────────────────────────────────────────┘
```

---

## Regras Premium

1. **Zero border-radius:** Tudo quadrado/retangular
2. **Bordas grossas:** 2px+ para definir elementos
3. **Alto contraste:** Preto e branco como base, vermelho como grito
4. **Tipografia ousada:** Tamanhos grandes, uppercase, tracking tight
5. **Sem sombras:** Flat design puro
6. **Inversão de cores:** Hover como mecanismo principal de feedback
7. **Geometria crua:** Grids, linhas, formas básicas
8. **Movimento rápido:** Animações rápidas e diretas

---

*Preset Sinal Brutalista v1.0 — OneManAgency*