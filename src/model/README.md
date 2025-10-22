# model/

Domain type definitions only – interfaces, enums, type aliases. **No runtime code**.

## Import

**Do not import from the model barrel.**

Import directly from the relevant submodule:

```ts
import { IPlushieBirthday } from 'model/plushie-birthday';
import { IUserProfile } from 'model/user';
```

This avoids circular dependencies and is enforced by ESLint. If a barrel index.ts is reintroduced, it must not be used for imports.

Add a new file for each domain slice (e.g. `plushie-birthday.ts`). Keep names descriptive and prefer explicit interfaces over broad index signatures.
