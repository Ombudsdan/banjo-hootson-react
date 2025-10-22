# builders/

Deterministic factory helpers and builder utilities for constructing common objects (e.g. alert configs, test data shapes) in a consistent manner.

Keep them:

- Pure (no randomness unless explicitly parameterized)
- Small and composable
- Free of side effects

Use builders in tests or when creating repetitive config objects inside hooks/controllers.
