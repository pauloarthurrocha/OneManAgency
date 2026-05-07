# Preset: Luxo Noturno

> **Identidade:** Elegância noturna. Sofisticação digital. Profundo e premium.
> **Uso ideal:** Fintech, luxury brands, consultoria executiva, real estate tech
> **Mood:** Exclusivo, sofisticado, poderoso

---

## Paleta de Cores

### Cores Primárias
| Token | Hex | Uso |
|---|---|---|
| `--primary-50` | `#faf5ff` | Backgrounds sutis |
| `--primary-100` | `#f3e8ff` | Hover states |
| `--primary-500` | `#a855f7` | CTAs principais, acentos |
| `--primary-600` | `#9333ea` | Hover em CTAs |
| `--primary-900` | `#581c87` | Textos em fundos claros |

### Cores de Destaque (Dourado/Âmbar)
| Token | Hex | Uso |
|---|---|---|
| `--accent-gold` | `#fbbf24` | Destaques premium, badges VIP |
| `--accent-amber` | `#f59e0b` | Ícones de valor, estrelas |
| `--accent-rose` | `#fb7185` | Elementos de urgência |

### Neutros (Dark Mode)
| Token | Hex | Uso |
|---|---|---|
| `--neutral-50` | `#0a0a0a` | Background principal (quase preto) |
| `--neutral-100` | `#171717` | Cards, seções alternadas |
| `--neutral-500` | `#737373` | Texto secundário |
| `--neutral-900` | `#fafafa` | Texto principal (quase branco) |

### Gradientes
```css
--gradient-hero: linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0f172a 100%);
--gradient-gold: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%);
--gradient-glow: radial-gradient(circle at 50% 50%, rgba(168,85,247,0.15) 0%, transparent 70%);
```

---

## Tipografia

### Fonte Display
- **Fonte:** Playfair Display (serif elegante) ou Cormorant Garamond
- **Peso:** 600-700
- **Tracking:** 0.01em (slight positive tracking)
- **Uso:** Headlines H1-H2

### Fonte Body
- **Fonte:** Inter ou DM Sans
- **Peso:** 300-400 (light para elegância)
- **Line-height:** 1.7 (generoso)
- **Uso:** Parágrafos, labels

### Escala
```
H1: 4rem (64px) / line-height 1.1 / weight 600
H2: 2.5rem (40px) / line-height 1.2 / weight 600
H3: 1.5rem (24px) / line-height 1.3 / weight 500
Body: 1.0625rem (17px) / line-height 1.7 / weight 300
Small: 0.875rem (14px) / line-height 1.5 / weight 400
Caption: 0.75rem (12px) / line-height 1.4 / weight 400 / uppercase / tracking 0.1em
```

---

## Component Behaviors

### Cards
- Border-radius: 12px
- Background: `--neutral-100` (surface escuro)
- Shadow: `0 0 40px rgba(168,85,247,0.05)` (glow sutil)
- Border: 1px solid `rgba(255,255,255,0.05)` (borda quase invisível)
- Hover: glow mais intenso + border `rgba(168,85,247,0.2)`

### Botões
- **Primary:** Background `--primary-500`, text white, radius 8px
- **Premium:** Gradient `--gradient-gold`, text `--neutral-900`, radius 8px
- **Ghost:** Border 1px `rgba(255,255,255,0.2)`, text white
- Hover: glow effect + scale(1.03)

### Inputs
- Border: 1px solid `rgba(255,255,255,0.1)`
- Focus: border `--primary-500` + glow
- Radius: 8px
- Background: `--neutral-100`

---

## Animações

### Hero
- **Entrada:** Fade-in com desfoque (blur → sharp)
- **Duração:** 800ms
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`
- **Efeito:** Texto aparece com blur que some

### Scroll
- **Reveal:** Fade-up + blur removal
- **Trigger:** IntersectionObserver
- **Duração:** 700ms

### Hover
- **Botões:** Glow intensificado + scale(1.03)
- **Cards:** Border glow + elevação sutil
- **Links:** Underline animado (width 0 → 100%)

### Background
- **Hero:** Gradient escuro com partículas/estrelas sutis
- **Efeito:** CSS particles ou noise texture sutil (opacity 0.03)
- **Glow:** Radial gradient que segue mouse (opcional, via JS)

---

## Padrão de Hero

```
┌─────────────────────────────────────────────┐
│  [Navbar: minimal, logo + links finos]      │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  Caption: "EXCLUSIVO"              │   │
│  │                                     │   │
│  │  Headline (H1, serif):             │   │
│  │  "Experiência Premium              │   │
│  │   Redefinida"                      │   │
│  │                                     │   │
│  │  Subheadline (body light):         │   │
│  │  "Para quem exige excelência..."   │   │
│  │                                     │   │
│  │  [CTA Gold] [CTA Ghost]            │   │
│  │                                     │   │
│  │  Stats: "500+ clientes | 99.9%"    │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [Visual: Product mockup com glow          │
│   roxo/dourado, fundo escuro profundo]     │
└─────────────────────────────────────────────┘
```

---

## Regras Premium

1. **Contraste alto:** Texto branco/quase branco em fundo escuro
2. **Espaçamento generoso:** Letras e elementos com "respiração"
3. **Detalhes dourados:** Âmbar/dourado como cor de destaque premium
4. **Serif em headlines:** Transmite tradição e elegância
5. **Glow sutil:** Roxo como aura/luz ambiente
6. **Minimalismo:** Menos é mais. Cada elemento precisa justificar existência
7. **Glassmorphism sutil:** Cards com backdrop-filter quando apropriado

---

*Preset Luxo Noturno v1.0 — OneManAgency*