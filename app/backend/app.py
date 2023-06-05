import json
import mysql.connector
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app, resources={r"/cadastro": {"origins": "*"}})

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Fiap@',
    'database': 'db_doacao'
}

# Funções de manipulação de banco de dados

def insert_doador(doador):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    query = """
        INSERT INTO tb_inst
        (nome, email, telefone, endereco, alimento)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    values = (
        doador['nome'],
        doador['email'],
        doador['telefone'],
        doador['endereco'],
        doador['alimento'],
    )
    cursor.execute(query, values)
    conn.commit()

    cursor.close()
    conn.close()

def fetch_doadores():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)

    query = "SELECT * FROM tb_inst"
    cursor.execute(query)
    result = cursor.fetchall()

    cursor.close()
    conn.close()

    return result


def clear_table():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    query = "TRUNCATE TABLE tb_inst"
    cursor.execute(query)
    conn.commit()

    cursor.close()
    conn.close()

# Rotas
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/list')
def list_doadores():
    doadores = fetch_doadores()
    return render_template('list.html', doadores=doadores)

@app.route('/instituicao')
def instituicao():
    return render_template('instituicao.html')

@app.route('/limpar', methods=['GET'])
def limpar_tabela():
    clear_table()
    return 'Tabela limpa com sucesso!'

@app.route('/cadastro', methods=['POST'])
def cadastro():
    doador = request.get_json()
    print(request.form)

    insert_doador(doador)

    return jsonify({'mensagem': 'Dados do doador recebidos com sucesso!'})

@app.route('/doadores', methods=['GET'])
def get_doadores():
    doadores = fetch_doadores()
    return jsonify(doadores)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80, debug=True)
