# Template: Features

> **Uso:** Seção de funcionalidades/benefícios
> **Objetivo:** Mostrar o que o produto faz e seus principais benefícios
> **Layout:** Grid de cards ou lista com ícones

---

## Estrutura

```tsx
<section id="features" className="py-24 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold">
        Tudo que você precisa
      </h2>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
        Subtítulo explicando por que essas features são importantes
      </p>
    </div>
    
    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <FeatureCard
        icon={<ZapIcon />}
        title="Feature 1"
        description="Descrição clara do benefício que essa feature traz."
      />
      <FeatureCard
        icon={<ShieldIcon />}
        title="Feature 2"
        description="Foque no resultado, não na tecnologia."
      />
      <FeatureCard
        icon={<BarChartIcon />}
        title="Feature 3"
        description="Como isso melhora a vida do usuário."
      />
      <FeatureCard
        icon={<UsersIcon />}
        title="Feature 4"
        description="Benefício mensurável quando possível."
      />
      <FeatureCard
        icon={<GlobeIcon />}
        title="Feature 5"
        description="Simplicidade na explicação."
      />
      <FeatureCard
        icon={<ClockIcon />}
        title="Feature 6"
        description="Foque no 'por que', não no 'como'."
      />
    </div>
  </div>
</section>
```

---

## Comportamentos

### Feature Card
- **Icon:** 48px, color primary ou accent
- **Title:** H3, 1-3 palavras
- **Description:** 1-2 frases, foco no benefício
- **Hover:** Elevação sutil + icon scale

### Layout Variations
1. **3 columns:** Padrão para 6 features
2. **2 columns:** Para 4 features com mais detalhes
3. **Alternating:** Imagem + texto alternando (para features maiores)
4. **With images:** Cards com screenshots/ilustrações

### Interactions
- **Hover:** Card eleva, ícone anima
- **Scroll:** Cards aparecem com stagger
- **Click:** Opcional - expandir para mais detalhes

---

## Animações

```css
/* Card hover */
.feature-card {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
}

.feature-card:hover .icon {
  transform: scale(1.1);
}

/* Scroll reveal */
.feature-card {
  animation: fadeUp 500ms ease-out forwards;
  opacity: 0;
}

.feature-card:nth-child(1) { animation-delay: 0ms; }
.feature-card:nth-child(2) { animation-delay: 100ms; }
.feature-card:nth-child(3) { animation-delay: 200ms; }
/* ... */
```

---

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `title` | string | - | Título da seção |
| `subtitle` | string | - | Subtítulo da seção |
| `features` | Array<{icon, title, description}> | [] | Lista de features |
| `columns` | 2 \| 3 | 3 | Número de colunas |
| `layout` | "grid" \| "alternating" | "grid" | Tipo de layout |

---

## Checklist de Implementação

- [ ] 3-6 features (não mais que 6)
- [ ] Cada feature foca em 1 benefício
- [ ] Ícones consistentes e relevantes
- [ ] Títulos curtos e diretos
- [ ] Descrições focam no "por que"
- [ ] Grid responsivo
- [ ] Hover effects sutis
- [ ] Stagger animation no scroll

---

*Template Features v1.0 — Agência AI Adaptável*