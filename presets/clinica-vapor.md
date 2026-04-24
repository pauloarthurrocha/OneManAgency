# Preset: Clínica Vapor

> **Identidade:** Precisão médica. Clareza científica. Confiança técnica.
> **Uso ideal:** Health tech, SaaS médico, telemedicina, biotech, insurance tech
> **Mood:** Profissional, limpo, confiável, técnico

---

## Paleta de Cores

### Cores Primárias
| Token | Hex | Uso |
|---|---|---|
| `--primary-50` | `#f0f9ff` | Backgrounds sutis |
| `--primary-100` | `#e0f2fe` | Hover states |
| `--primary-500` | `#0ea5e9` | CTAs principais, acentos |
| `--primary-600` | `#0284c7` | Hover em CTAs |
| `--primary-900` | `#0c4a6e` | Textos em fundos claros |

### Cores de Destaque (Ciano/Teal)
| Token | Hex | Uso |
|---|---|---|
| `--accent-teal` | `#14b8a6` | Sucesso, confirmado, saúde |
| `--accent-cyan` | `#06b6d4` | Info, dados, gráficos |
| `--accent-indigo` | `#6366f1` | Destaques, badges |

### Neutros (Clean White)
| Token | Hex | Uso |
|---|---|---|
| `--neutral-50` | `#ffffff` | Background principal |
| `--neutral-100` | `#f8fafc` | Cards, seções alternadas |
| `--neutral-200` | `#e2e8f0` | Bordas, divisores |
| `--neutral-500` | `#64748b` | Texto secundário |
| `--neutral-900` | `#0f172a` | Texto principal |

### Gradientes
```css
--gradient-clean: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
--gradient-blue: linear-gradient(90deg, #0ea5e9 0%, #06b6d4 100%);
--gradient-soft: linear-gradient(180deg, rgba(14,165,233,0.05) 0%, transparent 100%);
```

---

## Tipografia

### Fonte Display
- **Fonte:** Inter (ou Geist Sans)
- **Peso:** 600-700
- **Tracking:** -0.01em
- **Uso:** Headlines H1-H2

### Fonte Body
- **Fonte:** Inter
- **Peso:** 400
- **Line-height:** 1.6
- **Uso:** Parágrafos

### Fonte Monospace (Dados/Técnicos)
- **Fonte:** JetBrains Mono ou SF Mono
- **Peso:** 400
- **Uso:** Código, dados, estatísticas

### Escala
```
H1: 3rem (48px) / line-height 1.2 / weight 700
H2: 2rem (32px) / line-height 1.3 / weight 600
H3: 1.25rem (20px) / line-height 1.4 / weight 600
Body: 1rem (16px) / line-height 1.6 / weight 400
Small: 0.875rem (14px) / line-height 1.5 / weight 400
Mono: 0.875rem (14px) / line-height 1.5 / weight 400
```

---

## Component Behaviors

### Cards
- Border-radius: 8px
- Background: white
- Shadow: `0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)`
- Border: 1px solid `--neutral-200`
- Hover: shadow aumenta levemente

### Botões
- **Primary:** Background `--primary-500`, text white, radius 6px
- **Secondary:** Border 1px `--primary-500`, text `--primary-600`, bg white
- **Tertiary:** Text `--neutral-500`, hover text `--primary-600`
- **Success:** Background `--accent-teal`, text white (para ações positivas)
- Hover: brightness(1.05) + shadow sutil

### Inputs
- Border: 1px solid `--neutral-200`
- Focus: border `--primary-500` + shadow `0 0 0 3px rgba(14,165,233,0.1)`
- Radius: 6px
- Background: white

### Data/Stats Cards
- Background: `--neutral-100`
- Border-left: 4px solid `--primary-500` (ou teal para positivo)
- Padding: 16px 20px
- Monospace para números

---

## Animações

### Hero
- **Entrada:** Fade-up suave
- **Duração:** 500ms
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)`
- **Efeito:** Suave, profissional, sem exageros

### Scroll
- **Reveal:** Fade-up leve
- **Duração:** 400ms
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)`

### Hover
- **Botões:** Brightness sutil + shadow
- **Cards:** Elevação mínima (2px)
- **Links:** Color shift para `--primary-600`
- **Data cards:** Border-left glow

### Background
- **Hero:** Branco limpo com gradient sutil azul no topo
- **Efeito:** Soft gradient ou pattern de grid médico (muito sutil)
- **Optional:** Animated wave ou pulse suave

---

## Padrão de Hero

```
┌─────────────────────────────────────────────┐
│  [Navbar: logo + nav links + CTA primary]   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  Badge: "HIPAA Compliant ✓"        │   │
│  │                                     │   │
│  │  Headline (H1):                     │   │
│  │  "Tecnologia Médica                 │   │
│  │   de Precisão"                      │   │
│  │                                     │   │
│  │  Subheadline:                       │   │
│  │  "Soluções certificadas para..."    │   │
│  │                                     │   │
│  │  [CTA Primary] [CTA Secondary]      │   │
│  │                                     │   │
│  │  Stats:                             │   │
│  │  ┌─────────┐ ┌─────────┐ ┌────────┐│   │
│  │  │ 99.9%   │ │ 50k+    │ │ 24/7   ││   │
│  │  │ uptime  │ │ users   │ │ support││   │
│  │  └─────────┘ └─────────┘ └────────┘│   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [Visual: Dashboard médico limpo,          │
│   gráficos, dados, interface profissional] │
└─────────────────────────────────────────────┘
```

---

## Regras Premium

1. **Branco dominante:** Background principal sempre branco ou quase branco
2. **Ciano como saúde:** Azul claro transmite confiança médica
3. **Teal para sucesso:** Verde-água para estados positivos/confirmados
4. **Dados visíveis:** Estatísticas e números em destaque
5. **Consistência médica:** Termos técnicos usados corretamente
6. **Acessibilidade máxima:** Contraste alto, fontes legíveis
7. **Formas suaves:** Radius moderado, sem arestas agressivas
8. **Espaçamento claro:** Hierarquia visual óbvia, information architecture limpa

---

*Preset Clínica Vapor v1.0 — Agência AI Adaptável*