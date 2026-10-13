import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Regla de publicación (estrategia §5, "ninguna página se publica sin su copy definitivo"):
 *  - estado: borrador   → se ve en la vista previa con un aviso, NO se publica en producción.
 *  - estado: confirmado → Laura lo validó; se publica.
 * Además, el build de producción falla si una página publicada contiene [CONFIRMAR] o [TARIFA].
 */
const estado = z.enum(['borrador', 'confirmado']).default('borrador');

const servicios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/servicios' }),
  schema: z.object({
    titulo: z.string(),
    metaTitle: z.string().max(70),
    metaDescription: z.string().max(160),
    vertical: z.enum(['negocio', 'personas']),
    etapa: z.enum(['crea', 'protege', 'contrata', 'crece']).optional(),
    whatsapp: z.string().optional(),
    orden: z.number().default(99),
    estado,
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    pregunta: z.string(),
    paginas: z.array(z.string()),
    orden: z.number().default(99),
    estado,
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

export const collections = { servicios, faq, blog };
