// components/flashcard-app.ts
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

interface Flashcard {
  question: string;
  choices: string[];
  correctIndex: number;
}

@customElement("flashcard-app")
export class FlashcardApp extends LitElement {
  @state() private cards: Flashcard[] = [];
  @state() private currentIndex = 0;
  @state() private selectedIndex: number | null = null;
  @state() private correctAnswers = 0;

  static styles = css`
    :host {
      display: block;
      padding: 0 2rem;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      font-family: "Doto", sans-serif;
      font-weight: 800;
      transition: background 0.3s, color 0.3s;
    }

    .card {
      padding: 2rem;
      margin: auto;

      min-height: 90svh;
      display: flex;
      flex-direction: column;
      justify-content: end;

      position: relative;

      @media screen and (max-width: 992px) {
        padding-top: 8rem;
      }
    }

    .card.end-card {
      justify-content: center;
      align-items: center;
    }

    .result-text {
      font-size: 1.5rem;
    }

    h2 {
      font-size: 5rem;
      letter-spacing: -0.05em;
      line-height: 1;
      text-transform: uppercase;
      margin-top: 0;
      margin-bottom: 2rem;

      transition: scale 1.5s cubic-bezier(0.83, 0, 0.17, 1),
        transform 1.5s cubic-bezier(0.83, 0, 0.17, 1);

      @media screen and (max-width: 992px) {
        font-size: 3rem;
      }
    }

    .choices {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr 1fr 1fr;

      @media screen and (max-width: 992px) {
        grid-template-columns: 1fr;
        padding-bottom: 5rem;
      }
    }

    .card:has(.choice-button.correct, .choice-button.wrong) h2 {
      // scale: 0.7;
      transform-origin: left bottom;
    }

    .choice-button {
      padding: 2rem;
      border: none;
      font-size: 1rem;
      cursor: pointer;
      background: var(--text);
      min-height: 20rem;

      font-family: "Doto", sans-serif;
      font-weight: 800;
      transition: background 0.3s, color 0.3s;
      color: var(--bg);
      text-transform: uppercase;
      letter-spacing: -0.05em;
      font-size: 1.5rem;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: start;
      border: 1px solid var(--bg);

      @media screen and (max-width: 992px) {
        min-height: 0rem;
      }
    }

    .choices:not(:has(.choice-button.correct, .choice-button.wrong))
      .choice-button:hover {
      background: var(--bg);
      color: var(--text);
      border: 1px solid var(--text);
    }

    .choice-button.correct {
      background-color: #4caf50;
      color: white;
    }

    .choice-button.wrong {
      background-color: #f44336;
      color: white;
    }

    .choice-index {
      font-size: 3rem;
      text-align: right;
      width: 100%;

      @media screen and (max-width: 992px) {
        text-align: left;
        font-size: 2rem;
        padding-bottom: 3rem;
      }
    }

    .next {
      color: var(--bg);
      background: var(--text);
      border: none;
      text-transform: uppercase;
      font-weight: 800;
      font-family: "Doto", sans-serif;
      padding: 1rem 2rem;
      font-size: 1rem;
      opacity: 0;

      animation: fadeIn 0.5s 0.5s forwards;
      z-index: 10;
      cursor: pointer;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .score-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      min-height: 58px;

      text-transform: uppercase;

      @media screen and (max-width: 992px) {
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
        background: var(--bg);
        padding: 0 4rem;
      }
    }
  `;

  async firstUpdated() {
    const res = await fetch(
      "https://fh-salzburg-3e27a-default-rtdb.europe-west1.firebasedatabase.app/flashcards.json"
    );
    this.cards = await res.json();
  }

  private selectAnswer(index: number) {
    if (this.selectedIndex !== null) return;
    this.selectedIndex = index;
    if (index === this.cards[this.currentIndex].correctIndex) {
      this.correctAnswers++;
    }
  }

  private nextQuestion() {
    this.currentIndex++;
    this.selectedIndex = null;
  }

  render() {
    if (this.currentIndex >= this.cards.length) {
      return html`
        <div class="card">
          <h2>Quiz Finished!</h2>
          <p class="result-text">
            You got ${this.correctAnswers} out of ${this.cards.length} correct.
          </p>
        </div>
      `;
    }

    const card = this.cards[this.currentIndex];

    return html`
      <div class="card">
        <p class="">
          Question
          ${this.currentIndex + 1 <= 9
            ? "0" + (this.currentIndex + 1)
            : this.currentIndex + 1}
          / ${this.cards.length}
        </p>
        <h2 class="">${card.question}</h2>
        <div class="choices">
          ${card.choices.map((choice, index) => {
            let className = "choice-button ";
            if (this.selectedIndex !== null) {
              if (index === card.correctIndex) className += "correct";
              else if (index === this.selectedIndex) className += "wrong";
            }
            return html`
              <button
                class=${className}
                @click=${() => this.selectAnswer(index)}
              >
                <span class="choice-index">0${index}</span>
                <span>${choice}</span>
              </button>
            `;
          })}
        </div>
        <div class="score-bar">
          <p>Current score: ${this.correctAnswers}</p>
          ${this.selectedIndex !== null
            ? html`<button class="next" @click=${this.nextQuestion}>
                Next =>
              </button>`
            : html``}
        </div>
      </div>
    `;
  }
}
