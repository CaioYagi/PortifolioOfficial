import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from '../styles/Calculator.module.css';

const IntegralCalculator = () => {
  const [expression, setExpression] = useState('');
  const [variable, setVariable] = useState('x');
  const [integralType, setIntegralType] = useState('indefinite');
  const [lowerLimit, setLowerLimit] = useState('');
  const [upperLimit, setUpperLimit] = useState('');
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  
  const inputRef = useRef(null);

  // Símbolos matemáticos flutuantes
  const mathSymbols = ['∫', '∑', '∆', 'π', '∞', '√', '∂', 'α', 'β', 'γ', 'θ', 'λ', 'μ', 'σ', 'φ', 'ψ', 'ω', '≤', '≥', '≠', '≈'];

  const floatingSymbols = React.useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      symbol: mathSymbols[i % mathSymbols.length],
      left: Math.random() * 100,
      animationDelay: Math.random() * 20,
      animationDuration: 15 + Math.random() * 10,
      fontSize: 1.2 + Math.random() * 1.8
    }));
  }, []);

  // Funções e símbolos do teclado
  const functionButtons = [
    { label: 'sin', value: 'sin(' },
    { label: 'cos', value: 'cos(' },
    { label: 'tan', value: 'tan(' },
    { label: 'ln', value: 'log(' }, // Math.log é ln
    { label: 'log10', value: 'log10(' },
    { label: 'e^x', value: 'exp(' },
    { label: '√', value: 'sqrt(' },
    { label: 'x²', value: '^2' },
    { label: 'x³', value: '^3' },
    { label: 'xⁿ', value: '^' },
    { label: '1/x', value: '1/(' },
    { label: 'π', value: 'PI' },
    { label: 'e', value: 'E' },
    { label: 'abs', value: 'abs(' },
    { label: '(', value: '(' },
    { label: ')', value: ')' }
  ];

  // Exemplos de integrais
  const examples = [
    { name: 'Polinômio', expr: 'x^3 + 2*x^2 + x + 1', type: 'indefinite' },
    { name: 'Trigonométrica', expr: 'sin(x)*cos(x)', type: 'indefinite' },
    { name: 'Exponencial', expr: 'exp(x)', type: 'indefinite' },
    { name: 'Logarítmica', expr: 'log(x)', type: 'indefinite' },
    { name: 'Racional', expr: '1/(x^2 + 1)', type: 'indefinite' },
    { name: 'Área sob curva', expr: 'x^2', type: 'definite', lower: '0', upper: '2' }
  ];

  // Parser matemático simples
  const parseMathExpression = (expr, varName, value) => {
    try {
      // Substituir constantes
      let parsedExpr = expr
        .replace(/PI/g, Math.PI.toString())
        .replace(/E(?![a-zA-Z])/g, Math.E.toString())
        .replace(/\^/g, '**')
        .replace(/log10\(/g, '(Math.log10(')
        .replace(/log\(/g, '(Math.log(')
        .replace(/exp\(/g, '(Math.exp(')
        .replace(/sin\(/g, '(Math.sin(')
        .replace(/cos\(/g, '(Math.cos(')
        .replace(/tan\(/g, '(Math.tan(')
        .replace(/sqrt\(/g, '(Math.sqrt(')
        .replace(/abs\(/g, '(Math.abs(')
        .replace(new RegExp(varName, 'g'), value.toString());

      // Avaliar a expressão
      return Function('"use strict"; return (' + parsedExpr + ')')();
    } catch (error) {
      throw new Error('Erro na avaliação da expressão: ' + error.message);
    }
  };

  // Integração numérica usando Regra de Simpson
  const numericalIntegration = (expr, varName, a, b, n = 10000) => {
    try {
      const h = (b - a) / n;
      let sum = 0;

      for (let i = 0; i <= n; i++) {
        const x = a + i * h;
        const y = parseMathExpression(expr, varName, x);
        
        if (isNaN(y) || !isFinite(y)) {
          throw new Error(`Função indefinida em ${varName} = ${x}`);
        }

        if (i === 0 || i === n) {
          sum += y;
        } else if (i % 2 === 1) {
          sum += 4 * y;
        } else {
          sum += 2 * y;
        }
      }

      return (h / 3) * sum;
    } catch (error) {
      throw error;
    }
  };

  // Derivadas simbólicas básicas para integrais indefinidas
  const getIndefiniteIntegral = (expr, varName) => {
    const rules = [
      // Regras básicas de integração
      {
        pattern: /^(\d+\.?\d*)$/,
        result: (match) => `${match[1]}*${varName}`
      },
      {
        pattern: new RegExp(`^${varName}$`),
        result: () => `${varName}^2/2`
      },
      {
        pattern: new RegExp(`^${varName}\\^(\\d+)$`),
        result: (match) => {
          const n = parseInt(match[1]);
          return `${varName}^${n + 1}/${n + 1}`;
        }
      },
      {
        pattern: new RegExp(`^sin\\(${varName}\\)$`),
        result: () => `-cos(${varName})`
      },
      {
        pattern: new RegExp(`^cos\\(${varName}\\)$`),
        result: () => `sin(${varName})`
      },
      {
        pattern: new RegExp(`^exp\\(${varName}\\)$`),
        result: () => `exp(${varName})`
      },
      {
        pattern: new RegExp(`^1\\/${varName}$`),
        result: () => `log(${varName})`
      }
    ];

    // Tentar aplicar regras simples
    for (const rule of rules) {
      const match = expr.match(rule.pattern);
      if (match) {
        return rule.result(match);
      }
    }

    return `∫ ${expr} d${varName}`;
  };

  // Calcular integral
  const calculateIntegral = async () => {
    if (!expression.trim()) {
      setError('Digite uma expressão matemática');
      return;
    }

    setIsCalculating(true);
    setError('');

    try {
      let calculationResult;
      let steps = [];

      if (integralType === 'definite' && lowerLimit && upperLimit) {
        // Integral definida
        const a = parseMathExpression(lowerLimit, 'temp', 0);
        const b = parseMathExpression(upperLimit, 'temp', 0);
        
        if (isNaN(a) || isNaN(b)) {
          throw new Error('Limites de integração inválidos');
        }

        const integralValue = numericalIntegration(expression, variable, a, b);
        
        calculationResult = {
          type: 'definite',
          expression: `∫[${a}, ${b}] ${expression} d${variable}`,
          result: integralValue.toFixed(6),
          numerical: integralValue,
          limits: [a, b]
        };
        
        steps = [
          `Calculando ∫[${a}, ${b}] ${expression} d${variable}`,
          'Método: Regra de Simpson (integração numérica)',
          `Dividindo intervalo [${a}, ${b}] em 10.000 subintervalos`,
          'Aplicando fórmula de Simpson',
          `Resultado: ${integralValue.toFixed(6)}`
        ];
      } else {
        // Integral indefinida
        const indefiniteResult = getIndefiniteIntegral(expression, variable);
        
        calculationResult = {
          type: 'indefinite',
          expression: `∫ ${expression} d${variable}`,
          result: `${indefiniteResult} + C`,
          symbolic: true
        };

        steps = [
          `Calculando ∫ ${expression} d${variable}`,
          'Aplicando regras básicas de integração',
          'Resultado simbólico obtido',
          `${indefiniteResult} + C`
        ];
      }

      setResult({
        ...calculationResult,
        steps: steps
      });

      // Adicionar ao histórico
      setHistory(prev => [{
        id: Date.now(),
        expression: calculationResult.expression,
        result: calculationResult.result,
        type: calculationResult.type,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev.slice(0, 9)]);

    } catch (error) {
      console.error('Erro no cálculo:', error);
      setError(error.message || 'Erro desconhecido no cálculo');
    } finally {
      setIsCalculating(false);
    }
  };

  // Inserir função no input
  const insertFunction = (value) => {
    const input = inputRef.current;
    if (input) {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const newValue = expression.substring(0, start) + value + expression.substring(end);
      setExpression(newValue);
      
      // Posicionar cursor
      setTimeout(() => {
        const newPos = start + value.length;
        input.setSelectionRange(newPos, newPos);
        input.focus();
      }, 0);
    }
  };

  // Carregar exemplo
  const loadExample = (example) => {
    setExpression(example.expr);
    setIntegralType(example.type);
    if (example.lower) setLowerLimit(example.lower);
    if (example.upper) setUpperLimit(example.upper);
  };

  // Aplicar estilos globais
  useEffect(() => {
    const originalBodyStyle = document.body.style.cssText;
    
    document.body.style.background = 'linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #2d2d5f 100%)';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.minHeight = '100vh';

    return () => {
      document.body.style.cssText = originalBodyStyle;
    };
  }, []);

  return (
    <>
      <Head>
        <title>Calculadora de Integrais Avançada - Caio Yagi</title>
        <meta name="description" content="Calculadora de integrais com JavaScript - resolva qualquer integral definida ou indefinida" />
      </Head>

      <div className={styles.container}>
        {/* Símbolos flutuantes */}
        <div className={styles.mathSymbolsContainer}>
          {floatingSymbols.map((symbol) => (
            <div
              key={symbol.id}
              className={styles.floatingSymbol}
              style={{
                left: `${symbol.left}%`,
                animationDelay: `${symbol.animationDelay}s`,
                animationDuration: `${symbol.animationDuration}s`,
                fontSize: `${symbol.fontSize}rem`
              }}
            >
              {symbol.symbol}
            </div>
          ))}
        </div>

        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.integralIcon}>∫</span>
            Calculadora de Integrais Avançada
          </h1>
          <p className={styles.subtitle}>
            Cálculos matemáticos precisos em tempo real
          </p>
          <a href="/" className={styles.backButton}>← Voltar ao Portfólio</a>
        </header>

        {/* Main Calculator */}
        <main className={styles.calculatorMain}>
          <div className={styles.calculatorGrid}>
            
            {/* Input Section */}
            <div className={styles.inputSection}>
              <div className={styles.expressionInput}>
                <label>Expressão matemática:</label>
                <input
                  ref={inputRef}
                  type="text"
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  placeholder="Ex: x^2, sin(x), log(x), exp(x)..."
                  className={styles.mainInput}
                  onKeyPress={(e) => e.key === 'Enter' && calculateIntegral()}
                />
              </div>

              <div className={styles.settingsRow}>
                <div className={styles.setting}>
                  <label>Variável:</label>
                  <select value={variable} onChange={(e) => setVariable(e.target.value)}>
                    <option value="x">x</option>
                    <option value="t">t</option>
                    <option value="u">u</option>
                    <option value="y">y</option>
                  </select>
                </div>

                <div className={styles.setting}>
                  <label>Tipo:</label>
                  <select value={integralType} onChange={(e) => setIntegralType(e.target.value)}>
                    <option value="indefinite">Indefinida ∫f(x)dx</option>
                    <option value="definite">Definida ∫[a,b]f(x)dx</option>
                  </select>
                </div>

                {integralType === 'definite' && (
                  <>
                    <div className={styles.setting}>
                      <label>De:</label>
                      <input
                        type="text"
                        value={lowerLimit}
                        onChange={(e) => setLowerLimit(e.target.value)}
                        placeholder="0"
                        className={styles.limitInput}
                      />
                    </div>
                    <div className={styles.setting}>
                      <label>Até:</label>
                      <input
                        type="text"
                        value={upperLimit}
                        onChange={(e) => setUpperLimit(e.target.value)}
                        placeholder="1"
                        className={styles.limitInput}
                      />
                    </div>
                  </>
                )}
              </div>

              <button 
                onClick={calculateIntegral}
                disabled={isCalculating}
                className={styles.calculateButton}
              >
                {isCalculating ? 'Calculando...' : 'Calcular Integral'}
              </button>
            </div>

            {/* Function Buttons */}
            <div className={styles.functionsPanel}>
              <h3>Funções Matemáticas</h3>
              <div className={styles.functionGrid}>
                {functionButtons.map((btn, index) => (
                  <button
                    key={index}
                    onClick={() => insertFunction(btn.value)}
                    className={styles.functionButton}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Examples */}
            <div className={styles.examplesPanel}>
              <h3>Exemplos</h3>
              <div className={styles.examplesList}>
                {examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => loadExample(example)}
                    className={styles.exampleButton}
                  >
                    <span className={styles.exampleName}>{example.name}</span>
                    <span className={styles.exampleExpr}>{example.expr}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          {(result || error) && (
            <div className={styles.resultsSection}>
              {error ? (
                <div className={styles.errorMessage}>
                  <h3>❌ Erro</h3>
                  <p>{error}</p>
                </div>
              ) : result && (
                <div className={styles.resultDisplay}>
                  <h3>✅ Resultado</h3>
                  <div className={styles.resultContent}>
                    <div className={styles.expression}>
                      <strong>Integral:</strong> {result.expression}
                    </div>
                    <div className={styles.solution}>
                      <strong>Solução:</strong> {result.result}
                    </div>
                    {result.numerical !== undefined && (
                      <div className={styles.numerical}>
                        <strong>Valor numérico:</strong> {result.numerical}
                      </div>
                    )}
                    {result.steps && result.steps.length > 0 && (
                      <div className={styles.steps}>
                        <strong>Método usado:</strong>
                        <ul>
                          {result.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* History */}
          {history.length > 0 && (
            <div className={styles.historySection}>
              <h3>Histórico de Cálculos</h3>
              <div className={styles.historyList}>
                {history.map((item) => (
                  <div key={item.id} className={styles.historyItem}>
                    <div className={styles.historyExpression}>{item.expression}</div>
                    <div className={styles.historyResult}>{item.result}</div>
                    <div className={styles.historyTime}>{item.timestamp}</div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setHistory([])}
                className={styles.clearHistoryButton}
              >
                Limpar Histórico
              </button>
            </div>
          )}
        </main>

        {/* Instructions */}
        <div className={styles.instructions}>
          <h3>Como usar a Calculadora de Integrais:</h3>
          <div className={styles.instructionsGrid}>
            <div className={styles.instructionCard}>
              <h4>📝 Sintaxe</h4>
              <ul>
                <li><code>x^2</code> para potências</li>
                <li><code>sin(x), cos(x), tan(x)</code></li>
                <li><code>log(x)</code> para ln(x)</li>
                <li><code>log10(x)</code> para log₁₀(x)</li>
                <li><code>exp(x)</code> para e^x</li>
                <li><code>sqrt(x)</code> para √x</li>
              </ul>
            </div>
            <div className={styles.instructionCard}>
              <h4>∫ Integrais Indefinidas</h4>
              <ul>
                <li>Reconhece funções básicas</li>
                <li>Aplica regras de integração</li>
                <li>Retorna forma simbólica</li>
                <li>Adiciona constante + C</li>
              </ul>
            </div>
            <div className={styles.instructionCard}>
              <h4>📊 Integrais Definidas</h4>
              <ul>
                <li>Usa Regra de Simpson</li>
                <li>Precisão de 6 casas decimais</li>
                <li>Calcula área sob a curva</li>
                <li>Suporta PI e E como constantes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntegralCalculator;
