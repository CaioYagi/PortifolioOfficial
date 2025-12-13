from flask import Flask, request, jsonify
from flask_cors import CORS
import sympy as sp
from sympy import *
import traceback
import re

app = Flask(__name__)
CORS(app)

@app.route('/calculate_integral', methods=['POST'])
def calculate_integral():
    try:
        data = request.json
        expression = data.get('expression', '')
        variable = data.get('variable', 'x')
        integral_type = data.get('type', 'indefinite')
        lower_limit = data.get('lower_limit', None)
        upper_limit = data.get('upper_limit', None)
        
        # Limpar e preparar a expressão
        expression = clean_expression(expression)
        
        # Criar símbolo da variável
        var = sp.Symbol(variable)
        
        # Converter string para expressão SymPy
        expr = sp.sympify(expression, locals={variable: var})
        
        if integral_type == 'definite' and lower_limit is not None and upper_limit is not None:
            # Integral definida
            lower = sp.sympify(str(lower_limit))
            upper = sp.sympify(str(upper_limit))
            result = sp.integrate(expr, (var, lower, upper))
            
            # Tentar avaliar numericamente se possível
            numerical_result = None
            try:
                numerical_result = float(result.evalf())
            except:
                pass
            
            return jsonify({
                'success': True,
                'result': str(result),
                'latex': sp.latex(result),
                'numerical': numerical_result,
                'type': 'definite',
                'expression': f'∫[{lower_limit},{upper_limit}] {expression} d{variable}',
                'steps': get_integration_steps(expr, var, lower, upper)
            })
        else:
            # Integral indefinida
            result = sp.integrate(expr, var)
            
            return jsonify({
                'success': True,
                'result': str(result) + ' + C',
                'latex': sp.latex(result) + ' + C',
                'type': 'indefinite',
                'expression': f'∫ {expression} d{variable}',
                'steps': get_integration_steps(expr, var)
            })
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'traceback': traceback.format_exc()
        })

def clean_expression(expr):
    """Limpa e padroniza a expressão matemática"""
    # Substituições comuns
    replacements = {
        '^': '**',
        'π': 'pi',
        'e': 'E',
        'ln': 'log',
        '√': 'sqrt',
        '∞': 'oo'
    }
    
    for old, new in replacements.items():
        expr = expr.replace(old, new)
    
    return expr

def get_integration_steps(expr, var, lower=None, upper=None):
    """Tenta obter os passos da integração"""
    try:
        # Para funções simples, mostrar a regra usada
        steps = []
        
        if expr.is_polynomial(var):
            steps.append("Usando a regra da potência: ∫x^n dx = x^(n+1)/(n+1)")
        elif expr.has(sp.sin):
            steps.append("Usando: ∫sin(x) dx = -cos(x)")
        elif expr.has(sp.cos):
            steps.append("Usando: ∫cos(x) dx = sin(x)")
        elif expr.has(sp.exp):
            steps.append("Usando: ∫e^x dx = e^x")
        elif expr.has(sp.log):
            steps.append("Usando integração por partes ou substituição")
        
        return steps
    except:
        return ["Calculando usando métodos avançados de integração"]

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'status': 'API funcionando!', 'sympy_version': sp.__version__})

if __name__ == '__main__':
    app.run(debug=True, port=5000)