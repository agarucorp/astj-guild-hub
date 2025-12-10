# Configuración del Template de EmailJS

## Template HTML Responsive para EmailJS

Este template está optimizado para verse perfectamente tanto en **desktop** como en **móviles**. Incluye:

- ✅ Media queries para adaptación móvil
- ✅ Tablas responsive con width="100%"
- ✅ Tamaños de fuente adaptativos
- ✅ Padding y márgenes optimizados para móviles
- ✅ Compatibilidad con Outlook (mso)
- ✅ Word-wrap para textos largos

Copia y pega el siguiente código HTML en tu template de EmailJS:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Nuevo Reporte</title>
    <!--[if mso]>
    <style type="text/css">
        body, table, td, a { font-family: Arial, sans-serif !important; }
    </style>
    <![endif]-->
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            outline: none;
            text-decoration: none;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .email-content {
                padding: 20px !important;
            }
            .email-header {
                padding: 25px 20px !important;
            }
            .email-title {
                font-size: 18px !important;
            }
            .email-subtitle {
                font-size: 12px !important;
            }
            .section-title {
                font-size: 18px !important;
                margin-bottom: 20px !important;
                padding-bottom: 12px !important;
            }
            .label-text {
                font-size: 11px !important;
            }
            .tema-text {
                font-size: 14px !important;
                padding: 10px 12px !important;
            }
            .mensaje-box {
                padding: 12px !important;
            }
            .mensaje-text {
                font-size: 14px !important;
            }
            .fecha-text {
                font-size: 13px !important;
            }
            .footer-note {
                font-size: 11px !important;
            }
            .email-footer {
                padding: 15px 20px !important;
            }
            .footer-text {
                font-size: 11px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
    <!-- Wrapper table for background -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5; padding: 20px 0;">
        <tr>
            <td align="center" style="padding: 0;">
                <!-- Main container table -->
                <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 600px; width: 100%;">
                    <!-- Header -->
                    <tr>
                        <td class="email-header" style="background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6b 100%); padding: 30px 40px; text-align: center;">
                            <h1 class="email-title" style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: 1px; line-height: 1.2;">
                                LISTA BLANCA
                            </h1>
                            <p class="email-subtitle" style="margin: 8px 0 0 0; color: #d4af37; font-size: 14px; font-style: italic; line-height: 1.4;">
                                Aire Claro
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="email-content" style="padding: 40px;">
                            <!-- Title -->
                            <h2 class="section-title" style="margin: 0 0 30px 0; color: #1e3a5f; font-size: 20px; font-weight: 600; border-bottom: 2px solid #d4af37; padding-bottom: 15px; line-height: 1.3;">
                                Nuevo Reporte Recibido
                            </h2>
                            
                            <!-- Tema Section -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 25px;">
                                <tr>
                                    <td>
                                        <p class="label-text" style="margin: 0 0 8px 0; color: #666666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.4;">
                                            Tema de Consulta
                                        </p>
                                        <p class="tema-text" style="margin: 0; color: #1e3a5f; font-size: 16px; font-weight: 500; padding: 12px 16px; background-color: #f8f9fa; border-left: 4px solid #d4af37; border-radius: 4px; line-height: 1.5; word-wrap: break-word;">
                                            {{tema}}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Mensaje Section -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 25px;">
                                <tr>
                                    <td>
                                        <p class="label-text" style="margin: 0 0 8px 0; color: #666666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.4;">
                                            Mensaje
                                        </p>
                                        <div class="mensaje-box" style="padding: 16px; background-color: #f8f9fa; border-radius: 4px; border: 1px solid #e9ecef;">
                                            <p class="mensaje-text" style="margin: 0; color: #333333; font-size: 15px; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word; overflow-wrap: break-word;">
{{mensaje}}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Fecha Section -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td>
                                        <p class="label-text" style="margin: 0 0 8px 0; color: #666666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.4;">
                                            Fecha y Hora
                                        </p>
                                        <p class="fecha-text" style="margin: 0; color: #666666; font-size: 14px; line-height: 1.5;">
                                            {{fecha}}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Divider -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="border-top: 1px solid #e9ecef;"></td>
                                </tr>
                            </table>
                            
                            <!-- Footer Note -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td>
                                        <p class="footer-note" style="margin: 0; color: #999999; font-size: 12px; text-align: center; line-height: 1.5;">
                                            Este mensaje fue enviado a través del formulario de contacto de Lista Blanca.<br style="display: block;">
                                            La información proporcionada es 100% confidencial.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="email-footer" style="background-color: #1e3a5f; padding: 20px 40px; text-align: center;">
                            <p class="footer-text" style="margin: 0; color: #ffffff; font-size: 12px; line-height: 1.5;">
                                © 2024 Lista Blanca. Todos los derechos reservados.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
```

## Configuración del Subject (Asunto)

En la sección de **Subject** del template de EmailJS, usa:

```
Nuevo reporte de {{tema}}
```

Esto hará que el asunto del email sea dinámico según el tema seleccionado, por ejemplo:
- "Nuevo reporte de Derechos laborales"
- "Nuevo reporte de Representación sindical"
- "Nuevo reporte de Condiciones de trabajo"
- etc.

## Variables Disponibles

El template utiliza las siguientes variables:

- `{{tema}}` - Nombre legible del tema seleccionado (ej: "Derechos laborales")
- `{{tema_value}}` - Valor original del tema (ej: "derechos-laborales")
- `{{mensaje}}` - Contenido completo del mensaje del usuario
- `{{fecha}}` - Fecha y hora del envío en formato español
- `{{subject}}` - Subject completo del email (ya incluye "Nuevo reporte de")

## Pasos para Configurar en EmailJS

1. **Ve a Email Templates** en tu dashboard de EmailJS
2. **Crea un nuevo template** o edita uno existente
3. **Copia el HTML** de arriba y pégalo en el editor HTML
4. **Configura el Subject** con: `Nuevo reporte de {{tema}}`
5. **Guarda el template** y copia el Template ID
6. **Agrega el Template ID** a tu archivo `.env` como `VITE_EMAILJS_TEMPLATE_ID`

## Características del Template

- ✅ Diseño profesional y responsive
- ✅ Colores corporativos de Lista Blanca (azul marino y dorado)
- ✅ Sección destacada para el tema de consulta
- ✅ Área de mensaje con formato preservado (pre-wrap)
- ✅ Información de fecha y hora
- ✅ Nota de confidencialidad
- ✅ Footer con información de copyright
- ✅ Compatible con todos los clientes de email principales

