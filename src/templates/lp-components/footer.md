# Template: Footer

> **Uso:** Rodapé da landing page
> **Objetivo:** Navegação final, links legais, e CTA final
> **Layout:** Multi-coluna ou simples

---

## Estrutura

```tsx
<footer className="bg-neutral-900 text-white py-16 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Main Footer */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
      {/* Brand Column */}
      <div className="col-span-1 md:col-span-1">
        <div className="text-2xl font-bold">Logo</div>
        <p className="mt-4 text-neutral-400">
          Breve descrição da marca ou tagline.
        </p>
        
        {/* Social Links */}
        <div className="mt-6 flex space-x-4">
          <a href="#" aria-label="Twitter">
            <TwitterIcon className="w-5 h-5 text-neutral-400 hover:text-white" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <LinkedInIcon className="w-5 h-5 text-neutral-400 hover:text-white" />
          </a>
          <a href="#" aria-label="Instagram">
            <InstagramIcon className="w-5 h-5 text-neutral-400 hover:text-white" />
          </a>
        </div>
      </div>
      
      {/* Links Columns */}
      <div>
        <h4 className="font-semibold mb-4">Produto</h4>
        <ul className="space-y-2">
          <li><a href="#features" className="text-neutral-400 hover:text-white">Features</a></li>
          <li><a href="#pricing" className="text-neutral-400 hover:text-white">Preços</a></li>
          <li><a href="#" className="text-neutral-400 hover:text-white">Integrações</a></li>
          <li><a href="#" className="text-neutral-400 hover:text-white">Changelog</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold mb-4">Empresa</h4>
        <ul className="space-y-2">
          <li><a href="#about" className="text-neutral-400 hover:text-white">Sobre</a></li>
          <li><a href="#" className="text-neutral-400 hover:text-white">Blog</a></li>
          <li><a href="#" className="text-neutral-400 hover:text-white">Carreiras</a></li>
          <li><a href="#" className="text-neutral-400 hover:text-white">Contato</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold mb-4">Legal</h4>
        <ul className="space-y-2">
          <li><a href="#" className="text-neutral-400 hover:text-white">Privacidade</a></li>
          <li><a href="#" className="text-neutral-400 hover:text-white">Termos</a></li>
          <li><a href="#" className="text-neutral-400 hover:text-white">Cookies</a></li>
        </ul>
      </div>
    </div>
    
    {/* Bottom Bar */}
    <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
      <p className="text-neutral-400 text-sm">
        © 2024 Sua Empresa. Todos os direitos reservados.
      </p>
      
      {/* Newsletter (opcional) */}
      <div className="mt-4 md:mt-0">
        <form className="flex gap-2">
          <input
            type="email"
            placeholder="Seu email"
            className="px-4 py-2 bg-neutral-800 rounded text-white placeholder-neutral-500"
          />
          <button className="px-4 py-2 bg-primary rounded text-white">
            Assinar
          </button>
        </form>
      </div>
    </div>
  </div>
</footer>
```

---

## Comportamentos

### Layout Variations
1. **Multi-column:** Brand + 3-4 colunas de links (padrão)
2. **Simple:** Logo + links em linha + copyright
3. **CTA-focused:** Footer com CTA grande antes das colunas
4. **Newsletter:** Destaque para newsletter signup

### Links
- **Hover:** Cor muda para branco
- **Focus:** Outline visível
- **External:** Ícone de external link

### Newsletter
- **Input:** Placeholder claro
- **Button:** Primary color
- **Success:** Mensagem de confirmação
- **Error:** Validação inline

---

## Animações

```css
/* Link hover */
.footer-link {
  transition: color 200ms ease-out;
}

/* Social icon hover */
.social-icon {
  transition: transform 200ms ease-out, color 200ms ease-out;
}

.social-icon:hover {
  transform: translateY(-2px);
}
```

---

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `logo` | string | - | Logo ou nome da marca |
| `description` | string | - | Descrição curta |
| `columns` | Array<{title, links}> | [] | Colunas de links |
| `socialLinks` | Array<{icon, href, label}> | [] | Links sociais |
| `showNewsletter` | boolean | false | Se mostra newsletter form |
| `copyright` | string | - | Texto de copyright |

---

## Checklist de Implementação

- [ ] Logo clicável (volta ao topo)
- [ ] Links organizados em colunas
- [ ] Links sociais com aria-labels
- [ ] Hover states claros
- [ ] Copyright atualizado
- [ ] Links legais (privacidade, termos)
- [ ] Newsletter opcional
- [ ] Responsive (colunas empilhadas no mobile)
- [ ] Contraste adequado (fundo escuro)

---

*Template Footer v1.0 — Agência AI Adaptável*