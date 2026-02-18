export type Lesson = {
  id: string;
  title: string;
  duration: string;
  summary: string;
  keyConcepts: string[];
  worked_example: { problem: string; solution: string };
  references: { title: string; author: string; url: string }[];
};

export type Unit = {
  unit: number;
  title: string;
  lessons: Lesson[];
};

export type CourseData = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: "cyan" | "gold" | "teal";
  units: Unit[];
};

export const courses: Record<string, CourseData> = {
  "pre-calculus": {
    id: "pre-calculus",
    title: "Pre-Calculus",
    subtitle: "Foundation for Calculus",
    description:
      "Build the algebraic and trigonometric foundations required for success in Calculus.",
    color: "gold",
    units: [
      {
        unit: 1,
        title: "Functions & Their Graphs",
        lessons: [
          {
            id: "pc-1-1",
            title: "Introduction to Functions",
            duration: "25 min",
            summary:
              "A function f assigns exactly one output to every input in its domain. We write y = f(x). The domain is the set of valid inputs; the range is the set of outputs produced.",
            keyConcepts: ["Domain & Range", "Vertical Line Test", "Function Notation f(x)", "Piecewise Functions"],
            worked_example: {
              problem: "Find the domain of f(x) = √(4 − x²).",
              solution:
                "We need 4 − x² ≥ 0  ⟹  x² ≤ 4  ⟹  −2 ≤ x ≤ 2. Domain: [−2, 2].",
            },
            references: [
              {
                title: "Precalculus: Mathematics for Calculus, 7th ed.",
                author: "Stewart, Redlin & Watson (2016)",
                url: "https://www.stewartmath.com/precalculus.html",
              },
              {
                title: "Khan Academy – Intro to Functions",
                author: "Khan Academy",
                url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions",
              },
            ],
          },
          {
            id: "pc-1-2",
            title: "Transformations of Functions",
            duration: "30 min",
            summary:
              "Graph transformations shift, reflect, stretch, or compress a parent function without changing its fundamental shape. Vertical shifts: f(x)+k; horizontal shifts: f(x−h); reflections: −f(x) or f(−x); stretches: af(x).",
            keyConcepts: ["Vertical & Horizontal Shifts", "Reflections", "Vertical Stretches & Compressions", "Combining Transformations"],
            worked_example: {
              problem: "Describe the graph of g(x) = −2(x + 3)² + 5.",
              solution:
                "Start with f(x) = x². Shift left 3: (x+3)². Reflect over x-axis and stretch by 2: −2(x+3)². Shift up 5: −2(x+3)²+5. Vertex at (−3, 5), opens downward.",
            },
            references: [
              {
                title: "Precalculus, 10th ed.",
                author: "Sullivan (2019), Pearson",
                url: "https://www.pearson.com/en-us/subject-catalog/p/precalculus/P200000007157",
              },
              {
                title: "Paul's Online Math Notes – Transformations",
                author: "Paul Dawkins",
                url: "https://tutorial.math.lamar.edu/Classes/Alg/Transformations.aspx",
              },
            ],
          },
          {
            id: "pc-1-3",
            title: "Composite & Inverse Functions",
            duration: "35 min",
            summary:
              "(f∘g)(x) = f(g(x)) applies g first, then f. The inverse f⁻¹ reverses the mapping: f(f⁻¹(x)) = x. A function has an inverse iff it is one-to-one (passes the horizontal line test).",
            keyConcepts: ["Composition (f∘g)", "One-to-One Functions", "Horizontal Line Test", "Finding f⁻¹"],
            worked_example: {
              problem: "Find the inverse of f(x) = (2x − 1)/(x + 3).",
              solution:
                "Let y = (2x−1)/(x+3). Solve for x: y(x+3) = 2x−1 → xy + 3y = 2x − 1 → x(y−2) = −1−3y → x = (−1−3y)/(y−2). So f⁻¹(x) = (−1−3x)/(x−2).",
            },
            references: [
              {
                title: "Precalculus: Mathematics for Calculus, 7th ed.",
                author: "Stewart, Redlin & Watson (2016)",
                url: "https://www.stewartmath.com/precalculus.html",
              },
            ],
          },
        ],
      },
      {
        unit: 2,
        title: "Trigonometry",
        lessons: [
          {
            id: "pc-2-1",
            title: "Unit Circle & Radian Measure",
            duration: "30 min",
            summary:
              "One radian is the angle subtending an arc equal to the radius. π radians = 180°. On the unit circle (r = 1), a point at angle θ is (cos θ, sin θ). Memorise the exact values at 0, π/6, π/4, π/3, π/2 and their reflections.",
            keyConcepts: ["Radian vs Degree", "Unit Circle", "Exact Values of sin/cos/tan", "Reference Angles"],
            worked_example: {
              problem: "Find sin(5π/6) and cos(5π/6) exactly.",
              solution:
                "5π/6 is in Quadrant II with reference angle π/6. sin(5π/6) = sin(π/6) = 1/2. cos(5π/6) = −cos(π/6) = −√3/2.",
            },
            references: [
              {
                title: "Trigonometry, 11th ed.",
                author: "Lial, Hornsby & Schneider (2016), Pearson",
                url: "https://www.pearson.com/en-us/subject-catalog/p/trigonometry/P200000006231",
              },
              {
                title: "Khan Academy – Unit Circle",
                author: "Khan Academy",
                url: "https://www.khanacademy.org/math/trigonometry/unit-circle-trig-func",
              },
            ],
          },
          {
            id: "pc-2-2",
            title: "Trigonometric Identities",
            duration: "40 min",
            summary:
              "Identities are equations true for all valid θ. Pythagorean: sin²θ + cos²θ = 1. Sum/difference: sin(A±B) = sinA cosB ± cosA sinB. Double-angle: sin2θ = 2sinθcosθ, cos2θ = cos²θ − sin²θ.",
            keyConcepts: ["Pythagorean Identities", "Sum & Difference Formulas", "Double-Angle Formulas", "Half-Angle Formulas"],
            worked_example: {
              problem: "Prove: (1 − cos2θ)/sin2θ = tanθ.",
              solution:
                "LHS = (1 − (1 − 2sin²θ))/(2sinθcosθ) = 2sin²θ/(2sinθcosθ) = sinθ/cosθ = tanθ = RHS. ∎",
            },
            references: [
              {
                title: "Precalculus: Mathematics for Calculus, 7th ed.",
                author: "Stewart, Redlin & Watson (2016)",
                url: "https://www.stewartmath.com/precalculus.html",
              },
              {
                title: "Paul's Online Math Notes – Trig Identities & Equations",
                author: "Paul Dawkins",
                url: "https://tutorial.math.lamar.edu/Classes/CalcI/TrigFcns.aspx",
              },
            ],
          },
        ],
      },
      {
        unit: 3,
        title: "Sequences, Series & Conic Sections",
        lessons: [
          {
            id: "pc-3-1",
            title: "Arithmetic & Geometric Sequences",
            duration: "25 min",
            summary:
              "Arithmetic: aₙ = a₁ + (n−1)d, sum Sₙ = n(a₁+aₙ)/2. Geometric: aₙ = a₁ rⁿ⁻¹, sum Sₙ = a₁(1−rⁿ)/(1−r). Infinite geometric series converges to a₁/(1−r) when |r| < 1.",
            keyConcepts: ["Arithmetic Sequence", "Geometric Sequence", "Series Summation", "Infinite Series Convergence"],
            worked_example: {
              problem: "Find the sum of the infinite geometric series 3 + 1 + 1/3 + …",
              solution: "a₁ = 3, r = 1/3. |r| < 1 so S = 3/(1 − 1/3) = 3/(2/3) = 9/2.",
            },
            references: [
              {
                title: "Precalculus, 10th ed.",
                author: "Sullivan (2019), Pearson",
                url: "https://www.pearson.com/en-us/subject-catalog/p/precalculus/P200000007157",
              },
            ],
          },
          {
            id: "pc-3-2",
            title: "Conic Sections",
            duration: "35 min",
            summary:
              "Conics are curves formed by slicing a double cone: circle (x²+y²=r²), parabola (y=ax²), ellipse (x²/a²+y²/b²=1), hyperbola (x²/a²−y²/b²=1). Each has geometric foci and directrix properties used throughout physics and engineering.",
            keyConcepts: ["Parabola", "Ellipse", "Hyperbola", "Foci & Directrix", "Standard Form"],
            worked_example: {
              problem: "Find the foci of the ellipse x²/25 + y²/9 = 1.",
              solution:
                "a² = 25, b² = 9, c² = a²−b² = 16 ⟹ c = 4. Foci at (±4, 0).",
            },
            references: [
              {
                title: "Precalculus: Mathematics for Calculus, 7th ed.",
                author: "Stewart, Redlin & Watson (2016)",
                url: "https://www.stewartmath.com/precalculus.html",
              },
            ],
          },
        ],
      },
    ],
  },

  "calculus-1": {
    id: "calculus-1",
    title: "Calculus I",
    subtitle: "Limits, Derivatives & Applications",
    description: "The mathematics of change — from rigorous limits to the Fundamental Theorem of Calculus.",
    color: "cyan",
    units: [
      {
        unit: 1,
        title: "Limits & Continuity",
        lessons: [
          {
            id: "c1-1-1",
            title: "The Concept of a Limit",
            duration: "30 min",
            summary:
              "lim_{x→a} f(x) = L means f(x) can be made arbitrarily close to L by taking x sufficiently close (but not equal) to a. Left-hand and right-hand limits must agree for the two-sided limit to exist.",
            keyConcepts: ["Intuitive Limit", "One-Sided Limits", "Limit Laws", "Squeeze Theorem"],
            worked_example: {
              problem: "Evaluate lim_{x→0} (sin x)/x.",
              solution:
                "By the Squeeze Theorem (or geometric argument): cos x ≤ (sin x)/x ≤ 1 near 0, and both bounds → 1. Therefore lim_{x→0} (sin x)/x = 1.",
            },
            references: [
              {
                title: "Calculus: Early Transcendentals, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/",
              },
              {
                title: "Paul's Online Math Notes – Limits",
                author: "Paul Dawkins",
                url: "https://tutorial.math.lamar.edu/Classes/CalcI/limitsintro.aspx",
              },
            ],
          },
          {
            id: "c1-1-2",
            title: "Continuity",
            duration: "25 min",
            summary:
              "f is continuous at a if: (1) f(a) is defined, (2) lim_{x→a} f(x) exists, (3) the limit equals f(a). Types of discontinuities: removable, jump, infinite. The Intermediate Value Theorem guarantees roots of continuous functions.",
            keyConcepts: ["Continuity Definition", "Types of Discontinuities", "IVT", "Continuous on Interval"],
            worked_example: {
              problem: "Show f(x) = x³ − 4x + 1 has a root in (1, 2).",
              solution:
                "f(1) = 1−4+1 = −2 < 0, f(2) = 8−8+1 = 1 > 0. f is continuous (polynomial), so by IVT there exists c ∈ (1,2) with f(c) = 0.",
            },
            references: [
              {
                title: "Calculus, 4th ed.",
                author: "Spivak (2008), Publish or Perish",
                url: "https://www.publishorperish.com/",
              },
              {
                title: "Khan Academy – Continuity",
                author: "Khan Academy",
                url: "https://www.khanacademy.org/math/ap-calculus-ab/ab-limits-new/ab-1-11/v/continuity-at-a-point",
              },
            ],
          },
        ],
      },
      {
        unit: 2,
        title: "Differentiation",
        lessons: [
          {
            id: "c1-2-1",
            title: "The Derivative & Differentiation Rules",
            duration: "40 min",
            summary:
              "The derivative f'(x) = lim_{h→0} [f(x+h)−f(x)]/h measures instantaneous rate of change. Rules: Power d/dx(xⁿ)=nxⁿ⁻¹, Product (uv)'=u'v+uv', Quotient (u/v)'=(u'v−uv')/v², Chain d/dx[f(g(x))]=f'(g(x))g'(x).",
            keyConcepts: ["Limit Definition of Derivative", "Power Rule", "Product & Quotient Rules", "Chain Rule"],
            worked_example: {
              problem: "Differentiate h(x) = sin(x²).",
              solution:
                "Chain rule: outer = sin u, inner = x². h'(x) = cos(x²) · 2x.",
            },
            references: [
              {
                title: "Calculus: Early Transcendentals, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/",
              },
              {
                title: "MIT OpenCourseWare – 18.01 Differentiation",
                author: "MIT OCW",
                url: "https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/",
              },
            ],
          },
          {
            id: "c1-2-2",
            title: "Implicit Differentiation & Related Rates",
            duration: "35 min",
            summary:
              "Implicit differentiation treats y as a function of x and differentiates both sides with respect to x, applying the chain rule to y-terms (giving dy/dx factors). Related rates apply this to real-world quantities changing over time.",
            keyConcepts: ["Implicit Differentiation", "dy/dx from Implicit Equations", "Related Rates Setup", "Units & Interpretation"],
            worked_example: {
              problem: "A spherical balloon is inflated at 10 cm³/s. How fast is the radius growing when r = 5 cm?",
              solution:
                "V = (4/3)πr³. dV/dt = 4πr² dr/dt. So dr/dt = (dV/dt)/(4πr²) = 10/(4π·25) = 1/(10π) cm/s.",
            },
            references: [
              {
                title: "Calculus: Early Transcendentals, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/",
              },
            ],
          },
        ],
      },
      {
        unit: 3,
        title: "Applications of Derivatives",
        lessons: [
          {
            id: "c1-3-1",
            title: "Curve Sketching & Optimization",
            duration: "45 min",
            summary:
              "First Derivative Test: sign change of f' at a critical point determines local max/min. Second Derivative Test: f''(c)>0 ⟹ local min, f''(c)<0 ⟹ local max. Optimization: identify objective function, domain, then find global extremum.",
            keyConcepts: ["Critical Points", "First & Second Derivative Tests", "Concavity & Inflection", "Closed Interval Method"],
            worked_example: {
              problem: "A farmer has 200 m of fence to enclose a rectangular area against a barn wall (no fence on one side). Maximize area.",
              solution:
                "Let width = x, length = 200−2x. A(x) = x(200−2x) = 200x−2x². A'(x) = 200−4x = 0 ⟹ x = 50. A = 50·100 = 5000 m².",
            },
            references: [
              {
                title: "Calculus: Early Transcendentals, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/",
              },
              {
                title: "Paul's Online Math Notes – Optimization",
                author: "Paul Dawkins",
                url: "https://tutorial.math.lamar.edu/Classes/CalcI/Optimization.aspx",
              },
            ],
          },
        ],
      },
      {
        unit: 4,
        title: "Integration & the FTC",
        lessons: [
          {
            id: "c1-4-1",
            title: "The Definite Integral & FTC",
            duration: "45 min",
            summary:
              "The definite integral ∫ₐᵇ f(x)dx is the signed area under f. The Fundamental Theorem of Calculus (Part 1): d/dx[∫ₐˣ f(t)dt] = f(x). Part 2: ∫ₐᵇ f(x)dx = F(b)−F(a) where F is any antiderivative.",
            keyConcepts: ["Riemann Sums", "Definite Integral", "FTC Part 1 & 2", "Net Change Theorem"],
            worked_example: {
              problem: "Evaluate ∫₀² (3x² − 2x + 1) dx.",
              solution:
                "Antiderivative: F(x) = x³ − x² + x. F(2)−F(0) = (8−4+2)−0 = 6.",
            },
            references: [
              {
                title: "Calculus: Early Transcendentals, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/",
              },
              {
                title: "MIT OCW – 18.01 Integration",
                author: "MIT OCW",
                url: "https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/",
              },
            ],
          },
        ],
      },
    ],
  },

  "calculus-2": {
    id: "calculus-2",
    title: "Calculus II",
    subtitle: "Integration Techniques & Infinite Series",
    description: "Mastering the art of integration and the beautiful theory of infinite series.",
    color: "teal",
    units: [
      {
        unit: 1,
        title: "Integration Techniques",
        lessons: [
          {
            id: "c2-1-1",
            title: "Integration by Parts",
            duration: "35 min",
            summary:
              "∫ u dv = uv − ∫ v du. Choose u using LIATE priority (Logarithm, Inverse trig, Algebraic, Trig, Exponential). Sometimes requires repeating or tabular method for products of polynomials and exponentials.",
            keyConcepts: ["LIATE Rule", "∫ u dv = uv − ∫ v du", "Tabular Method", "Repeated Integration by Parts"],
            worked_example: {
              problem: "Evaluate ∫ x eˣ dx.",
              solution:
                "Let u = x (du = dx), dv = eˣ dx (v = eˣ). ∫ x eˣ dx = x eˣ − ∫ eˣ dx = x eˣ − eˣ + C = eˣ(x−1) + C.",
            },
            references: [
              {
                title: "Calculus: Early Transcendentals, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/",
              },
              {
                title: "Paul's Online Math Notes – Integration by Parts",
                author: "Paul Dawkins",
                url: "https://tutorial.math.lamar.edu/Classes/CalcII/IntegrationByParts.aspx",
              },
            ],
          },
          {
            id: "c2-1-2",
            title: "Trigonometric Substitution",
            duration: "40 min",
            summary:
              "For integrals involving √(a²−x²), √(a²+x²), or √(x²−a²), substitute x = a sinθ, x = a tanθ, or x = a secθ respectively to eliminate the square root using a Pythagorean identity.",
            keyConcepts: ["x = a sinθ substitution", "x = a tanθ substitution", "x = a secθ substitution", "Back-substitution"],
            worked_example: {
              problem: "Evaluate ∫ √(9−x²) dx.",
              solution:
                "Let x = 3sinθ, dx = 3cosθ dθ. √(9−9sin²θ) = 3cosθ. Integral = ∫9cos²θ dθ = (9/2)(θ + sinθcosθ) + C = (9/2)(arcsin(x/3) + x√(9−x²)/9) + C.",
            },
            references: [
              {
                title: "Calculus: Early Transcendentals, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/",
              },
            ],
          },
          {
            id: "c2-1-3",
            title: "Partial Fractions",
            duration: "35 min",
            summary:
              "Decompose a proper rational function into simpler fractions over linear and irreducible quadratic factors, then integrate each piece separately. Essential for integrals of the form ∫ P(x)/Q(x) dx.",
            keyConcepts: ["Proper vs Improper Fractions", "Linear Factors", "Repeated Factors", "Irreducible Quadratics"],
            worked_example: {
              problem: "Evaluate ∫ 1/(x²−1) dx.",
              solution:
                "1/(x²−1) = 1/((x−1)(x+1)) = (1/2)/(x−1) − (1/2)/(x+1). Integral = (1/2)ln|x−1| − (1/2)ln|x+1| + C = (1/2)ln|(x−1)/(x+1)| + C.",
            },
            references: [
              {
                title: "Paul's Online Math Notes – Partial Fractions",
                author: "Paul Dawkins",
                url: "https://tutorial.math.lamar.edu/Classes/CalcII/PartialFractions.aspx",
              },
            ],
          },
        ],
      },
      {
        unit: 2,
        title: "Sequences & Series",
        lessons: [
          {
            id: "c2-2-1",
            title: "Convergence Tests",
            duration: "50 min",
            summary:
              "A series Σaₙ converges if its partial sums approach a finite limit. Key tests: Divergence Test (if aₙ↛0, diverges), p-series (Σ1/nᵖ converges iff p>1), Ratio Test (L=lim|aₙ₊₁/aₙ|; converges if L<1), Root Test, Integral Test, Comparison & Limit Comparison.",
            keyConcepts: ["Divergence Test", "Ratio Test", "p-Series", "Comparison Tests", "Alternating Series Test"],
            worked_example: {
              problem: "Does Σ (n!/nⁿ) converge?",
              solution:
                "Ratio test: |aₙ₊₁/aₙ| = (n+1)!/(n+1)ⁿ⁺¹ · nⁿ/n! = nⁿ/(n+1)ⁿ = (1/(1+1/n))ⁿ → 1/e < 1. Converges.",
            },
            references: [
              {
                title: "Calculus: Early Transcendentals, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/",
              },
              {
                title: "Paul's Online Math Notes – Series and Convergence",
                author: "Paul Dawkins",
                url: "https://tutorial.math.lamar.edu/Classes/CalcII/SeriesIntro.aspx",
              },
            ],
          },
          {
            id: "c2-2-2",
            title: "Power Series & Taylor Series",
            duration: "45 min",
            summary:
              "A power series Σcₙ(x−a)ⁿ has a radius of convergence R. Taylor series of f at a: Σ f⁽ⁿ⁾(a)/n! · (x−a)ⁿ. Key series: eˣ = Σxⁿ/n!, sin x = Σ(−1)ⁿx²ⁿ⁺¹/(2n+1)!, cos x = Σ(−1)ⁿx²ⁿ/(2n)!",
            keyConcepts: ["Radius of Convergence", "Taylor & Maclaurin Series", "Standard Series Expansions", "Error Bounds"],
            worked_example: {
              problem: "Find the Maclaurin series for e^(−x²).",
              solution:
                "Start from eˣ = Σxⁿ/n!. Replace x with −x²: e^(−x²) = Σ(−1)ⁿx²ⁿ/n! = 1 − x² + x⁴/2! − x⁶/3! + …",
            },
            references: [
              {
                title: "Calculus: Early Transcendentals, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/",
              },
              {
                title: "MIT OCW – 18.01SC Power Series",
                author: "MIT OCW",
                url: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
              },
            ],
          },
        ],
      },
    ],
  },

  "calculus-3": {
    id: "calculus-3",
    title: "Calculus III",
    subtitle: "Multivariable Calculus",
    description: "Extend calculus to higher dimensions with vectors, surfaces, and integral theorems.",
    color: "cyan",
    units: [
      {
        unit: 1,
        title: "Vectors & the Geometry of Space",
        lessons: [
          {
            id: "c3-1-1",
            title: "Vectors in 3D & Dot/Cross Products",
            duration: "35 min",
            summary:
              "A vector in ℝ³ is v = ⟨a,b,c⟩. Dot product: u·v = |u||v|cosθ — measures projection and gives 0 for orthogonal vectors. Cross product: u×v is perpendicular to both with magnitude |u||v|sinθ — gives area of parallelogram.",
            keyConcepts: ["3D Coordinates", "Vector Operations", "Dot Product & Angle", "Cross Product & Area"],
            worked_example: {
              problem: "Find the area of the triangle with vertices A(1,0,0), B(0,2,0), C(0,0,3).",
              solution:
                "AB = ⟨−1,2,0⟩, AC = ⟨−1,0,3⟩. AB×AC = ⟨6,3,2⟩. |AB×AC| = √(36+9+4) = 7. Area = 7/2.",
            },
            references: [
              {
                title: "Multivariable Calculus, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/multivariable-calculus-9e-stewart/",
              },
              {
                title: "MIT OCW – 18.02 Multivariable Calculus",
                author: "Denis Auroux, MIT",
                url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/",
              },
            ],
          },
        ],
      },
      {
        unit: 2,
        title: "Partial Derivatives",
        lessons: [
          {
            id: "c3-2-1",
            title: "Partial Derivatives & the Gradient",
            duration: "40 min",
            summary:
              "∂f/∂x holds all other variables constant. The gradient ∇f = ⟨∂f/∂x, ∂f/∂y, ∂f/∂z⟩ points in the direction of steepest ascent and is perpendicular to level curves. The directional derivative D_u f = ∇f · û.",
            keyConcepts: ["Partial Derivatives", "Gradient Vector", "Directional Derivative", "Level Curves"],
            worked_example: {
              problem: "Find the gradient of f(x,y) = x²y + e^(xy) at (1, 0).",
              solution:
                "∂f/∂x = 2xy + ye^(xy), ∂f/∂y = x² + xe^(xy). At (1,0): ∂f/∂x = 0, ∂f/∂y = 1+1 = 2. ∇f(1,0) = ⟨0, 2⟩.",
            },
            references: [
              {
                title: "Multivariable Calculus, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/multivariable-calculus-9e-stewart/",
              },
            ],
          },
          {
            id: "c3-2-2",
            title: "Optimization of Multivariable Functions",
            duration: "45 min",
            summary:
              "Critical points where ∇f = 0 are classified by the Second Derivative Test using the discriminant D = fₓₓfᵧᵧ − fₓᵧ². D>0 and fₓₓ>0 → local min; D>0 and fₓₓ<0 → local max; D<0 → saddle point. Lagrange multipliers handle constrained optimization.",
            keyConcepts: ["Critical Points", "Second Derivative Test (2D)", "Saddle Points", "Lagrange Multipliers"],
            worked_example: {
              problem: "Find the extreme values of f(x,y) = x² + y² subject to x + y = 1.",
              solution:
                "Lagrange: ∇f = λ∇g where g = x+y−1. 2x=λ, 2y=λ ⟹ x=y. From constraint: 2x=1 ⟹ x=y=1/2. Min value f(1/2,1/2) = 1/2.",
            },
            references: [
              {
                title: "Multivariable Calculus, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/multivariable-calculus-9e-stewart/",
              },
              {
                title: "Paul's Online Math Notes – Lagrange Multipliers",
                author: "Paul Dawkins",
                url: "https://tutorial.math.lamar.edu/Classes/CalcIII/LagrangeMultipliers.aspx",
              },
            ],
          },
        ],
      },
      {
        unit: 3,
        title: "Multiple Integrals & Vector Calculus",
        lessons: [
          {
            id: "c3-3-1",
            title: "Double & Triple Integrals",
            duration: "50 min",
            summary:
              "∬_R f(x,y) dA = ∫∫ f dx dy by Fubini's Theorem (reverse order freely for continuous f). For polar coordinates: dA = r dr dθ. Triple integrals extend to volume and mass calculations in cylindrical and spherical coordinates.",
            keyConcepts: ["Fubini's Theorem", "Iterated Integrals", "Polar & Cylindrical Coords", "Spherical Coordinates"],
            worked_example: {
              problem: "Evaluate ∬_D x² + y² dA where D is the disk x²+y²≤4.",
              solution:
                "Polar: ∫₀²π ∫₀² r² · r dr dθ = ∫₀²π dθ · ∫₀² r³ dr = 2π · [r⁴/4]₀² = 2π · 4 = 8π.",
            },
            references: [
              {
                title: "Multivariable Calculus, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/multivariable-calculus-9e-stewart/",
              },
              {
                title: "MIT OCW – 18.02SC Multiple Integrals",
                author: "MIT OCW",
                url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/",
              },
            ],
          },
          {
            id: "c3-3-2",
            title: "Green's, Stokes', and Divergence Theorems",
            duration: "60 min",
            summary:
              "Green's Theorem: ∮_C F·dr = ∬_D (∂Q/∂x − ∂P/∂y) dA (2D). Stokes' Theorem: ∮_C F·dr = ∬_S (∇×F)·dS (3D). Divergence Theorem: ∬_S F·dS = ∭_E (∇·F) dV. All relate boundary integrals to interior integrals.",
            keyConcepts: ["Green's Theorem", "Curl & Stokes' Theorem", "Divergence Theorem", "Flux Integrals"],
            worked_example: {
              problem: "Use Green's Theorem to find ∮_C y²dx + 3xy dy where C is the triangle (0,0),(1,0),(1,2).",
              solution:
                "∂Q/∂x = 3y, ∂P/∂y = 2y. ∬_D (3y−2y) dA = ∬_D y dA. Region: 0≤x≤1, 0≤y≤2x. ∫₀¹∫₀²ˣ y dy dx = ∫₀¹ 2x² dx = 2/3.",
            },
            references: [
              {
                title: "Multivariable Calculus, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/multivariable-calculus-9e-stewart/",
              },
              {
                title: "MIT OCW – 18.02SC Vector Calculus",
                author: "MIT OCW",
                url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/",
              },
            ],
          },
        ],
      },
    ],
  },
};
