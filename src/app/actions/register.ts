'use server'

import { Resend } from 'resend'

export type RegisterResult =
  | { success: true }
  | { success: false; error: string }

// TEST_TO debe ser el correo con el que se registró la cuenta en resend.com
// onboarding@resend.dev solo puede enviar a ese correo hasta verificar un dominio propio
// TODO: cambiar TEST_TO a 'hola@sosac.org' y FROM a 'Climate Roots <noreply@sosac.org>'
//       cuando sosac.org esté verificado en Resend → Domains
const TEST_TO = process.env.RESEND_TEST_TO ?? 'taek1701@gmail.com'
const FROM = 'onboarding@resend.dev'

export async function registerParticipant(
  formData: FormData,
): Promise<RegisterResult> {
  const name = (formData.get('name') as string | null)?.trim()
  const email = (formData.get('email') as string | null)?.trim()
  const message = (formData.get('message') as string | null)?.trim()

  if (!name || !email) {
    return { success: false, error: 'Nombre y email son requeridos.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'El email no tiene un formato válido.' }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[Resend] RESEND_API_KEY no está configurada en las variables de entorno.')
    return {
      success: false,
      error: 'Error de configuración del servidor. Contacta al administrador.',
    }
  }

  const resend = new Resend(apiKey)

  try {
    const [notif, confirm] = await Promise.all([
      // Notificación interna
      resend.emails.send({
        from: FROM,
        to: TEST_TO,
        subject: `Nueva inscripción Café & Jardín — ${name}`,
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#14241B;background:#F4F1EA;">
            <div style="border-left:4px solid #2D5F3F;padding-left:20px;margin-bottom:32px;">
              <h1 style="font-size:1.8rem;margin:0 0 8px;color:#14241B;">Nueva inscripción</h1>
              <p style="margin:0;color:#4A5A50;font-size:0.9rem;">Café & Jardín · SOSAC-Lab · Monterrey</p>
            </div>
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #D8D2C4;color:#4A5A50;font-size:0.85rem;width:120px;">Nombre</td>
                <td style="padding:12px 0;border-bottom:1px solid #D8D2C4;font-weight:bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #D8D2C4;color:#4A5A50;font-size:0.85rem;">Email</td>
                <td style="padding:12px 0;border-bottom:1px solid #D8D2C4;"><a href="mailto:${email}" style="color:#2D5F3F;">${email}</a></td>
              </tr>
              ${message ? `<tr><td style="padding:12px 0;color:#4A5A50;font-size:0.85rem;vertical-align:top;">Mensaje</td><td style="padding:12px 0;">${message}</td></tr>` : ''}
            </table>
          </div>
        `,
      }),

      // Confirmación al participante
      resend.emails.send({
        from: FROM,
        to: TEST_TO,
        subject: `[TEST → ${email}] ¡Tu inscripción fue recibida!`,
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#14241B;background:#F4F1EA;">
            <p style="font-size:0.75rem;color:#4A5A50;background:#D8D2C4;padding:8px 12px;border-radius:6px;margin-bottom:24px;">
              ⚠️ Modo prueba — este correo iría a: <strong>${email}</strong>
            </p>
            <h1 style="font-size:2.2rem;margin:0 0 8px;color:#14241B;line-height:1.1;">¡Hola, ${name}!</h1>
            <p style="font-size:1.05rem;line-height:1.7;color:#4A5A50;margin:24px 0;">
              Recibimos tu inscripción para la próxima sesión de <strong style="color:#2D5F3F;">Café & Jardín</strong> en SOSAC-Lab, Monterrey.
            </p>
            <p style="font-size:1.05rem;line-height:1.7;color:#4A5A50;margin:0 0 32px;">
              Te escribiremos con fecha, hora y lugar en cuanto los confirmemos. ¡Gracias por sumarte!
            </p>
            <hr style="border:none;border-top:1px solid #D8D2C4;margin:0 0 24px;"/>
            <p style="font-size:0.8rem;color:#4A5A50;margin:0;line-height:1.6;">
              SOSAC — Sociedad Sostenible A.C.<br/>
              Monterrey, Nuevo León · México
            </p>
          </div>
        `,
      }),
    ])

    // Log IDs para debug en Vercel Functions log
    console.log('[Resend] Enviados:', { notif: notif.data?.id, confirm: confirm.data?.id })

    if (notif.error || confirm.error) {
      console.error('[Resend] Error en respuesta:', notif.error ?? confirm.error)
      return {
        success: false,
        error: 'Hubo un problema al enviar. Intenta de nuevo.',
      }
    }

    return { success: true }
  } catch (err) {
    console.error('[Resend] Excepción:', err)
    return {
      success: false,
      error: 'No se pudo enviar. Por favor escríbenos por WhatsApp.',
    }
  }
}
