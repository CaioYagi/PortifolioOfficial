# Integral Calculator

Este projeto é uma calculadora de integrais desenvolvida em React. A aplicação permite que os usuários insiram funções matemáticas e calculem suas integrais, utilizando um teclado virtual e uma interface amigável.

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

```
integral-calculator
├── src
│   ├── pages
│   │   └── calculator.js
│   ├── components
│   │   ├── VirtualKeyboard.js
│   │   ├── FunctionInput.js
│   │   ├── MathSymbolAnimation.js
│   │   └── CalculatorDisplay.js
│   ├── styles
│   │   ├── Calculator.module.css
│   │   ├── VirtualKeyboard.module.css
│   │   ├── FunctionInput.module.css
│   │   └── MathSymbolAnimation.module.css
│   ├── utils
│   │   ├── mathParser.js
│   │   └── integralSolver.js
│   └── hooks
│       └── useCalculator.js
├── package.json
└── README.md
```

## Funcionalidades

- **Entrada de Função**: O usuário pode digitar ou colar uma função matemática na caixa de entrada.
- **Teclado Virtual**: Um teclado virtual facilita a inserção de funções matemáticas.
- **Cálculo de Integrais**: A aplicação calcula a integral da função fornecida e exibe o resultado.
- **Animações**: Símbolos matemáticos animados sobem pela tela, proporcionando uma experiência visual atraente.

## Instalação

Para instalar e executar o projeto, siga os passos abaixo:

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório do projeto:
   ```
   cd integral-calculator
   ```

3. Instale as dependências:
   ```
   npm install
   ```

4. Inicie a aplicação:
   ```
   npm start
   ```

A aplicação estará disponível em `http://localhost:3000`.

## Uso

- Acesse a página da calculadora através do menu principal.
- Digite a função que deseja integrar na caixa de entrada.
- Utilize o teclado virtual para facilitar a entrada de funções.
- Clique no botão para calcular a integral e veja o resultado exibido na tela.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.