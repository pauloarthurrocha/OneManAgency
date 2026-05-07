# Preset: Tech Orgânico

> **Identidade:** Tecnologia que respira. Natureza digital. Fluido e preciso.
> **Uso ideal:** SaaS, startups de climate tech, wellness tech, apps de produtividade
> **Mood:** Calmo, confiável, inovador

---

## Paleta de Cores

### Cores Primárias
| Token | Hex | Uso |
|---|---|---|
| `--primary-50` | `#f0fdf4` | Backgrounds sutis |
| `--primary-100` | `#dcfce7` | Hover states |
| `--primary-500` | `#22c55e` | CTAs principais, acentos |
| `--primary-600` | `#16a34a` | Hover em CTAs |
| `--primary-900` | `#14532d` | Textos em fundos claros |

### Cores de Destaque (Gradiente Orgânico)
| Token | Hex | Uso |
|---|---|---|
| `--accent-mint` | `#6ee7b7` | Destaques, badges |
| `--accent-sage` | `#84cc16` | Ícones, indicadores |
| `--accent-ocean` | `#0ea5e9` | Links, elementos interativos |

### Neutros
| Token | Hex | Uso |
|---|---|---|
| `--neutral-50` | `#fafaf9` | Background principal |
| `--neutral-100` | `#f5f5f4` | Cards, seções alternadas |
| `--neutral-500` | `#78716c` | Texto secundário |
| `--neutral-900` | `#1c1917` | Texto principal |

### Gradientes
```css
--gradient-hero: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #ccfbf1 100%);
--gradient-accent: linear-gradient(90deg, #22c55e 0%, #0ea5e9 100%);
```

---

## Tipografia

### Fonte Display
- **Fonte:** Inter (ou Geist Sans)
- **Peso:** 600-700
- **Tracking:** -0.02em (tight)
- **Uso:** Headlines H1-H2

### Fonte Body
- **Fonte:** Inter (ou Geist Sans)
- **Peso:** 400-500
- **Line-height:** 1.6
- **Uso:** Parágrafos, labels

### Escala
```
H1: 3.5rem (56px) / line-height 1.1 / weight 700
H2: 2.25rem (36px) / line-height 1.2 / weight 600
H3: 1.5rem (24px) / line-height 1.3 / weight 600
Body: 1rem (16px) / line-height 1.6 / weight 400
Small: 0.875rem (14px) / line-height 1.5 / weight 400
```

---

## Component Behaviors

### Cards
- Border-radius: 16px
- Background: white ou `--neutral-50`
- Shadow: `0 1px 3px rgba(0,0,0,0.05)`
- Hover: elevação sutil + shadow mais forte
- Border: 1px solid `--neutral-100`

### Botões
- **Primary:** Background `--primary-500`, text white, radius 8px
- **Secondary:** Border 1px `--primary-500`, text `--primary-600`, transparent bg
- **Ghost:** Text `--neutral-500`, hover text `--primary-600`
- Hover: scale(1.02) + shadow

### Inputs
- Border: 1px solid `--neutral-100`
- Focus: border `--primary-500` + shadow `0 0 0 3px rgba(34,197,94,0.1)`
- Radius: 8px
- Background: white

---

## Animações

### Hero
- **Entrada:** Fade-up stagger (elementos aparecem sequencialmente de baixo)
- **Duração:** 600ms
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)`
- **Delay entre elementos:** 100ms

### Scroll
- **Reveal:** Fade-up quando entra no viewport
- **Trigger:** IntersectionObserver, threshold 0.2
- **Duração:** 500ms

### Hover
- **Botões:** scale(1.02) + shadow increase
- **Cards:** translateY(-4px) + shadow increase
- **Links:** Color shift para `--primary-600`

### Background
- **Hero:** Gradient sutil animado (morph entre tons de verde/azul)
- **Método:** CSS animation com background-position shift
- **Duração:** 15s, infinite, ease-in-out

---

## Padrão de Hero

```
┌─────────────────────────────────────────────┐
│  [Navbar: logo + nav links + CTA ghost]     │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  Tagline (badge): "Nova versão"    │   │
│  │                                     │   │
│  │  Headline (H1):                     │   │
│  │  "Tecnologia que cresce             │   │
│  │   com você"                         │   │
│  │                                     │   │
│  │  Subheadline (body large):          │   │
│  │  "Soluções inteligentes para..."    │   │
│  │                                     │   │
│  │  [CTA Primary] [CTA Secondary]      │   │
│  │                                     │   │
│  │  Social proof: "★★★★★ 4.9/5"        │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [Visual: Abstract organic shapes /       │
│   Dashboard mockup com gradient bg]        │
└─────────────────────────────────────────────┘
```

---

## Regras Premium

1. **Espaçamento generoso:** Padding sections 96px+ (space-24)
2. **Bordas suaves:** Radius generoso em tudo (8px-16px)
3. **Sombras sutis:** Nunca shadow pesado, sempre leve e difuso
4. **Transições fluidas:** Todas as animações com easing natural
5. **Natureza digital:** Usar formas orgânicas (blob shapes) como decoração
6. **Verde como confiança:** Primary sempre transmite crescimento/saúde

---

*Preset Tech Orgânico v1.0 — OneManAgency*