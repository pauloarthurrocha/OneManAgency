# Template: Hero

> **Uso:** Seção principal acima da dobra
> **Objetivo:** Capturar atenção e transmitir value proposition em 5 segundos
> **Altura:** 100vh (full viewport) ou min-height 600px

---

## Estrutura

```tsx
<section className="relative min-h-screen flex items-center justify-center">
  {/* Background (gradient, image, or pattern) */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100" />
  
  {/* Content */}
  <div className="relative max-w-4xl mx-auto px-4 text-center">
    {/* Tagline / Badge */}
    <div className="mb-6">
      <span className="badge">Nova versão 2.0</span>
    </div>
    
    {/* Headline */}
    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
      Headline Principal que Conecta
    </h1>
    
    {/* Subheadline */}
    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
      Subheadline que expande a proposta de valor e explica o benefício principal em uma frase.
    </p>
    
    {/* CTA Group */}
    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
      <button className="cta-primary">Começar Grátis</button>
      <button className="cta-secondary">Ver Demo</button>
    </div>
    
    {/* Social Proof */}
    <div className="mt-12">
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <div className="flex -space-x-2">
          <Avatar src="user1.jpg" />
          <Avatar src="user2.jpg" />
          <Avatar src="user3.jpg" />
        </div>
        <span>★★★★★ 4.9/5 de 2,000+ avaliações</span>
      </div>
    </div>
    
    {/* Visual/Mockup */}
    <div className="mt-16 relative">
      <ProductMockup />
    </div>
  </div>
  
  {/* Scroll indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
    <ScrollIndicator />
  </div>
</section>
```

---

## Comportamentos

### Layout
- **Desktop:** Texto centralizado, mockup abaixo ou ao lado
- **Mobile:** Texto centralizado, mockup abaixo, CTAs empilhados
- **Alinhamento:** Center (padrão) ou left (alternativo)

### Background Options
1. **Gradient:** Suave, relacionado à paleta do preset
2. **Solid + Pattern:** Cor sólida com pattern sutil
3. **Image:** Foto de background com overlay escuro
4. **Abstract:** Formas orgânicas/geométricas decorativas

### Scroll Indicator
- **Posição:** Bottom center
- **Animação:** Bounce sutil
- **Ação:** Smooth scroll para próxima seção ao clicar

---

## Animações

```css
/* Staggered entrance */
.hero > * {
  animation: fadeUp 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
}

.hero > *:nth-child(1) { animation-delay: 0ms; }
.hero > *:nth-child(2) { animation-delay: 100ms; }
.hero > *:nth-child(3) { animation-delay: 200ms; }
.hero > *:nth-child(4) { animation-delay: 300ms; }
.hero > *:nth-child(5) { animation-delay: 400ms; }
.hero > *:nth-child(6) { animation-delay: 500ms; }

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scroll indicator bounce */
.scroll-indicator {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}
```

---

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `badge` | string | - | Texto do badge/tagline |
| `headline` | string | - | Headline principal |
| `subheadline` | string | - | Subheadline |
| `primaryCta` | {text, href} | - | CTA principal |
| `secondaryCta` | {text, href} | - | CTA secundário |
| `socialProof` | object | - | Dados de social proof |
| `showMockup` | boolean | true | Se mostra mockup/visual |
| `alignment` | "center" \| "left" | "center" | Alinhamento do conteúdo |

---

## Checklist de Implementação

- [ ] Headline comunica valor em 5 segundos
- [ ] Subheadline expande a proposta
- [ ] CTAs claros e action-oriented
- [ ] Social proof visível
- [ ] Mockup/visual representativo
- [ ] Animação de entrada suave
- [ ] Responsive (mobile/desktop)
- [ ] Scroll indicator opcional
- [ ] Background não compete com conteúdo

---

*Template Hero v1.0 — OneManAgency*