# Template: Navbar

> **Uso:** Navegação principal da landing page
> **Posição:** Fixo no topo (sticky)
> **Altura:** 64px-80px

---

## Estrutura

```tsx
<nav className="fixed top-0 left-0 right-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="flex-shrink-0">
        <a href="/" className="text-xl font-bold">
          Logo
        </a>
      </div>
      
      {/* Nav Links (desktop) */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="#features">Features</a>
        <a href="#about">Sobre</a>
        <a href="#pricing">Preços</a>
      </div>
      
      {/* CTA Button */}
      <div className="hidden md:block">
        <button className="cta-button">
          Começar Agora
        </button>
      </div>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button aria-label="Menu">
          <MenuIcon />
        </button>
      </div>
    </div>
  </div>
  
  {/* Mobile Menu (overlay) */}
  <MobileMenu />
</nav>
```

---

## Comportamentos

### Scroll Behavior
- **Initial:** Transparente ou com background sutil
- **Scroll > 50px:** Adiciona background blur + shadow
- **Transição:** 200ms ease-out

```css
/* Estado inicial */
.navbar { background: transparent; }

/* Estado scrolled */
.navbar.scrolled {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
```

### Mobile Menu
- **Trigger:** Click no hamburger icon
- **Animation:** Slide-in da direita ou fade-in
- **Overlay:** Background escuro semi-transparente
- **Close:** Click no overlay, ESC key, ou click no close button

### Active Link
- Indica qual seção está visível no viewport
- Smooth scroll para a seção ao clicar

---

## Animações

```css
/* Scroll transition */
.navbar {
  transition: background 200ms ease-out, box-shadow 200ms ease-out;
}

/* Mobile menu */
.mobile-menu {
  animation: slideIn 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
```

---

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `logo` | string | - | Texto ou componente do logo |
| `links` | Array<{label, href}> | [] | Links de navegação |
| `ctaText` | string | "Começar" | Texto do botão CTA |
| `ctaHref` | string | "#" | Link do CTA |
| `transparent` | boolean | true | Se começa transparente |

---

## Checklist de Implementação

- [ ] Sticky/fixed no topo
- [ ] Background muda ao scroll
- [ ] Backdrop-filter blur quando scrolled
- [ ] Mobile responsive (hamburger menu)
- [ ] Focus states acessíveis
- [ ] Smooth scroll para âncoras
- [ ] Logo clicável (volta ao topo)
- [ ] Altura consistente (64-80px)

---

*Template Navbar v1.0 — Agência AI Adaptável*