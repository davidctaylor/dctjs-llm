import { any, z } from 'zod';

export enum PageBuilderComponentEnum {
  CONTENT = 'CONTENT',
  PAGE_CONTAINER = 'PAGE_CONTAINER',
  PAGE_SECTION = 'PAGE_SECTION',
  PAGE_TITLE = 'PAGE_TITLE',
}

export enum PageBuilderComponentSectionEnum {
  ACCORDION = 'ACCORDION',
  BUTTON = 'BUTTON',
  CARD = 'CARD',
  CAROUSEL = 'CAROUSEL',
}

const PageBuilderComponentEnumInternal = z.nativeEnum(PageBuilderComponentEnum);

const BaseComponentSchema = z.object({
  id: z.string(),
  // componentType: z.string().optional(),
});

const AccordianComponentSchema = BaseComponentSchema.extend({
  componentType: z.literal('ACCORDION'),
  items: z.array(
    z.object({
      heading: z.union([z.string(), z.undefined()]),
      content: z.union([z.string(), z.undefined()]),
    })
  ),
}).describe('Accordion or Expansion Panel component');

enum ButtonComponentColorType {
  'primary',
  'secondary',
}

enum ButtonComponentStyleType {
  'elevated',
  'filled',
  'outlined',
  'text',
}

const ButtonComponentSchema = BaseComponentSchema.extend({
  arialLabel: z.string().optional(),
  buttonColor: z.nativeEnum(ButtonComponentColorType).optional(),
  buttonStyle: z.nativeEnum(ButtonComponentStyleType).optional(),
  disabled: z.boolean().optional(),
}).describe('Button component of type "BUTTON"');

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

export const PageBuilderSectionsSchema = z.object({
  componentType: PageBuilderComponentEnumInternal,
  components: z
    .array(
      z.union([
        AccordianComponentSchema,
        CardComponentSchema,
        CarouselComponentSchema,
      ])
    )
    .describe('Array of ACCORDION, CARD or CAROUSEL components'),
  content: z.union([z.string(), z.undefined()]),
  id: z.string().describe('Identifier for the page section object'),
});

export const PageBuilderSchema = z
  .object({
    // title: z.string().describe('Title of page or article')})
    componentType: PageBuilderComponentEnumInternal,
    id: z.string().describe('Identifier for the page object'),
    title: z
      .object({
        componentType: PageBuilderComponentEnumInternal,
        title: z
          .union([z.string(), z.undefined()])
          .describe('Title of page or article'),
        subTitle: z
          .union([z.string(), z.undefined()])
          .describe('The SubTitle of page or article')
          .optional(),
        id: z.string(),
      })
      .describe(
        'Title and sub-title for the page. Compoenent type "PAGE_TITLE"'
      ),
    pageContent: z
      .object({
        content: z.union([z.string(), z.undefined()]),
        componentType: PageBuilderComponentEnumInternal,
        id: z.string(),
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
    // .object({
    //   components: z
    //     .array(
    //       z.union([
    //         AccordianComponentSchema,
    //         CardComponentSchema,
    //         CarouselComponentSchema,
    //       ])
    //     )
    //     .describe('An array of components that maybe part of the section')
    //     .optional(),
    //   componentType: PageBuilderComponentEnumInternal,
    //   heading: z.string().optional().describe('Sections heading or title'),
    //   id: z.string(),
    // })
    // .describe('An array of section objects. Component type "PAGE_SECTION"')
    // .optional(),
    url: z.union([z.string(), z.undefined()]),
  })
  .describe('Page container. Component type "PAGE_CONTAINER"');

export const PageBuilderRequestSchema = z.object({
  prompts: z.array(z.union([z.string(), z.undefined()])),
  page: z.union([PageBuilderSchema, z.undefined()]),
});

export const PageBuilderSectionsRequestSchema = z.object({
  prompts: z.array(z.string()),
  sectionsContent: z.union([PageBuilderSectionsSchema, z.undefined()]),
});

// export const MaybePageBuilderPromptSchema = (schema: typeof PageBuilderPromptSchema) => z.object({
//   result: PageBuilderPromptSchema.optional(),
//   error: z.boolean(),
//   message: z.string().optional(),
// });

// const Maybe = (schema: any) => z.object({
//   result: schema.optional(),
//   error: z.boolean().optional(),
//   message: z.string().optional(),
// });

// const MaybeUser = Maybe(UserDetail);

// export const MaybePageBuilderPromptSchema = Maybe(PageBuilderPromptSchema);

export type PageBuilderType = z.infer<typeof PageBuilderSchema>;
export type PageBuilderSectionsType = z.infer<typeof PageBuilderSectionsSchema>;
export type PageBuilderRequestType = z.infer<typeof PageBuilderRequestSchema>;
export type PageBuilderSectionRequestType = z.infer<
  typeof PageBuilderSectionsRequestSchema
>;
export type PageBuilderCarouseComponentType = z.infer<
  typeof CarouselComponentSchema
>;
export type PageBuilderBaseComponentType = z.infer<typeof BaseComponentSchema>;
