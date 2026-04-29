# 🚀 Guia de Deploy - Vercel

## Passo 1: Acessar o Vercel
1. Vá para [vercel.com](https://vercel.com)
2. Clique em **"Sign Up"** (ou faça login se já tem conta)
3. Escolha fazer login com **GitHub**

## Passo 2: Importar Repositório
1. Clique em **"New Project"** ou **"Import Project"**
2. Selecione **GitHub** como origem
3. Procure e selecione o repositório: **Caminho-Reino**
4. Clique em **"Import"**

## Passo 3: Configuração do Projeto
A Vercel deve detectar automaticamente que é um projeto Vite. Se não:

**Build Command:** `npm run build`  
**Output Directory:** `dist`  
**Install Command:** `npm install`

## Passo 4: Deploy
1. Clique em **"Deploy"**
2. Aguarde a conclusão (geralmente 1-2 minutos)
3. Você receberá uma URL como: `https://caminho-reino.vercel.app`

## Pronto! 🎉
Qualquer pessoa agora pode acessar o jogo em:
```
https://seu-projeto.vercel.app
```

## Atualizações Futuras
Qualquer push que você fizer no repositório GitHub será automaticamente deployado no Vercel!

---

**Nota:** O backend (servidor Node.js na porta 3001) também precisa ser deployado em separado se quiser usar a autenticação. Para agora, o jogo funciona offline.
