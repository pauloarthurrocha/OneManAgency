# Template: Protocolo / Como Funciona

> **Uso:** Explicar o processo ou funcionamento do produto/serviço
> **Objetivo:** Reduzir fricção e mostrar simplicidade
> **Layout:** Steps numerados, timeline ou cards sequenciais

---

## Estrutura

```tsx
<section id="how-it-works" className="py-24 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold">
        Como Funciona
      </h2>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
        Em 3 passos simples você começa a ver resultados
      </p>
    </div>
    
    {/* Steps */}
    <div className="relative">
      {/* Connector line (desktop) */}
      <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-primary/20" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="relative text-center">
          <div className="w-12 h-12 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
            1
          </div>
          <h3 className="mt-6 text-xl font-semibold">Cadastre-se</h3>
          <p className="mt-2 text-muted-foreground">
            Crie sua conta em menos de 2 minutos. Sem cartão de crédito.
          </p>
        </div>
        
        {/* Step 2 */}
        <div className="relative text-center">
          <div className="w-12 h-12 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
            2
          </div>
          <h3 className="mt-6 text-xl font-semibold">Configure</h3>
          <p className="mt-2 text-muted-foreground">
            Personalize conforme suas necessidades com nosso setup guiado.
          </p>
        </div>
        
        {/* Step 3 */}
        <div className="relative text-center">
          <div className="w-12 h-12 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
            3
          </div>
          <h3 className="mt-6 text-xl font-semibold">Aproveite</h3>
          <p className="mt-2 text-muted-foreground">
            Comece a usar e veja resultados imediatos. Suporte 24/7.
          </p>
        </div>
      </div>
    </div>
    
    {/* CTA */}
    <div className="mt-16 text-center">
      <button className="cta-primary">Começar Agora →</button>
    </div>
  </div>
</section>
```

---

## Comportamentos

### Step Card
- **Number:** Circle com número, primary color
- **Title:** H3, curto (1-3 palavras)
- **Description:** 1 frase, foco na simplicidade
- **Connector:** Linha entre steps (desktop)

### Layout Variations
1. **Horizontal:** 3-4 steps em linha (padrão)
2. **Vertical:** Timeline vertical com steps alternando lados
3. **Cards:** Cards independentes sem conector
4. **Video:** Step + vídeo explicativo

### Interactions
- **Hover:** Step destaca, número scale
- **Scroll:** Steps aparecem sequencialmente
- **Click:** Opcional - expandir detalhes

---

## Animações

```css
/* Step entrance */
.step {
  animation: fadeUp 500ms ease-out forwards;
  opacity: 0;
}

.step:nth-child(1) { animation-delay: 0ms; }
.step:nth-child(2) { animation-delay: 200ms; }
.step:nth-child(3) { animation-delay: 400ms; }

/* Number pulse */
.step-number {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(var(--primary-rgb), 0); }
}

/* Connector draw */
.connector {
  animation: drawLine 1s ease-out forwards;
  transform-origin: left;
}

@keyframes drawLine {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

---

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `title` | string | - | Título da seção |
| `subtitle` | string | - | Subtítulo explicativo |
| `steps` | Array<{number, title, description, icon}> | [] | Lista de passos |
| `layout` | "horizontal" \| "vertical" | "horizontal" | Tipo de layout |
| `showConnector` | boolean | true | Se mostra linha conectora |
| `ctaText` | string | - | Texto do CTA final |

---

## Checklist de Implementação

- [ ] Máximo 4 steps (ideal: 3)
- [ ] Cada step é 1 ação simples
- [ ] Títulos curtos e claros
- [ ] Descrições focam na facilidade
- [ ] Números/badges visíveis
- [ ] Conector visual entre steps
- [ ] CTA claro no final
- [ ] Animação sequencial no scroll

---

*Template Protocolo/Como Funciona v1.0 — OneManAgency*