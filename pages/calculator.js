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
  const [apiStatus, setApiStatus] = useState('checking');
  
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
    { label: 'ln', value: 'ln(' },
    { label: 'log', value: 'log(' },
    { label: 'e^x', value: 'exp(' },
    { label: '√', value: 'sqrt(' },
    { label: 'x²', value: '^2' },
    { label: 'x³', value: '^3' },
    { label: 'xⁿ', value: '^' },
    { label: '1/x', value: '1/(' },
    { label: 'π', value: 'π' },
    { label: 'e', value: 'e' },
    { label: '∞', value: '∞' },
    { label: '(', value: '(' },
    { label: ')', value: ')' }
  ];

  // Exemplos de integrais
  const examples = [
    { name: 'Polinômio', expr: 'x^3 + 2*x^2 + x + 1', type: 'indefinite' },
    { name: 'Trigonométrica', expr: 'sin(x)*cos(x)', type: 'indefinite' },
    { name: 'Exponencial', expr: 'x*exp(x)', type: 'indefinite' },
    { name: 'Logarítmica', expr: 'ln(x)/x', type: 'indefinite' },
    { name: 'Racional', expr: '1/(x^2 + 1)', type: 'indefinite' },
    { name: 'Área sob curva', expr: 'x^2', type: 'definite', lower: '0', upper: '2' }
  ];

  // Verificar status da API
  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/test');
      if (response.ok) {
        setApiStatus('connected');
      } else {
        setApiStatus('error');
      }
    } catch (error) {
      setApiStatus('offline');
    }
  };

  // Calcular integral
  const calculateIntegral = async () => {
    if (!expression.trim()) {
      setError('Digite uma expressão matemática');
      return;
    }

    if (apiStatus === 'offline') {
      setError('API offline. Inicie o servidor Python com: python api/integral_calculator.py');
      return;
    }

    setIsCalculating(true);
    setError('');

    try {
      const payload = {
        expression: expression,
        variable: variable,
        type: integralType,
        lower_limit: integralType === 'definite' ? lowerLimit : null,
        upper_limit: integralType === 'definite' ? upperLimit : null
      };

      const response = await fetch('http://localhost:5000/calculate_integral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
        
        // Adicionar ao histórico
        setHistory(prev => [{
          id: Date.now(),
          expression: data.expression,
          result: data.result,
          type: data.type,
          timestamp: new Date().toLocaleTimeString()
        }, ...prev.slice(0, 9)]);
      } else {
        setError('Erro no cálculo: ' + data.error);
      }
    } catch (error) {
      setError('Erro de conexão: ' + error.message);
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
        <meta name="description" content="Calculadora de integrais com SymPy - resolva qualquer integral definida ou indefinida" />
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
            Powered by SymPy - Resolva qualquer integral simbólica
          </p>
          <div className={styles.apiStatus}>
            Status da API: 
            <span className={`${styles.statusBadge} ${styles[apiStatus]}`}>
              {apiStatus === 'connected' ? '🟢 Conectado' : 
               apiStatus === 'offline' ? '🔴 Offline' : 
               '🟡 Verificando...'}
            </span>
          </div>
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
                  placeholder="Ex: x^2, sin(x), ln(x), x*exp(x)..."
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
                disabled={isCalculating || apiStatus === 'offline'}
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
                    {result.numerical !== null && (
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
                <li><code>ln(x), log(x)</code></li>
                <li><code>exp(x)</code> para e^x</li>
                <li><code>sqrt(x)</code> para √x</li>
              </ul>
            </div>
            <div className={styles.instructionCard}>
              <h4>∫ Integrais Indefinidas</h4>
              <ul>
                <li>Retorna a função primitiva</li>
                <li>Adiciona constante + C</li>
                <li>Funciona com qualquer função</li>
                <li>Mostra passos do cálculo</li>
              </ul>
            </div>
            <div className={styles.instructionCard}>
              <h4>📊 Integrais Definidas</h4>
              <ul>
                <li>Calcula área sob a curva</li>
                <li>Define limites inferior e superior</li>
                <li>Retorna valor numérico</li>
                <li>Suporta infinito (∞)</li>
              </ul>
            </div>
            <div className={styles.instructionCard}>
              <h4>⚙️ Setup da API</h4>
              <ul>
                <li>1. <code>pip install -r requirements.txt</code></li>
                <li>2. <code>python api/integral_calculator.py</code></li>
                <li>3. API rodando em localhost:5000</li>
                <li>4. Calculadora pronta para usar!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntegralCalculator;