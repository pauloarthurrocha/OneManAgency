# Template: Planos / Pricing

> **Uso:** Seção de preços e planos
> **Objetivo:** Facilitar decisão de compra e destacar plano recomendado
> **Layout:** Cards de preço lado a lado ou tabela comparativa

---

## Estrutura

```tsx
<section id="pricing" className="py-24 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold">
        Planos Simples e Transparentes
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">
        Comece grátis. Escale quando precisar.
      </p>
    </div>
    
    {/* Pricing Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {/* Free Plan */}
      <PricingCard
        name="Gratuito"
        price="R$ 0"
        period="/mês"
        description="Para começar"
        features={[
          "1 projeto",
          "100 requisições/mês",
          "Suporte por email",
          "Analytics básico"
        ]}
        ctaText="Começar Grátis"
        ctaVariant="secondary"
      />
      
      {/* Pro Plan (Highlighted) */}
      <PricingCard
        name="Pro"
        price="R$ 97"
        period="/mês"
        description="Para profissionais"
        features={[
          "Projetos ilimitados",
          "10.000 requisições/mês",
          "Suporte prioritário",
          "Analytics avançado",
          "API access",
          "Integrações"
        ]}
        ctaText="Começar Pro"
        ctaVariant="primary"
        highlighted={true}
        badge="Mais Popular"
      />
      
      {/* Enterprise Plan */}
      <PricingCard
        name="Enterprise"
        price="R$ 297"
        period="/mês"
        description="Para equipes"
        features={[
          "Tudo do Pro",
          "Requisições ilimitadas",
          "Suporte 24/7",
          "SLA garantido",
          "Onboarding dedicado",
          "Custom integrations"
        ]}
        ctaText="Falar com Vendas"
        ctaVariant="secondary"
      />
    </div>
    
    {/* Trust badges */}
    <div className="mt-12 text-center">
      <p className="text-sm text-muted-foreground">
        ✓ 7 dias de garantia ✓ Cancele quando quiser ✓ Sem taxa de setup
      </p>
    </div>
  </div>
</section>
```

---

## Comportamentos

### Pricing Card
- **Header:** Nome do plano + badge (se highlighted)
- **Price:** Grande, bold, com período
- **Description:** 2-3 palavras
- **Features:** Lista com checkmarks
- **CTA:** Botão destacado
- **Highlighted:** Border/glow diferente, scale levemente maior

### Layout Variations
1. **3 cards:** Padrão (free/pro/enterprise)
2. **2 cards:** Starter / Pro
3. **Table:** Tabela comparativa detalhada
4. **Toggle:** Monthly / Yearly com desconto

### Interactions
- **Hover:** Card eleva, shadow aumenta
- **Highlighted:** Sempre com destaque visual
- **Toggle:** Animação suave entre preços

---

## Animações

```css
/* Card hover */
.pricing-card {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}

.pricing-card:hover {
  transform: translateY(-8px);
}

/* Highlighted card */
.pricing-card.highlighted {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.pricing-card.highlighted:hover {
  transform: scale(1.07) translateY(-8px);
}

/* Price toggle */
.price {
  animation: fadeIn 300ms ease-out;
}

/* Feature checkmarks */
.feature-check {
  animation: checkPop 400ms ease-out forwards;
}

@keyframes checkPop {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
```

---

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `title` | string | - | Título da seção |
| `subtitle` | string | - | Subtítulo |
| `plans` | Array<Plan> | [] | Lista de planos |
| `highlightedIndex` | number | 1 | Índice do plano destacado |
| `showToggle` | boolean | false | Toggle mensal/anual |
| `currency` | string | "R$" | Moeda |

---

## Checklist de Implementação

- [ ] 2-3 planos (nunca mais que 4)
- [ ] Plano do meio destacado como "recomendado"
- [ ] Preços claros com período
- [ ] Features listadas com checkmarks
- [ ] CTA diferente por plano (grátis vs pago)
- [ ] Garantias/segurança abaixo
- [ ] Toggle mensal/anual se aplicável
- [ ] Hover effects nos cards
- [ ] Responsive (empilhado no mobile)

---

*Template Planos/Pricing v1.0 — OneManAgency*