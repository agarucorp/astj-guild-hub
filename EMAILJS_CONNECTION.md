# Verificación de Conexión EmailJS

## Parámetros Enviados desde el Formulario

El formulario envía los siguientes parámetros a EmailJS:

### Parámetros Principales (Requeridos)
- **`tema`**: Nombre legible del tema seleccionado (ej: "Derechos laborales", "Representación sindical")
- **`mensaje`**: Contenido completo del mensaje escrito por el usuario

### Parámetros Adicionales (Opcionales)
- **`fecha`**: Fecha y hora del envío en formato español
- **`subject`**: Asunto completo del email (para referencia)

## Verificación en EmailJS

### 1. Verificar que el Template use las variables correctas

En tu template de EmailJS, asegúrate de que uses exactamente estos nombres:

```html
{{tema}}    <!-- Para el tema de consulta -->
{{mensaje}} <!-- Para el mensaje del usuario -->
{{fecha}}   <!-- Para la fecha (opcional) -->
```

### 2. Configurar el Subject en EmailJS

En la sección **Subject** del template, usa:
```
Nuevo reporte de {{tema}}
```

### 3. Verificar en la Consola del Navegador

Cuando envíes el formulario, verás en la consola del navegador (F12):
- Los parámetros que se están enviando
- Confirmación de envío exitoso o errores

### 4. Mapeo de Valores del Select

Los valores del select se mapean automáticamente a nombres legibles:

| Valor del Select | Nombre Enviado |
|-----------------|----------------|
| `derechos-laborales` | "Derechos laborales" |
| `representacion-sindical` | "Representación sindical" |
| `condiciones-trabajo` | "Condiciones de trabajo" |
| `sugerencias` | "Sugerencias" |
| `denuncias` | "Denuncias" |
| `otro` | "Otro" |

## Estructura del Objeto Enviado

```javascript
{
  tema: "Derechos laborales",           // Nombre legible
  mensaje: "Texto del mensaje...",      // Mensaje completo
  fecha: "15/1/2024, 14:30:25",         // Fecha formateada
  subject: "Nuevo reporte de Derechos laborales" // Subject completo
}
```

## Solución de Problemas

### Si no recibes los emails:

1. **Verifica las variables de entorno** en tu archivo `.env`:
   ```
   VITE_EMAILJS_PUBLIC_KEY=tu_public_key
   VITE_EMAILJS_SERVICE_ID=tu_service_id
   VITE_EMAILJS_TEMPLATE_ID=tu_template_id
   ```

2. **Verifica que los nombres de las variables en el template coincidan**:
   - Debe ser exactamente `{{tema}}` y `{{mensaje}}` (sin espacios, mayúsculas/minúsculas exactas)

3. **Revisa la consola del navegador** para ver errores específicos

4. **Verifica en EmailJS Dashboard**:
   - Ve a "Email Templates" → Tu template
   - Asegúrate de que las variables estén escritas correctamente
   - Verifica que el Service ID y Template ID sean correctos

### Ejemplo de Template Correcto en EmailJS

```html
<!-- En el cuerpo del email -->
<p><strong>Tema:</strong> {{tema}}</p>
<p><strong>Mensaje:</strong></p>
<p>{{mensaje}}</p>
<p><strong>Fecha:</strong> {{fecha}}</p>
```

## Testing

Para probar la conexión:

1. Abre la consola del navegador (F12)
2. Completa el formulario
3. Envía el formulario
4. Verifica en la consola:
   - Debe aparecer "Enviando formulario con parámetros:"
   - Luego "Email enviado exitosamente:"
5. Revisa tu bandeja de entrada (o la configurada en EmailJS)

## Notas Importantes

- Los nombres de las variables en EmailJS son **case-sensitive** (sensible a mayúsculas/minúsculas)
- Asegúrate de que `{{tema}}` y `{{mensaje}}` estén escritos exactamente así en tu template
- El parámetro `tema` se envía con el nombre legible, no con el valor del select
- El parámetro `mensaje` preserva los saltos de línea gracias a `white-space: pre-wrap` en el template

