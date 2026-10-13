import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Regla de publicación (estrategia §5, "ninguna página se publica sin su copy definitivo"):
 *  - estado: borrador   → se ve en la vista previa con un aviso, NO se publica en producción.
 *  - estado: confirmado → Laura lo validó; se publica.
 * Además, el build de producción falla si una página publicada contiene [CONFIRMAR] o [TARIFA].
 *
 * Los textos admiten **negrita** y [enlaces](/ruta). Ver src/lib/texto.ts.
 */
const estado = z.enum(['borrador', 'confirmado']).default('borrador');
const paso = z.object({ t: z.string(), d: z.string() });
const pregunta = z.object({ p: z.string(), r: z.string() });

/** Landing de servicio: esqueleto fijo de 11 bloques (estrategia §4.5). */
const servicios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/servicios' }),
  schema: z.object({
    titulo: z.string(),
    metaTitle: z.string().max(70),
    metaDescription: z.string().max(160),
    vertical: z.enum(['negocio', 'personas']),
    etapa: z.enum(['crea', 'protege', 'contrata', 'crece']).optional(),
    /** Clave del mensaje de WhatsApp (src/lib/whatsapp.ts). Por defecto, el id del archivo. */
    whatsapp: z.string().optional(),
    /** Opción preseleccionada en el formulario. */
    formulario: z.enum(['crear-empresa', 'registro-de-marca', 'contrato', 'socios', 'asesoria-empresa', 'personal', 'otro']),
    orden: z.number().default(99),
    estado,

    hero: z.object({ h1: z.string(), intro: z.string(), cta: z.string(), ctaWhatsapp: z.string() }),
    reconocimiento: z.object({ titulo: z.string(), items: z.array(z.string()) }),
    educativo: z.object({ titulo: z.string(), parrafos: z.array(z.string()) }),
    incluye: z.object({
      titulo: z.string(),
      items: z.array(z.string()),
      extra: z.object({ titulo: z.string(), items: z.array(z.string()) }).optional(),
    }),
    proceso: z.object({ titulo: z.string(), pasos: z.array(paso), nota: z.string().optional() }),
    noIncluye: z.object({
      titulo: z.string(),
      items: z.array(z.string()),
      cierre: z.string().optional(),
    }),
    porQue: z.object({ titulo: z.string(), parrafos: z.array(z.string()) }),
    relacionados: z.object({
      intro: z.string(),
      enlaces: z.array(z.object({ texto: z.string(), ruta: z.string() })),
    }),
    faq: z.array(pregunta),
    cierre: z.object({ titulo: z.string(), texto: z.string() }),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string().max(160),
    servicio: z.string(),
    publicado: z.coerce.date(),
    actualizado: z.coerce.date().optional(),
    estado,
  }),
});

export const collections = { servicios, blog };
