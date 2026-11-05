# Tauste Roupas — protótipo web de gestão de estoque

**Projeto acadêmico individual (2026)** • Riot Soluções de TI / cliente fictício Tauste Roupas

## Como abrir

1. Extraia todos os arquivos da pasta.
2. Abra `index.html` no Chrome, Edge, Firefox ou outro navegador recente. Não é necessário instalar bibliotecas ou configurar um servidor.
3. Alternativamente, abra o arquivo único `Tauste_Roupas_Prototipo.html` fornecido separadamente.

## O que funciona

- Painel com métricas atualizadas de estoque.
- Consulta de modelos e das variações de **cor e tamanho**.
- Cadastro de novos modelos e distribuição automática do estoque inicial entre variações (selecionar perfil **Gerente**).
- Registro de entradas e saídas de mercadorias **por variação**, com validação contra saldo negativo.
- Alertas de **estoque baixo** (saldo entre 1 e 10% do inicial da variação) e **esgotado** (saldo 0).
- Histórico das movimentações feitas durante o uso do protótipo.
- Exportação do saldo e do histórico em **CSV**.
- Persistência local no navegador por `localStorage`, quando permitido.
- Botão **Restaurar cenário** para retornar aos dados do notebook.

## Dados de demonstração

Dados **fictícios e simulados**, reproduzidos do notebook `Disciplina_2_Analise_de_Dados_Tauste_Roupas_ (2).ipynb`, desenvolvido para o projeto:

- 10 modelos de vestuário, 68 variações de cor/tamanho.
- 532 peças de estoque **inicial**.
- 97 peças como **saldo de setembro de 2026**.
- 26 variações normais, 31 com estoque baixo, 11 esgotadas, seguindo a regra de estoque mínimo do notebook.
- Os dados de movimentações simuladas de julho a setembro que constam no notebook **não** estão inseridos no histórico do protótipo; o histórico mostra só as operações feitas pelo usuário no navegador.

## Teste rápido sugerido para o vídeo

1. Abra a Visão geral e mostre as métricas.
2. Vá em Produtos, clique em `Camiseta oversized` e mostre as 8 variações reais do notebook.
3. Em Alertas, filtre mentalmente o exemplo `Meia de cano alto` (saldo 0 em setembro).
4. Registre uma **entrada** de 5 unidades em uma variação esgotada e confirme a atualização do painel.
5. Registre uma **saída**; tente registrar outra maior que o saldo para demonstrar a validação.
6. Com o perfil Gerente, cadastre um produto novo e mostre suas cores e tamanhos.
7. Exporte o estoque para CSV e, se quiser repetir os testes, clique em Restaurar cenário.

## Estrutura

- `index.html`: layout, menus e elementos básicos.
- `styles.css`: estilo responsivo.
- `seed.js`: dados **idênticos ao cenário do notebook**, antes de operações na interface.
- `app.js`: interações, cadastro, movimentações, alertas, histórico e exportações.

## Limitações importantes

**Este é um protótipo funcional de interface (front-end), não um sistema comercial pronto.** Não há banco de dados no servidor, login, autenticação, controle real de permissões, trilha de auditoria imutável, API, testes de segurança ou sincronização entre dispositivos. A opção "Perfil de demonstração" apenas simula a visualização do Gerente e do Funcionário; não impede tecnicamente que outra pessoa altere os dados do navegador. Os registros ficam apenas no navegador/dispositivo utilizado e podem ser apagados ao limpar os dados do site.

Para produção, seria necessário implementar back-end, autenticação/autorização no servidor, banco de dados, auditoria, proteção de dados e testes completos de segurança.

## Como testar tecnicamente

- No navegador, valide saldos e alertas após entradas e saídas.
- Confira que uma saída acima do saldo é rejeitada.
- Confira que o botão Restaurar volta a 97 peças e 68 variações.
- Acesse o código e analise as regras de estoque mínimo.

Este arquivo e o projeto são adequados como **ponto de partida para a implementação acadêmica**, mas devem ser validados pelo aluno e pelo professor antes de afirmar cumprimento integral dos requisitos.
