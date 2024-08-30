import { z } from 'zod';

export enum PageBuilderComponentType {
  PAGE_CONTAINER = 'page_container',
  // PAGE_SECTIONS = 'page_sections',
  PAGE_SECTION = 'page_section',
  ACCORDIAN = 'accordian',
  BUTTON = 'button',
  CARD = 'card',
  CAROUSEL = 'carousel',
  CONTENT = 'content',
}

const PageBuilderComponentSectionEnum = z.enum(['ACCORDIAN', 'BUTTON', 'CARD', 'CAROUSEL']);
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
}).describe('Accordian of Expansion Panel component');

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
}).describe('Button component');

const CardComponentSchema = BaseCompoentSchema.extend({
  content: z.string().optional(),
  href: z.string().optional(),
  imageRef: z.string().optional(),
  title: z.string().optional(),
  subTitle: z.string().optional(),
}).describe('Card component');

const CarouselComponentSchema = BaseCompoentSchema.extend({
  cards: z.array(CardComponentSchema),
  headerText: z.string(),
});

const PageBuilderSchema = z
  .object({
    page: z
      .object({
        pageContent: z.object({
          content: z.string().optional(),
          componentType: PageBuilderComponentEnum,
          id: z.string(),
        }).describe('Main content for a page in string, HTML or Markdown formats')
        .optional(),
        componentType: PageBuilderComponentEnum,
        id: z.string(),
        name: z.string().optional(),
        sections: z
        .array(
          z.object({
            components: z
              .array(z.union([AccordianCompoentSchema, CardComponentSchema, CarouselComponentSchema]))
              .optional(),
            componentType: PageBuilderComponentSectionEnum,
            heading: z.string(),
            id: z.string(),
          })
        )
        .describe('An array or section of specific component types')
        .optional(),
        title: z
          .object({
            title: z.string(),
            subTitle: z.string(),
            id: z.string(),
          })
          .describe('The page title property')
          .optional(),
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

const Maybe = (schema: typeof PageBuilderPromptSchema) => z.object({
  result: schema.optional(),
  error: z.boolean(),
  message: z.string().optional(),
});

const MaybeUser = Maybe(PageBuilderPromptSchema);

export type PageBuilderType = z.infer<typeof PageBuilderSchema>;
export type PageBuilderPromptType = z.infer<typeof PageBuilderPromptSchema>;
