import { z } from 'zod';

export enum PageBuilderComponentType {
  PAGE_CONTAINER = 'page_container',
  PAGE_SECTIONS = 'page_sections',
  PAGE_SECTION = 'page_section',
  ACCORDIAN = 'accordian',
  BUTTON = 'button',
  CARD = 'card',
  CAROUSEL = 'carousel',
}

const PageBuilderComponentEnum = z.nativeEnum(PageBuilderComponentType);

const BaseCompoentSchema = z.object({
  componentType: z.nativeEnum(PageBuilderComponentType),
  id: z.string().optional(),
});

const AccordianCompoentSchema = BaseCompoentSchema.extend({
  items: z.array(
    z.object({
      heading: z.string(),
      content: z.string(),
    })
  ),
});

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

const ButtonComponentSchema = BaseCompoentSchema.extend({
  arialLabel: z.string().optional(),
  buttonColor: z.nativeEnum(ButtonComponentColorType).optional(),
  buttonStyle: z.nativeEnum(ButtonComponentStyleType).optional(),
  disabled: z.boolean().optional(),
});

const CardComponentSchema = BaseCompoentSchema.extend({
  content: z.string().optional(),
  href: z.string().optional(),
  imageRef: z.string().optional(),
  title: z.string().optional(),
  subTitle: z.string().optional(),
});

const CarouselComponentSchema = BaseCompoentSchema.extend({
  cards: z.array(CardComponentSchema),
  headerText: z.string(),
});

const PageBuilderSchema = z
  .object({
    page: z
      .object({
        content: z.string().optional(),
        componentType: z.nativeEnum(PageBuilderComponentType),
        id: z.string(),
        name: z.string().optional(),
        // pageSections: z.array(PageBuilderSectionSchema),
        sections: z
        .array(
          z.object({
            components: z
              .array(z.union([AccordianCompoentSchema, CardComponentSchema, CarouselComponentSchema]))
              .optional(),
            componentType: z.nativeEnum(PageBuilderComponentType),
            heading: z.string(),
            id: z.string(),
          })
        )
        .optional()
        .describe('Page Section Object'),
        title: z
          .object({
            title: z.string(),
            subTitle: z.string(),
            id: z.string(),
          })
          .optional()
          .describe('The page title property'),
        url: z.string(),
      })
      .describe('Page object'),
  })
  .describe('PageBuilder object');

const AddtionalPromptSchema = z
  .object({
    questions: z.array(z.string()),
  })
  .optional()
  .describe(
    'Prompts the user for additional information to complete the PageBuilder object'
  );

export const PageBuilderPromptSchema = z.object({
  prompts: AddtionalPromptSchema,
  pageContent: PageBuilderSchema,
});

export type PageBuilderType = z.infer<typeof PageBuilderSchema>;
export type PageBuilderPromptType = z.infer<typeof PageBuilderPromptSchema>;
