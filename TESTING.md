# Testing

Este proyecto está configurado con Jest y React Testing Library para pruebas unitarias y de integración.

## Comandos disponibles

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch (re-ejecuta al detectar cambios)
npm run test:watch

# Ejecutar tests con reporte de cobertura
npm run test:coverage
```

## Estructura de tests

Los tests se encuentran en el directorio `__tests__/`:

-    `__tests__/page.test.tsx` - Tests para la página principal
-    `__tests__/components/button.test.tsx` - Tests para el componente Button

## Escribir tests

### Ejemplo básico

```typescript
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
     it('renders correctly', () => {
          render(<MyComponent />);

          const element = screen.getByText('Hello World');
          expect(element).toBeInTheDocument();
     });
});
```

### Ejemplo con interacciones de usuario

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyButton from '@/components/MyButton';

describe('MyButton', () => {
     it('calls onClick when clicked', async () => {
          const handleClick = jest.fn();
          const user = userEvent.setup();

          render(<MyButton onClick={handleClick}>Click me</MyButton>);

          await user.click(screen.getByRole('button'));

          expect(handleClick).toHaveBeenCalledTimes(1);
     });
});
```

## Configuración

-    **jest.config.ts**: Configuración principal de Jest
-    **jest.setup.ts**: Configuración que se ejecuta antes de cada test
-    Usa `jsdom` como entorno de test para simular el DOM del navegador

## Cobertura de código

Los informes de cobertura incluyen:

-    `app/**/*.{js,jsx,ts,tsx}`
-    `shadcn/**/*.{js,jsx,ts,tsx}`

Excluye:

-    Archivos de declaración TypeScript (`.d.ts`)
-    `node_modules`
-    `.next`
