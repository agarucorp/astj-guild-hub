# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Configuración de EmailJS

Este proyecto utiliza EmailJS para el envío de formularios. Para configurarlo:

1. **Crea una cuenta en EmailJS**: Visita https://www.emailjs.com/ y crea una cuenta gratuita.

2. **Configura un servicio de email**:
   - Ve a "Email Services" en el dashboard
   - Agrega un nuevo servicio (Gmail, Outlook, etc.)
   - Sigue las instrucciones para conectar tu cuenta de email
   - Anota el **Service ID**

3. **Crea un template de email**:
   - Ve a "Email Templates" y crea un nuevo template
   - Usa estas variables en el template:
     - `{{tema}}` - Tema de consulta seleccionado
     - `{{mensaje}}` - Mensaje del usuario
     - `{{fecha}}` - Fecha y hora del envío
   - Configura el asunto y cuerpo del email
   - Anota el **Template ID**

4. **Obtén tu Public Key**:
   - Ve a "Account" > "General" > "API Keys"
   - Copia tu **Public Key**

5. **Configura las variables de entorno**:
   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega las siguientes variables:
   ```
   VITE_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
   VITE_EMAILJS_SERVICE_ID=tu_service_id_aqui
   VITE_EMAILJS_TEMPLATE_ID=tu_template_id_aqui
   ```
   - Reemplaza los valores con tus credenciales reales

6. **Reinicia el servidor de desarrollo** después de crear el archivo `.env`

El formulario de contacto ahora enviará emails automáticamente cuando los usuarios lo completen.