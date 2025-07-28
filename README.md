# gamecolor

**Desafio das Cores**

## 📄 Informações do Projeto

**Autor:** Jefferson Eduardo Santos Lima 
---

## 📝 Descrição

O **Desafio das Cores** é um jogo interativo que testa os reflexos do jogador ao identificar rapidamente a cor indicada. A cada desafio, o jogador deve clicar no quadrado correspondente dentro de um limite de tempo, acumulando pontos a cada acerto e perdendo pontos ao errar.

---

## 📋 Regras do Jogo

1. **Preparação:** Ao carregar a página, o jogo exibe seu nome e o ranking atual dos melhores jogadores.
2. **Início:** O jogador digita seu nome e clica no botão **Jogar** para iniciar.
3. **Desafio:** Uma grade de 3×3 cores é gerada aleatoriamente. O nome da cor-alvo (por exemplo, "VERDE") é exibido no topo, estilizado com a própria cor.
4. **Tempo:** O jogador tem **60 segundos** para completar o maior número de acertos.
5. **Pontuação:**

   * **Acerto:** +10 pontos.
   * A pontuação é atualizada imediatamente a cada clique.
6. **Fim de Jogo:** Quando o tempo chega a zero, o jogo termina.
7. **Tela Final:** Exibe o nome do jogador, a pontuação final e o ranking atualizado dos top 5 jogadores.
8. **Jogar Novamente:** O jogador pode reiniciar clicando no botão **Jogar Novamente**.

**Variações e Restrições:**

* A interação é totalmente através da interface (DOM), sem uso do console do navegador.
* Grid fixo de 3×3 quadrados e conjunto de 9 cores pré-definidas.
* Pontuação e tempo configuráveis via constantes em `script.js`.
* Critério de término definido pelo tempo esgotado.

(Conforme restrições listadas em: [https://www.notion.so/Restri-es-22e06b94b9cb80498501e54a72ed1fd7?pvs=21](https://www.notion.so/Restri-es-22e06b94b9cb80498501e54a72ed1fd7?pvs=21))

---

## 🚀 Como Jogar

1. Abra o arquivo `index.html` em seu navegador.
2. Digite seu nome no campo indicado.
3. Clique em **Jogar** para iniciar o cronômetro e gerar o desafio.
4. Clique no quadrado da cor que corresponde ao nome exibido.
5. A cada clique, o desafio se renova até o cronômetro chegar a zero.
6. Ao final, confira sua pontuação e veja se seu nome entrou para o ranking dos 5 melhores.

---

## ⚙️ Como Executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/EduardoSantz/gamecolor.git
   ```
2. Navegue até a pasta do projeto:

   ```bash
   cd gamecolor
   ```
3. Abra `index.html` em seu navegador preferido.

> Não é necessário servidor local ou compilação adicional.

---

## 📁 Estrutura de Arquivos

```
color-challenge/
├── css/
│   └── styles.css      # Estilos do jogo
├── images/
│   └── screenshot.png  # Captura de tela para o README
├── js/
│   └── script.js       # Lógica e manipulação do DOM
└── index.html          # Página principal do jogo
```

---

## 🙌 Créditos

* **Fontes e Referências:**
DOMContentLoaded:
https://developer.mozilla.org/pt-BR/docs/Web/API/Document/DOMContentLoaded_event

document.getElementById():
https://developer.mozilla.org/pt-BR/docs/Web/API/Document/getElementById

element.textContent:
https://developer.mozilla.org/pt-BR/docs/Web/API/Node/textContent

element.innerHTML:
https://developer.mozilla.org/pt-BR/docs/Web/API/Element/innerHTML

element.classList:
https://developer.mozilla.org/pt-BR/docs/Web/API/Element/classList

element.style:
https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLElement/style

element.dataset:
https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLElement/dataset

document.createElement():
https://developer.mozilla.org/pt-BR/docs/Web/API/Document/createElement

node.appendChild():
https://developer.mozilla.org/pt-BR/docs/Web/API/Node/appendChild

input.value:
https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input#value

eventTarget.addEventListener():
https://developer.mozilla.org/pt-BR/docs/Web/API/EventTarget/addEventListener

---

## 📝 Licença

Este projeto está licenciado sob a **MIT License**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.