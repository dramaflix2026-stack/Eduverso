/** Exemplos originais e didáticos: quando pertinente, execute em ambiente de testes. */
export const professionalCodeExamples:Record<string,string[]>={
  "web": [
    "<!doctype html>\n<html lang=\"pt-BR\">\n  <head><meta charset=\"utf-8\"><title>Meu curso</title></head>\n  <body>\n    <header><nav aria-label=\"Principal\"><a href=\"/\">Início</a></nav></header>\n    <main><h1>Minha primeira aula</h1><p>Aprenda no seu ritmo.</p></main>\n    <footer>Eduverso</footer>\n  </body>\n</html>",
    ".cards {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1rem;\n}\n.card { min-width: 0; max-width: 100%; }\n@media (min-width: 768px) {\n  .cards { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n}",
    "const botao = document.querySelector(\"#salvar\");\nbotao.addEventListener(\"click\", async () => {\n  botao.disabled = true;\n  try {\n    await salvarDados();\n    mostrarMensagem(\"Salvo com sucesso!\");\n  } catch {\n    mostrarMensagem(\"Não foi possível salvar.\");\n  } finally {\n    botao.disabled = false;\n  }\n});",
    "const resposta = await fetch(\"/api/cursos\", {method: \"GET\"});\nif (!resposta.ok) {\n  throw new Error(\"Falha HTTP: \" + resposta.status);\n}\nconst cursos = await resposta.json();\nconsole.log(cursos);",
    "<form method=\"post\" action=\"/api/cadastro\">\n  <label for=\"email\">E-mail</label>\n  <input id=\"email\" name=\"email\" type=\"email\" required>\n  <button type=\"submit\">Cadastrar</button>\n</form>\n<!-- O servidor deve validar novamente os dados recebidos. -->",
    "git switch -c melhoria-cadastro\ngit add .\ngit commit -m \"Ajusta validação do cadastro\"\ngit push -u origin melhoria-cadastro\n# Abra uma revisão; não inclua segredos no repositório.",
    "// Exemplo de teste de regra de negócio\nfunction total(preco, quantidade) {\n  return preco * quantidade;\n}\nconsole.assert(total(10, 3) === 30, \"Total incorreto\");\nconsole.assert(total(0, 5) === 0, \"Total com zero incorreto\");"
  ],
  "python": [
    "preco_texto = \"12.50\"\nquantidade_texto = \"4\"\npreco = float(preco_texto)\nquantidade = int(quantidade_texto)\ntotal = preco * quantidade\nprint(f\"Total: R$ {total:.2f}\")  # 50.00",
    "preco = 100\nif preco >= 100:\n    desconto = preco * 0.10\nelse:\n    desconto = 0\nprint(preco - desconto)\n\nfor numero in range(1, 4):\n    print(\"Iteração\", numero)",
    "from pathlib import Path\n\norigem = Path(\"relatorio.txt\")\ndestino = Path(\"relatorio-copia.txt\")\nif origem.exists() and not destino.exists():\n    destino.write_text(origem.read_text(encoding=\"utf-8\"),\n                       encoding=\"utf-8\")\nelse:\n    print(\"Verifique o arquivo ou o destino.\")",
    "def calcular_total(preco: float, quantidade: int) -> float:\n    if preco < 0 or quantidade < 0:\n        raise ValueError(\"Valores devem ser positivos\")\n    return preco * quantidade\n\nprint(calcular_total(7, 5))  # 35",
    "pedidos = [\n    {\"produto\": \"Caderno\", \"valor\": 18},\n    {\"produto\": \"Caneta\", \"valor\": 5},\n]\ntotal = sum(pedido.get(\"valor\", 0) for pedido in pedidos)\nprint(f\"Total: {total}\")  # 23",
    "from pathlib import Path\n\ntry:\n    texto = Path(\"entrada.txt\").read_text(encoding=\"utf-8\")\n    print(f\"Arquivo com {len(texto)} caracteres\")\nexcept FileNotFoundError:\n    print(\"Arquivo não encontrado. Confira o caminho.\")\nexcept UnicodeError:\n    print(\"Não foi possível interpretar a codificação.\")",
    "import json\nfrom urllib.request import urlopen\nfrom urllib.error import URLError\n\ntry:\n    with urlopen(\"https://api.exemplo.org/dados\", timeout=10) as resposta:\n        if resposta.status != 200:\n            raise ValueError(\"Resposta inesperada\")\n        dados = json.load(resposta)\nexcept (URLError, ValueError, json.JSONDecodeError) as erro:\n    print(\"Consulta falhou:\", type(erro).__name__)\n# Exemplo didático: substitua a URL por uma API autorizada."
  ]
};
export function getProfessionalCodeExample(trackId:string,index:number){return professionalCodeExamples[trackId]?.[index]||"";}
