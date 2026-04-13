export type PracticeQuestion = {
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

export const practiceProblems: Record<string, PracticeQuestion[]> = {
  // ── Pre-Calculus ──
  "pc-1-1": [
    { question: "What is the domain of $f(x) = \\frac{1}{x-3}$?", choices: ["$(-\\infty, 3) \\cup (3, \\infty)$", "$(-\\infty, \\infty)$", "$[3, \\infty)$", "$(0, \\infty)$"], correctIndex: 0, explanation: "The denominator $x - 3 = 0$ when $x = 3$, so we exclude $x = 3$." },
    { question: "If $f(x) = 2x + 1$, what is $f(3)$?", choices: ["5", "7", "6", "9"], correctIndex: 1, explanation: "$f(3) = 2(3) + 1 = 7$." },
    { question: "Which test determines if a graph represents a function?", choices: ["Horizontal Line Test", "Vertical Line Test", "Diagonal Test", "Slope Test"], correctIndex: 1, explanation: "A graph is a function if every vertical line crosses it at most once." },
    { question: "The range of $f(x) = x^2$ is:", choices: ["$(-\\infty, \\infty)$", "$[0, \\infty)$", "$(0, \\infty)$", "$(-\\infty, 0]$"], correctIndex: 1, explanation: "Since $x^2 \\geq 0$ for all real $x$, the range is $[0, \\infty)$." },
  ],
  "pc-1-2": [
    { question: "The graph of $f(x-3)$ shifts $f(x)$ how?", choices: ["Left 3", "Right 3", "Up 3", "Down 3"], correctIndex: 1, explanation: "Replacing $x$ with $x - 3$ shifts the graph 3 units to the right." },
    { question: "What does $-f(x)$ do to the graph of $f(x)$?", choices: ["Reflect over y-axis", "Reflect over x-axis", "Shift down", "Compress"], correctIndex: 1, explanation: "Negating the output reflects the graph across the x-axis." },
    { question: "If $g(x) = f(2x)$, the graph is:", choices: ["Stretched horizontally by 2", "Compressed horizontally by ½", "Stretched vertically by 2", "Shifted right 2"], correctIndex: 1, explanation: "Multiplying the input by 2 compresses the graph horizontally by a factor of $\\frac{1}{2}$." },
  ],
  "pc-2-1": [
    { question: "What is $\\sin(\\pi/6)$?", choices: ["$\\frac{1}{2}$", "$\\frac{\\sqrt{2}}{2}$", "$\\frac{\\sqrt{3}}{2}$", "$1$"], correctIndex: 0, explanation: "$\\sin(30°) = \\frac{1}{2}$ is a standard value." },
    { question: "The period of $\\sin(x)$ is:", choices: ["$\\pi$", "$2\\pi$", "$\\frac{\\pi}{2}$", "$4\\pi$"], correctIndex: 1, explanation: "The sine function repeats every $2\\pi$ radians." },
    { question: "Convert $180°$ to radians:", choices: ["$\\pi$", "$2\\pi$", "$\\frac{\\pi}{2}$", "$\\frac{3\\pi}{2}$"], correctIndex: 0, explanation: "$180° = \\pi$ radians." },
    { question: "$\\cos(0) = $?", choices: ["0", "1", "-1", "undefined"], correctIndex: 1, explanation: "$\\cos(0) = 1$ by the unit circle definition." },
  ],

  // ── Calculus I ──
  "c1-1-1": [
    { question: "What is $\\lim_{x \\to 2} (3x + 1)$?", choices: ["5", "7", "6", "9"], correctIndex: 1, explanation: "Direct substitution: $3(2) + 1 = 7$." },
    { question: "$\\lim_{x \\to 0} \\frac{\\sin x}{x} = $?", choices: ["0", "1", "$\\infty$", "undefined"], correctIndex: 1, explanation: "This is a fundamental limit in calculus, proven by the Squeeze Theorem." },
    { question: "If $\\lim_{x \\to a} f(x) \\neq f(a)$, then $f$ is:", choices: ["Continuous at $a$", "Discontinuous at $a$", "Differentiable at $a$", "Increasing at $a$"], correctIndex: 1, explanation: "Continuity requires $\\lim_{x \\to a} f(x) = f(a)$." },
    { question: "$\\lim_{x \\to \\infty} \\frac{1}{x} = $?", choices: ["1", "0", "$\\infty$", "undefined"], correctIndex: 1, explanation: "As $x$ grows without bound, $\\frac{1}{x}$ approaches $0$." },
  ],
  "c1-1-2": [
    { question: "The derivative of $f(x) = x^3$ is:", choices: ["$x^2$", "$3x^2$", "$3x$", "$x^3$"], correctIndex: 1, explanation: "By the power rule: $\\frac{d}{dx}x^n = nx^{n-1}$, so $\\frac{d}{dx}x^3 = 3x^2$." },
    { question: "What does $f'(a) = 0$ indicate?", choices: ["$f$ is zero at $a$", "$f$ has a critical point at $a$", "$f$ is undefined at $a$", "$f$ is linear"], correctIndex: 1, explanation: "When the derivative is zero, we have a critical point (potential max/min)." },
    { question: "The derivative measures:", choices: ["Area under the curve", "Instantaneous rate of change", "Average value", "Total accumulation"], correctIndex: 1, explanation: "The derivative gives the instantaneous rate of change of a function." },
  ],
  "c1-2-1": [
    { question: "$\\frac{d}{dx}[f(g(x))] = $?", choices: ["$f'(x) \\cdot g'(x)$", "$f'(g(x)) \\cdot g'(x)$", "$f(g'(x))$", "$f'(g(x))$"], correctIndex: 1, explanation: "The Chain Rule: differentiate the outer function evaluated at the inner, times the derivative of the inner." },
    { question: "$\\frac{d}{dx} \\sin(3x) = $?", choices: ["$\\cos(3x)$", "$3\\cos(3x)$", "$-3\\cos(3x)$", "$3\\sin(3x)$"], correctIndex: 1, explanation: "Chain rule: $\\cos(3x) \\cdot 3 = 3\\cos(3x)$." },
    { question: "$\\frac{d}{dx} e^{2x} = $?", choices: ["$e^{2x}$", "$2e^{2x}$", "$2xe^{2x}$", "$e^{2}$"], correctIndex: 1, explanation: "Chain rule: $e^{2x} \\cdot 2 = 2e^{2x}$." },
    { question: "$\\frac{d}{dx} \\ln(x^2) = $?", choices: ["$\\frac{1}{x^2}$", "$\\frac{2}{x}$", "$\\frac{2x}{x^2}$", "$\\frac{1}{x}$"], correctIndex: 1, explanation: "Chain rule: $\\frac{1}{x^2} \\cdot 2x = \\frac{2}{x}$. (Or simplify first: $\\ln(x^2) = 2\\ln x$.)" },
  ],
  "c1-3-1": [
    { question: "$\\int x^2 \\, dx = $?", choices: ["$\\frac{x^3}{3} + C$", "$2x + C$", "$\\frac{x^2}{2} + C$", "$x^3 + C$"], correctIndex: 0, explanation: "Reverse the power rule: $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$." },
    { question: "$\\int_0^1 2x \\, dx = $?", choices: ["0", "1", "2", "½"], correctIndex: 1, explanation: "$\\int_0^1 2x\\,dx = [x^2]_0^1 = 1 - 0 = 1$." },
    { question: "The Fundamental Theorem of Calculus connects:", choices: ["Limits and continuity", "Derivatives and integrals", "Series and sequences", "Vectors and scalars"], correctIndex: 1, explanation: "The FTC states that differentiation and integration are inverse processes." },
    { question: "$\\int \\cos x \\, dx = $?", choices: ["$-\\sin x + C$", "$\\sin x + C$", "$\\cos x + C$", "$\\tan x + C$"], correctIndex: 1, explanation: "Since $\\frac{d}{dx} \\sin x = \\cos x$, we get $\\int \\cos x\\,dx = \\sin x + C$." },
  ],

  // ── Calculus II ──
  "c2-1-1": [
    { question: "Integration by parts uses the formula:", choices: ["$\\int u\\,dv = uv - \\int v\\,du$", "$\\int u\\,dv = uv + \\int v\\,du$", "$\\int u\\,dv = u + v$", "$\\int u\\,dv = \\frac{uv}{2}$"], correctIndex: 0, explanation: "Integration by parts: $\\int u\\,dv = uv - \\int v\\,du$, derived from the product rule." },
    { question: "To evaluate $\\int x e^x dx$, let $u = $?", choices: ["$e^x$", "$x$", "$xe^x$", "$1$"], correctIndex: 1, explanation: "Choose $u = x$ (which simplifies when differentiated) and $dv = e^x dx$." },
    { question: "$\\int x \\cos x \\, dx$ requires:", choices: ["Substitution only", "Integration by parts", "Partial fractions", "No special technique"], correctIndex: 1, explanation: "The product of $x$ and $\\cos x$ is handled by integration by parts." },
  ],
  "c2-2-1": [
    { question: "The ratio test says a series converges if:", choices: ["$\\lim |a_{n+1}/a_n| < 1$", "$\\lim |a_{n+1}/a_n| > 1$", "$\\lim a_n = 0$", "$\\sum a_n < \\infty$"], correctIndex: 0, explanation: "The Ratio Test: if $\\lim_{n\\to\\infty} |a_{n+1}/a_n| < 1$, the series converges absolutely." },
    { question: "The geometric series $\\sum_{n=0}^\\infty r^n$ converges when:", choices: ["$|r| < 1$", "$|r| > 1$", "$r > 0$", "$r < 0$"], correctIndex: 0, explanation: "A geometric series converges if and only if the common ratio satisfies $|r| < 1$." },
    { question: "The harmonic series $\\sum 1/n$ is:", choices: ["Convergent", "Divergent", "Conditionally convergent", "Absolutely convergent"], correctIndex: 1, explanation: "The harmonic series diverges, even though $1/n \\to 0$." },
  ],

  // ── Calculus III ──
  "c3-1-1": [
    { question: "A vector in $\\mathbb{R}^3$ has:", choices: ["2 components", "3 components", "4 components", "1 component"], correctIndex: 1, explanation: "Vectors in $\\mathbb{R}^3$ have three components: $(x, y, z)$." },
    { question: "The dot product $\\vec{a} \\cdot \\vec{b}$ gives:", choices: ["A vector", "A scalar", "A matrix", "A plane"], correctIndex: 1, explanation: "The dot product produces a scalar: $\\vec{a} \\cdot \\vec{b} = a_1 b_1 + a_2 b_2 + a_3 b_3$." },
    { question: "If $\\vec{a} \\cdot \\vec{b} = 0$, the vectors are:", choices: ["Parallel", "Perpendicular", "Equal", "Opposite"], correctIndex: 1, explanation: "Zero dot product means the vectors are orthogonal (perpendicular)." },
    { question: "The magnitude of $\\langle 3, 4, 0 \\rangle$ is:", choices: ["7", "5", "25", "12"], correctIndex: 1, explanation: "$|\\vec{v}| = \\sqrt{9 + 16 + 0} = \\sqrt{25} = 5$." },
  ],
  "c3-2-1": [
    { question: "A partial derivative $\\frac{\\partial f}{\\partial x}$ treats which variables as constant?", choices: ["$x$ only", "All variables except $x$", "All variables", "None"], correctIndex: 1, explanation: "When taking $\\partial f/\\partial x$, we hold all other variables constant." },
    { question: "The gradient $\\nabla f$ points in the direction of:", choices: ["Steepest descent", "Steepest ascent", "Zero change", "Tangent to level curve"], correctIndex: 1, explanation: "The gradient vector points in the direction of maximum rate of increase." },
    { question: "For $f(x,y) = x^2 y$, $\\frac{\\partial f}{\\partial x} = $?", choices: ["$x^2$", "$2xy$", "$2x$", "$x^2 + y$"], correctIndex: 1, explanation: "Treating $y$ as constant: $\\frac{\\partial}{\\partial x}(x^2 y) = 2xy$." },
  ],
};
