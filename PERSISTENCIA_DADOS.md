# 📱 Sistema de Persistência de Dados - Caminho do Reino

## O que foi implementado?

Um sistema completo de **persistência local de dados** que salva automaticamente o progresso do jogador no **cache do navegador** (localStorage). Agora o usuário **não precisa começar do zero** toda vez que jogar!

## 🎯 Dados que são salvos automaticamente

- ✅ **Capítulos concluídos** - Quais capítulos o jogador finalizou
- ✅ **Itens coletados** - Todos os itens/recompensas obtidas no inventário
- ✅ **Pontuação total** - Sua pontuação acumulada em todos os capítulos
- ✅ **Timestamp** - Data e hora da última vez que foi salvo

## 🛠️ Como funciona?

### 1. **Carregamento Automático**
Quando o jogador abre o jogo pela primeira vez, o sistema:
- Verifica se existem dados salvos no localStorage
- Se existirem, carrega automaticamente o progresso
- Se não existirem, começa um novo jogo

### 2. **Salvamento Automático**
Toda vez que o jogador:
- Completa um capítulo
- Coleta um item
- Ganha pontos

Os dados são salvos automaticamente no cache do navegador (com um pequeno delay para não sobrecarregar).

### 3. **Armazenamento Local**
Os dados são armazenados no **localStorage** do navegador com a chave `caminhoReinoGameData`:
- Não requer internet
- Fica salvo mesmo após fechar o navegador
- Funciona no computador/dispositivo específico
- Cada navegador e dispositivo tem seu próprio save

## 📂 Arquivos criados/modificados

### Novos Arquivos:
- `src/hooks/useGamePersistence.js` - Hook customizado que gerencia toda a lógica de persistência

### Arquivos Modificados:
- `src/QuizGame.jsx` - Integração do hook de persistência
- `src/QuizGame.css` - Estilos para o modal de reset

## 🎮 Como usar

### Jogo Normal
1. Abra o jogo
2. Seu progresso anterior é carregado automaticamente
3. Jogue normalmente - os dados são salvos automaticamente

### Resetar Progresso
1. Clique em **"🔄 Resetar Dados"** no menu inicial
2. Um modal pedirá confirmação
3. Clique em **"Resetar Tudo"** para remover todos os dados salvos

## 💾 Detalhes Técnicos

### Hook `useGamePersistence`

```javascript
const { clearSavedData, exportGameData, importGameData } = useGamePersistence({
  chaptersCompleted,
  inventory,
  totalScore,
  setChaptersCompleted,
  setInventory,
  setTotalScore
});
```

**Funções disponíveis:**

- `clearSavedData()` - Remove todos os dados salvos
- `exportGameData()` - Retorna os dados em formato JSON (para backup)
- `importGameData(jsonString)` - Importa dados de um backup anterior

### Estrutura dos dados salvos

```json
{
  "chaptersCompleted": [0, 1, 2],
  "inventory": [
    { "name": "Estrela de Belém", "icon": "⭐", "chapterId": 0 },
    { "name": "Cruz de Luz", "icon": "🕊️", "chapterId": 1 }
  ],
  "totalScore": 5000,
  "lastSaved": "2024-04-30T10:30:45.123Z"
}
```

## 🔒 Privacidade e Segurança

- Os dados são **armazenados localmente** no seu dispositivo
- **Não são enviados para nenhum servidor**
- Você tem **controle total** sobre seus dados
- Pode resetar ou limpar a qualquer momento

## 📊 Limitações

- Storage está limitado a ~5-10MB por navegador/site (mais que suficiente para este jogo)
- Dados são perdidos se você limpar o cache do navegador
- Dados são específicos por navegador e dispositivo

## 🚀 Próximas melhorias possíveis

- [ ] Exportar/importar dados para fazer backup em arquivo
- [ ] Sincronizar dados com servidor (opcional)
- [ ] QR code para compartilhar progresso
- [ ] Múltiplos perfis de jogador

## ✅ Testando

Para verificar se está funcionando:

1. Jogue um capítulo e feche o jogo
2. Reabra o jogo - seu progresso deve estar lá
3. Abra o DevTools (F12) → Guia "Application" → "Local Storage" → Procure por `caminhoReinoGameData`

---

**Sistema desenvolvido com React Hooks e localStorage nativo do navegador**
