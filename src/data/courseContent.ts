export type ChartDataPoint = { label: string; value: number; color?: string };

export type LessonVisual = {
  type: "bar" | "line" | "area" | "radar" | "custom";
  title: string;
  description: string;
  data: ChartDataPoint[];
  xKey?: string;
  yLabel?: string;
};

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  summary: string;
  detailedExplanation: string;
  keyConcepts: string[];
  worked_example: { problem: string; solution: string };
  visual?: LessonVisual;
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
              "A function $f$ assigns exactly one output to every input in its domain. We write $y = f(x)$. The domain is the set of valid inputs; the range is the set of outputs produced.",
            detailedExplanation:
              "A function is one of the most fundamental concepts in mathematics. Think of it as a machine: you put something in (the input, or argument), and you get exactly one thing out (the output). The formal definition says: a function $f$ from set $A$ to set $B$ is a rule that assigns to each element $x$ in $A$ exactly one element, called $f(x)$, in $B$.\n\n**Domain and Range:** The domain is the set of all valid inputs. When we write $f(x) = \\sqrt{4 - x^2}$, we need $4 - x^2 \\geq 0$ because we cannot take the square root of a negative number. Solving gives $-2 \\leq x \\leq 2$, so the domain is $[-2, 2]$. The range is $[0, 2]$ — the possible output values.\n\n**The Vertical Line Test:** A curve in the $xy$-plane is the graph of a function if and only if every vertical line intersects the curve at most once. This is because a function can only have one $y$-value for each $x$-value.\n\n**Function Notation:** $f(x)$ is read \"f of x\". It does NOT mean $f$ times $x$. If $f(x) = x^2 + 1$, then $f(3) = 3^2 + 1 = 10$, and $f(a + 1) = (a+1)^2 + 1 = a^2 + 2a + 2$.\n\n**Piecewise Functions** are defined by different formulas on different parts of their domain. For example, the absolute value function $|x| = x$ when $x \\geq 0$ and $|x| = -x$ when $x < 0$. These appear in physics (step functions) and economics (tax brackets).",
            keyConcepts: ["Domain & Range", "Vertical Line Test", "Function Notation $f(x)$", "Piecewise Functions"],
            worked_example: {
              problem: "Find the domain of $f(x) = \\sqrt{4 - x^2}$.",
              solution:
                "We need $4 - x^2 \\geq 0 \\implies x^2 \\leq 4 \\implies -2 \\leq x \\leq 2$. Domain: $[-2, 2]$.",
            },
            visual: {
              type: "bar",
              title: "Common Function Types & Their Domains",
              description: "Number of valid domain restrictions by function type (higher = more restricted)",
              data: [
                { label: "Linear", value: 1, color: "hsl(191 97% 55%)" },
                { label: "Quadratic", value: 2, color: "hsl(174 72% 45%)" },
                { label: "Square Root", value: 4, color: "hsl(43 96% 56%)" },
                { label: "Rational", value: 5, color: "hsl(191 97% 55%)" },
                { label: "Log", value: 5, color: "hsl(174 72% 45%)" },
                { label: "Trig", value: 3, color: "hsl(43 96% 56%)" },
              ],
              yLabel: "Restriction Level",
            },
            references: [
              {
                title: "Precalculus: Mathematics for Calculus, 7th ed.",
                author: "Stewart, Redlin & Watson (2016), Cengage",
                url: "https://www.cengage.com/c/precalculus-mathematics-for-calculus-7e-stewart/9781305071759/",
              },
              {
                title: "Khan Academy – Introduction to Functions",
                author: "Khan Academy",
                url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions",
              },
              {
                title: "Paul's Online Notes – Functions",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/Alg/FunctionDefn.aspx",
              },
            ],
          },
          {
            id: "pc-1-2",
            title: "Transformations of Functions",
            duration: "30 min",
            summary:
              "Graph transformations shift, reflect, stretch, or compress a parent function without changing its fundamental shape. Vertical shifts: f(x)+k; horizontal shifts: f(x−h); reflections: −f(x) or f(−x); stretches: af(x).",
            detailedExplanation:
              "Transformations let us take a simple \"parent\" function and reshape or reposition it to model any related function. This is enormously powerful — instead of memorising infinitely many functions, we learn a few parents and the transformation rules.\n\n**Vertical Shifts:** Adding k outside: g(x) = f(x) + k moves the graph up k units (down if k < 0). Every point (x, y) becomes (x, y+k). The shape is unchanged.\n\n**Horizontal Shifts:** Adding h inside: g(x) = f(x − h) shifts the graph right h units. Note the counter-intuitive direction: f(x − 3) shifts RIGHT by 3. Think: \"f reaches its old value when x − 3 equals the old input.\"\n\n**Reflections:** g(x) = −f(x) reflects over the x-axis (y-values flip sign). g(x) = f(−x) reflects over the y-axis (x-values flip sign).\n\n**Stretches & Compressions:** g(x) = af(x) stretches vertically by factor |a| (compresses if 0 < |a| < 1). g(x) = f(bx) compresses horizontally by factor b (stretches if 0 < b < 1).\n\n**Order matters:** For g(x) = A·f(B(x − H)) + K, apply transformations in the order: horizontal stretch/compress, horizontal shift, vertical stretch/compress, vertical shift.",
            keyConcepts: ["Vertical & Horizontal Shifts", "Reflections", "Vertical Stretches & Compressions", "Combining Transformations"],
            worked_example: {
              problem: "Describe the graph of g(x) = −2(x + 3)² + 5.",
              solution:
                "Start with f(x) = x². Shift left 3: (x+3)². Reflect over x-axis and stretch by 2: −2(x+3)². Shift up 5: −2(x+3)²+5. Vertex at (−3, 5), opens downward.",
            },
            visual: {
              type: "line",
              title: "Effect of Vertical Stretch on y = x²",
              description: "How different values of 'a' in g(x) = ax² change the parabola's shape at x = 1,2,3",
              data: [
                { label: "a=0.5", value: 0.5 },
                { label: "a=1", value: 1 },
                { label: "a=2", value: 4 },
                { label: "a=3", value: 9 },
                { label: "a=5", value: 25 },
              ],
              yLabel: "g(2) = a·4",
            },
            references: [
              {
                title: "Precalculus, 10th ed.",
                author: "Sullivan (2019), Pearson",
                url: "https://www.pearson.com/en-us/subject-catalog/p/precalculus/P200000007157",
              },
              {
                title: "Paul's Online Notes – Graphing Functions",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/Alg/Transformations.aspx",
              },
              {
                title: "Khan Academy – Transformations of Functions",
                author: "Khan Academy",
                url: "https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:transformations",
              },
            ],
          },
          {
            id: "pc-1-3",
            title: "Composite & Inverse Functions",
            duration: "35 min",
            summary:
              "(f∘g)(x) = f(g(x)) applies g first, then f. The inverse f⁻¹ reverses the mapping: f(f⁻¹(x)) = x. A function has an inverse iff it is one-to-one (passes the horizontal line test).",
            detailedExplanation:
              "**Composition of Functions:** (f∘g)(x) means \"apply g first, then apply f to the result.\" The output of g becomes the input of f. For example, if g(x) = x² and f(x) = sin(x), then (f∘g)(x) = sin(x²). Composition is NOT commutative: f∘g ≠ g∘f in general.\n\nThe domain of f∘g consists of all x in the domain of g such that g(x) is in the domain of f.\n\n**Inverse Functions:** The inverse f⁻¹ undoes what f does. If f(a) = b, then f⁻¹(b) = a. Graphically, the inverse is the reflection of the original graph over the line y = x.\n\n**Existence condition:** f has an inverse if and only if it is one-to-one (injective) — each output value is produced by exactly one input. The Horizontal Line Test checks this: if any horizontal line crosses the graph more than once, the function is not one-to-one.\n\n**Finding an Inverse:** Replace f(x) with y, swap x and y, then solve for y. The result is f⁻¹(x). Always verify by checking f(f⁻¹(x)) = x and f⁻¹(f(x)) = x.\n\n**Key identity:** For exponential and logarithmic functions, they are inverses of each other: ln(eˣ) = x and e^(ln x) = x. This is the foundation for solving exponential equations.",
            keyConcepts: ["Composition (f∘g)", "One-to-One Functions", "Horizontal Line Test", "Finding f⁻¹"],
            worked_example: {
              problem: "Find the inverse of f(x) = (2x − 1)/(x + 3).",
              solution:
                "Let y = (2x−1)/(x+3). Solve for x: y(x+3) = 2x−1 → xy + 3y = 2x − 1 → x(y−2) = −1−3y → x = (−1−3y)/(y−2). So f⁻¹(x) = (−1−3x)/(x−2).",
            },
            references: [
              {
                title: "Precalculus: Mathematics for Calculus, 7th ed.",
                author: "Stewart, Redlin & Watson (2016), Cengage",
                url: "https://www.cengage.com/c/precalculus-mathematics-for-calculus-7e-stewart/9781305071759/",
              },
              {
                title: "Khan Academy – Inverse Functions",
                author: "Khan Academy",
                url: "https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:function-domain-and-range/x2ec2f6f830c9fb89:inverse-functions",
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
            detailedExplanation:
              "**Why Radians?** Degrees are arbitrary (why 360? It comes from ancient Babylonian astronomy). Radians are natural: one radian is the angle subtended at the center of a circle by an arc equal in length to the radius. The full circle has circumference 2πr, so the full angle is 2π radians = 360°.\n\nConversion: degrees × π/180 = radians. Key conversions to memorise:\n- 30° = π/6, 45° = π/4, 60° = π/3, 90° = π/2\n- 120° = 2π/3, 135° = 3π/4, 150° = 5π/6, 180° = π\n\n**The Unit Circle:** A circle of radius 1 centered at the origin. A point on the unit circle at angle θ (measured counterclockwise from the positive x-axis) has coordinates (cos θ, sin θ). This is actually the definition of sine and cosine for any angle.\n\n**Reference Angles:** The reference angle of θ is the acute angle between the terminal side and the x-axis. Use it to find trig values in any quadrant: the magnitude equals the value for the reference angle, with sign determined by the quadrant (All Students Take Calculus: All positive in Q1, Sin positive in Q2, Tan positive in Q3, Cos positive in Q4).\n\n**Arc Length and Sector Area:** For a circle of radius r and central angle θ (in radians): arc length s = rθ, sector area A = (1/2)r²θ.",
            keyConcepts: ["Radian vs Degree", "Unit Circle", "Exact Values of sin/cos/tan", "Reference Angles"],
            worked_example: {
              problem: "Find sin(5π/6) and cos(5π/6) exactly.",
              solution:
                "5π/6 is in Quadrant II with reference angle π/6. sin(5π/6) = sin(π/6) = 1/2. cos(5π/6) = −cos(π/6) = −√3/2.",
            },
            visual: {
              type: "bar",
              title: "Exact Sine Values Around the Unit Circle",
              description: "sin(θ) at key angles — notice the symmetric pattern",
              data: [
                { label: "0", value: 0 },
                { label: "π/6", value: 0.5 },
                { label: "π/4", value: 0.707 },
                { label: "π/3", value: 0.866 },
                { label: "π/2", value: 1 },
                { label: "2π/3", value: 0.866 },
                { label: "3π/4", value: 0.707 },
                { label: "5π/6", value: 0.5 },
                { label: "π", value: 0 },
              ],
              yLabel: "sin(θ)",
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
              {
                title: "Paul's Online Notes – Trig Functions",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/CalcI/TrigFcns.aspx",
              },
            ],
          },
          {
            id: "pc-2-2",
            title: "Trigonometric Identities",
            duration: "40 min",
            summary:
              "Identities are equations true for all valid θ. Pythagorean: sin²θ + cos²θ = 1. Sum/difference: sin(A±B) = sinA cosB ± cosA sinB. Double-angle: sin2θ = 2sinθcosθ, cos2θ = cos²θ − sin²θ.",
            detailedExplanation:
              "A trigonometric identity is an equation that holds true for all values of the variable for which both sides are defined — not just specific solutions.\n\n**Fundamental Pythagorean Identities (derive from sin²θ + cos²θ = 1):**\n- sin²θ + cos²θ = 1\n- tan²θ + 1 = sec²θ (divide by cos²θ)\n- 1 + cot²θ = csc²θ (divide by sin²θ)\n\n**Sum and Difference Formulas:**\n- sin(A ± B) = sinA cosB ± cosA sinB\n- cos(A ± B) = cosA cosB ∓ sinA sinB\n- tan(A ± B) = (tanA ± tanB)/(1 ∓ tanA tanB)\n\n**Double-Angle Formulas (set B = A in sum formulas):**\n- sin 2θ = 2 sinθ cosθ\n- cos 2θ = cos²θ − sin²θ = 1 − 2sin²θ = 2cos²θ − 1\n- tan 2θ = 2tanθ/(1 − tan²θ)\n\n**Half-Angle Formulas:**\n- sin²θ = (1 − cos 2θ)/2 → used to integrate sin²θ\n- cos²θ = (1 + cos 2θ)/2 → essential in integration\n\nThese half-angle power-reduction formulas are critical in Calculus II for integrating powers of trig functions.\n\n**Strategy for Proving Identities:** Work on one side only (usually the more complex side). Look for opportunities to apply known identities, factor, or convert everything to sin and cos.",
            keyConcepts: ["Pythagorean Identities", "Sum & Difference Formulas", "Double-Angle Formulas", "Half-Angle Formulas"],
            worked_example: {
              problem: "Prove: (1 − cos2θ)/sin2θ = tanθ.",
              solution:
                "LHS = (1 − (1 − 2sin²θ))/(2sinθcosθ) = 2sin²θ/(2sinθcosθ) = sinθ/cosθ = tanθ = RHS. ∎",
            },
            references: [
              {
                title: "Precalculus: Mathematics for Calculus, 7th ed.",
                author: "Stewart, Redlin & Watson (2016), Cengage",
                url: "https://www.cengage.com/c/precalculus-mathematics-for-calculus-7e-stewart/9781305071759/",
              },
              {
                title: "Paul's Online Notes – Trig Identities & Equations",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/CalcI/TrigFcns.aspx",
              },
              {
                title: "Khan Academy – Trigonometric Identities",
                author: "Khan Academy",
                url: "https://www.khanacademy.org/math/trigonometry/trig-equations-and-identities",
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
            detailedExplanation:
              "Sequences and series are ordered lists of numbers and their sums. Understanding them is prerequisite for Taylor series in Calculus II.\n\n**Arithmetic Sequences:** Each term is obtained by adding a constant difference d. General term: aₙ = a₁ + (n−1)d. The sum of the first n terms: Sₙ = n(a₁ + aₙ)/2 (average of first and last, times n). Example: 2, 5, 8, 11, … has d = 3, aₙ = 2 + 3(n−1) = 3n − 1.\n\n**Geometric Sequences:** Each term is obtained by multiplying by a constant ratio r. General term: aₙ = a₁ · rⁿ⁻¹. Sum: Sₙ = a₁(1 − rⁿ)/(1 − r) for r ≠ 1. Example: 1, 2, 4, 8, … has r = 2.\n\n**Infinite Geometric Series:** If |r| < 1, the infinite sum converges: S∞ = a₁/(1 − r). This is used to convert repeating decimals to fractions: 0.333… = 3/10 + 3/100 + … = (3/10)/(1 − 1/10) = 1/3.\n\n**Applications:** Compound interest is geometric. Amortization of loans. Fibonacci sequence (neither arithmetic nor geometric, but related). Population models with constant growth rate are geometric.",
            keyConcepts: ["Arithmetic Sequence", "Geometric Sequence", "Series Summation", "Infinite Series Convergence"],
            worked_example: {
              problem: "Find the sum of the infinite geometric series 3 + 1 + 1/3 + …",
              solution: "a₁ = 3, r = 1/3. |r| < 1 so S = 3/(1 − 1/3) = 3/(2/3) = 9/2.",
            },
            visual: {
              type: "line",
              title: "Partial Sums of Geometric Series (a₁=3, r=1/3)",
              description: "How partial sums converge toward S∞ = 4.5 as more terms are added",
              data: [
                { label: "n=1", value: 3 },
                { label: "n=2", value: 4 },
                { label: "n=3", value: 4.33 },
                { label: "n=4", value: 4.44 },
                { label: "n=5", value: 4.48 },
                { label: "n=6", value: 4.49 },
                { label: "n=7", value: 4.5 },
              ],
              yLabel: "Partial Sum Sₙ",
            },
            references: [
              {
                title: "Precalculus, 10th ed.",
                author: "Sullivan (2019), Pearson",
                url: "https://www.pearson.com/en-us/subject-catalog/p/precalculus/P200000007157",
              },
              {
                title: "Khan Academy – Geometric Series",
                author: "Khan Academy",
                url: "https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:seq-and-series/x2ec2f6f830c9fb89:geo-series/a/geometric-series-review",
              },
            ],
          },
          {
            id: "pc-3-2",
            title: "Conic Sections",
            duration: "35 min",
            summary:
              "Conics are curves formed by slicing a double cone: circle (x²+y²=r²), parabola (y=ax²), ellipse (x²/a²+y²/b²=1), hyperbola (x²/a²−y²/b²=1). Each has geometric foci and directrix properties used throughout physics and engineering.",
            detailedExplanation:
              "Conic sections arise when a plane cuts a double cone at various angles. They appear everywhere in physics — planetary orbits are ellipses (Kepler's first law), projectile paths are parabolas, and some comets travel on hyperbolic paths.\n\n**Circle:** x² + y² = r² (centered at origin). Center (h,k): (x−h)² + (y−k)² = r². All points equidistant from center.\n\n**Parabola:** y = ax² (vertical axis) or x = ay² (horizontal axis). The focus is at (0, 1/(4a)) and the directrix is y = −1/(4a). Key property: every point on the parabola is equidistant from the focus and directrix. This is why parabolic mirrors focus parallel light rays to a single point (telescopes, satellite dishes).\n\n**Ellipse:** x²/a² + y²/b² = 1 with a > b. The foci are at (±c, 0) where c² = a² − b². Sum of distances from any point to the two foci equals 2a (constant). Planetary orbits obey this — the Sun is at one focus.\n\n**Hyperbola:** x²/a² − y²/b² = 1. The foci are at (±c, 0) where c² = a² + b². Difference of distances to foci equals 2a. Asymptotes: y = ±(b/a)x. GPS systems use hyperbolas in triangulation.\n\nThe general second-degree equation Ax² + Bxy + Cy² + Dx + Ey + F = 0 describes a conic. The discriminant B² − 4AC tells which: negative → ellipse/circle, zero → parabola, positive → hyperbola.",
            keyConcepts: ["Parabola", "Ellipse", "Hyperbola", "Foci & Directrix", "Standard Form"],
            worked_example: {
              problem: "Find the foci of the ellipse x²/25 + y²/9 = 1.",
              solution:
                "a² = 25, b² = 9, c² = a²−b² = 16 ⟹ c = 4. Foci at (±4, 0).",
            },
            references: [
              {
                title: "Precalculus: Mathematics for Calculus, 7th ed.",
                author: "Stewart, Redlin & Watson (2016), Cengage",
                url: "https://www.cengage.com/c/precalculus-mathematics-for-calculus-7e-stewart/9781305071759/",
              },
              {
                title: "Paul's Online Notes – Conic Sections",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/Alg/Parabolas.aspx",
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
              "$\\lim_{x \\to a} f(x) = L$ means $f(x)$ can be made arbitrarily close to $L$ by taking $x$ sufficiently close (but not equal) to $a$. Left-hand and right-hand limits must agree for the two-sided limit to exist.",
            detailedExplanation:
              "The limit is the central idea of calculus. All of differentiation and integration rest on it.\n\n**Intuitive Definition:** $\\lim_{x \\to a} f(x) = L$ means: as $x$ gets arbitrarily close to $a$ (but never equals $a$), $f(x)$ gets arbitrarily close to $L$. The value of $f$ at $a$ itself is irrelevant — it might not even be defined there.\n\n**One-Sided Limits:** The left-hand limit $\\lim_{x \\to a^-} f(x)$ considers $x$ approaching $a$ from below. The right-hand limit $\\lim_{x \\to a^+}$ considers $x$ from above. The two-sided limit exists if and only if both one-sided limits exist and are equal.\n\n**Key Limit Laws:** If $\\lim f(x) = L$ and $\\lim g(x) = M$, then:\n- $\\lim [f(x) + g(x)] = L + M$\n- $\\lim [f(x) \\cdot g(x)] = L \\cdot M$\n- $\\lim [f(x)/g(x)] = L/M$ (if $M \\neq 0$)\n- $\\lim [f(x)^n] = L^n$\n\n**Squeeze Theorem:** If $h(x) \\leq f(x) \\leq g(x)$ near $a$, and $\\lim h(x) = \\lim g(x) = L$, then $\\lim f(x) = L$. This proves $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ — one of the most important limits in calculus.\n\n**Indeterminate Forms:** When direct substitution gives $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$, we use algebra (factor and cancel), L'Hôpital's Rule, or series expansions to evaluate the limit.",
            keyConcepts: ["Intuitive Limit", "One-Sided Limits", "Limit Laws", "Squeeze Theorem"],
            worked_example: {
              problem: "Evaluate $\\lim_{x \\to 0} \\frac{\\sin x}{x}$.",
              solution:
                "By the Squeeze Theorem (geometric argument): $\\cos x \\leq \\frac{\\sin x}{x} \\leq 1$ near $0$, and both bounds $\\to 1$. Therefore $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.",
            },
            visual: {
              type: "line",
              title: "sin(x)/x approaches 1 as x → 0",
              description: "Values of f(x) = sin(x)/x near x = 0 demonstrating the fundamental limit",
              data: [
                { label: "x=−1", value: 0.841 },
                { label: "x=−0.5", value: 0.959 },
                { label: "x=−0.1", value: 0.998 },
                { label: "x=0⁻", value: 1.0 },
                { label: "x=0⁺", value: 1.0 },
                { label: "x=0.1", value: 0.998 },
                { label: "x=0.5", value: 0.959 },
                { label: "x=1", value: 0.841 },
              ],
              yLabel: "sin(x)/x",
            },
            references: [
              {
                title: "Calculus: Early Transcendentals, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/9781337613927/",
              },
              {
                title: "Paul's Online Notes – Limits",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/CalcI/limitsintro.aspx",
              },
              {
                title: "MIT OCW 18.01 – Limits and Continuity (Lecture Notes)",
                author: "David Jerison, MIT",
                url: "https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/pages/lecture-notes/",
              },
            ],
          },
          {
            id: "c1-1-2",
            title: "Continuity",
            duration: "25 min",
            summary:
              "f is continuous at a if: (1) f(a) is defined, (2) lim_{x→a} f(x) exists, (3) the limit equals f(a). Types of discontinuities: removable, jump, infinite. The Intermediate Value Theorem guarantees roots of continuous functions.",
            detailedExplanation:
              "Continuity formalises the intuitive idea that a function has 'no breaks or jumps.' A function is continuous at a point a if you can draw the graph through that point without lifting your pencil.\n\n**Three Conditions for Continuity at x = a:**\n1. f(a) exists (a is in the domain)\n2. lim_{x→a} f(x) exists (both one-sided limits agree)\n3. lim_{x→a} f(x) = f(a) (the limit equals the function value)\n\nIf any condition fails, we have a discontinuity.\n\n**Types of Discontinuities:**\n- Removable (hole): lim_{x→a} f(x) exists but ≠ f(a), or f(a) undefined. The hole can be 'filled' by redefining f(a).\n- Jump: Left and right limits both exist but are unequal. Common in piecewise functions.\n- Infinite (vertical asymptote): lim_{x→a} f(x) = ±∞. E.g., f(x) = 1/x at x = 0.\n- Oscillatory: The limit doesn't exist due to wild oscillation, e.g., sin(1/x) at x = 0.\n\n**Intermediate Value Theorem (IVT):** If f is continuous on [a, b] and N is any value between f(a) and f(b), then there exists at least one c ∈ (a, b) such that f(c) = N. In particular, if f(a) and f(b) have opposite signs, f has a root in (a, b). This is the theoretical basis for bisection method in numerical analysis.\n\n**Continuity on an interval:** f is continuous on (a, b) if it is continuous at every point in the interval. Polynomials, rational functions (where defined), trig functions, exponential and logarithmic functions are all continuous on their domains.",
            keyConcepts: ["Continuity Definition", "Types of Discontinuities", "IVT", "Continuous on Interval"],
            worked_example: {
              problem: "Show f(x) = x³ − 4x + 1 has a root in (1, 2).",
              solution:
                "f(1) = 1−4+1 = −2 < 0, f(2) = 8−8+1 = 1 > 0. f is continuous (polynomial), so by IVT there exists c ∈ (1,2) with f(c) = 0.",
            },
            visual: {
              type: "bar",
              title: "Types of Discontinuities — Severity Scale",
              description: "Relative complexity/severity of different discontinuity types",
              data: [
                { label: "Removable", value: 1, color: "hsl(43 96% 56%)" },
                { label: "Jump", value: 2, color: "hsl(191 97% 55%)" },
                { label: "Infinite", value: 3, color: "hsl(0 84% 60%)" },
                { label: "Oscillatory", value: 4, color: "hsl(270 80% 65%)" },
              ],
              yLabel: "Severity",
            },
            references: [
              {
                title: "Calculus: Early Transcendentals, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/9781337613927/",
              },
              {
                title: "Calculus, 4th ed.",
                author: "Michael Spivak (2008), Publish or Perish",
                url: "https://www.publishorperish.com/book/calculus-4th-edition/",
              },
              {
                title: "Khan Academy – Continuity at a Point",
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
              "The derivative $f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$ measures instantaneous rate of change. Rules: Power $\\frac{d}{dx}(x^n) = nx^{n-1}$, Product $(uv)' = u'v + uv'$, Quotient $\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$, Chain $\\frac{d}{dx}[f(g(x))] = f'(g(x))g'(x)$.",
            detailedExplanation:
              "The derivative is the instantaneous rate of change — the slope of the tangent line to the graph of f at a point. It is defined as:\n\nf'(x) = lim_{h→0} [f(x+h) − f(x)] / h\n\nThis is the slope of the secant line (through two nearby points) in the limit as the gap shrinks to zero.\n\n**Differentiation Rules (memorise these!):**\n\nConstant: d/dx(c) = 0\nPower Rule: d/dx(xⁿ) = nxⁿ⁻¹ — works for all real n\nConstant Multiple: d/dx[cf(x)] = c·f'(x)\nSum/Difference: (f ± g)' = f' ± g'\nProduct Rule: (uv)' = u'v + uv' — do NOT distribute derivatives over products!\nQuotient Rule: (u/v)' = (u'v − uv')/v²\nChain Rule: d/dx[f(g(x))] = f'(g(x))·g'(x) — differentiate outside, multiply by derivative of inside\n\n**Key function derivatives:**\n- d/dx(sin x) = cos x\n- d/dx(cos x) = −sin x\n- d/dx(eˣ) = eˣ\n- d/dx(ln x) = 1/x\n- d/dx(arctan x) = 1/(1+x²)\n\n**Physical interpretation:** If s(t) is position, s'(t) = v(t) is velocity, s''(t) = a(t) is acceleration. The derivative is negative when the function is decreasing (moving left/down) and positive when increasing.",
            keyConcepts: ["Limit Definition of Derivative", "Power Rule", "Product & Quotient Rules", "Chain Rule"],
            worked_example: {
              problem: "Differentiate h(x) = sin(x²).",
              solution:
                "Chain rule: outer = sin u, inner = x². h'(x) = cos(x²) · 2x.",
            },
            visual: {
              type: "line",
              title: "f(x) = x² and its derivative f'(x) = 2x",
              description: "The derivative gives the slope of the tangent to the parabola at each point x",
              data: [
                { label: "x=−3", value: -6 },
                { label: "x=−2", value: -4 },
                { label: "x=−1", value: -2 },
                { label: "x=0", value: 0 },
                { label: "x=1", value: 2 },
                { label: "x=2", value: 4 },
                { label: "x=3", value: 6 },
              ],
              yLabel: "f'(x) = 2x",
            },
            references: [
              {
                title: "Calculus: Early Transcendentals, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/9781337613927/",
              },
              {
                title: "MIT OCW 18.01 – Differentiation (Full Lecture Notes)",
                author: "David Jerison, MIT",
                url: "https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/pages/lecture-notes/",
              },
              {
                title: "Paul's Online Notes – Differentiation Formulas",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/CalcI/DiffFormulas.aspx",
              },
            ],
          },
          {
            id: "c1-2-2",
            title: "Implicit Differentiation & Related Rates",
            duration: "35 min",
            summary:
              "Implicit differentiation treats y as a function of x and differentiates both sides with respect to x, applying the chain rule to y-terms (giving dy/dx factors). Related rates apply this to real-world quantities changing over time.",
            detailedExplanation:
              "Sometimes a curve is defined implicitly by an equation like x² + y² = 25 rather than explicitly as y = f(x). We can still differentiate.\n\n**Implicit Differentiation:** Differentiate both sides of the equation with respect to x. When differentiating y-terms, apply the chain rule: d/dx[y²] = 2y · (dy/dx). Then solve for dy/dx.\n\nExample: Differentiate x² + y² = 25.\n- d/dx[x²] + d/dx[y²] = d/dx[25]\n- 2x + 2y(dy/dx) = 0\n- dy/dx = −x/y\n\nThis gives the slope of the tangent at any point (x, y) on the circle.\n\n**Related Rates:** When multiple quantities are all functions of time t, implicit differentiation with respect to t relates their rates of change. Strategy:\n1. Draw a diagram and label all variables\n2. Find an equation relating the variables (geometric formula, law, etc.)\n3. Differentiate both sides with respect to t\n4. Substitute known values and solve for the unknown rate\n\n**Common setups:** Pythagorean theorem (sliding ladder), volume formulas (filling tank), area formulas (spreading oil spill), similar triangles (shadow length).\n\n**Key pitfall:** Substitute specific values only AFTER differentiating — substituting before differentiation would turn a variable into a constant with zero derivative.",
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
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/9781337613927/",
              },
              {
                title: "Paul's Online Notes – Related Rates",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/CalcI/RelatedRates.aspx",
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
            detailedExplanation:
              "Using derivatives, we can completely characterize the behaviour of a function — where it increases, decreases, bends up or down, and reaches its extreme values.\n\n**Critical Points:** A critical point c satisfies f'(c) = 0 or f'(c) does not exist. Local extrema can only occur at critical points (Fermat's Theorem), but not every critical point is an extremum (e.g., inflection points).\n\n**First Derivative Test:** Examine the sign of f' near a critical point c:\n- f' changes from + to − → local maximum at c\n- f' changes from − to + → local minimum at c\n- No sign change → neither (saddle/inflection)\n\n**Second Derivative Test:** If f'(c) = 0:\n- f''(c) > 0 → concave up → local minimum\n- f''(c) < 0 → concave down → local maximum\n- f''(c) = 0 → inconclusive (use first derivative test)\n\n**Concavity and Inflection Points:** f is concave up where f'' > 0 (graph curves like a bowl). Concave down where f'' < 0 (curves like a hill). An inflection point is where concavity changes.\n\n**Optimization Strategy:**\n1. Identify the quantity to maximize/minimize (objective function)\n2. Express it as a function of one variable (use constraints to eliminate others)\n3. Determine the domain (often a closed interval)\n4. Find critical points; evaluate at critical points AND endpoints\n5. The largest/smallest value is the global extremum\n\n**Closed Interval Method:** For a continuous function on [a, b], the global max and min occur at either critical points in (a, b) or at the endpoints a, b.",
            keyConcepts: ["Critical Points", "First & Second Derivative Tests", "Concavity & Inflection", "Closed Interval Method"],
            worked_example: {
              problem: "A farmer has 200 m of fence to enclose a rectangular area against a barn wall (no fence on one side). Maximize area.",
              solution:
                "Let width = x, length = 200−2x. A(x) = x(200−2x) = 200x−2x². A'(x) = 200−4x = 0 ⟹ x = 50. A = 50·100 = 5000 m².",
            },
            visual: {
              type: "area",
              title: "Area Function A(x) = x(200−2x) for Fencing Problem",
              description: "Area enclosed as width x varies — peak occurs at x = 50 m",
              data: [
                { label: "x=10", value: 1800 },
                { label: "x=20", value: 3200 },
                { label: "x=30", value: 4200 },
                { label: "x=40", value: 4800 },
                { label: "x=50", value: 5000 },
                { label: "x=60", value: 4800 },
                { label: "x=70", value: 4200 },
                { label: "x=80", value: 3200 },
                { label: "x=90", value: 1800 },
              ],
              yLabel: "Area (m²)",
            },
            references: [
              {
                title: "Calculus: Early Transcendentals, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/9781337613927/",
              },
              {
                title: "Paul's Online Notes – Optimization Problems",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/CalcI/Optimization.aspx",
              },
              {
                title: "Khan Academy – Optimization with Calculus",
                author: "Khan Academy",
                url: "https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new/ab-5-11/a/applying-the-first-derivative-test",
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
            detailedExplanation:
              "Integration is the other great idea of calculus — it accumulates quantities. While the derivative measures rate of change, the integral measures total accumulation.\n\n**Riemann Sums:** Approximate ∫ₐᵇ f(x)dx by dividing [a,b] into n subintervals of width Δx = (b−a)/n, and summing rectangle areas: Σ f(xᵢ*)Δx. The limit as n→∞ (rectangles get infinitely thin) is the definite integral.\n\n**Properties of the Definite Integral:**\n- ∫ₐᵃ f(x)dx = 0\n- ∫ₐᵇ f(x)dx = −∫ᵦₐ f(x)dx\n- ∫ₐᵇ [f(x) + g(x)]dx = ∫ₐᵇ f(x)dx + ∫ₐᵇ g(x)dx\n- ∫ₐᵇ c·f(x)dx = c·∫ₐᵇ f(x)dx\n- ∫ₐᶜ f(x)dx = ∫ₐᵇ f(x)dx + ∫ᵦᶜ f(x)dx\n\n**Fundamental Theorem of Calculus (FTC):** This is the deepest result in calculus — it unites differentiation and integration:\n\n**Part 1:** If F(x) = ∫ₐˣ f(t)dt, then F'(x) = f(x). Differentiation undoes integration.\n\n**Part 2:** ∫ₐᵇ f(x)dx = F(b) − F(a) where F is any antiderivative of f. This converts computing areas (a geometric/numerical problem) into finding antiderivatives (an algebraic problem).\n\nThe FTC tells us: differentiation and integration are inverse operations — the two great problems of calculus are the same problem in reverse.",
            keyConcepts: ["Riemann Sums", "Definite Integral", "FTC Part 1 & 2", "Net Change Theorem"],
            worked_example: {
              problem: "Evaluate ∫₀² (3x² − 2x + 1) dx.",
              solution:
                "Antiderivative: F(x) = x³ − x² + x. F(2)−F(0) = (8−4+2)−0 = 6.",
            },
            visual: {
              type: "area",
              title: "Riemann Sum Approximation — Convergence to the Integral",
              description: "How the Riemann sum (sum of rectangle areas) approaches the exact value as n increases",
              data: [
                { label: "n=2", value: 5.0 },
                { label: "n=4", value: 5.75 },
                { label: "n=8", value: 5.94 },
                { label: "n=16", value: 5.98 },
                { label: "n=32", value: 6.0 },
                { label: "n=64", value: 6.0 },
              ],
              yLabel: "Riemann Sum Value",
            },
            references: [
              {
                title: "Calculus: Early Transcendentals, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/9781337613927/",
              },
              {
                title: "MIT OCW 18.01SC – Integration (Lecture Notes)",
                author: "David Jerison, MIT",
                url: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/pages/1.-differentiation/",
              },
              {
                title: "Paul's Online Notes – The Definition of the Definite Integral",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/CalcI/DefnOfDefiniteIntegral.aspx",
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
            detailedExplanation:
              "Integration by Parts is the integral counterpart of the Product Rule for differentiation. The formula ∫ u dv = uv − ∫ v du transforms a difficult integral into (hopefully) an easier one.\n\n**Derivation:** From the Product Rule d(uv) = u dv + v du, integrate both sides: uv = ∫ u dv + ∫ v du, giving ∫ u dv = uv − ∫ v du.\n\n**LIATE Priority for choosing u:** Choose u as the function that appears first in: Logarithms → Inverse trig → Algebraic (polynomial) → Trig → Exponential. The remaining factor becomes dv.\n\nRationale: u should become simpler when differentiated. Exponentials are last because eˣ looks the same after differentiation.\n\n**Tabular Method (for polynomial × exponential/trig):** Set up a table: left column repeatedly differentiates u until zero; right column repeatedly integrates dv. Multiply diagonally with alternating signs. Much faster than repeated integration by parts.\n\n**Reduction Formulas:** Sometimes IBP leads back to the original integral: ∫ eˣ sin x dx = eˣ sin x − eˣ cos x − ∫ eˣ sin x dx. Solve algebraically for the integral.\n\n**Applications:** IBP is essential for ∫ ln x dx, ∫ arctan x dx, ∫ xⁿeˣ dx, ∫ xⁿ sin x dx — all classical Calculus II integrals.",
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
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/9781337613927/",
              },
              {
                title: "Paul's Online Notes – Integration by Parts",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/CalcII/IntegrationByParts.aspx",
              },
              {
                title: "Khan Academy – Integration by Parts",
                author: "Khan Academy",
                url: "https://www.khanacademy.org/math/ap-calculus-bc/bc-integration-new/bc-6-11/a/integration-by-parts-review",
              },
            ],
          },
          {
            id: "c2-1-2",
            title: "Trigonometric Substitution",
            duration: "40 min",
            summary:
              "For integrals involving √(a²−x²), √(a²+x²), or √(x²−a²), substitute x = a sinθ, x = a tanθ, or x = a secθ respectively to eliminate the square root using a Pythagorean identity.",
            detailedExplanation:
              "Trigonometric substitution eliminates square roots in integrals by exploiting Pythagorean identities. The idea: if the integrand contains √(a²−x²), the substitution x = a sinθ gives √(a²−a²sin²θ) = a√(1−sin²θ) = a cosθ, eliminating the square root.\n\n**Three cases (memorise the pattern):**\n\n| Expression | Substitution | Identity used |\n|---|---|---|\n| √(a²−x²) | x = a sinθ | 1−sin²θ = cos²θ |\n| √(a²+x²) | x = a tanθ | 1+tan²θ = sec²θ |\n| √(x²−a²) | x = a secθ | sec²θ−1 = tan²θ |\n\n**After substituting:** Convert dx (e.g., dx = a cosθ dθ), simplify, integrate in terms of θ, then convert back to x using a reference triangle.\n\n**Reference triangle method for back-substitution:** Draw a right triangle with the substitution relationship. For x = a sinθ: label opposite = x, hypotenuse = a, adjacent = √(a²−x²). Read off all trig values directly from the triangle.\n\n**Completing the square:** Before applying trig substitution to ax² + bx + c under a square root, complete the square first to get it into standard form a²±u² or u²−a².",
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
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/9781337613927/",
              },
              {
                title: "Paul's Online Notes – Trig Substitution",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/CalcII/TrigSubstitutions.aspx",
              },
            ],
          },
          {
            id: "c2-1-3",
            title: "Partial Fractions",
            duration: "35 min",
            summary:
              "Decompose a proper rational function into simpler fractions over linear and irreducible quadratic factors, then integrate each piece separately. Essential for integrals of the form ∫ P(x)/Q(x) dx.",
            detailedExplanation:
              "Partial fraction decomposition reverses the process of adding fractions. It breaks a complicated rational function into simpler pieces that are easy to integrate.\n\n**When to use:** The integrand is a rational function P(x)/Q(x) where deg(P) < deg(Q). If deg(P) ≥ deg(Q), first divide by polynomial long division.\n\n**Step 1: Factor the denominator Q(x) completely over ℝ** into linear factors (ax+b) and irreducible quadratic factors (ax²+bx+c with b²−4ac < 0).\n\n**Step 2: Write the partial fraction form:**\n- For each linear factor (ax+b)ⁿ: terms A₁/(ax+b) + A₂/(ax+b)² + … + Aₙ/(ax+b)ⁿ\n- For each irreducible quadratic (ax²+bx+c)ⁿ: terms (B₁x+C₁)/(ax²+bx+c) + … + (Bₙx+Cₙ)/(ax²+bx+c)ⁿ\n\n**Step 3: Solve for constants** by multiplying through by the denominator and either: (a) substituting strategic x values that zero out terms, or (b) equating coefficients of like powers.\n\n**Step 4: Integrate** each piece — linear factors give ln|ax+b|/a, repeated linear factors give rational functions, quadratic factors may give arctan terms.\n\n**Result:** Every rational function with real coefficients can be integrated — partial fractions guarantee this.",
            keyConcepts: ["Proper vs Improper Fractions", "Linear Factors", "Repeated Factors", "Irreducible Quadratics"],
            worked_example: {
              problem: "Evaluate ∫ 1/(x²−1) dx.",
              solution:
                "1/(x²−1) = 1/((x−1)(x+1)) = (1/2)/(x−1) − (1/2)/(x+1). Integral = (1/2)ln|x−1| − (1/2)ln|x+1| + C = (1/2)ln|(x−1)/(x+1)| + C.",
            },
            references: [
              {
                title: "Paul's Online Notes – Partial Fractions",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/CalcII/PartialFractions.aspx",
              },
              {
                title: "Calculus: Early Transcendentals, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/9781337613927/",
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
            detailedExplanation:
              "An infinite series Σaₙ = a₁ + a₂ + a₃ + … converges if the sequence of partial sums Sₙ = a₁ + … + aₙ approaches a finite limit L. Otherwise it diverges. We have a toolkit of tests to determine convergence without finding the actual sum.\n\n**Divergence Test (always try first):** If lim_{n→∞} aₙ ≠ 0, the series diverges. Warning: if lim aₙ = 0, the series might still diverge (e.g., harmonic series Σ 1/n diverges even though 1/n → 0).\n\n**p-Series Test:** Σ 1/nᵖ converges if p > 1, diverges if p ≤ 1. Special cases: p=1 (harmonic, diverges), p=2 (π²/6, converges).\n\n**Ratio Test:** Let L = lim |aₙ₊₁/aₙ|. If L < 1 → converges absolutely; L > 1 (or ∞) → diverges; L = 1 → inconclusive. Best for series with factorials or exponentials.\n\n**Root Test:** Let L = lim |aₙ|^(1/n). Same conclusions as Ratio Test. Best for series with nth powers.\n\n**Integral Test:** If f is positive, continuous, decreasing on [1,∞), then Σaₙ and ∫₁^∞ f(x)dx converge or diverge together. Gives p-series test as corollary.\n\n**Comparison Tests:** If 0 ≤ aₙ ≤ bₙ and Σbₙ converges, then Σaₙ converges. Limit Comparison: if lim aₙ/bₙ = c > 0, both series behave alike.\n\n**Alternating Series Test:** Σ(−1)ⁿbₙ converges if bₙ > 0, decreasing, and bₙ → 0. Error bound: |S − Sₙ| ≤ bₙ₊₁.",
            keyConcepts: ["Divergence Test", "Ratio Test", "p-Series", "Comparison Tests", "Alternating Series Test"],
            worked_example: {
              problem: "Does Σ (n!/nⁿ) converge?",
              solution:
                "Ratio test: |aₙ₊₁/aₙ| = (n+1)!/(n+1)ⁿ⁺¹ · nⁿ/n! = nⁿ/(n+1)ⁿ = (1/(1+1/n))ⁿ → 1/e < 1. Converges.",
            },
            visual: {
              type: "bar",
              title: "Convergence Test Decision Guide",
              description: "Success rate of each convergence test by series type (higher = more often applicable)",
              data: [
                { label: "Divergence", value: 9, color: "hsl(0 84% 60%)" },
                { label: "Ratio Test", value: 8, color: "hsl(191 97% 55%)" },
                { label: "p-Series", value: 6, color: "hsl(174 72% 45%)" },
                { label: "Comparison", value: 7, color: "hsl(43 96% 56%)" },
                { label: "Integral", value: 5, color: "hsl(270 80% 65%)" },
                { label: "Root Test", value: 6, color: "hsl(191 97% 55%)" },
              ],
              yLabel: "Applicability Score",
            },
            references: [
              {
                title: "Calculus: Early Transcendentals, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/9781337613927/",
              },
              {
                title: "Paul's Online Notes – Series and Convergence",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/CalcII/SeriesIntro.aspx",
              },
              {
                title: "MIT OCW 18.01SC – Sequences and Series",
                author: "MIT OCW",
                url: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
              },
            ],
          },
          {
            id: "c2-2-2",
            title: "Power Series & Taylor Series",
            duration: "45 min",
            summary:
              "A power series Σcₙ(x−a)ⁿ has a radius of convergence R. Taylor series of f at a: Σ f⁽ⁿ⁾(a)/n! · (x−a)ⁿ. Key series: eˣ = Σxⁿ/n!, sin x = Σ(−1)ⁿx²ⁿ⁺¹/(2n+1)!, cos x = Σ(−1)ⁿx²ⁿ/(2n)!",
            detailedExplanation:
              "Taylor series represent functions as infinite polynomials — one of the most powerful ideas in mathematics. They allow us to compute transcendental functions, approximate solutions to differential equations, and prove deep theoretical results.\n\n**Power Series:** A power series centred at a is Σ_{n=0}^∞ cₙ(x−a)ⁿ. It converges absolutely for |x−a| < R (the radius of convergence) and diverges for |x−a| > R. Convergence at the endpoints must be checked separately.\n\n**Radius of Convergence via Ratio Test:** R = lim |cₙ/cₙ₊₁| (if limit exists).\n\n**Taylor Series:** If f has derivatives of all orders at a, its Taylor series is:\nf(x) = Σ_{n=0}^∞ f⁽ⁿ⁾(a)/n! · (x−a)ⁿ\n\nFor a = 0, this is the Maclaurin series.\n\n**Essential Maclaurin Series to Memorise:**\n- eˣ = 1 + x + x²/2! + x³/3! + … (R = ∞)\n- sin x = x − x³/3! + x⁵/5! − … (R = ∞)\n- cos x = 1 − x²/2! + x⁴/4! − … (R = ∞)\n- ln(1+x) = x − x²/2 + x³/3 − … (R = 1)\n- 1/(1−x) = 1 + x + x² + … (R = 1, geometric!)\n\n**Applications:** Euler's formula e^(iθ) = cos θ + i sin θ follows from these series. Computing limits (replace sin x with its series). Approximating definite integrals of functions with no elementary antiderivative (like ∫ e^(−x²) dx).",
            keyConcepts: ["Radius of Convergence", "Taylor & Maclaurin Series", "Standard Series Expansions", "Error Bounds"],
            worked_example: {
              problem: "Find the Maclaurin series for e^(−x²).",
              solution:
                "Start from eˣ = Σxⁿ/n!. Replace x with −x²: e^(−x²) = Σ(−1)ⁿx²ⁿ/n! = 1 − x² + x⁴/2! − x⁶/3! + …",
            },
            visual: {
              type: "line",
              title: "Taylor Polynomial Approximations of sin(x)",
              description: "How successive Taylor polynomials T₁, T₃, T₅ approximate sin(x) better near x = 0",
              data: [
                { label: "T₁ at π/4", value: 0.785 },
                { label: "T₃ at π/4", value: 0.704 },
                { label: "T₅ at π/4", value: 0.707 },
                { label: "T₇ at π/4", value: 0.707 },
                { label: "sin(π/4)", value: 0.707 },
              ],
              yLabel: "Approximation value",
            },
            references: [
              {
                title: "Calculus: Early Transcendentals, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart/9781337613927/",
              },
              {
                title: "MIT OCW 18.01SC – Power and Taylor Series",
                author: "MIT OCW",
                url: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
              },
              {
                title: "Paul's Online Notes – Taylor Series",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/CalcII/TaylorSeries.aspx",
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
            detailedExplanation:
              "In 3D space, vectors generalise the familiar 2D directed line segments. They encode both magnitude (size) and direction, and are fundamental to physics, engineering, and computer graphics.\n\n**Vector Operations in ℝ³:**\n- Addition: ⟨a,b,c⟩ + ⟨d,e,f⟩ = ⟨a+d, b+e, c+f⟩\n- Scalar multiplication: k⟨a,b,c⟩ = ⟨ka,kb,kc⟩\n- Magnitude: |v| = √(a²+b²+c²)\n- Unit vector: û = v/|v|\n\n**Dot Product:** u·v = a₁a₂ + b₁b₂ + c₁c₂ = |u||v|cosθ\n- If u·v = 0, the vectors are perpendicular (orthogonal)\n- Scalar projection of u onto v: comp_v u = u·v/|v|\n- Vector projection: proj_v u = (u·v/|v|²)v\n- Work done by force F over displacement d: W = F·d\n\n**Cross Product:** u×v = ⟨b₁c₂−b₂c₁, a₂c₁−a₁c₂, a₁b₂−a₂b₁⟩\n- Perpendicular to both u and v (right-hand rule gives direction)\n- |u×v| = |u||v|sinθ = area of parallelogram spanned by u, v\n- If u×v = 0, vectors are parallel\n- Torque = r×F (moment of force about a pivot)\n- Triple scalar product u·(v×w) = volume of parallelepiped\n\n**Lines in 3D:** Parametric form r(t) = r₀ + tv. Planes: normal vector n and point P₀ give n·(r−r₀) = 0.",
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
                url: "https://www.cengage.com/c/multivariable-calculus-9e-stewart/9781337275378/",
              },
              {
                title: "MIT OCW 18.02SC – Multivariable Calculus",
                author: "Denis Auroux, MIT",
                url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/",
              },
              {
                title: "Paul's Online Notes – Vectors in 3D",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/CalcIII/VectorsIntro.aspx",
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
            detailedExplanation:
              "Extending calculus to functions of multiple variables requires a richer theory of derivatives. Instead of one derivative, we have partial derivatives for each variable, and they combine into the gradient vector.\n\n**Partial Derivative ∂f/∂x:** Differentiate f with respect to x, treating all other variables as constants. Geometrically, it's the slope of the curve where the surface z = f(x,y) intersects the plane y = c.\n\n**Clairaut's Theorem:** For sufficiently smooth functions, mixed partials commute: ∂²f/∂x∂y = ∂²f/∂y∂x. This saves enormous computation.\n\n**The Gradient:** ∇f = ⟨∂f/∂x, ∂f/∂y⟩ (in 2D). Key properties:\n- Points in the direction of greatest increase of f\n- Magnitude |∇f| equals the maximum rate of change\n- Perpendicular to level curves (contours) of f\n- ∇f = 0 at critical points (potential extrema or saddle points)\n\n**Directional Derivative:** Rate of change of f in direction û (unit vector): D_û f = ∇f · û = |∇f|cosθ, where θ is the angle between ∇f and û. Maximum when û = ∇f/|∇f| (gradient direction). Zero when û ⊥ ∇f (along level curve).\n\n**Chain Rule for Multivariable Functions:** If z = f(x, y) and x, y are functions of t: dz/dt = (∂f/∂x)(dx/dt) + (∂f/∂y)(dy/dt). More generally, the chain rule uses the Jacobian matrix.\n\n**Applications:** Gradient descent (machine learning optimisation), heat flow, potential fields in physics, normal vectors to surfaces.",
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
                url: "https://www.cengage.com/c/multivariable-calculus-9e-stewart/9781337275378/",
              },
              {
                title: "MIT OCW 18.02SC – Partial Derivatives and Gradient",
                author: "Denis Auroux, MIT",
                url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/pages/2.-partial-derivatives/",
              },
              {
                title: "Paul's Online Notes – Partial Derivatives",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/CalcIII/PartialDerivatives.aspx",
              },
            ],
          },
          {
            id: "c3-2-2",
            title: "Optimization of Multivariable Functions",
            duration: "45 min",
            summary:
              "Critical points where ∇f = 0 are classified by the Second Derivative Test using the discriminant D = fₓₓfᵧᵧ − fₓᵧ². D>0 and fₓₓ>0 → local min; D>0 and fₓₓ<0 → local max; D<0 → saddle point. Lagrange multipliers handle constrained optimization.",
            detailedExplanation:
              "Optimization in multiple variables is central to machine learning, economics, physics, and engineering. The theory extends the one-variable approach but with richer geometry.\n\n**Critical Points:** Set ∇f = 0 (all partial derivatives zero simultaneously). Solve the system of equations. These are candidates for extrema.\n\n**Second Derivative Test in 2D:** At a critical point (a, b), compute the discriminant:\nD = fₓₓ(a,b)·fᵧᵧ(a,b) − [fₓᵧ(a,b)]²\n\n- D > 0 and fₓₓ > 0: local minimum\n- D > 0 and fₓₓ < 0: local maximum\n- D < 0: saddle point (like a mountain pass)\n- D = 0: inconclusive\n\n**Saddle Points:** Neither a max nor a min. The function increases in some directions from (a,b) and decreases in others. Example: f(x,y) = x²−y² (the classic saddle).\n\n**Constrained Optimization — Lagrange Multipliers:** To maximise/minimise f(x,y) subject to g(x,y) = c:\nSolve ∇f = λ∇g simultaneously with g(x,y) = c. The parameter λ is the Lagrange multiplier. Geometrically: at the optimum, the level curves of f and g are tangent (their gradients are parallel).\n\n**Applications:** Profit maximisation subject to budget constraints. Minimising cost of materials for a given volume. Maximum entropy distributions in statistics.",
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
                url: "https://www.cengage.com/c/multivariable-calculus-9e-stewart/9781337275378/",
              },
              {
                title: "Paul's Online Notes – Lagrange Multipliers",
                author: "Paul Dawkins, Lamar University",
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
            detailedExplanation:
              "Double and triple integrals extend the idea of integration to functions of two and three variables, computing volumes, masses, averages, and probabilities over 2D and 3D regions.\n\n**Double Integral:** ∬_D f(x,y) dA represents signed volume between the surface z = f(x,y) and the xy-plane over region D. Computed as an iterated integral:\n∬_D f dA = ∫ₐᵇ [∫_{g₁(x)}^{g₂(x)} f(x,y) dy] dx\n\n**Fubini's Theorem:** For continuous f on a rectangle, you can integrate in either order:\n∫ₐᵇ ∫_c^d f(x,y) dy dx = ∫_c^d ∫ₐᵇ f(x,y) dx dy\n\nSometimes one order is much easier. Try both if stuck.\n\n**Polar Coordinates for Double Integrals:** For circular regions, substitute x = r cosθ, y = r sinθ, and dA = r dr dθ (the factor r is the Jacobian — crucial!).\n\n**Triple Integrals:** ∭_E f(x,y,z) dV represents total mass of a solid E with density f. In cylindrical coordinates (for cylinders, cones): dV = r dr dθ dz. In spherical coordinates (for spheres): dV = ρ² sinφ dρ dφ dθ.\n\n**Applications:** Volume of solids. Mass of objects with variable density. Centre of mass and moments of inertia. Probability (joint density functions). Average value of temperature over a region.",
            keyConcepts: ["Fubini's Theorem", "Iterated Integrals", "Polar & Cylindrical Coords", "Spherical Coordinates"],
            worked_example: {
              problem: "Evaluate ∬_D x² + y² dA where D is the disk x²+y²≤4.",
              solution:
                "Polar: ∫₀²π ∫₀² r² · r dr dθ = ∫₀²π dθ · ∫₀² r³ dr = 2π · [r⁴/4]₀² = 2π · 4 = 8π.",
            },
            visual: {
              type: "bar",
              title: "Coordinate System Choice for Multiple Integrals",
              description: "Best coordinate system based on region geometry",
              data: [
                { label: "Rectangles", value: 10, color: "hsl(191 97% 55%)" },
                { label: "Circles/Disks", value: 9, color: "hsl(43 96% 56%)" },
                { label: "Cylinders", value: 8, color: "hsl(174 72% 45%)" },
                { label: "Spheres", value: 10, color: "hsl(270 80% 65%)" },
                { label: "Cones", value: 7, color: "hsl(191 97% 55%)" },
              ],
              yLabel: "Ease score (higher = better fit)",
            },
            references: [
              {
                title: "Multivariable Calculus, 9th ed.",
                author: "Stewart, Clegg & Watson (2020), Cengage",
                url: "https://www.cengage.com/c/multivariable-calculus-9e-stewart/9781337275378/",
              },
              {
                title: "MIT OCW 18.02SC – Multiple Integrals",
                author: "MIT OCW",
                url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/pages/3.-double-integrals-and-line-integrals-in-the-plane/",
              },
              {
                title: "Paul's Online Notes – Multiple Integrals",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/CalcIII/MultipleIntegrals.aspx",
              },
            ],
          },
          {
            id: "c3-3-2",
            title: "Green's, Stokes', and Divergence Theorems",
            duration: "60 min",
            summary:
              "Green's Theorem: ∮_C F·dr = ∬_D (∂Q/∂x − ∂P/∂y) dA (2D). Stokes' Theorem: ∮_C F·dr = ∬_S (∇×F)·dS (3D). Divergence Theorem: ∬_S F·dS = ∭_E (∇·F) dV. All relate boundary integrals to interior integrals.",
            detailedExplanation:
              "The three great theorems of vector calculus — Green's, Stokes', and the Divergence Theorem — are all manifestations of one grand idea: the integral of a derivative over a region equals the integral of the original function over the boundary.\n\n**Green's Theorem (2D):** Relates a line integral around a closed curve C to a double integral over the enclosed region D:\n∮_C (P dx + Q dy) = ∬_D (∂Q/∂x − ∂P/∂y) dA\nC must be simple, closed, oriented counterclockwise. Applications: computing areas (A = (1/2)∮(x dy − y dx)).\n\n**Curl:** For a vector field F = ⟨P, Q, R⟩, curl F = ∇×F. In 2D, scalar curl = ∂Q/∂x − ∂P/∂y. If curl F = 0, F is irrotational (conservative in a simply connected region).\n\n**Stokes' Theorem (3D generalisation of Green's):** Relates a line integral around a closed curve C (boundary of surface S) to a surface integral:\n∮_C F·dr = ∬_S (∇×F)·dS\nAllows converting between two types of integrals, choosing whichever is easier.\n\n**Divergence:** div F = ∇·F = ∂P/∂x + ∂Q/∂y + ∂R/∂z. Measures rate of outward flux per unit volume.\n\n**Divergence Theorem (Gauss's Theorem):** Relates a surface integral over a closed surface S to a triple integral over the enclosed solid E:\n∯_S F·dS = ∭_E (∇·F) dV\nApplications: Maxwell's equations of electromagnetism, Gauss's law for gravity.\n\n**Unifying perspective:** These theorems are all special cases of the Generalized Stokes' Theorem in differential geometry: ∫_∂Ω ω = ∫_Ω dω.",
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
                url: "https://www.cengage.com/c/multivariable-calculus-9e-stewart/9781337275378/",
              },
              {
                title: "MIT OCW 18.02SC – Vector Calculus",
                author: "MIT OCW",
                url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/pages/4.-triple-integrals-and-surface-integrals-in-3-space/",
              },
              {
                title: "Paul's Online Notes – Stokes' Theorem",
                author: "Paul Dawkins, Lamar University",
                url: "https://tutorial.math.lamar.edu/Classes/CalcIII/StokesTheorem.aspx",
              },
            ],
          },
        ],
      },
    ],
  },
};
