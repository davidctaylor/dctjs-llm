import { z } from 'zod';

export enum PageBuilderComponentEnum {
  PAGE_CONTAINER = 'PAGE_CONTAINER',
  PAGE_SECTION = 'PAGE_SECTION',
}

export enum PageBuilderComponentSectionEnum {
  ACCORDION = 'ACCORDION',
  CARD = 'CARD',
  CAROUSEL = 'CAROUSEL',
  LINK = 'LINK',
}

const PageBuilderComponentEnumInternal = z.nativeEnum(PageBuilderComponentEnum);

const BaseComponentSchema = z.object({
  id: z.string(),
});

export const AccordionComponentSchema = BaseComponentSchema.extend({
  componentType: z.literal('ACCORDION'),
  heading: z.union([z.string(), z.undefined()]),
  content: z.union([z.string(), z.undefined()]),
}).describe('ACCORDION or Expansion Panel component');

export const LinkComponentSchema = BaseComponentSchema.extend({
  componentType: z.literal('LINK'),
  content: z.union([z.string(), z.undefined()]),
  href: z
    .union([z.string(), z.undefined()])
    .describe('HREF or URL for the link'),
  label: z.union([z.string(), z.undefined()]).describe('Label for the link'),
}).describe('LINK component');

export const CardComponentSchema = BaseComponentSchema.extend({
  componentType: z.literal('CARD'),
  content: z
    .union([z.string(), z.undefined()])
    .describe(
      'Optional content for a card in string, HTML or Markdown formats'
    ),
  href: z
    .union([z.string(), z.undefined()])
    .describe('HREF or URL link for the card'),
  imageRef: z
    .union([z.string(), z.undefined()])
    .describe('Image URL for the card'),
  title: z.union([z.string(), z.undefined()]).describe('Title for the card'),
  subTitle: z
    .union([z.string(), z.undefined()])
    .describe('Sub-Title for the card'),
}).describe('CARD component');

export const CarouselComponentSchema = BaseComponentSchema.extend({
  componentType: z.literal('CAROUSEL'),
  cards: z
    .array(CardComponentSchema)
    .min(1)
    .describe('Array components of type CARD'),
  title: z
    .union([z.string(), z.undefined()])
    .describe(
      'The heading or title for the Carousel in string, HTML or Markdown formats'
    ),
}).describe('CAROUSEL component');

export const PageBuilderSectionsSchema = z
  .object({
    componentType: PageBuilderComponentEnumInternal,
    components: z
      .array(
        z.union([
          AccordionComponentSchema,
          CardComponentSchema,
          CarouselComponentSchema,
          LinkComponentSchema,
        ])
      )
      .describe('Array of ACCORDION, CARD, CAROUSEL or LINK components'),
    content: z.union([z.string(), z.undefined()]),
    heading: z.union([z.string(), z.undefined()]),
    id: z.string().describe('Identifier for the page section object'),
  })
  .describe('PAGE_SECTION component');

export const PageBuilderSchema = z
  .object({
    componentType: z.literal('PAGE_CONTAINER'),
    // title: z.string().describe('Title of page or article')})
    hero: z.union([
      z.undefined(),
      z
        .object({
          imageRef: z
            .union([z.string(), z.undefined()])
            .describe('Image URL for the HERO'),
        })
        .describe('Page hero'),
    ]),
    title: z.union([
      z.undefined(),
      z
        .object({
          title: z
            .union([z.string(), z.undefined()])
            .describe('Title of page or article'),
          subTitle: z
            .union([z.string(), z.undefined()])
            .describe('The SubTitle of page or article')
            .optional(),
        })
        .describe('Page title'),
    ]),
    pageContent: z
      .object({
        content: z.union([z.string(), z.undefined()]),
      })
      .optional()
      .describe(
        'Main content for a page that may in string, HTML or Markdown formats. Compoent type "CONTENT"'
      ),
    sections: z.union([
      z
        .array(PageBuilderSectionsSchema)
        .describe('Array of Page Sections components'),
      z.undefined(),
    ]),
    url: z.union([z.string(), z.undefined()]),
  })
  .describe('PAGE_CONTAINER');

export const PageBuilderRequestSchema = z.object({
  prompts: z.array(z.union([z.string(), z.undefined()])),
  page: z.union([PageBuilderSchema, z.undefined()]),
});

export const PageBuilderSectionsRequestSchema = z
  .object({
    prompts: z.array(z.union([z.string(), z.undefined()])),
    components: z.array(PageBuilderSectionsSchema),
  })
  .describe('PAGE_SECTION_REQUEST');

export type PageBuilderType = z.infer<typeof PageBuilderSchema>;
export type PageBuilderSectionsType = z.infer<typeof PageBuilderSectionsSchema>;
export type PageBuilderRequestType = z.infer<typeof PageBuilderRequestSchema>;
export type PageBuilderSectionRequestType = z.infer<
  typeof PageBuilderSectionsRequestSchema
>;
export type PageBuilderBaseComponentType = z.infer<typeof BaseComponentSchema>;
export type PageBuilderCarouseComponentType = z.infer<
  typeof CarouselComponentSchema
>;
