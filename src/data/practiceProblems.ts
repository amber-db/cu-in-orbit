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

  // ── Pre-Calculus (remaining) ──
  "pc-1-3": [
    { question: "If $f(x) = 2x + 1$ and $g(x) = x^2$, what is $(f \\circ g)(3)$?", choices: ["$19$", "$49$", "$13$", "$7$"], correctIndex: 0, explanation: "$(f \\circ g)(3) = f(g(3)) = f(9) = 2(9)+1 = 19$." },
    { question: "The inverse of $f(x) = 3x - 6$ is:", choices: ["$f^{-1}(x) = \\frac{x+6}{3}$", "$f^{-1}(x) = \\frac{x-6}{3}$", "$f^{-1}(x) = 3x + 6$", "$f^{-1}(x) = \\frac{6}{x+3}$"], correctIndex: 0, explanation: "Solve $y = 3x - 6$ for $x$: $x = \\frac{y+6}{3}$." },
    { question: "A function has an inverse if and only if it is:", choices: ["Continuous", "One-to-one", "Differentiable", "Even"], correctIndex: 1, explanation: "Only one-to-one (injective) functions have inverses, verified by the horizontal line test." },
    { question: "If $f(x) = e^x$, then $f^{-1}(x) =$?", choices: ["$\\ln x$", "$\\frac{1}{e^x}$", "$e^{-x}$", "$10^x$"], correctIndex: 0, explanation: "The natural logarithm is the inverse of the exponential function." },
  ],
  "pc-2-2": [
    { question: "Which identity is correct?", choices: ["$\\sin^2\\theta + \\cos^2\\theta = 1$", "$\\sin^2\\theta - \\cos^2\\theta = 1$", "$\\sin\\theta + \\cos\\theta = 1$", "$\\tan^2\\theta + 1 = \\sec\\theta$"], correctIndex: 0, explanation: "The Pythagorean identity: $\\sin^2\\theta + \\cos^2\\theta = 1$." },
    { question: "$\\sin(2\\theta) =$?", choices: ["$2\\sin\\theta$", "$2\\sin\\theta\\cos\\theta$", "$\\sin^2\\theta$", "$\\cos(2\\theta)$"], correctIndex: 1, explanation: "The double-angle formula: $\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$." },
    { question: "$\\cos(\\pi/3) =$?", choices: ["$\\frac{\\sqrt{3}}{2}$", "$\\frac{1}{2}$", "$\\frac{\\sqrt{2}}{2}$", "$0$"], correctIndex: 1, explanation: "$\\cos(60°) = \\frac{1}{2}$ is a standard unit circle value." },
    { question: "$\\tan\\theta$ is undefined when:", choices: ["$\\sin\\theta = 0$", "$\\cos\\theta = 0$", "$\\theta = 0$", "$\\theta = \\pi/4$"], correctIndex: 1, explanation: "$\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$, so it's undefined when $\\cos\\theta = 0$." },
  ],
  "pc-3-1": [
    { question: "The 10th term of the arithmetic sequence $2, 5, 8, \\ldots$ is:", choices: ["$29$", "$32$", "$27$", "$30$"], correctIndex: 0, explanation: "$a_n = a_1 + (n-1)d = 2 + 9(3) = 29$." },
    { question: "The sum of a geometric series $\\sum_{k=0}^{n-1} ar^k =$?", choices: ["$a\\frac{1-r^n}{1-r}$", "$\\frac{a}{1-r}$", "$anr$", "$a + nr$"], correctIndex: 0, explanation: "The finite geometric series formula is $S_n = a\\frac{1-r^n}{1-r}$ for $r \\neq 1$." },
    { question: "An infinite geometric series converges when:", choices: ["$r > 1$", "$|r| < 1$", "$r = 1$", "$|r| > 1$"], correctIndex: 1, explanation: "Convergence requires the common ratio $|r| < 1$, giving sum $\\frac{a}{1-r}$." },
  ],
  "pc-3-2": [
    { question: "The standard form of a circle with center $(h,k)$ and radius $r$ is:", choices: ["$(x-h)^2 + (y-k)^2 = r^2$", "$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$", "$y = ax^2 + bx + c$", "$x^2 - y^2 = r^2$"], correctIndex: 0, explanation: "A circle is defined as all points at distance $r$ from center $(h,k)$." },
    { question: "An ellipse has the equation $\\frac{x^2}{9} + \\frac{y^2}{4} = 1$. The semi-major axis length is:", choices: ["$2$", "$3$", "$4$", "$9$"], correctIndex: 1, explanation: "The larger denominator is $9 = 3^2$, so the semi-major axis is $a = 3$." },
    { question: "A parabola $y = x^2$ opens:", choices: ["Left", "Right", "Upward", "Downward"], correctIndex: 2, explanation: "Since the coefficient of $x^2$ is positive, the parabola opens upward." },
    { question: "The asymptotes of $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ are:", choices: ["$y = \\pm\\frac{b}{a}x$", "$y = \\pm\\frac{a}{b}x$", "$y = \\pm ax$", "$y = \\pm bx$"], correctIndex: 0, explanation: "A horizontal hyperbola has asymptotes $y = \\pm\\frac{b}{a}x$." },
  ],

  // ── Calculus I (remaining) ──
  "c1-2-2": [
    { question: "For $x^2 + y^2 = 25$, $\\frac{dy}{dx} =$?", choices: ["$\\frac{x}{y}$", "$-\\frac{x}{y}$", "$-\\frac{y}{x}$", "$\\frac{2x}{2y}$"], correctIndex: 1, explanation: "Implicit differentiation: $2x + 2y\\frac{dy}{dx} = 0$, so $\\frac{dy}{dx} = -\\frac{x}{y}$." },
    { question: "In a related rates problem, if $A = \\pi r^2$, then $\\frac{dA}{dt} =$?", choices: ["$\\pi r^2 \\frac{dr}{dt}$", "$2\\pi r \\frac{dr}{dt}$", "$2\\pi r$", "$\\pi \\frac{dr}{dt}$"], correctIndex: 1, explanation: "Differentiate with respect to $t$: $\\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt}$." },
    { question: "Implicit differentiation is needed when:", choices: ["$y$ is given explicitly", "$y$ cannot be easily isolated", "The function is linear", "There's only one variable"], correctIndex: 1, explanation: "We use implicit differentiation when $y$ is defined implicitly as a function of $x$." },
  ],
  "c1-4-1": [
    { question: "The Fundamental Theorem of Calculus Part 1 states that $\\frac{d}{dx}\\int_a^x f(t)\\,dt =$?", choices: ["$f(a)$", "$f(x)$", "$F(x) - F(a)$", "$\\int f(x) dx$"], correctIndex: 1, explanation: "FTC Part 1: the derivative of the integral from $a$ to $x$ of $f(t)dt$ equals $f(x)$." },
    { question: "$\\int_1^3 2x\\,dx =$?", choices: ["$4$", "$8$", "$6$", "$9$"], correctIndex: 1, explanation: "$\\int_1^3 2x\\,dx = [x^2]_1^3 = 9 - 1 = 8$." },
    { question: "If $F'(x) = f(x)$, then $\\int_a^b f(x)dx =$?", choices: ["$F(a) - F(b)$", "$F(b) - F(a)$", "$F(a) + F(b)$", "$f(b) - f(a)$"], correctIndex: 1, explanation: "FTC Part 2: $\\int_a^b f(x)dx = F(b) - F(a)$." },
    { question: "The definite integral $\\int_a^b f(x)dx$ represents:", choices: ["The slope at $b$", "The net signed area under $f$", "The average of $f$", "The maximum of $f$"], correctIndex: 1, explanation: "The definite integral computes the net signed area between $f(x)$ and the x-axis." },
  ],

  // ── Calculus II (remaining) ──
  "c2-1-2": [
    { question: "For $\\int \\frac{dx}{\\sqrt{1-x^2}}$, use the substitution:", choices: ["$x = \\sin\\theta$", "$x = \\tan\\theta$", "$x = \\sec\\theta$", "$x = e^\\theta$"], correctIndex: 0, explanation: "The form $\\sqrt{1-x^2}$ calls for $x = \\sin\\theta$, giving $\\sqrt{1-\\sin^2\\theta} = \\cos\\theta$." },
    { question: "$\\int \\frac{dx}{\\sqrt{x^2+1}}$ uses which substitution?", choices: ["$x = \\sin\\theta$", "$x = \\cos\\theta$", "$x = \\tan\\theta$", "$x = \\sec\\theta$"], correctIndex: 2, explanation: "For $\\sqrt{x^2+1}$, let $x = \\tan\\theta$ so $\\sqrt{\\tan^2\\theta + 1} = \\sec\\theta$." },
    { question: "After substituting $x = a\\sin\\theta$, $dx =$?", choices: ["$a\\cos\\theta\\,d\\theta$", "$a\\sin\\theta\\,d\\theta$", "$-a\\sin\\theta\\,d\\theta$", "$a\\,d\\theta$"], correctIndex: 0, explanation: "$x = a\\sin\\theta \\Rightarrow dx = a\\cos\\theta\\,d\\theta$." },
  ],
  "c2-1-3": [
    { question: "$\\int \\frac{3x+5}{(x+1)(x+2)}dx$ requires:", choices: ["u-substitution", "Integration by parts", "Partial fraction decomposition", "Trig substitution"], correctIndex: 2, explanation: "A rational function with factorable denominator is decomposed into partial fractions." },
    { question: "In partial fractions, $\\frac{1}{(x-1)(x+2)} =$?", choices: ["$\\frac{A}{x-1} + \\frac{B}{x+2}$", "$\\frac{Ax+B}{(x-1)(x+2)}$", "$\\frac{A}{x-1} \\cdot \\frac{B}{x+2}$", "$\\frac{1}{x-1} - \\frac{1}{x+2}$"], correctIndex: 0, explanation: "Distinct linear factors decompose as $\\frac{A}{x-1} + \\frac{B}{x+2}$." },
    { question: "A repeated factor $(x-1)^2$ in the denominator contributes:", choices: ["$\\frac{A}{x-1}$ only", "$\\frac{A}{x-1} + \\frac{B}{(x-1)^2}$", "$\\frac{Ax+B}{(x-1)^2}$", "$\\frac{A}{(x-1)^2}$ only"], correctIndex: 1, explanation: "Repeated linear factors need terms for each power: $\\frac{A}{x-1} + \\frac{B}{(x-1)^2}$." },
  ],
  "c2-2-2": [
    { question: "The Maclaurin series for $e^x$ is:", choices: ["$\\sum_{n=0}^{\\infty} \\frac{x^n}{n!}$", "$\\sum_{n=0}^{\\infty} x^n$", "$\\sum_{n=1}^{\\infty} \\frac{x^n}{n}$", "$\\sum_{n=0}^{\\infty} \\frac{(-1)^n x^n}{n!}$"], correctIndex: 0, explanation: "$e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}$ — all derivatives of $e^x$ are 1 at $x=0$." },
    { question: "The radius of convergence of $\\sum \\frac{x^n}{n!}$ is:", choices: ["$1$", "$0$", "$\\infty$", "$e$"], correctIndex: 2, explanation: "By the ratio test, $\\lim \\frac{|x|}{n+1} = 0 < 1$ for all $x$, so $R = \\infty$." },
    { question: "A Taylor series centered at $a$ uses derivatives evaluated at:", choices: ["$x = 0$", "$x = a$", "$x = \\infty$", "$x = 1$"], correctIndex: 1, explanation: "Taylor series: $f(x) = \\sum \\frac{f^{(n)}(a)}{n!}(x-a)^n$, coefficients use $f^{(n)}(a)$." },
    { question: "The first 3 terms of $\\sin x$ Maclaurin series are:", choices: ["$x - \\frac{x^3}{6} + \\frac{x^5}{120}$", "$1 - \\frac{x^2}{2} + \\frac{x^4}{24}$", "$x + \\frac{x^2}{2} + \\frac{x^3}{6}$", "$1 + x + \\frac{x^2}{2}$"], correctIndex: 0, explanation: "$\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots$." },
  ],

  // ── Calculus III (remaining) ──
  "c3-2-2": [
    { question: "A critical point of $f(x,y)$ occurs when:", choices: ["$f = 0$", "$\\nabla f = \\vec{0}$", "$f_{xx} = 0$", "$f$ is continuous"], correctIndex: 1, explanation: "Critical points occur where all partial derivatives are zero: $f_x = 0$ and $f_y = 0$." },
    { question: "The second derivative test uses $D = f_{xx}f_{yy} - (f_{xy})^2$. If $D > 0$ and $f_{xx} > 0$:", choices: ["Saddle point", "Local maximum", "Local minimum", "Inconclusive"], correctIndex: 2, explanation: "$D > 0$ with $f_{xx} > 0$ indicates the surface curves upward — a local minimum." },
    { question: "Lagrange multipliers solve optimization with:", choices: ["No constraints", "Equality constraints", "Inequality constraints only", "Integer constraints"], correctIndex: 1, explanation: "Lagrange multipliers handle optimization subject to equality constraints $g(x,y) = c$." },
  ],
  "c3-3-1": [
    { question: "$\\int\\int_R 1\\,dA$ gives:", choices: ["The volume under $f$", "The area of region $R$", "The perimeter of $R$", "Zero"], correctIndex: 1, explanation: "Integrating the constant 1 over $R$ yields the area of the region." },
    { question: "To switch a double integral to polar coordinates, $dA =$?", choices: ["$dr\\,d\\theta$", "$r\\,dr\\,d\\theta$", "$r^2\\,dr\\,d\\theta$", "$\\frac{1}{r}\\,dr\\,d\\theta$"], correctIndex: 1, explanation: "In polar coordinates, the area element is $dA = r\\,dr\\,d\\theta$ (the Jacobian is $r$)." },
    { question: "A triple integral $\\iiint_E f\\,dV$ can compute:", choices: ["Area only", "Mass of a solid with density $f$", "Arc length", "Surface area only"], correctIndex: 1, explanation: "If $f$ is a density function, $\\iiint f\\,dV$ gives the total mass of the solid $E$." },
    { question: "Fubini's theorem allows us to:", choices: ["Swap limits of differentiation", "Evaluate iterated integrals in any order", "Ignore discontinuities", "Skip the inner integral"], correctIndex: 1, explanation: "Fubini's theorem states that for continuous $f$, the order of integration can be changed." },
  ],
  "c3-3-2": [
    { question: "Green's Theorem relates:", choices: ["A line integral to a double integral", "A surface integral to a volume integral", "Two line integrals", "A derivative to an integral"], correctIndex: 0, explanation: "Green's Theorem: $\\oint_C \\vec{F}\\cdot d\\vec{r} = \\iint_D \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right)dA$." },
    { question: "The Divergence Theorem relates:", choices: ["Line and surface integrals", "Surface integral of $\\vec{F}$ to volume integral of $\\nabla \\cdot \\vec{F}$", "Two volume integrals", "Gradient to curl"], correctIndex: 1, explanation: "$\\oiint_S \\vec{F}\\cdot d\\vec{S} = \\iiint_E \\nabla\\cdot\\vec{F}\\,dV$." },
    { question: "Stokes' Theorem generalizes which theorem to 3D?", choices: ["Fubini's Theorem", "Green's Theorem", "Mean Value Theorem", "FTC"], correctIndex: 1, explanation: "Stokes' Theorem is the 3D generalization of Green's Theorem, relating a surface integral of curl to a line integral." },
  ],
};
