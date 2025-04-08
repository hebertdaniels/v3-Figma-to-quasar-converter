# Quasar to Figma Converter

Um plugin para o Figma que converte componentes desenvolvidos com Vue.js utilizando o framework Quasar em componentes funcionais no Figma, replicando a estrutura de camadas e a nomenclatura da interface do usuário (UI) do Quasar.

## Funcionalidades

- Converte código Vue.js/Quasar para estruturas de nós no Figma
- Mantém a nomenclatura das camadas consistente com a estrutura do Quasar
- Transfere propriedades visuais básicas (cores, tamanhos, espaçamentos)
- Suporta componentes comuns do Quasar como q-btn, q-card, q-input e q-list

## Estrutura do Projeto

```
quasar-to-figma-converter/
├── manifest.json     # Configuração do plugin
├── code.js           # Lógica principal do plugin
├── ui.html           # Interface do usuário
└── README.md         # Documentação
```

## Como Usar

1. Instale o plugin no Figma
2. Abra-o na interface do Figma (Plugins > Quasar to Figma Converter)
3. Cole o código Vue.js/Quasar (incluindo as seções `<template>` e `<script>`) na área de texto
4. Clique em "Converter para Figma"
5. O componente será criado e adicionado à sua página atual do Figma

## Desenvolvimento

### Pré-requisitos

- Node.js e npm/yarn
- Editor de código (recomendado: Visual Studio Code)
- Conta de desenvolvedor Figma para publicar plugins

### Configuração do Ambiente

1. Clone este repositório:
   ```
   git clone https://github.com/seu-usuario/quasar-to-figma-converter.git
   cd quasar-to-figma-converter
   ```

2. Instale as extensões recomendadas para VS Code:
   - ESLint
   - Prettier
   - Figma Plugin Helper

3. Adicione o plugin ao Figma (modo desenvolvedor):
   - Abra o Figma Desktop
   - Vá para Plugins > Development > New Plugin
   - Selecione a pasta do projeto (com o arquivo manifest.json)

### Testes

Para testar o plugin:

1. Abra o Figma Desktop
2. Vá para Plugins > Development > Quasar to Figma Converter
3. Utilize exemplos de código Quasar para verificar a conversão

## Limitações Atuais

- O analisador HTML é simplificado e pode não funcionar com estruturas muito complexas
- Suporte limitado para transferência de estilos
- Nem todos os componentes Quasar são suportados completamente

## Próximos Passos

- Melhorar o analisador HTML para suportar estruturas mais complexas
- Adicionar suporte para mais componentes Quasar
- Implementar conversão de propriedades avançadas (transições, animações)
- Adicionar suporte para reaproveitamento de estilos de design tokens

## Contribuição

Contribuições são bem-vindas! Por favor, siga estas etapas:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/sua-feature`)
3. Faça commit das suas mudanças (`git commit -m 'Adicionar nova feature'`)
4. Push para a branch (`git push origin feature/sua-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.