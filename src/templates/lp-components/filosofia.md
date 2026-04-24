# Template: Filosofia / Sobre

> **Uso:** Seção de propósito, valores ou história da marca
> **Objetivo:** Criar conexão emocional e transmitir valores
> **Layout:** Texto + imagem ou storytelling visual

---

## Estrutura

```tsx
<section id="about" className="py-24 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Layout 1: Texto + Imagem lado a lado */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Text Content */}
      <div>
        <span className="text-sm font-semibold text-primary uppercase tracking-wide">
          Nossa Filosofia
        </span>
        
        <h2 className="mt-4 text-3xl md:text-4xl font-bold">
          Por que fazemos o que fazemos
        </h2>
        
        <p className="mt-6 text-lg text-muted-foreground">
          Parágrafo explicando a missão, o problema que resolvem, 
          e por que isso importa. Conectar com valores do público.
        </p>
        
        <p className="mt-4 text-lg text-muted-foreground">
          Segundo parágrafo com a visão ou abordagem única. 
          O que diferencia essa marca da concorrência.
        </p>
        
        {/* Values/Stats */}
        <div className="mt-8 grid grid-cols-3 gap-6">
          <div>
            <div className="text-3xl font-bold text-primary">50k+</div>
            <div className="text-sm text-muted-foreground">Usuários ativos</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Suporte</div>
          </div>
        </div>
      </div>
      
      {/* Visual */}
      <div className="relative">
        <Image
          src="/team-or-product.jpg"
          alt="Descrição"
          className="rounded-2xl shadow-xl"
        />
        {/* Decorative element */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full" />
      </div>
    </div>
  </div>
</section>
```

---

## Comportamentos

### Layout Variations
1. **Text + Image:** 50/50 grid, imagem ilustrativa
2. **Storytelling:** Full-width com quotes, timeline ou cards de valores
3. **Video:** Embed de vídeo de fundo/declaração
4. **Team:** Fotos da equipe com bios curtas

### Stats/Valores
- Números grandes (display font)
- Labels descritivos abaixo
- Opcional: contador animado

### Interactions
- **Scroll:** Texto e imagem aparecem com fade
- **Stats:** Contador animado ao entrar no viewport
- **Image:** Parallax sutil (opcional)

---

## Animações

```css
/* Counter animation */
.stat-number {
  animation: countUp 2s ease-out forwards;
}

/* Image reveal */
.about-image {
  animation: fadeIn 700ms ease-out;
}

/* Text stagger */
.about-text > * {
  animation: fadeUp 500ms ease-out forwards;
  opacity: 0;
}

.about-text > *:nth-child(1) { animation-delay: 0ms; }
.about-text > *:nth-child(2) { animation-delay: 100ms; }
.about-text > *:nth-child(3) { animation-delay: 200ms; }
```

---

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `eyebrow` | string | - | Texto acima do título (uppercase) |
| `title` | string | - | Título principal |
| `paragraphs` | string[] | [] | Parágrafos de texto |
| `stats` | Array<{value, label}> | [] | Estatísticas |
| `image` | string | - | URL da imagem |
| `layout` | "split" \| "full" | "split" | Tipo de layout |

---

## Checklist de Implementação

- [ ] Texto conecta emocionalmente
- [ ] Missão/valores claros
- [ ] Stats relevantes e verificáveis
- [ ] Imagem de alta qualidade
- [ ] Layout responsivo
- [ ] Animações suaves no scroll
- [ ] Counter animado para stats
- [ ] Espaçamento generoso

---

*Template Filosofia/Sobre v1.0 — Agência AI Adaptável*